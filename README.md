# AOOD Project Showcase

A small React + TypeScript site that displays student projects as cards, loaded from a Google Sheet.

## Running it

```sh
npm install
npm run dev
```

Other scripts: `npm run build` (type-check + production build), `npm run preview`
(serve the build), `npm run lint`.

## Adding a project

Projects come from a Google Form. Submissions land in a linked Google Sheet,
where each row has an **Approved** checkbox. A "Public" tab uses `FILTER` to
show only approved rows, and that tab is published to the web as CSV. The site
fetches the CSV when the page loads (see `loadProjects` in `src/projects.ts`).

To add or remove a project, check or uncheck **Approved** in the sheet. No
redeploy is needed, but Google caches the published CSV, so changes take about
5 minutes to appear.

Columns are read by position, so the Public tab's columns must be in this order
(a header row is optional and skipped if present):

```
timestamp, title, description, author 1, author 2, author 3, author 4, tags, url
```

Blank author columns are skipped. `tags` is comma-separated, and `url` is
optional (`https://` is added if missing).

## Structure

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Composes header, showcase, footer |
| `src/projects.ts` | Project type and loading from the sheet CSV |
| `src/ProjectSection.tsx` | Loading/error states, count, and the card grid |
| `src/Project.tsx` | A single project card |
| `src/Header.tsx`, `src/Footer.tsx` | Page chrome |
| `src/index.css` | Theme tokens (light/dark) and base typography |
| `src/App.css` | Showcase-specific styles |

Colors come from CSS custom properties in `src/index.css`, which has a
`prefers-color-scheme: dark` block, so both themes work without any JS.
