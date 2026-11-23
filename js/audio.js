// Playing words and sentences.
// Order of preference for every clip:
//   1. a recording made in this browser (🎙 button), e.g. by your boyfriend
//   2. an audio file named in the content ("audio": "audio/week-01/salam.mp3")
//   3. the computer's Arabic voice reading the Arabic-script spelling ("ar")
//   4. the computer voice reading the chat spelling (last resort, sounds off)
const Audio2 = {
  rate: parseFloat(Store.get('ttsRate', 0.8)),
  _voices: [],
  _current: null,

  init() {
    if (!('speechSynthesis' in window)) return;
    const pick = () => { this._voices = speechSynthesis.getVoices(); };
    pick();
    speechSynthesis.onvoiceschanged = pick;
  },

  arabicVoice() {
    const v = this._voices;
    const pref = Store.get('voiceName');
    return v.find(x => x.name === pref)
      || v.find(x => /^ar[-_]MA/i.test(x.lang))
      || v.find(x => /^ar/i.test(x.lang));
  },

  hasArabicVoice() { return !!this.arabicVoice(); },

  stop() {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (this._current) { this._current.pause(); this._current = null; }
  },

  _playUrl(url) {
    return new Promise(resolve => {
      const a = new Audio(url);
      this._current = a;
      a.onended = a.onerror = () => resolve();
      a.play().catch(() => resolve());
    });
  },

  _tts(text, lang, opts = {}) {
    return new Promise(resolve => {
      if (!('speechSynthesis' in window)) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      const v = lang === 'ar' ? this.arabicVoice() : null;
      if (v) { u.voice = v; u.lang = v.lang; } else if (lang === 'ar') { u.lang = 'ar'; }
      u.rate = opts.rate || this.rate;
      u.pitch = opts.pitch || 1;
      u.onend = u.onerror = () => resolve();
      speechSynthesis.speak(u);
    });
  },

  // item: { id, dar, ar?, audio? }
  async play(item, opts = {}) {
    this.stop();
    const rec = item.id ? await Recordings.get(item.id).catch(() => null) : null;
    if (rec) return this._playUrl(URL.createObjectURL(rec));
    if (item.audio) return this._playUrl(item.audio);
    if (item.ar && this.hasArabicVoice()) return this._tts(item.ar, 'ar', opts);
    return this._tts(item.dar, 'ar', opts);
  },

  // Plays a list of items one after another; onLine(i) is called before each.
  async playSequence(items, onLine, pitchFor) {
    this._seqToken = Symbol();
    const token = this._seqToken;
    for (let i = 0; i < items.length; i++) {
      if (token !== this._seqToken) return false;
      onLine && onLine(i);
      await this.play(items[i], { pitch: pitchFor ? pitchFor(items[i]) : 1 });
      await new Promise(r => setTimeout(r, 450));
    }
    onLine && onLine(-1);
    return token === this._seqToken;
  },
  cancelSequence() { this._seqToken = null; this.stop(); },
};

// Recording with the microphone.
const Recorder = {
  _rec: null,
  _id: null,
  async toggle(id, onState) {
    if (this._rec) {
      const sameId = this._id === id;
      this._rec.stop();
      if (sameId) return;
    }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { alert('The microphone is not available. Allow it in the browser to record.'); return; }
    const chunks = [];
    const rec = new MediaRecorder(stream);
    this._rec = rec; this._id = id;
    rec.ondataavailable = e => chunks.push(e.data);
    rec.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      this._rec = null; this._id = null;
      await Recordings.put(id, new Blob(chunks, { type: rec.mimeType }));
      onState && onState(false, true);
    };
    rec.start();
    onState && onState(true);
  },
};

Audio2.init();
