// "Today" page: what to do on each day of the weekly rhythm, with a tracker.
// The tasks per day come from DARIJA.course.rhythm.days[].tasks (content/course.js).
// Ticks are saved as  plan:w<week>:d<day>:<task>  (day tasks, per week)
// and                 daily:<YYYY-MM-DD>:<habit>  (daily habits, per calendar date).
const DAYNAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DayPlan = {
  iso(d) { const z = n => String(n).padStart(2, '0'); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; },
  parse(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); },
  monday(d = new Date()) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - (x.getDay() + 6) % 7); return x; },
  dayIdx(d = new Date()) { return (d.getDay() + 6) % 7; },
  start() { const s = Store.get('startDate'); return s ? this.monday(this.parse(s)) : null; },
  // course week of a date: 1 = the week that starts on the start Monday (may be <1 or > last week)
  weekOf(d = new Date()) {
    const s = this.start(); if (!s) return null;
    return Math.floor(Math.round((this.monday(d) - s) / 864e5) / 7) + 1;
  },
  dateFor(week, day) { const x = new Date(this.start()); x.setDate(x.getDate() + (week - 1) * 7 + day); return x; },
  isToday(week, day) { return this.iso(this.dateFor(week, day)) === this.iso(new Date()); },
  dayKey(week, day, i) { return `plan:w${week}:d${day}:${i}`; },
  dailyKey(date, i) { return `daily:${this.iso(date)}:${i}`; },
  dayDone(week, day) { const t = DARIJA.course.rhythm.days[day].tasks || []; return t.filter((_, i) => Store.get(this.dayKey(week, day, i))).length; },
  dailyDone(date) { return DARIJA.course.rhythm.daily.filter((_, i) => Store.get(this.dailyKey(date, i))).length; },
  // where "today" is in the course, clamped to the weeks that exist
  current() {
    const n = DARIJA.weeks.length, wk = this.weekOf();
    if (wk < 1) return { week: 1, day: 0, state: 'before' };
    if (wk > n) return { week: n, day: 6, state: 'after' };
    return { week: wk, day: this.dayIdx(), state: 'now' };
  },
  streak() {
    // days in a row (ending today or yesterday) with all daily habits ticked
    const all = DARIJA.course.rhythm.daily.length;
    const d = new Date(); let n = 0;
    if (this.dailyDone(d) < all) d.setDate(d.getDate() - 1);
    while (this.dailyDone(d) === all && n < 400) { n++; d.setDate(d.getDate() - 1); }
    return n;
  },
};

const fmtDate = d => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

