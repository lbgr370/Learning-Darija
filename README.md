# Darija with Lea

A small website for learning Moroccan Darija, built from *Darija in 6 Weeks – Lea's Learning Plan*. It has no build step and no server code: plain HTML, CSS and JavaScript, so it runs on GitHub Pages or straight from `index.html`.

## What's in it

- **Weeks 1–6**, each with the same six tabs: Vocabulary, Grammar, Dialogue, Exercises, Mission, Quiz.
- **Every word and sentence can be played** (🔊). Tap 🎙 to record your own audio for it (for example your boyfriend); from then on his recording plays.
- **Dialogue:** "Listen first" plays the whole dialogue once with the text blurred, then shows it. Also a shadowing mode (pause after each line) and a mode that plays only the other role so you answer as Lea.
- **Quiz:** answers stay hidden until you tap *Show answer*; you mark yourself ✓ or ✗ and missed questions collect under *Review*.
- **Vocabulary repository:** all weeks' words in one searchable list, with Anki export (TSV).
- **Today page:** each day's tasks from the weekly rhythm plus the daily habits, with tick boxes and a week tracker. Set the start date once; the tasks per day live in `content/course.js` (`rhythm.days[].tasks`).
- Sounds & numbers, weekly rhythm, sticky notes for your home (printable), resources.
- Progress, notes and recordings are saved in your browser (backup/restore under *Voice & settings*).

## Add a new week

1. Copy `content/weeks/_template.js` to `content/weeks/week-07.js` and fill it in.
2. Add `'week-07.js'` to `content/manifest.js`.

That's all: the week appears in the menu, on the home page, in the vocabulary repository, the dialogues page and the review.

## Files

```
index.html              page shell
css/style.css           look
js/registry.js          where content files register themselves
js/store.js             progress (localStorage) and recordings (IndexedDB)
js/audio.js             playback: recording → audio file → Arabic computer voice
js/views.js             every page
js/app.js               routing and buttons
content/course.js       sounds, weekly rhythm, sticky notes, resources
content/manifest.js     list of week files
content/weeks/          one file per week + _template.js
audio/                  optional recorded audio files
```

## About the audio

Browsers have no Darija voice. The computer voice reads the Arabic-script spelling (`ar`) with an Arabic voice, which is Standard Arabic and only an approximation. The best audio is your boyfriend's: record him with 🎙, or put files in `audio/`. The Arabic-script spellings were added for the voice and are not part of the original plan; check any that sound off with him.

## Put it online with GitHub Pages

In the repository: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root → Save**. The site appears at `https://<your-user>.github.io/<repo>/` after a minute.

Run locally: open `index.html`, or `python3 -m http.server` in this folder and visit http://localhost:8000.
