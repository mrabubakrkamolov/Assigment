# Week 11-2 — Portfolio Gallery (React Props)

Homework for **Web Programming · Week 11 (React Components & Props)**.

## What is implemented

| Homework requirement | Where it lives |
| --- | --- |
| `ProjectCard` with `title`, `description`, tech stack, GitHub link and demo link | `src/App.js` → `ProjectCard` |
| `ProjectList` rendering an array of 3+ cards with unique `key` props | `src/App.js` → `ProjectList` |
| `FilterBar` that filters cards by technology | `src/App.js` → `FilterBar` |
| One-way props + callback prop for the active filter | `App` passes props down to all children |
| Conditional rendering and empty state | `ProjectList` and `ProjectCard` (`demo && ...`) |

Four projects are included: Portfolio Gallery, React Shopping Cart, Book Search and Counter-Strike 2 Landing.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The generated `index.html` and `static/` files are committed in this folder so the app works on GitHub Pages from a subdirectory:

`https://mrabubakrkamolov.github.io/Assigment/week11-2/`

## Tests

```bash
npm test -- --watchAll=false
```
