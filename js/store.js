// Progress (localStorage) and voice recordings (IndexedDB), all kept in this browser.
const Store = {
  _key: 'darija-progress-v1',
  _data: null,
  load() {
    try { this._data = JSON.parse(localStorage.getItem(this._key)) || {}; }
    catch { this._data = {}; }
    return this._data;
  },
  get(k, def) { if (!this._data) this.load(); return k in this._data ? this._data[k] : def; },
  set(k, v) { if (!this._data) this.load(); this._data[k] = v; localStorage.setItem(this._key, JSON.stringify(this._data)); },
  exportJSON() { return JSON.stringify(this._data || this.load(), null, 2); },
};

// Recordings: your boyfriend can record any word, example or dialogue line.
// A recording is played instead of the computer voice.
const Recordings = {
  _db: null,
  open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('darija-recordings', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('clips');
      req.onsuccess = () => { this._db = req.result; resolve(this._db); };
      req.onerror = () => reject(req.error);
    });
  },
  async _tx(mode, fn) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const t = db.transaction('clips', mode);
      const r = fn(t.objectStore('clips'));
      t.oncomplete = () => resolve(r && r.result);
      t.onerror = () => reject(t.error);
    });
  },
  get(id) { return this._tx('readonly', s => s.get(id)); },
  put(id, blob) { return this._tx('readwrite', s => s.put(blob, id)); },
  del(id) { return this._tx('readwrite', s => s.delete(id)); },
  keys() { return this._tx('readonly', s => s.getAllKeys()); },
};
