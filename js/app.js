// Router and interactions.
const $app = document.getElementById('app');
const $nav = document.getElementById('sidebar');

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'today') return { page: 'today', tweek: parts[1], tday: parts[2] };
  if (parts[0] === 'week') return { page: 'week', week: parts[1], tab: parts[2] };
  return { page: parts[0] || '' };
}

function applyPrefs() { document.body.classList.toggle('hide-ar', !Store.get('showAr', false)); }

function render() {
  applyPrefs();
  Audio2.cancelSequence();
  const r = parseRoute();
  $nav.innerHTML = Views.nav(r);
  const pages = {
    '': () => Views.home(), start: () => Views.start(), week: () => Views.week(r.week, r.tab), today: () => Views.today(r.tweek, r.tday),
    vocab: () => Views.vocab(), dialogues: () => Views.dialogues(), review: () => Views.review(),
    stickies: () => Views.stickies(), resources: () => Views.resources(), settings: () => Views.settings(),
  };
  $app.innerHTML = (pages[r.page] || pages[''])();
  document.body.classList.remove('nav-open');
  window.scrollTo(0, 0);
  afterRender(r);
}

async function afterRender(r) {
  // mark which items have recordings
  const keys = new Set(await Recordings.keys().catch(() => []));
  document.querySelectorAll('[data-rec]').forEach(b => b.classList.toggle('has', keys.has(b.dataset.rec)));
  const ss = document.getElementById('setStart');
  if (ss) ss.onclick = () => { const v = document.getElementById('startDate').value; if (v) { Store.set('startDate', v); location.hash = '#/today'; render(); } };
  if (r.page === 'vocab') {
    const s = document.getElementById('vsearch');
    s.addEventListener('input', () => {
      const q = s.value.toLowerCase();
      document.querySelectorAll('#vlist tbody tr').forEach(tr => { tr.hidden = q && !tr.textContent.toLowerCase().includes(q); });
    });
    document.getElementById('vweek').addEventListener('change', e => { Store.set('vocabWeek', e.target.value); render(); });
  }
  if (r.page === 'settings') {
    document.getElementById('recCount').textContent = `${keys.size} recording(s) saved in this browser.`;
    const rate = document.getElementById('rate');
    rate.addEventListener('input', () => { Audio2.rate = +rate.value; Store.set('ttsRate', +rate.value); document.getElementById('rateVal').textContent = rate.value; });
    const sa = document.getElementById('showAr');
    sa.addEventListener('change', () => { Store.set('showAr', sa.checked); applyPrefs(); });
    const vs = document.getElementById('voiceSel');
    vs && vs.addEventListener('change', () => Store.set('voiceName', vs.value));
    document.getElementById('exportProgress').onclick = () => download('darija-progress.json', Store.exportJSON(), 'application/json');
    document.getElementById('importProgress').onchange = async e => {
      const f = e.target.files[0]; if (!f) return;
      localStorage.setItem(Store._key, await f.text()); Store.load(); render();
    };
    document.getElementById('resetProgress').onclick = () => {
      if (confirm('Delete all progress and notes? Recordings are kept.')) { localStorage.removeItem(Store._key); Store.load(); render(); }
    };
  }
}

function download(name, text, type = 'text/plain') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click();
}

function weekById(id) { return DARIJA.weeks.find(w => w.id == id); }

function ankiExport(which) {
  const weeks = which === 'all' ? DARIJA.weeks : [weekById(which)];
  const rows = weeks.flatMap(w => Views.allWeekVocabItems(w).map(v =>
    [v.dar, v.en + (v.note ? ` (${v.note})` : ''), v.ar || '', `darija week${w.id}`].map(x => String(x).replace(/\t|\n/g, ' ')).join('\t')));
  download(which === 'all' ? 'darija-all-weeks.tsv' : `darija-week-${which}.tsv`, rows.join('\n'));
}

async function playDialogue(id, mode) {
  const w = weekById(id);
  const items = Views.dialogueItems(w);
  const box = document.getElementById('dlg-' + id);
  const speakers = [...new Set(items.map(l => l.speaker))];
  const pitchFor = it => it.speaker === 'Lea' ? 1.15 : (speakers.indexOf(it.speaker) % 2 ? 0.85 : 0.95);
  const highlight = i => box.querySelectorAll('.line').forEach((el, j) => el.classList.toggle('playing', i === j));
  Audio2._seqToken = Symbol(); const token = Audio2._seqToken;
  for (let i = 0; i < items.length; i++) {
    if (token !== Audio2._seqToken) return;
    highlight(i);
    const mine = items[i].speaker === 'Lea';
    if (mode === 'lea' && mine) {
      // your turn: wait about as long as the line would take to say
      box.querySelectorAll('.line')[i].classList.add('your-turn');
      await new Promise(r => setTimeout(r, 1500 + items[i].dar.length * 90));
      box.querySelectorAll('.line')[i].classList.remove('your-turn');
      continue;
    }
    await Audio2.play(items[i], { pitch: pitchFor(items[i]) });
    if (token !== Audio2._seqToken) return;
    const pause = mode === 'shadow' ? 1500 + items[i].dar.length * 90 : 450;
    if (mode === 'shadow') box.querySelectorAll('.line')[i].classList.add('your-turn');
    await new Promise(r => setTimeout(r, pause));
    box.querySelectorAll('.line')[i].classList.remove('your-turn');
  }
  highlight(-1);
  if (!mode && !Store.get(`w${id}:dialogueHeard`)) { Store.set(`w${id}:dialogueHeard`, true); render(); }
}

