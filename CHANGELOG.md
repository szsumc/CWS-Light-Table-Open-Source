# Changelog

## 0.1.3

- added a top icon toolbar for `Open`, `Save`, `Print`, `Undo`, `Redo`,
  `Copy`, `Paste`, `Find / Replace`, `Advanced Filter`, `Clear Filters`, and
  `Grid Limits`
- added `Help` and `Version` pages and aligned in-app product naming around
  `CWS Light Table`
- added direct keyboard shortcuts for open, save, and print
- kept saved standalone files functionally aligned with the localhost editor
  for the shipped feature set
- disabled `Save CWS HTML` when a saved standalone file is opened directly
  through local `file://`, avoiding misleading save behavior in unsupported
  browser contexts
- replaced print-through-grid behavior with a dedicated browser print surface
  so the printed table no longer depends on the current editing viewport
- applied browser-print guardrails that block oversized print jobs and advise
  exporting to Excel for large-range printing
- prepared the public `0.1.3` release snapshot without benchmark datasets,
  internal comparison tooling, or standalone save test fixtures

## 0.1.2

- completed the `v0.1.2` large-grid optimization and verification cycle
- kept the stable accepted implementation baseline after later experimental
  changes failed to provide a reliable end-to-end performance win
- retained the shipped row-and-column virtualization path and the optimized
  large-write behavior from the accepted optimization work
- added `View` menu row-delete and column-delete actions, including multi-row
  and multi-column deletion based on the current selection span
- fixed blank-cell copy/paste so pasting an empty copied cell now correctly
  clears an existing target cell value
- added repeatable regression coverage for anchor import, large search/filter,
  structural insert actions, export, and save/reopen roundtrip
- added benchmark generation, benchmark-suite execution, and cross-baseline
  comparison tooling for large datasets
- documented the measured release conclusion so future optimization work starts
  from benchmark evidence instead of broad renderer changes

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
