// Rendering of every page. Content comes from DARIJA.course and DARIJA.weeks.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Light markup in content text: **bold**, *darija* (shown in Darija style)
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em class="dar">$1</em>');
const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const Items = {}; // id -> playable item, filled while rendering

function phrase(item, { big = false, showAr = true } = {}) {
  Items[item.id] = item;
  return `<span class="phrase ${big ? 'big' : ''}">
    <button class="say" data-play="${esc(item.id)}" title="Listen">
      <span class="dar">${esc(item.dar)}</span>
      ${showAr && item.ar ? `<span class="ar" lang="ar" dir="rtl">${esc(item.ar)}</span>` : ''}
      <span class="spk" aria-hidden="true">🔊</span>
    </button>
    <button class="rec" data-rec="${esc(item.id)}" title="Record your own audio for this">🎙</button>
  </span>`;
}

function weekItemId(week, kind, text) { return `w${week.id}:${kind}:${slug(text)}`; }

const Views = {
  nav(route) {
    const weeks = DARIJA.weeks.map(w => `
      <a href="#/week/${w.id}" class="${route.week == w.id ? 'active' : ''}">
        <span class="wk">Week ${w.id}</span> ${esc(w.title)}
        ${Views.weekDone(w) ? '<span class="tick">✓</span>' : ''}
      </a>`).join('');
    const link = (h, t) => `<a href="#/${h}" class="${route.page === h ? 'active' : ''}">${t}</a>`;
    return `
      ${link('', '🏠 Home')}
      ${link('today', '📅 Today')}
      ${link('start', '🔤 Sounds & weekly rhythm')}
      <div class="navhead">Weeks</div>${weeks}
      <div class="navhead">Across all weeks</div>
      ${link('vocab', '📚 Vocabulary repository')}
      ${link('dialogues', '💬 All dialogues')}
      ${link('review', '🔁 Review: missed quiz questions')}
      ${link('stickies', '🏷 Sticky notes for your home')}
      ${link('resources', '🧭 Resources & after week 6')}
      ${link('settings', '⚙️ Voice & settings')}`;
  },

  // ---------- Home ----------
  home() {
    const c = DARIJA.course;
    return `
      <section class="hero">
        <h1>${esc(c.title)}</h1>
        <p class="goal">${fmt(c.goal)}</p>
      </section>
      <h2>How this plan works</h2>
      <ul class="principles">${c.principles.map(p => `<li><strong>${esc(p.title)}</strong> ${fmt(p.text)}</li>`).join('')}</ul>
      <p class="note">${fmt(c.spellingNote)}</p>
      <div class="cards" style="margin-top:16px">${Views.todayCard()}</div>
      <h2>Your weeks</h2>
      <div class="cards">${DARIJA.weeks.map(w => {
        const p = Views.weekProgress(w);
        return `<a class="card" href="#/week/${w.id}">
          <div class="wk">Week ${w.id}</div>
          <h3>${esc(w.title)}</h3>
          <p>${fmt(w.canDo)}</p>
          <div class="bar"><span style="width:${p}%"></span></div>
          <small>${p}% done</small>
        </a>`;
      }).join('')}</div>`;
  },

  // ---------- Sounds & rhythm ----------
  start() {
    const c = DARIJA.course;
    return `
      <h1>Reading Darija: the sounds and the numbers</h1>
      <p>${fmt(c.sounds.intro)}</p>
      <table class="tbl">
        <thead><tr><th>Written</th><th>Arabic</th><th>How it sounds</th><th>Example</th></tr></thead>
        <tbody>${c.sounds.rows.map(r => `<tr>
          <td class="dar big">${esc(r.written)}</td><td class="ar" lang="ar">${esc(r.arabic)}</td>
          <td>${fmt(r.sound)}</td>
          <td>${r.example ? phrase({ id: 'start:' + slug(r.example.dar), ...r.example }) + ' <span class="muted">' + esc(r.example.en) + '</span>' : '<span class="muted">rarely needed</span>'}</td>
        </tr>`).join('')}</tbody>
      </table>
      <h3>Tips</h3>
      <ul>${c.sounds.tips.map(t => `<li><strong>${esc(t.title)}</strong> ${fmt(t.text)}</li>`).join('')}</ul>

      <h1>Weekly rhythm (same every week)</h1>
      <p>${fmt(c.rhythm.intro)}</p>
      <table class="tbl">
        <thead><tr><th>Day</th><th>What you do</th><th>Time</th></tr></thead>
        <tbody>${c.rhythm.days.map(d => `<tr><td><strong>${esc(d.day)}</strong></td><td>${fmt(d.what)}</td><td>${esc(d.time)}</td></tr>`).join('')}</tbody>
      </table>
      <h3>Every day (about 5 minutes)</h3>
      <ul>${c.rhythm.daily.map(d => `<li>${fmt(d)}</li>`).join('')}</ul>
      <h3>How to shadow a dialogue</h3>
      <p>${fmt(c.rhythm.shadowing)}</p>`;
  },

  // ---------- A week ----------
  sections: [
    ['vocab', 'Vocabulary'], ['grammar', 'Grammar'], ['dialogue', 'Dialogue'],
    ['exercises', 'Exercises'], ['mission', 'Mission'], ['quiz', 'Quiz'],
  ],

  week(id, tab) {
    const w = DARIJA.weeks.find(x => x.id == id);
    if (!w) return `<h1>Week ${esc(id)} not found</h1><p>Add it to <code>content/manifest.js</code>.</p>`;
    tab = tab || 'vocab';
    const i = DARIJA.weeks.indexOf(w);
    const prev = DARIJA.weeks[i - 1], next = DARIJA.weeks[i + 1];
    const body = { vocab: this.wVocab, grammar: this.wGrammar, dialogue: this.wDialogue, exercises: this.wExercises, mission: this.wMission, quiz: this.wQuiz }[tab];
    return `
      <div class="wk">Week ${w.id}</div>
      <h1>${esc(w.title)}</h1>
      <p class="cando"><strong>By Sunday you can:</strong> ${fmt(w.canDo)}</p>
      ${(w.notes || []).map(n => `<p class="note">${fmt(n)}</p>`).join('')}
      <p><a href="#/today/${w.id}/0">📅 Day-by-day plan and tracker for this week →</a></p>
      <div class="tabs">${this.sections.map(([k, t]) => `<a href="#/week/${w.id}/${k}" class="${k === tab ? 'active' : ''}">${t}${this.sectionDone(w, k) ? ' ✓' : ''}</a>`).join('')}</div>
      <section class="panel">${body ? body.call(this, w) : ''}</section>
      <div class="pager">
        ${prev ? `<a href="#/week/${prev.id}">← Week ${prev.id}</a>` : '<span></span>'}
        ${next ? `<a href="#/week/${next.id}">Week ${next.id} →</a>` : '<span></span>'}
      </div>`;
  },

  vocabTable(w, section, opts = {}) {
    return `<table class="tbl vocab">
      <thead><tr><th>Darija</th><th>English</th><th>Note</th>${opts.showWeek ? '<th>Week</th>' : ''}</tr></thead>
      <tbody>${section.words.map(v => {
        const item = { id: v.id || weekItemId(w, 'v', v.dar), ...v };
        return `<tr><td>${phrase(item)}</td><td>${esc(v.en)}</td><td class="muted">${fmt(v.note || '')}</td>
          ${opts.showWeek ? `<td><a href="#/week/${w.id}">${w.id}</a></td>` : ''}</tr>`;
      }).join('')}</tbody></table>`;
  },

  allWeekVocabItems(w) {
    return w.vocabulary.flatMap(s => s.words.map(v => ({ id: v.id || weekItemId(w, 'v', v.dar), ...v })));
  },

  wVocab(w) {
    const k = `w${w.id}:vocab`;
    return `
      <div class="toolbar">
        <button class="btn" data-playall="${w.id}">▶ Play all words</button>
        <button class="btn ghost" data-anki="${w.id}">⬇ Export for Anki</button>
        <label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> Read aloud & added to Anki</label>
      </div>
      ${w.vocabulary.map(s => `
        ${s.title ? `<h3>${esc(s.title)}</h3>` : ''}
        ${this.vocabTable(w, s)}
        ${s.grammarLink !== false ? `<p class="link-grammar">Grammar for these words: <a href="#/week/${w.id}/grammar">${esc(w.grammar.title)} →</a></p>` : ''}
      `).join('')}`;
  },

  wGrammar(w) {
    const g = w.grammar;
    const k = `w${w.id}:grammar`;
    return `
      <h2>${esc(g.title)}</h2>
      ${(g.paragraphs || []).map(p => `<p>${fmt(p)}</p>`).join('')}
      ${g.table ? `<table class="tbl"><thead><tr>${g.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>${g.table.rows.map(r => `<tr>${r.map((cell, ci) => `<td>${typeof cell === 'object' ? phrase({ id: weekItemId(w, 'g', cell.dar), ...cell }) : (ci === 0 ? `<strong>${esc(cell)}</strong>` : esc(cell))}</td>`).join('')}</tr>`).join('')}</tbody></table>` : ''}
      ${g.examples && g.examples.length ? `<h3>Examples: tap to hear</h3>
        <ul class="examples">${g.examples.map(e => `<li>${phrase({ id: weekItemId(w, 'g', e.dar), ...e })} <span class="muted">${esc(e.en)}</span></li>`).join('')}</ul>` : ''}
      ${g.relatedWords && g.relatedWords.length ? `<p class="link-grammar">Uses these words from <a href="#/week/${w.id}/vocab">this week's vocabulary</a>: ${g.relatedWords.map(x => `<em class="dar">${esc(x)}</em>`).join(', ')}</p>` : ''}
      <label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> Grammar point done</label>`;
  },

  dialogueItems(w) {
    return w.dialogue.lines.map((l, i) => ({ id: `w${w.id}:d:${i}`, ...l }));
  },

  wDialogue(w, standalone = false) {
    const d = w.dialogue;
    const heard = Store.get(`w${w.id}:dialogueHeard`);
    const k = `w${w.id}:dialogue`;
    const items = this.dialogueItems(w);
    return `
      <h2>${standalone ? `Week ${w.id}: ` : ''}${esc(d.title)}</h2>
      ${d.intro ? `<p>${fmt(d.intro)}</p>` : ''}
      <div class="toolbar">
        <button class="btn" data-dialogue="${w.id}">▶ ${heard ? 'Play the dialogue again' : 'Listen first (text appears after)'}</button>
        <button class="btn ghost" data-stop>■ Stop</button>
        <button class="btn ghost" data-shadow="${w.id}">🗣 Shadow: pause after each line</button>
        <button class="btn ghost" data-lea="${w.id}">🎭 Play only the other role, you answer as Lea</button>
        <label class="check"><input type="checkbox" data-toggle-en ${Store.get('showEn', true) ? 'checked' : ''}> Show English</label>
      </div>
      <div class="dialogue ${heard ? '' : 'hidden-text'} ${Store.get('showEn', true) ? '' : 'no-en'}" id="dlg-${w.id}">
        ${!heard ? `<p class="veil">Listen once first. The text appears when the dialogue has played. <button class="linkbtn" data-reveal="${w.id}">Show it now</button></p>` : ''}
        ${items.map((l, i) => `
          <div class="line ${l.speaker === 'Lea' ? 'me' : ''}" data-line="${i}">
            <div class="who">${esc(l.speaker)}</div>
            <div class="what">${phrase(l)}${l.en ? `<div class="en">${esc(l.en)}</div>` : ''}</div>
          </div>`).join('')}
      </div>
      ${d.glossary && d.glossary.length ? `<p class="gloss">${d.glossary.map(g => `<em class="dar">${esc(g.dar)}</em> = ${esc(g.en)}`).join(' · ')}</p>` : ''}
      ${d.culture ? `<p class="note"><strong>Culture note:</strong> ${fmt(d.culture)}</p>` : ''}
      ${standalone ? '' : `<label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> Read aloud 3× and shadowed</label>`}`;
  },

  wExercises(w) {
    return `<p class="muted">See <a href="#/start">Weekly rhythm</a> for which day each exercise belongs to.</p>
      <ol class="exercises">${w.exercises.map((e, i) => {
        const k = `w${w.id}:ex:${i}`;
        const nk = `w${w.id}:exnote:${i}`;
        return `<li>
          <label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> <strong>${esc(e.title)}</strong></label>
          <p>${fmt(e.text)}</p>
          ${(e.examples || []).length ? `<div class="examples">${e.examples.map(x => phrase({ id: weekItemId(w, 'x', x.dar), ...x })).join(' ')}</div>` : ''}
          <textarea data-note="${nk}" placeholder="Your notes, words you looked up, how it went…">${esc(Store.get(nk, ''))}</textarea>
        </li>`;
      }).join('')}</ol>`;
  },

  wMission(w) {
    const m = w.mission;
    const k = `w${w.id}:mission`;
    const nk = `w${w.id}:missionnote`;
    return `
      <h2>${esc(m.title || 'Mission with your boyfriend')}</h2>
      <p>${fmt(m.text)}</p>
      ${(m.phrases || []).length ? `<h3>Phrases you'll need</h3><div class="examples">${m.phrases.map(x => phrase({ id: weekItemId(w, 'm', x.dar), ...x })).join(' ')}</div>` : ''}
      ${(m.checklist || []).length ? `<h3>Try to cover</h3><ul class="plain">${m.checklist.map((c, i) => {
        const ck = `w${w.id}:missionck:${i}`;
        return `<li><label class="check"><input type="checkbox" data-progress="${ck}" ${Store.get(ck) ? 'checked' : ''}> ${fmt(c)}</label></li>`;
      }).join('')}</ul>` : ''}
      <label class="check big"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> Mission done</label>
      <h3>What he corrected / new words he taught you</h3>
      <textarea data-note="${nk}" rows="5" placeholder="Write down his corrections and how he says things.">${esc(Store.get(nk, ''))}</textarea>`;
  },

  wQuiz(w) {
    const res = Store.get(`w${w.id}:quiz`, {});
    const score = Object.values(res).filter(x => x === 'ok').length;
    const answered = Object.keys(res).length;
    return `
      <p class="muted">Answer out loud first, then tap <em>Show answer</em> and mark yourself honestly. Missed questions collect in <a href="#/review">Review</a> for Sunday.</p>
      <ol class="quiz">${w.quiz.map((q, i) => {
        const r = res[i];
        return `<li class="q ${r ? 'answered ' + r : ''}" data-q="${w.id}:${i}">
          <div class="question">${fmt(q.q)}</div>
          <button class="btn small reveal" data-reveal-q>Show answer</button>
          <div class="answer">
            ${q.dar ? phrase({ id: weekItemId(w, 'q', q.dar), dar: q.dar, ar: q.ar }) : ''} <span>${fmt(q.a)}</span>
            <div class="mark">
              <button class="btn small ok" data-mark="ok">✓ I got it</button>
              <button class="btn small miss" data-mark="miss">✗ I missed it</button>
            </div>
          </div>
        </li>`;
      }).join('')}</ol>
      <p class="score">${answered ? `Score: ${score} / ${w.quiz.length}` : ''}</p>
      <button class="btn ghost" data-resetquiz="${w.id}">↺ Reset this quiz</button>`;
  },

  // ---------- Across weeks ----------
  vocab() {
    const filter = Store.get('vocabWeek', 'all');
    return `
      <h1>Vocabulary repository</h1>
      <p>Every word from every week in one place. New weeks add their words here automatically.</p>
      <div class="toolbar">
        <input type="search" id="vsearch" placeholder="Search Darija or English…">
        <select id="vweek"><option value="all">All weeks</option>${DARIJA.weeks.map(w => `<option value="${w.id}" ${filter == w.id ? 'selected' : ''}>Week ${w.id}: ${esc(w.title)}</option>`).join('')}</select>
        <button class="btn ghost" data-anki="all">⬇ Export all for Anki</button>
      </div>
      <div id="vlist">${DARIJA.weeks.filter(w => filter === 'all' || filter == w.id).map(w => `
        <div class="vweek" data-week="${w.id}">
          <h2><a href="#/week/${w.id}">Week ${w.id}: ${esc(w.title)}</a></h2>
          ${w.vocabulary.map(s => `${s.title ? `<h3>${esc(s.title)}</h3>` : ''}${this.vocabTable(w, s)}`).join('')}
        </div>`).join('')}</div>`;
  },

  dialogues() {
    return `<h1>All dialogues</h1>` + DARIJA.weeks.map(w => `<div class="block">${this.wDialogue(w, true)}</div>`).join('');
  },

  review() {
    const missed = DARIJA.weeks.flatMap(w => {
      const res = Store.get(`w${w.id}:quiz`, {});
      return w.quiz.map((q, i) => ({ w, q, i })).filter(x => res[x.i] === 'miss');
    });
    return `<h1>Review: quiz questions you missed</h1>
      <p>Redo these on Sunday. When you get one right, mark it ✓ and it leaves this list.</p>
      ${missed.length ? `<ol class="quiz">${missed.map(({ w, q, i }) => `
        <li class="q" data-q="${w.id}:${i}">
          <div class="wk">Week ${w.id}</div>
          <div class="question">${fmt(q.q)}</div>
          <button class="btn small reveal" data-reveal-q>Show answer</button>
          <div class="answer">${q.dar ? phrase({ id: weekItemId(w, 'q', q.dar), dar: q.dar, ar: q.ar }) : ''} <span>${fmt(q.a)}</span>
            <div class="mark"><button class="btn small ok" data-mark="ok">✓ Got it now</button><button class="btn small miss" data-mark="miss">✗ Still missed</button></div>
          </div></li>`).join('')}</ol>` : '<p class="note">Nothing to review: no missed questions yet.</p>'}`;
  },

  stickies() {
    const s = DARIJA.course.stickies;
    const rooms = [...new Set(s.items.map(x => x.room))];
    return `<h1>Sticky notes for your home</h1>
      <p>${fmt(s.intro)}</p>
      ${rooms.map(r => `<h2>${esc(r)}</h2>
        <div class="stickies">${s.items.filter(x => x.room === r).map(x => {
          const label = (x.gender === 'f' ? 'hadi ' : x.gender === 'm' ? 'hada ' : '') + x.dar;
          return `<div class="sticky ${x.gender}">
            ${phrase({ id: 'sticky:' + slug(x.dar), dar: label, ar: x.ar })}
            <div class="en">${esc(x.en)} <span class="g">${esc(x.gender)}</span></div>
          </div>`;
        }).join('')}</div>`).join('')}
      <p class="note">${fmt(s.howTo)}</p>
      <button class="btn" onclick="window.print()">🖨 Print sticky notes</button>`;
  },

  resources() {
    const r = DARIJA.course.resources;
    return `<h1>Resources and what comes after week 6</h1>
      <p>${fmt(r.intro)}</p>
      <table class="tbl"><thead><tr><th>Resource</th><th>What it's good for</th><th>Cost</th></tr></thead>
      <tbody>${r.items.map(x => `<tr><td><strong>${esc(x.name)}</strong></td><td>${fmt(x.what)}</td><td>${esc(x.cost)}</td></tr>`).join('')}</tbody></table>
      ${r.after.map(p => `<p>${fmt(p)}</p>`).join('')}
      <h3>Sources the plan is based on</h3>
      <ul>${r.sources.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`;
  },

  settings() {
    const voices = Audio2._voices.filter(v => /^ar/i.test(v.lang));
    return `<h1>Voice & settings</h1>
      <h2>Listening</h2>
      <p>Every word and sentence can be played. The app uses, in this order:</p>
      <ol>
        <li><strong>Your own recordings.</strong> Tap 🎙 next to any word or dialogue line and let your boyfriend say it; tap 🎙 again to stop. From then on 🔊 plays his voice. This is the best audio you can get, since computer voices don't speak Darija.</li>
        <li><strong>Audio files</strong> added to the <code>audio/</code> folder of the website and named in the week's content.</li>
        <li><strong>The computer's Arabic voice</strong>, reading the Arabic-script spelling. It is Standard Arabic, so it is close but not exactly Darija.</li>
      </ol>
      <p>${Audio2.hasArabicVoice() ? `Arabic voice found: <strong>${esc(Audio2.arabicVoice().name)}</strong>.` : '<strong>No Arabic computer voice was found on this device.</strong> On a Mac or iPhone add one under Settings → Accessibility → Spoken Content → Voices → Arabic; on Windows under Settings → Time & language → Speech.'}</p>
      ${voices.length > 1 ? `<label>Voice: <select id="voiceSel">${voices.map(v => `<option ${Audio2.arabicVoice() === v ? 'selected' : ''}>${esc(v.name)}</option>`).join('')}</select></label>` : ''}
      <p><label>Speed: <input type="range" id="rate" min="0.5" max="1.2" step="0.05" value="${Audio2.rate}"> <span id="rateVal">${Audio2.rate}</span></label></p>
      <p>${phrase({ id: 'test:salam', dar: 'salam 3alikom', ar: 'السلام عليكم' })} test it</p>
      <p><label class="check"><input type="checkbox" id="showAr" ${Store.get('showAr', false) ? 'checked' : ''}> Show Arabic script next to the chat spelling</label></p>
      <h2>Your recordings</h2>
      <p id="recCount" class="muted">…</p>
      <h2>Progress</h2>
      <p>Progress, notes and recordings are saved in this browser only.</p>
      <button class="btn ghost" id="exportProgress">⬇ Download progress backup</button>
      <label class="btn ghost">⬆ Restore backup <input type="file" id="importProgress" accept=".json" hidden></label>
      <button class="btn ghost danger" id="resetProgress">Reset all progress</button>`;
  },

  // ---------- Progress helpers ----------
  sectionDone(w, k) {
    if (k === 'vocab') return !!Store.get(`w${w.id}:vocab`);
    if (k === 'grammar') return !!Store.get(`w${w.id}:grammar`);
    if (k === 'dialogue') return !!Store.get(`w${w.id}:dialogue`);
    if (k === 'exercises') return w.exercises.every((_, i) => Store.get(`w${w.id}:ex:${i}`));
    if (k === 'mission') return !!Store.get(`w${w.id}:mission`);
    if (k === 'quiz') { const r = Store.get(`w${w.id}:quiz`, {}); return w.quiz.length > 0 && w.quiz.every((_, i) => r[i] === 'ok'); }
    return false;
  },
  weekProgress(w) { return Math.round(100 * this.sections.filter(([k]) => this.sectionDone(w, k)).length / this.sections.length); },
  weekDone(w) { return this.weekProgress(w) === 100; },
};