document.addEventListener('click', async e => {
  const t = e.target.closest('button, a, input, label');
  if (!t) return;
  const d = t.dataset;
  if (d.play) { e.preventDefault(); t.classList.add('playing'); await Audio2.play(Items[d.play]); t.classList.remove('playing'); }
  else if (d.rec) {
    e.preventDefault();
    if (t.classList.contains('has') && !t.classList.contains('recording') && !confirm('Replace the recording for this? (Cancel keeps it)')) return;
    Recorder.toggle(d.rec, (on, saved) => { t.classList.toggle('recording', on); if (saved) t.classList.add('has'); });
  }
  else if (d.playall) {
    const items = Views.allWeekVocabItems(weekById(d.playall));
    Audio2.playSequence(items.map(v => Items[v.id] || v), i => document.querySelectorAll('[data-play]').forEach(b => b.classList.toggle('playing', Items[b.dataset.play] && items[i] && b.dataset.play === items[i].id)));
  }
  else if (d.dialogue) playDialogue(d.dialogue);
  else if (d.shadow) playDialogue(d.shadow, 'shadow');
  else if (d.lea) playDialogue(d.lea, 'lea');
  else if ('stop' in d) Audio2.cancelSequence();
  else if (d.reveal) { Store.set(`w${d.reveal}:dialogueHeard`, true); render(); }
  else if (d.anki) ankiExport(d.anki);
  else if ('revealQ' in d) t.closest('.q').classList.add('shown');
  else if (d.mark) {
    const li = t.closest('.q'); const [wid, qi] = li.dataset.q.split(':');
    const res = Store.get(`w${wid}:quiz`, {}); res[qi] = d.mark; Store.set(`w${wid}:quiz`, res);
    li.classList.remove('ok', 'miss'); li.classList.add('answered', d.mark);
    const sc = document.querySelector('.score');
    const w = weekById(wid);
    if (sc && w) sc.textContent = `Score: ${Object.values(res).filter(x => x === 'ok').length} / ${w.quiz.length}`;
    $nav.innerHTML = Views.nav(parseRoute());
  }
  else if (d.resetquiz) { Store.set(`w${d.resetquiz}:quiz`, {}); render(); }
});

document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.progress && /^(plan|daily):/.test(t.dataset.progress)) {
    Store.set(t.dataset.progress, t.checked);
    t.closest('li') && t.closest('li').classList.toggle('done', t.checked);
    const tr = document.getElementById('tracker');
    if (tr) tr.innerHTML = Views.tracker(+tr.dataset.week, +tr.dataset.day);
    const r = parseRoute(); const dn = document.querySelector('.daynav');
    if (dn) { const tmp = document.createElement('div'); tmp.innerHTML = Views.today(r.tweek, r.tday); dn.innerHTML = tmp.querySelector('.daynav').innerHTML; const st = tmp.querySelector('.streak'), cur = document.querySelector('.streak'); if (cur) cur.remove(); if (st) document.querySelector('.daycard').appendChild(st); }
    return;
  }
  if (t.dataset.progress) { Store.set(t.dataset.progress, t.checked); $nav.innerHTML = Views.nav(parseRoute()); const tabs = document.querySelector('.tabs'); if (tabs) { const r = parseRoute(); const w = weekById(r.week); tabs.innerHTML = Views.sections.map(([k, x]) => `<a href="#/week/${w.id}/${k}" class="${k === (r.tab || 'vocab') ? 'active' : ''}">${x}${Views.sectionDone(w, k) ? ' ✓' : ''}</a>`).join(''); } }
  if ('toggleEn' in t.dataset) { Store.set('showEn', t.checked); document.querySelectorAll('.dialogue').forEach(x => x.classList.toggle('no-en', !t.checked)); }
});
document.addEventListener('input', e => { if (e.target.dataset.note) Store.set(e.target.dataset.note, e.target.value); });
document.getElementById('menuBtn').onclick = () => document.body.classList.toggle('nav-open');

window.addEventListener('hashchange', render);
DARIJA.loadWeeks(DARIJA.manifest).then(render);
