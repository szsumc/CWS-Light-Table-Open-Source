# GitHub Release Draft: 0.1.2

## Title

`CWS Light Table 0.1.2`

## Short Release Summary

This release expands `CWS Light Table` for more practical large-sheet and
table-structure editing work.

## Release Notes

`CWS Light Table 0.1.2` focuses on practical plain-value table editing in the
browser, especially when the sheet is larger and structural edits are more
frequent.

What this release adds:

- improved row-and-column viewport rendering for larger sheets
- improved large paste and plain-text import behavior
- added `View` menu row-delete and column-delete actions
- added multi-row and multi-column deletion based on the current selection
- fixed blank-cell paste so an empty copied cell can clear an existing value
- kept standalone `CWS HTML` save and reopen behavior aligned with the local
  editor runtime

## Scope Notes

`0.1.2` does not expand the functional product scope beyond the existing
single-sheet editor model.

Out of scope in `0.1.2`:

- multi-sheet authoring in one editing session
- formula recalculation
- formatting and styling authoring
- comments, drawings, shapes, and images
- workbook-analysis tooling outside the lightweight table-editor scope

## Homepage

```text
https://szsumc.github.io/CWS-Light-Table-Docs/
```

## Suggested GitHub Release Tag

```text
v0.1.2
```
