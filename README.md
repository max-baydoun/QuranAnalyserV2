# Quran Analyzer V2

An interactive Quran study workspace built with React, TypeScript, and Vite. This app provides verse navigation, syntax analysis, morphological parsing, rhetoric annotation, and rich commentary tools for Quranic verses.

## 🚀 Features

- **Verse navigation** with direct selection and random verse jump
- **Quran verse display** in a responsive side panel
- **Nahw analysis** with drag-and-drop dependency graph and traditional iʿrāb view
- **Sarf analysis** with an editable morphology table and filters for nouns, verbs, and particles
- **Balāgha annotation** for rhetorical devices, including simile, metaphor, wordplay, and more
- **Comments editor** with rich text formatting using TipTap
- **Export analysis** as JSON using the `Save analysis` button
- **Theme-aware UI** using Mantine color system and layout components

## 🧩 App Sections

- `Nahw` — syntax/grammar analysis with a directed acyclic graph and traditional iʿrāb presentation
- `Sarf` — morphological parsing with editable rows and per-part-of-speech views
- `Balagha` — rhetorical device tagging and note-taking
- `Comments` — rich text commentary editor for verse-level notes
- `Settings` — UI and presentation controls

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Mantine UI
- Zustand state management
- XYFlow for graph rendering
- TipTap rich text editor
- Mantine React Table for editable data grids

## 📁 Project Structure

- `src/App.tsx` — main application shell and navigation layout
- `src/components/` — reusable UI and analysis components
- `src/pages/` — page views for Nahw, Sarf, Balagha, and Comments
- `src/constants/` — theme values and table column definitions
- `src/hooks/` — custom hooks for drag-and-drop and persistence
- `src/stores/` — Zustand stores for navigation and analysis state
- `src/utils/` — Quran data helpers, verse utilities, graph helpers
- `quranSegmentationData/` — segmented Quran source data and processed JSON

## ⚙️ Setup

```bash
npm install
npm run dev
```

Open the local development server URL shown in the terminal.

## 📦 Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 💡 Notes

- The app is currently configured as a private development project.
- Analysis export saves combined `nahw`, `sarf`, `balagha`, and `comments` state into a downloadable JSON file.
- The UI is designed to support both desktop and responsive mobile layouts.

---

**Quran Analyzer V2** is intended for interactive verse study and analysis rather than full production deployment. Enjoy exploring Quranic grammar, morphology, rhetoric, and notes in one workspace.
