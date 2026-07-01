# CWS Light Table

CWS Light Table is a lightweight browser-based editor for simplified
single-sheet `CWS HTML` documents.

It is designed for practical table editing rather than full workbook
authoring: open a `CWS HTML` file, edit values in a spreadsheet-like grid,
filter and print the current sheet, import common workbook or text-like
formats, export plain text formats, and save the result back as a standalone
HTML file that opens directly in a browser.

Open-source release version: `0.1.3`

Project homepage:

```text
https://szsumc.github.io/CWS-Light-Table-Docs/
```

## Why This Project Exists

Many spreadsheet-style tools are optimized for full workbook management,
formatting fidelity, or heavy formula workflows. CWS Light Table takes a
different approach:

- keep the editor focused on one working sheet at a time
- keep the native save format as `CWS HTML`
- preserve a direct, browser-openable standalone output
- prioritize data entry, import, filtering, export, and structure editing
- avoid the complexity of a full Excel-like authoring surface

The result is a smaller, more focused editing tool for lightweight `CWS HTML`
use cases.

Version `0.1.3` focuses on practical release hardening around daily editing,
quick access, and browser printing. It keeps the accepted large-grid behavior,
adds a dedicated icon toolbar for common actions, and replaces the old
print-through-grid behavior with a dedicated print rendering surface plus
range guardrails for large print jobs.

## Highlights

- Open and save standalone `CWS HTML`
- Import `.xlsx`, `.xlsm`, `.xls`
- Import `csv`, `tsv`, `txt`, `json`, and `xml`
- Quick-action icon toolbar for common commands
- Plain-value grid editing with formula-bar support
- Range, row, column, and whole-sheet selection
- Copy, paste, fill-repeat, undo, and redo
- Find and replace
- Formal header-row control and filtering
- Page setup and dedicated browser print rendering
- Export `CSV`, `TSV`, and `TXT`
- Editable grid-size control through `Grid Limits`
- Standalone saved-file parity for the implemented feature set

## Project Scope

Included in this release:

- single-sheet editing
- plain stored values
- structural insert operations for rows, columns, and cells
- row-delete and column-delete actions from the current selection span
- copied-range outline feedback after copy
- lightweight page setup and dedicated print rendering
- import and export flows for practical table work

Deliberately out of scope:

- multi-sheet authoring in one persistent editing session
- formula recalculation
- formatting-tool authoring
- comments, drawings, shapes, and images
- pivot, chart, and workbook-analysis tooling
- internal development fixtures and automated test assets in the public repo

## Native Format

The native format is `CWS HTML`: an HTML document that embeds workbook data in
`script#websheet-model` together with the lightweight runtime shell.

This repository currently targets a simplified profile:

- one visible working sheet
- plain cell values only
- lightweight header-row and grid-limit metadata
- lightweight page setup metadata
- no style, merge, image, drawing, or formula round-trip

Related documents:

- [docs/cws-html-compatibility.md](docs/cws-html-compatibility.md)
- [docs/cws-html-workbook-model-v1.schema.json](docs/cws-html-workbook-model-v1.schema.json)
- [docs/cws-html-guide-v1.json](docs/cws-html-guide-v1.json)

## Quick Start

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Rebuild the embedded standalone runtime:

```bash
npm run build
```

Start the local development server:

```bash
npm run dev
```

Default local URL:

```text
http://127.0.0.1:4173/
```

## Repository Layout

- `index.html`: application shell
- `src/main.js`: menus, dialogs, runtime behavior, and editing flow
- `src/styles.css`: UI and grid styling
- `src/core/table-model.js`: internal sheet model and structural edits
- `src/core/table-operations.js`: search, filter, print-range, and page-related logic
- `src/core/importers.js`: Excel and text-like import helpers
- `src/core/exporters.js`: `CSV` / `TSV` / `TXT` export helpers
- `src/core/cws.js`: simplified `CWS HTML` parsing and serialization
- `src/core/standalone-template.js`: generated standalone runtime payload
- `scripts/build-standalone-template.mjs`: rebuilds the standalone runtime module
- `scripts/dev-server.mjs`: simple local development server
- `docs/`: public project documentation and format notes

## Documentation

- [docs/README.md](docs/README.md)
- [docs/feature-overview.md](docs/feature-overview.md)
- [docs/local-development.md](docs/local-development.md)
- [docs/cws-html-compatibility.md](docs/cws-html-compatibility.md)
- [docs/github-release-0.1.3.md](docs/github-release-0.1.3.md)

## Open Source

- License: [MIT](LICENSE)
- Third-party notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)
- Change log: [CHANGELOG.md](CHANGELOG.md)
