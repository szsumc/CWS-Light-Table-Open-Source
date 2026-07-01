# Feature Overview

`CWS Light Table` is a lightweight browser-based editor for a simplified
single-sheet `CWS HTML` workflow.

## Primary Features

- open existing `CWS HTML` files
- save the current sheet as standalone `CWS HTML`
- import one selected sheet from `.xlsx`, `.xlsm`, or `.xls`
- import `csv`, `tsv`, `txt`, `json`, and `xml` into the current sheet
- quick-action icon toolbar for common commands
- edit cells directly in the grid or formula bar
- use row, column, range, and whole-sheet selection
- copy, paste, fill-repeat, undo, and redo
- set a formal header row
- apply quick filters and advanced filters
- print with lightweight page setup and a dedicated print rendering surface
- export `CSV`, `TSV`, and `TXT` with encoding and line-ending controls
- delete selected rows or columns from the `View` menu
- control the current editable grid size through `Grid Limits`

## Design Boundaries

This project intentionally does not aim to be a full workbook suite.

Excluded areas include:

- multi-sheet authoring in a persistent workbook session
- formula recalculation
- cell styling and formatting design tools
- comments, notes, hyperlinks, drawings, shapes, and images
- charting, pivot tools, and workbook-analysis features
