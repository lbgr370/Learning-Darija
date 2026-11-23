// TEMPLATE for a new week.
// 1. Copy this file to week-07.js (or the next number).
// 2. Fill in the parts below. Every part is optional except id, title and vocabulary.
// 3. Add 'week-07.js' to content/manifest.js.
//
// Text can use **bold** and *darija* (shown in the Darija colour).
// dar = chat spelling, ar = Arabic-script spelling (only used so the computer voice can read it),
// audio = optional path to a recording, e.g. 'audio/week-07/bslama.mp3'.
DARIJA.addWeek({
  id: 7,
  title: 'Week title',
  canDo: 'what you can do by Sunday.',
  notes: [],                         // optional boxes under the title

  vocabulary: [                      // one or more sections, each with its own table
    {
      title: 'Section title',        // optional
      words: [
        { dar: 'salam', ar: 'سلام', en: 'hello', note: 'optional note' },
      ],
    },
  ],

  grammar: {
    title: 'Grammar point',
    paragraphs: ['Explanation, a short paragraph each.'],
    table: null,                     // optional: { head: ['Person', 'Darija'], rows: [['I', { dar: 'ana', ar: 'أنا' }]] }
    examples: [{ dar: '...', ar: '...', en: '...' }],
    relatedWords: [],                // words from this week's vocabulary the grammar is about
  },

  dialogue: {
    title: 'Dialogue title',
    intro: '',                       // optional
    lines: [
      { speaker: 'Boyfriend', dar: '...', ar: '...', en: '...' },
      { speaker: 'Lea', dar: '...', ar: '...', en: '...' },
    ],
    glossary: [{ dar: '...', en: '...' }],
    culture: '',                     // optional culture note
  },

  exercises: [
    { title: 'Exercise 1', text: '...' },
    { title: 'Exercise 2', text: '...' },
    { title: 'Exercise 3', text: '...' },
  ],

  mission: {
    title: 'Mission with your boyfriend',
    text: '...',
    phrases: [],                     // optional: [{ dar, ar, en }]
    checklist: [],                   // optional: things to tick off
  },

  quiz: [
    // q = question; a = answer text; dar/ar = optional Darija answer you can listen to
    { q: 'Question?', a: 'answer', dar: '', ar: '' },
  ],
});