Object.assign(Views, {
  todaySetup() {
    return `<h1>📅 Your daily plan</h1>
      <p>Every day of the week has its own tasks (Monday: vocabulary, Tuesday: grammar and dialogue, and so on). Tell the app which Monday your <strong>week 1</strong> starts, and it shows you each day what to do and tracks what you've done.</p>
      <p><label>Week 1 starts on the Monday of: <input type="date" id="startDate" value="${DayPlan.iso(DayPlan.monday())}"></label>
      <button class="btn" id="setStart">Start my plan</button></p>`;
  },

  taskLink(w, t) {
    if (t.tab) return ` <a href="#/week/${w.id}/${t.tab}" class="go">open →</a>`;
    if (t.page) return ` <a href="#/${t.page}" class="go">open →</a>`;
    return '';
  },

  today(wk, dy) {
    if (!DayPlan.start()) return this.todaySetup();
    const cur = DayPlan.current();
    const week = wk ? Math.min(Math.max(+wk, 1), DARIJA.weeks.length) : cur.week;
    const day = dy != null ? Math.min(Math.max(+dy, 0), 6) : cur.day;
    const w = DARIJA.weeks.find(x => x.id == week) || DARIJA.weeks[0];
    const plan = DARIJA.course.rhythm.days[day];
    const date = DayPlan.dateFor(w.id, day);
    const isToday = DayPlan.isToday(w.id, day);
    const streak = DayPlan.streak();
    const banner = !wk && cur.state === 'before' ? `<p class="note">Your plan starts on ${fmtDate(DayPlan.start())}. Here's what week 1, Monday looks like.</p>`
      : !wk && cur.state === 'after' ? `<p class="note">You're past the last week (${DARIJA.weeks.length}). 🎉 Add a new week, or keep reviewing.</p>` : '';
    return `
      <div class="wk">Week ${w.id} · ${esc(w.title)}</div>
      <h1>${isToday ? 'Today: ' : ''}${DAYNAMES[day]} <span class="muted date">${date.toLocaleDateString(undefined, { day: "numeric", month: "long" })}</span></h1>
      ${banner}
      ${(w.notes || []).map(n => `<p class="note">${fmt(n)}</p>`).join('')}
      <div class="daynav">
        ${DAYNAMES.map((n, i) => {
          const tot = (DARIJA.course.rhythm.days[i].tasks || []).length, done = DayPlan.dayDone(w.id, i);
          return `<a href="#/today/${w.id}/${i}" class="${i === day ? 'active' : ''} ${DayPlan.isToday(w.id, i) ? 'is-today' : ''} ${tot && done === tot ? 'done' : ''}">${n.slice(0, 3)}${tot && done === tot ? ' ✓' : ''}</a>`;
        }).join('')}
      </div>

      <section class="panel daycard">
        <h2>${DAYNAMES[day]}'s tasks <span class="muted small">(${esc(plan.time)})</span></h2>
        <ul class="tasks">${(plan.tasks || []).map((t, i) => {
          const k = DayPlan.dayKey(w.id, day, i);
          return `<li class="${Store.get(k) ? 'done' : ''}"><label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> ${fmt(t.text)}</label>${this.taskLink(w, t)}</li>`;
        }).join('')}</ul>

        <h2>Every day <span class="muted small">(about 5 minutes)</span></h2>
        <ul class="tasks">${DARIJA.course.rhythm.daily.map((t, i) => {
          const k = DayPlan.dailyKey(date, i);
          return `<li class="${Store.get(k) ? 'done' : ''}"><label class="check"><input type="checkbox" data-progress="${k}" ${Store.get(k) ? 'checked' : ''}> ${fmt(t)}</label></li>`;
        }).join('')}</ul>
        ${streak ? `<p class="streak">🔥 ${streak}-day streak on your daily habits</p>` : ''}
      </section>

      <h2>Week ${w.id} tracker</h2>
      <div id="tracker" data-week="${w.id}" data-day="${day}">${this.tracker(w.id, day)}</div>

      <div class="pager">
        ${w.id > 1 ? `<a href="#/today/${w.id - 1}/0">← Week ${w.id - 1}</a>` : '<span></span>'}
        ${!isToday && cur.state === 'now' ? `<a href="#/today">Back to today</a>` : ''}
        ${w.id < DARIJA.weeks.length ? `<a href="#/today/${w.id + 1}/0">Week ${w.id + 1} →</a>` : '<span></span>'}
      </div>
      <p class="muted small">Week 1 started on ${fmtDate(DayPlan.start())}.
        <label>Change: <input type="date" id="startDate" value="${DayPlan.iso(DayPlan.start())}"></label>
        <button class="btn ghost small" id="setStart">Save</button></p>`;
  },

  tracker(week, selDay) {
    const habits = DARIJA.course.rhythm.daily.length;
    return `<table class="tbl tracker">
      <thead><tr><th>Day</th><th>Plan</th><th>Day tasks</th><th>Daily habits</th></tr></thead>
      <tbody>${DARIJA.course.rhythm.days.map((p, i) => {
        const date = DayPlan.dateFor(week, i);
        const tot = (p.tasks || []).length, done = DayPlan.dayDone(week, i), hd = DayPlan.dailyDone(date);
        const past = date < new Date(new Date().toDateString());
        return `<tr class="${i === selDay ? 'sel' : ''} ${DayPlan.isToday(week, i) ? 'is-today' : ''} ${past && done < tot ? 'behind' : ''}">
          <td><a href="#/today/${week}/${i}"><strong>${DAYNAMES[i].slice(0, 3)}</strong> <span class="muted">${fmtDate(date).replace(/^\S+\s/, '')}</span></a></td>
          <td class="muted">${fmt(p.what)}</td>
          <td class="nowrap"><div class="bar"><span style="width:${tot ? 100 * done / tot : 0}%"></span></div> ${done}/${tot}${tot && done === tot ? ' ✓' : ''}</td>
          <td class="nowrap">${Array.from({ length: habits }, (_, j) => Store.get(DayPlan.dailyKey(date, j)) ? '●' : '○').join(' ')}</td>
        </tr>`;
      }).join('')}</tbody></table>`;
  },

  todayCard() {
    if (!DayPlan.start()) return `<a class="card todaycard" href="#/today"><div class="wk">Daily plan</div><h3>📅 Set up your daily plan</h3><p>Pick your start date and the app tells you what to do each day.</p></a>`;
    const c = DayPlan.current(), p = DARIJA.course.rhythm.days[c.day];
    const tot = (p.tasks || []).length, done = DayPlan.dayDone(c.week, c.day);
    return `<a class="card todaycard" href="#/today"><div class="wk">Week ${c.week} · ${c.state === 'now' ? 'Today' : c.state === 'before' ? 'Starts soon' : 'Finished'}</div>
      <h3>📅 ${DAYNAMES[c.day]}: ${done}/${tot} tasks done</h3><p>${fmt(p.what)}</p></a>`;
  },
});
