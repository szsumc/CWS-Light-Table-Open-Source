# Changelog

## 0.1.2

- improved large-sheet handling with row and column viewport rendering
- improved large paste and plain-text import behavior for practical data-table
  workloads
- added `View` menu row-delete and column-delete actions, including multi-row
  and multi-column deletion based on the current selection span
- fixed blank-cell copy/paste so pasting an empty copied cell now correctly
  clears an existing target cell value
- kept the released package focused on product code, public documentation, and
  release-ready assets

## 0.1.1

- first public open-source repository release for `CWS Light Table`
- standardized the public product name and repository-facing project metadata
- published the current lightweight editor feature set:
  - single-sheet `CWS HTML` editing
  - Excel and text-like import
  - `CSV` / `TSV` / `TXT` export
  - filtering, printing, grid limits, and structural insert actions
  - standalone `CWS HTML` save
- removed development-only tests, fixtures, logs, and temporary verification
  files from the public repository snapshot
- replaced remaining phase-style source naming with feature-based naming in
  retained public files
- added the initial public repository documentation, MIT license, third-party
  notices, contribution guide, and security policy
