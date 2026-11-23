// Global registry the content files write into.
// Each week file calls DARIJA.addWeek({...}); see content/weeks/_template.js.
window.DARIJA = {
  course: null,
  weeks: [],
  setCourse(c) { this.course = c; },
  addWeek(w) {
    this.weeks = this.weeks.filter(x => x.id !== w.id);
    this.weeks.push(w);
    this.weeks.sort((a, b) => a.id - b.id);
  },
  // Loads week files listed in content/manifest.js, in order, as plain <script> tags,
  // so the site also works when index.html is opened straight from disk.
  loadWeeks(files) {
    return files.reduce((p, f) => p.then(() => new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'content/weeks/' + f;
      s.onload = resolve;
      s.onerror = () => { console.error('Could not load week file', f); resolve(); };
      document.body.appendChild(s);
    })), Promise.resolve());
  }
};
