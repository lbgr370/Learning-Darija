DARIJA.addWeek({
  id: 1,
  title: 'Greetings and introducing yourself',
  canDo: 'greet someone, ask how they are, say who you are and where you\'re from, and handle not understanding.',

  vocabulary: [{
    words: [
      { dar: 'salam / salam 3alikom', ar: 'سلام / السلام عليكم', en: 'hello', note: '*3alikom* is more polite' },
      { dar: 'wa 3alikom salam', ar: 'وعليكم السلام', en: 'hello (reply)', note: 'always the answer to *salam 3alikom*' },
      { dar: 'sba7 lkhir / msa lkhir', ar: 'صباح الخير / مسا الخير', en: 'good morning / good evening' },
      { dar: 'labas?', ar: 'لاباس؟', en: 'how are you?', note: 'literally "no harm?"' },
      { dar: 'labas, l7amdulillah', ar: 'لاباس، الحمد لله', en: 'fine, thank God', note: 'the standard answer, even on bad days' },
      { dar: 'kidayr? / kidayra?', ar: 'كيداير؟ / كيدايرة؟', en: 'how are you doing?', note: 'to a man / to a woman' },
      { dar: 'bikhir', ar: 'بخير', en: 'well, good' },
      { dar: 'chokran (bzaf)', ar: 'شكرا بزاف', en: 'thank you (very much)' },
      { dar: '3afak', ar: 'عافاك', en: 'please' },
      { dar: 'sme7 li', ar: 'سمح لي', en: 'sorry, excuse me' },
      { dar: 'iyeh / la', ar: 'إيه / لا', en: 'yes / no' },
      { dar: 'wakha', ar: 'واخا', en: 'okay', note: 'you\'ll hear it constantly' },
      { dar: 'inchallah', ar: 'إن شاء الله', en: 'God willing', note: 'hopefully; for anything in the future' },
      { dar: 'bslama', ar: 'بالسلامة', en: 'bye' },
      { dar: 'tsb7 3la khir', ar: 'تصبح على خير', en: 'good night' },
      { dar: 'ana smiti Lea', ar: 'أنا سميتي ليا', en: 'my name is Lea' },
      { dar: 'chno smitek?', ar: 'شنو سميتك؟', en: 'what\'s your name?' },
      { dar: 'mnin nta? / mnin nti?', ar: 'منين نتا؟ / منين نتي؟', en: 'where are you from?', note: 'to a man / to a woman' },
      { dar: 'ana mn Almanya', ar: 'أنا من ألمانيا', en: 'I\'m from Germany' },
      { dar: 'kanskon f San Francisco', ar: 'كنسكن ف سان فرانسيسكو', en: 'I live in San Francisco' },
      { dar: 'metcherfin', ar: 'متشرفين', en: 'nice to meet you' },
      { dar: 'kanhdar chwiya d darija', ar: 'كنهدر شوية د الدارجة', en: 'I speak a little Darija' },
      { dar: 'ma fhemtch', ar: 'ما فهمتش', en: 'I didn\'t understand' },
      { dar: '3awed 3afak, bchwiya', ar: 'عاود عافاك، بشوية', en: 'repeat please, slowly', note: 'your survival phrase' },
    ],
  }],

  grammar: {
    title: 'Pronouns, and no "to be"',
    paragraphs: [
      'There\'s no "am / is / are" in the present. You just put the words next to each other.',
    ],
    table: {
      head: ['Person', 'Darija'],
      rows: [
        ['I', { dar: 'ana', ar: 'أنا' }],
        ['you (m)', { dar: 'nta', ar: 'نتا' }],
        ['you (f)', { dar: 'nti', ar: 'نتي' }],
        ['he', { dar: 'howa', ar: 'هو' }],
        ['she', { dar: 'hiya', ar: 'هي' }],
        ['we', { dar: '7na', ar: 'حنا' }],
        ['you (plural)', { dar: 'ntoma', ar: 'نتوما' }],
        ['they', { dar: 'homa', ar: 'هوما' }],
      ],
    },
    examples: [
      { dar: 'ana mn Almanya', ar: 'أنا من ألمانيا', en: 'I (am) from Germany' },
      { dar: 'howa mzyan', ar: 'هو مزيان', en: 'he (is) good' },
    ],
    relatedWords: ['ana smiti Lea', 'mnin nta? / mnin nti?', 'ana mn Almanya'],
  },

  dialogue: {
    title: 'Video call with his cousin Samir',
    lines: [
      { speaker: 'Samir', dar: 'Salam 3alikom!', ar: 'السلام عليكم!', en: 'Hello!' },
      { speaker: 'Lea', dar: 'Wa 3alikom salam! Labas?', ar: 'وعليكم السلام! لاباس؟', en: 'Hello! How are you?' },
      { speaker: 'Samir', dar: 'Labas, l7amdulillah. U nti, kidayra?', ar: 'لاباس، الحمد لله. و نتي، كيدايرة؟', en: 'Fine, thank God. And you, how are you doing?' },
      { speaker: 'Lea', dar: 'Bikhir, l7amdulillah. Ana smiti Lea.', ar: 'بخير، الحمد لله. أنا سميتي ليا.', en: 'Good, thank God. My name is Lea.' },
      { speaker: 'Samir', dar: 'Metcherfin! Mnin nti?', ar: 'متشرفين! منين نتي؟', en: 'Nice to meet you! Where are you from?' },
      { speaker: 'Lea', dar: 'Ana mn Almanya, walakin kanskon f San Francisco.', ar: 'أنا من ألمانيا، ولكن كنسكن ف سان فرانسيسكو.', en: 'I\'m from Germany, but I live in San Francisco.' },
      { speaker: 'Samir', dar: 'Wah! Kathdri darija?', ar: 'واه! كتهضري الدارجة؟', en: 'Wow! You speak Darija?' },
      { speaker: 'Lea', dar: 'Chwiya... 3awed 3afak, bchwiya!', ar: 'شوية... عاود عافاك، بشوية!', en: 'A little... repeat please, slowly!' },
      { speaker: 'Samir', dar: 'Hhh, mzyan bzaf!', ar: 'ههه، مزيان بزاف!', en: 'Haha, very good!' },
      { speaker: 'Lea', dar: 'Chokran! Bslama!', ar: 'شكرا! بالسلامة!', en: 'Thanks! Bye!' },
    ],
    glossary: [
      { dar: 'u', en: 'and' }, { dar: 'walakin', en: 'but' },
      { dar: 'kathdri', en: 'you speak (to a woman)' }, { dar: 'mzyan bzaf', en: 'very good' },
    ],
  },

  exercises: [
    { title: 'Shadowing', text: 'Shadow the dialogue (see Weekly rhythm) until you can play Lea without reading.' },
    { title: 'Gender switch', text: 'Say the dialogue again as if Samir were a woman (*kidayr* → *kidayra*, *mnin nta* → *mnin nti*).' },
    { title: 'Voice memo', text: 'Record a 30-second intro of yourself (name, where you\'re from, where you live, that you speak a little Darija). Send it to your boyfriend for feedback.' },
  ],

  mission: {
    text: 'This week, greet each other **only in Darija**, every morning and every evening. When he says something you don\'t get, answer with *3awed 3afak, bchwiya*.',
    phrases: [
      { dar: 'sba7 lkhir', ar: 'صباح الخير', en: 'good morning' },
      { dar: 'tsb7 3la khir', ar: 'تصبح على خير', en: 'good night' },
      { dar: '3awed 3afak, bchwiya', ar: 'عاود عافاك، بشوية', en: 'repeat please, slowly' },
    ],
  },

  quiz: [
    { q: 'Someone says *salam 3alikom*. What do you answer?', a: '', dar: 'wa 3alikom salam', ar: 'وعليكم السلام' },
    { q: 'You ask your boyfriend\'s mother how she\'s doing. Is it *kidayr* or *kidayra*?', a: '(to a woman)', dar: 'kidayra', ar: 'كيدايرة' },
    { q: 'Say: "I didn\'t understand, repeat please."', a: '', dar: 'ma fhemtch, 3awed 3afak', ar: 'ما فهمتش، عاود عافاك' },
    { q: 'What does *wakha* mean?', a: 'okay' },
    { q: 'Say: "My name is Lea, I\'m from Germany."', a: '', dar: 'ana smiti Lea, ana mn Almanya', ar: 'أنا سميتي ليا، أنا من ألمانيا' },
    { q: 'What\'s the usual answer to *labas*?', a: '', dar: 'labas, l7amdulillah', ar: 'لاباس، الحمد لله' },
  ],
});
