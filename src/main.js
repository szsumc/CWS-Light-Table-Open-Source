import {
  listWorkbookSheets,
  parseCwsHtmlWorkbook,
  serializeLightTableToCwsHtml,
  workbookToLightTable,
} from "./core/cws.js";
import {
  applyMatrixToTable,
  fillSelectionByRepeat,
  parseDelimitedText,
  selectionFromMatrix,
  selectionToDelimitedText,
} from "./core/clipboard.js";
import {
  applyKeyboardEditIntent,
  createCellSelection,
  createColumnSelection,
  createRangeSelection,
  createRowSelection,
  getKeyboardEditIntent,
  getSelectionBounds,
  isCellSelected,
  isColumnHeaderSelected,
  isRowHeaderSelected,
  moveActiveCell,
  normalizeCell,
} from "./core/editor-state.js";
import {
  canRedo,
  canUndo,
  createHistoryState,
  pushHistorySnapshot,
  redoHistory,
  undoHistory,
} from "./core/history.js";
import {
  applyPageSetup,
  buildDefaultAdvancedFilterLogic,
  findNextMatch,
  getVisibleRowSet,
  parseCellRange,
  replaceAllMatches,
  resolvePrintAreaBounds,
  sortTableRows,
  validateAdvancedFilterDefinition,
  isCellWithinBounds,
} from "./core/table-operations.js";
import {
  columnKeyForIndex,
  createEmptyLightTable,
  getCellValue,
  getColumnCount,
  getGridLimits,
  getHeaderRowIndex,
  getLastUsedColumnIndex,
  getLastUsedRowIndex,
  getSheetRowCount,
  deleteColumns,
  deleteRows,
  insertCells,
  insertColumns,
  insertRows,
  setGridLimits,
  setCellValue,
  setHeaderRow,
} from "./core/table-model.js";
import {
  buildSheetGridView,
  columnLabelFromIndex,
  gridCellName,
  isViewportPaddingRow,
} from "./core/grid.js";
import {
  buildGridMetrics,
  estimateVisibleColumnCount,
  estimateVisibleRowCount,
} from "./core/grid-metrics.js";
import {
  calculateVisibleRange,
  visibleRangeSignature,
} from "./core/visible-range.js";
import {
  createViewportState,
  updateViewportState,
} from "./core/viewport-state.js";
import {
  excelWorkbookToMatrix,
  getImportAnchorCell,
  getSupportedTextImportEncodings,
  inferDefaultDelimiterMode,
  inferDefaultTextImportEncoding,
  inferImportFileKind,
  isExcelImportKind,
  isTextImportKind,
  listExcelWorkbookSheets,
  parseTextImportContent,
} from "./core/importers.js";
import {
  buildTextExportMatrix,
  createDefaultTextExportSettings,
  encodeTextExportBytes,
  formatTextExportSummary,
  getSupportedTextExportEncodings,
  getSupportedTextExportRowLineEndings,
  getSupportedTextExportTargets,
  normalizeTextExportEncoding,
  normalizeTextExportRowLineEnding,
  normalizeTextExportSettings,
  normalizeTextExportTarget,
  resolveTextExportDelimiter,
  serializeTextExportMatrix,
  shouldEnableBomToggle,
} from "./core/exporters.js";

const state = {
  workbook: null,
  table: createEmptyLightTable(),
  sourceFileName: "",
  activeCell: { row: 1, col: 1 },
  selection: createCellSelection({ row: 1, col: 1 }),
  copiedSelection: null,
  openMenuKey: null,
  openSubmenuKey: "",
  editing: null,
  history: createHistoryState(),
  fillDrag: null,
  selectionDrag: null,
  suppressNextGridClick: false,
  globalSearch: "",
  columnFilters: {},
  advancedFilter: {
    enabled: false,
    conditions: [],
    logic: "",
  },
  findReplace: {
    findText: "",
    replaceText: "",
    caseSensitive: false,
    wholeCell: false,
    currentMatch: null,
  },
  advancedFilterDraft: null,
  sortDraft: null,
  pageSetupDraft: null,
  gridLimitsDraft: null,
  openPanel: null,
  headerMenu: null,
  panelError: "",
  importDraft: null,
  exportDraft: null,
  exportSettings: createDefaultTextExportSettings("csv"),
  importFileMode: "",
  pendingFocusId: "",
  pendingScrollCell: null,
  viewportState: createViewportState(),
  logicalGridMetrics: buildGridMetrics(createEmptyLightTable()),
  gridMetrics: buildGridMetrics(createEmptyLightTable()),
  rowVirtualizationEnabled: false,
  columnVirtualizationEnabled: false,
  visibleRowLayout: createEmptyVisibleRowLayout(),
  rowViewport: createEmptyRowViewport(),
  columnViewport: createEmptyColumnViewport(),
  visibleRowsCache: null,
  visibleRange: calculateVisibleRange(buildGridMetrics(createEmptyLightTable()), createViewportState()),
  visibleRangeSignature: "",
};

const MIN_VIRTUALIZED_ROW_COUNT = 200;
const MIN_VIRTUALIZED_COLUMN_COUNT = 60;

const MENU_DEFINITIONS = {
  file: [
    { label: "Open CWS HTML", action: "open", hint: "Ctrl+O" },
    { label: "Save CWS HTML", action: "save", hint: "Ctrl+S" },
    { label: "Import", submenuKey: "import" },
    { label: "Export", submenuKey: "export" },
    { label: "Print", action: "print", hint: "Ctrl+P" },
  ],
  import: [
    { label: "Excel", action: "import-excel" },
    { label: "Text / Structured Data", action: "import-text" },
  ],
  export: [
    { label: "CSV", action: "export-csv" },
    { label: "TSV", action: "export-tsv" },
    { label: "TXT", action: "export-txt" },
  ],
  search: [
    { label: "Find / Replace", action: "find-replace", hint: "Ctrl+F / Ctrl+H" },
  ],
  data: [
    { label: "Set Header Row", action: "set-header-row" },
    { label: "Advanced Filter", action: "advanced-filter" },
    { label: "Clear Filters", action: "clear-filters" },
  ],
  view: [
    { label: "Insert Row Above", action: "insert-row-above" },
    { label: "Insert Row Below", action: "insert-row-below" },
    { label: "Insert Column Left", action: "insert-column-left" },
    { label: "Insert Column Right", action: "insert-column-right" },
    { label: "Insert Cells", submenuKey: "insert-cells" },
    { label: "Delete Rows", action: "delete-rows" },
    { label: "Delete Columns", action: "delete-columns" },
  ],
  "insert-cells": [
    { label: "Shift Right", action: "insert-cells-right" },
    { label: "Shift Down", action: "insert-cells-down" },
  ],
  option: [
    { label: "Page Setup", action: "page-setup" },
    { label: "Grid Limits", action: "grid-limits" },
  ],
  help: [
    { label: "Help", action: "help-page" },
    { label: "Version", action: "version-page" },
  ],
};

const refs = {
  menuButtons: Array.from(document.querySelectorAll("[data-menu-key]")),
  appMenu: document.getElementById("appMenu"),
  openFileInput: document.getElementById("openFileInput"),
  importFileInput: document.getElementById("importFileInput"),
  statusMessage: document.getElementById("statusMessage"),
  documentSummary: document.getElementById("documentSummary"),
  sheetPickerPanel: document.getElementById("sheetPickerPanel"),
  sheetSelect: document.getElementById("sheetSelect"),
  loadSheetButton: document.getElementById("loadSheetButton"),
  activeCellName: document.getElementById("activeCellName"),
  formulaBarInput: document.getElementById("formulaBarInput"),
  globalSearchInput: document.getElementById("globalSearchInput"),
  clearGlobalSearchButton: document.getElementById("clearGlobalSearchButton"),
  sheetGrid: document.getElementById("sheetGrid"),
  gridWrap: document.querySelector(".grid-wrap"),
  floatingLayer: document.getElementById("floatingLayer"),
  printHeader: document.getElementById("printHeader"),
  printFooter: document.getElementById("printFooter"),
};

let currentView = buildSheetGridView(state.table);
const debugGridEvents = new URLSearchParams(window.location.search).has("debug-grid");
let xlsxLoadPromise = null;
let codepageLoadPromise = null;

refs.menuButtons.forEach((button) => {
  button.addEventListener("click", handleMenuButtonClick);
});
refs.appMenu.addEventListener("click", handleMenuActionClick);
refs.openFileInput.addEventListener("change", handleOpenFileChange);
refs.importFileInput.addEventListener("change", handleImportFileChange);
refs.loadSheetButton.addEventListener("click", () => {
  if (!state.workbook) return;
  loadSelectedSheet(Number(refs.sheetSelect.value || 0));
});
refs.sheetGrid.addEventListener("mousedown", handleGridMouseDown);
refs.sheetGrid.addEventListener("mousemove", handleGridPointerMove);
refs.sheetGrid.addEventListener("mouseover", handleGridMouseOver);
refs.sheetGrid.addEventListener("click", handleGridClick);
refs.sheetGrid.addEventListener("dblclick", handleGridDoubleClick);
refs.sheetGrid.addEventListener("input", handleGridInput);
refs.sheetGrid.addEventListener("keydown", handleGridEditorKeydown);
refs.gridWrap?.addEventListener("scroll", handleGridViewportScroll, { passive: true });
refs.formulaBarInput.addEventListener("focus", handleFormulaBarFocus);
refs.formulaBarInput.addEventListener("input", handleFormulaBarInput);
refs.formulaBarInput.addEventListener("keydown", handleFormulaBarKeydown);
refs.globalSearchInput.addEventListener("input", handleGlobalSearchInput);
refs.globalSearchInput.addEventListener("keydown", handleGlobalSearchKeydown);
refs.clearGlobalSearchButton.addEventListener("click", handleGlobalSearchClear);
refs.floatingLayer.addEventListener("click", handleFloatingLayerClick);
refs.floatingLayer.addEventListener("input", handleFloatingLayerInput);
refs.floatingLayer.addEventListener("change", handleFloatingLayerInput);
refs.floatingLayer.addEventListener("keydown", handleFloatingLayerKeydown);
document.addEventListener("click", handleDocumentClick);
document.addEventListener("mousemove", handleDocumentMouseMove);
document.addEventListener("mouseup", handleDocumentMouseUp);
document.addEventListener("copy", handleDocumentCopy);
document.addEventListener("paste", handleDocumentPaste);
document.addEventListener("keydown", handleDocumentKeydown);
window.addEventListener("keydown", handleGlobalUndoRedoKeydown, { capture: true });
window.addEventListener("resize", handleGridViewportResize);

renderWorkspace();

function handleMenuButtonClick(event) {
  event.stopPropagation();
  const button = event.currentTarget;
  const menuKey = button.dataset.menuKey || "";
  const nextMenuKey = state.openMenuKey === menuKey ? null : menuKey;
  setMenuOpen(nextMenuKey);
}

async function handleMenuActionClick(event) {
  event.stopPropagation();
  const item = event.target.closest("[data-menu-action], [data-menu-submenu]");
  if (!item || item.getAttribute("aria-disabled") === "true") return;
  const submenuKey = item.dataset.menuSubmenu || "";
  if (submenuKey) {
    state.openSubmenuKey = state.openSubmenuKey === submenuKey ? "" : submenuKey;
    renderMenu(state.openMenuKey);
    return;
  }
  const action = item.dataset.menuAction || "";
  if (action === "open") {
    refs.openFileInput.click();
  } else if (action === "save") {
    setMenuOpen(null);
    await handleSave();
    return;
  } else if (action === "import-excel") {
    openImportFilePicker("excel");
  } else if (action === "import-text") {
    openImportFilePicker("text");
  } else if (action === "export-csv") {
    openTextExportPanel("csv");
  } else if (action === "export-tsv") {
    openTextExportPanel("tsv");
  } else if (action === "export-txt") {
    openTextExportPanel("txt");
  } else if (action === "page-setup") {
    openPageSetupPanel();
  } else if (action === "grid-limits") {
    openGridLimitsPanel();
  } else if (action === "help-page") {
    openHelpPanel();
  } else if (action === "version-page") {
    openVersionPanel();
  } else if (action === "print") {
    handlePrint();
  } else if (action === "undo") {
    handleUndo();
  } else if (action === "redo") {
    handleRedo();
  } else if (action === "copy") {
    await handleCopyCommand();
  } else if (action === "paste") {
    await handlePasteCommand();
  } else if (action === "find-replace") {
    openFindReplacePanel("find");
  } else if (action === "advanced-filter") {
    openAdvancedFilterPanel();
  } else if (action === "clear-filters") {
    handleClearFilters();
  } else if (action === "set-header-row") {
    handleSetHeaderRow();
  } else if (action === "insert-row-above") {
    handleInsertRows("above");
  } else if (action === "insert-row-below") {
    handleInsertRows("below");
  } else if (action === "insert-column-left") {
    handleInsertColumns("left");
  } else if (action === "insert-column-right") {
    handleInsertColumns("right");
  } else if (action === "insert-cells-right") {
    handleInsertCells("right");
  } else if (action === "insert-cells-down") {
    handleInsertCells("down");
  } else if (action === "delete-rows") {
    handleDeleteRows();
  } else if (action === "delete-columns") {
    handleDeleteColumns();
  } else if (action === "sort") {
    openSortPanel();
  }
  setMenuOpen(null);
}

async function handleOpenFileChange(event) {
  const [file] = event.currentTarget.files || [];
  event.currentTarget.value = "";
  if (!file) return;
  setMenuOpen(null);
  setStatus(`Reading ${file.name}...`);
  try {
    const source = await file.text();
    const workbook = parseCwsHtmlWorkbook(source, { fileName: file.name });
    state.workbook = workbook;
    state.sourceFileName = file.name;
    const sheets = listWorkbookSheets(workbook);
    if (sheets.length > 1) {
      refs.sheetSelect.innerHTML = sheets
        .map((sheet) => `<option value="${sheet.index}">${escapeHtml(sheet.name)} (${sheet.rowCount}x${sheet.colCount})</option>`)
        .join("");
      refs.sheetPickerPanel.classList.remove("hidden");
      state.table = createEmptyLightTable();
      resetGridInteractionState();
      renderWorkspace();
      setStatus(`Loaded ${file.name}. Select one sheet to continue.`);
      return;
    }
    refs.sheetPickerPanel.classList.add("hidden");
    loadSelectedSheet(sheets[0]?.index ?? 0);
  } catch (error) {
    state.workbook = null;
    refs.sheetPickerPanel.classList.add("hidden");
    setStatus(error.message || "Failed to load the selected file.");
  }
}

async function handleImportFileChange(event) {
  const [file] = event.currentTarget.files || [];
  event.currentTarget.value = "";
  const importMode = state.importFileMode;
  state.importFileMode = "";
  if (!file || !importMode) return;
  setMenuOpen(null);
  try {
    if (importMode === "excel") {
      await beginExcelImport(file);
      return;
    }
    if (importMode === "text") {
      await beginTextImport(file);
    }
  } catch (error) {
    state.importDraft = null;
    state.openPanel = null;
    state.panelError = "";
    setStatus(error.message || `Failed to import ${file.name}.`);
    renderWorkspace();
  }
}

function loadSelectedSheet(sheetIndex) {
  try {
    const table = workbookToLightTable(state.workbook, sheetIndex);
    state.table = table;
    resetGridInteractionState();
    refs.sheetPickerPanel.classList.add("hidden");
    renderWorkspace();
    setStatus(`Loaded ${table.sheetName} from ${state.sourceFileName}. The sheet is now shown in the grid.`);
  } catch (error) {
    setStatus(error.message || "Failed to load the selected sheet.");
  }
}

function renderWorkspace() {
  rebuildGridRenderState({ honorPendingScroll: true });
  state.activeCell = clampActiveCell(state.activeCell, currentView);
  normalizeSelectionState();
  ensureActiveCellIsVisible();
  renderDocumentSummary();
  renderFormulaBar();
  renderGlobalSearch();
  renderPrintChrome();
  renderGrid();
  renderFloatingLayer();
  if (state.openMenuKey) {
    renderMenu(state.openMenuKey);
  }
  syncEditingFocus();
  updateGridViewportDebugData();
}

function renderDocumentSummary() {
  const sourceLabel = state.sourceFileName || "Unsaved blank sheet";
  const sheetName = state.table?.sheetName || "Sheet1";
  const columnCount = state.table?.columns?.length || 0;
  const rowCount = state.table?.rows?.length || 0;
  const visibleDataRows = countVisibleDataRows();
  const viewportSummary = debugGridEvents
    ? ` | viewport rows ${state.visibleRange.startRow}-${state.visibleRange.endRow} | viewport cols ${state.visibleRange.startColumn}-${state.visibleRange.endColumn}`
    : "";
  refs.documentSummary.textContent = `${sourceLabel} | ${sheetName} | header row ${getHeaderRowIndex(state.table)} | ${visibleDataRows}/${rowCount} visible data rows | ${columnCount} columns${viewportSummary}`;
}

function renderFormulaBar() {
  refs.activeCellName.textContent = gridCellName(state.activeCell.row, state.activeCell.col);
  const formulaValue = state.editing ? state.editing.draft : getCellValue(state.table, state.activeCell.row, state.activeCell.col);
  if (refs.formulaBarInput.value !== formulaValue) {
    refs.formulaBarInput.value = formulaValue;
  }
  resizeTextarea(refs.formulaBarInput, 100);
}

function renderGlobalSearch() {
  if (refs.globalSearchInput.value !== state.globalSearch) {
    refs.globalSearchInput.value = state.globalSearch;
  }
}

function renderPrintChrome() {
  const pageSetup = state.table.pageSetup || {};
  refs.printHeader.textContent = pageSetup.headerFooter?.header || "";
  refs.printFooter.textContent = pageSetup.headerFooter?.footer || "";
  const backgroundColor = pageSetup.background?.mode === "solid-color" && pageSetup.background?.color
    ? pageSetup.background.color
    : "#fff";
  refs.gridWrap.style.background = backgroundColor;
}

function renderGrid() {
  const printBounds = resolvePrintAreaBounds(state.table, state.selection, state.table.pageSetup || {});
  const copiedBounds = getCopiedSelectionBounds();
  const headerRowIndex = currentView.headerRowIndex;
  const tableRowCount = getSheetRowCount(state.table);
  const renderedColumnSpan = getRenderedGridColumnSpan();
  const topSpacerRow = renderVirtualSpacerRow(state.rowViewport.topSpacerHeight, renderedColumnSpan);
  const bottomSpacerRow = renderVirtualSpacerRow(state.rowViewport.bottomSpacerHeight, renderedColumnSpan);
  const leftHeaderSpacer = renderVirtualColumnSpacerCell(state.columnViewport.leftSpacerWidth, "th");
  const rightHeaderSpacer = renderVirtualColumnSpacerCell(state.columnViewport.rightSpacerWidth, "th");
  const headCells = currentView.columns
    .map((column) => {
      const isSelected = isColumnHeaderSelected(state.selection, column.index);
      return `<th scope="col" class="column-header${isSelected ? " is-selected" : ""}" data-col-header="true" data-col="${column.index}">${column.letter}</th>`;
    })
    .join("");
  const bodyRows = currentView.rows
    .map((row) => renderGridRow(row, printBounds, copiedBounds, headerRowIndex, tableRowCount))
    .join("");
  refs.sheetGrid.innerHTML = `
    <thead>
      <tr>
        <th class="corner-cell" aria-hidden="true"></th>
        ${leftHeaderSpacer}
        ${headCells}
        ${rightHeaderSpacer}
      </tr>
    </thead>
    <tbody>${topSpacerRow}${bodyRows}${bottomSpacerRow}</tbody>
  `;
}

function renderVirtualSpacerRow(height, columnCount) {
  const safeHeight = Math.max(0, Math.round(Number(height) || 0));
  if (!safeHeight) return "";
  return `<tr class="grid-spacer-row" data-print-hidden="true" aria-hidden="true"><td class="grid-spacer-cell" colspan="${Math.max(1, columnCount)}" style="height:${safeHeight}px"></td></tr>`;
}

function renderVirtualColumnSpacerCell(width, tagName = "td") {
  const safeWidth = Math.max(0, Math.round(Number(width) || 0));
  if (!safeWidth) return "";
  const safeTag = tagName === "th" ? "th" : "td";
  return `<${safeTag} class="grid-spacer-column" data-print-hidden="true" aria-hidden="true" style="width:${safeWidth}px;min-width:${safeWidth}px"></${safeTag}>`;
}

function renderGridRow(row, printBounds, copiedBounds, headerRowIndex, tableRowCount) {
  const isViewportPadding = isViewportPaddingRow(state.table, row.index) || row.index > tableRowCount;
  const isFormalHeader = row.index === headerRowIndex;
  const rowSelected = isRowHeaderSelected(state.selection, row.index);
  const printVisible = !isViewportPadding && rowWithinPrintArea(row.index, printBounds);
  const rowClasses = [
    isFormalHeader ? "print-table-header" : "",
  ].filter(Boolean).join(" ");
  const rowHeaderClass = [
    "row-header",
    rowSelected ? "is-selected" : "",
    isFormalHeader ? "is-formal-header" : "",
  ].filter(Boolean).join(" ");
  const leftColumnSpacer = renderVirtualColumnSpacerCell(state.columnViewport.leftSpacerWidth);
  const rightColumnSpacer = renderVirtualColumnSpacerCell(state.columnViewport.rightSpacerWidth);
  const cells = row.cells
    .map((cell) => renderGridCell(cell, isFormalHeader, printBounds, copiedBounds))
    .join("");
  return `<tr class="${rowClasses}"${!printVisible ? ' data-print-hidden="true"' : ""}><th scope="row" class="${rowHeaderClass}" data-row-header="true" data-row="${row.index}"${!printVisible ? ' data-print-hidden="true"' : ""}>${row.index}</th>${leftColumnSpacer}${cells}${rightColumnSpacer}</tr>`;
}

function renderGridCell(cell, isFormalHeader, printBounds, copiedBounds) {
  const isActive = cell.row === state.activeCell.row && cell.col === state.activeCell.col;
  const isSelected = isCellSelected(state.selection, cell.row, cell.col);
  const isEditingCell = Boolean(state.editing && state.editing.mode === "cell" && isActive);
  const isFillPreview = isFillPreviewCell(cell.row, cell.col);
  const copiedRangeClasses = getCopiedRangeCellClasses(copiedBounds, cell.row, cell.col);
  const copiedRangeOutline = copiedRangeClasses.length
    ? `<span class="copied-range-outline ${copiedRangeClasses.join(" ")}" aria-hidden="true"></span>`
    : "";
  const hasFillHandle = shouldRenderFillHandle(cell.row, cell.col);
  const isFindHit = Boolean(state.findReplace.currentMatch && sameCell(state.findReplace.currentMatch, cell));
  const printHidden = !isCellWithinBounds(cell.row, cell.col, printBounds);
  const className = [
    "grid-cell",
    isSelected ? "is-selected" : "",
    isFillPreview ? "is-fill-preview" : "",
    isActive ? "is-active" : "",
    isFindHit ? "is-find-hit" : "",
    isFormalHeader ? "is-formal-header" : "",
    ...copiedRangeClasses,
  ].filter(Boolean).join(" ");
  if (isEditingCell) {
    return `<td class="${className}" data-cell="true" data-row="${cell.row}" data-col="${cell.col}" aria-selected="${isSelected ? "true" : "false"}"${printHidden ? ' data-print-hidden="true"' : ""}>${copiedRangeOutline}<textarea id="activeCellEditor" class="cell-editor" rows="1" spellcheck="false">${escapeHtml(state.editing.draft)}</textarea></td>`;
  }
  const headerTools = isFormalHeader
    ? `<span class="header-tools"><button class="header-tools-button${state.columnFilters[columnKeyForIndex(cell.col)] ? " is-filtered" : ""}" type="button" data-header-menu-button="true" aria-label="Open header tools">▼</button></span>`
    : "";
  return `<td class="${className}" data-cell="true" data-row="${cell.row}" data-col="${cell.col}" aria-selected="${isSelected ? "true" : "false"}"${printHidden ? ' data-print-hidden="true"' : ""}>${copiedRangeOutline}${escapeHtml(cell.value)}${headerTools}${hasFillHandle ? '<button class="fill-handle" type="button" data-fill-handle="true" aria-label="Fill handle"></button>' : ""}</td>`;
}

function renderFloatingLayer() {
  const panels = [];
  if (state.openPanel === "find-replace") {
    panels.push(renderFindReplacePanel());
  }
  if (state.openPanel === "text-import") {
    panels.push(renderTextImportPanel());
  }
  if (state.openPanel === "text-export") {
    panels.push(renderTextExportPanel());
  }
  if (state.openPanel === "excel-import") {
    panels.push(renderExcelImportPanel());
  }
  if (state.openPanel === "advanced-filter") {
    panels.push(renderAdvancedFilterPanel());
  }
  if (state.openPanel === "sort") {
    panels.push(renderSortPanel());
  }
  if (state.openPanel === "page-setup") {
    panels.push(renderPageSetupPanel());
  }
  if (state.openPanel === "grid-limits") {
    panels.push(renderGridLimitsPanel());
  }
  if (state.openPanel === "help-page") {
    panels.push(renderHelpPanel());
  }
  if (state.openPanel === "version-page") {
    panels.push(renderVersionPanel());
  }
  if (state.headerMenu) {
    panels.push(renderHeaderMenu());
  }
  refs.floatingLayer.innerHTML = panels.join("");
}

function renderHelpPanel() {
  return `
    <section class="floating-panel floating-panel-wide" data-panel-type="help-page" role="dialog" aria-label="Help panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">CWS Light Table Help</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <p class="floating-panel-meta">CWS Light Table is a lightweight single-sheet table editor for CWS HTML.</p>
      <section class="help-panel-section" aria-label="Key features">
        <h3 class="help-panel-heading">Key Features</h3>
        <ul class="help-panel-list">
          <li>Open and save CWS HTML files.</li>
          <li>Import Excel and text or structured data into the grid.</li>
          <li>Edit cells with the formula bar, copy and paste, fill handle, and undo or redo.</li>
          <li>Use find and replace, header rows, filters, print setup, and export tools.</li>
          <li>Adjust grid size and insert rows, columns, or cells.</li>
        </ul>
      </section>
      <section class="help-panel-section" aria-label="Keyboard shortcuts">
        <h3 class="help-panel-heading">Keyboard Shortcuts</h3>
        <ul class="help-panel-list">
          <li>Ctrl+O: Open CWS HTML</li>
          <li>Ctrl+S: Save CWS HTML</li>
          <li>Ctrl+P: Print</li>
          <li>Ctrl+F / Ctrl+H: Find / Replace</li>
          <li>Ctrl+Z / Ctrl+Y: Undo / Redo</li>
          <li>Ctrl+A: Select all cells</li>
        </ul>
      </section>
      <section class="help-panel-section" aria-label="Notes">
        <h3 class="help-panel-heading">Notes</h3>
        <ul class="help-panel-list">
          <li>This editor works with one sheet at a time.</li>
          <li>Saved output stays in CWS HTML format.</li>
          <li>Imported data is flattened to plain visible values.</li>
          <li>Clipboard access can be limited in embedded or restricted browsers.</li>
        </ul>
      </section>
    </section>
  `;
}

function renderVersionPanel() {
  return `
    <section class="floating-panel" data-panel-type="version-page" role="dialog" aria-label="Version panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">CWS Light Table Version</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="help-panel-facts" aria-label="Version information">
        <div class="help-panel-fact-row">
          <span class="help-panel-fact-label">Product</span>
          <strong>CWS Light Table</strong>
        </div>
        <div class="help-panel-fact-row">
          <span class="help-panel-fact-label">Version</span>
          <strong>0.1.2</strong>
        </div>
        <div class="help-panel-fact-row">
          <span class="help-panel-fact-label">Author</span>
          <strong>Mac Su</strong>
        </div>
      </div>
      <p class="floating-panel-meta">Lightweight CWS HTML single-sheet table editor with import, export, filtering, print, and structural editing tools.</p>
    </section>
  `;
}

function renderTextImportPanel() {
  const draft = state.importDraft;
  if (!draft || draft.kind !== "text") return "";
  const anchor = getImportAnchorCell(state.selection);
  const previewHtml = renderImportPreviewTable(draft.matrix || []);
  const delimiterOptions = draft.fileKind === "csv" || draft.fileKind === "tsv" || draft.fileKind === "txt"
    ? `
      <label>
        <span>Delimiter</span>
        <select id="textImportDelimiterSelect">
          <option value="comma"${draft.delimiterMode === "comma" ? " selected" : ""}>Comma</option>
          <option value="tab"${draft.delimiterMode === "tab" ? " selected" : ""}>Tab</option>
          <option value="line"${draft.delimiterMode === "line" ? " selected" : ""}>Line-Based</option>
        </select>
      </label>
    `
    : "";
  return `
    <section class="floating-panel floating-panel-wide" data-panel-type="text-import" role="dialog" aria-label="Text import panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Import Text / Structured Data</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="page-setup-grid">
        <label class="grow">
          <span>File</span>
          <input type="text" value="${escapeAttr(draft.fileName)}" readonly />
        </label>
        <label>
          <span>Type</span>
          <input type="text" value="${escapeAttr(draft.fileKind.toUpperCase())}" readonly />
        </label>
      </div>
      <div class="page-setup-grid">
        <label>
          <span>Encoding</span>
          <select id="textImportEncodingSelect">
            ${getSupportedTextImportEncodings().map((encoding) => `<option value="${escapeAttr(encoding)}"${draft.encoding === encoding ? " selected" : ""}>${escapeHtml(encoding)}</option>`).join("")}
          </select>
        </label>
        ${delimiterOptions}
      </div>
      <p class="floating-panel-meta">Import anchor: ${escapeHtml(gridCellName(anchor.row, anchor.col))}. Imported content always starts at the top-left cell of the current selection.</p>
      ${draft.needsReread ? '<p class="floating-panel-meta">Press Re-read to refresh the preview from the original raw bytes using the selected encoding.</p>' : ""}
      ${draft.error ? `<p class="floating-panel-error">${escapeHtml(draft.error)}</p>` : ""}
      <div class="import-preview">
        <div class="import-preview-header">
          <span>Preview</span>
          <span class="menu-item-hint">${escapeHtml(formatMatrixShape(draft.matrix || []))}</span>
        </div>
        ${previewHtml}
      </div>
      <div class="floating-panel-actions">
        <button class="button" type="button" data-panel-action="text-import-reread">Re-read</button>
        <button class="button button-primary" type="button" data-panel-action="text-import-apply"${draft.error ? ' aria-disabled="true"' : ""}>Import</button>
      </div>
    </section>
  `;
}

function renderTextExportPanel() {
  const draft = state.exportDraft;
  if (!draft) return "";
  const summary = formatTextExportSummary(draft);
  const bomEnabled = shouldEnableBomToggle(draft.encoding);
  const targetOptions = getSupportedTextExportTargets()
    .map((target) => `<option value="${escapeAttr(target)}"${draft.target === target ? " selected" : ""}>${escapeHtml(target.toUpperCase())}</option>`)
    .join("");
  const encodingOptions = getSupportedTextExportEncodings()
    .map((encoding) => `<option value="${escapeAttr(encoding)}"${draft.encoding === encoding ? " selected" : ""}>${escapeHtml(encoding)}</option>`)
    .join("");
  const rowLineEndingOptions = getSupportedTextExportRowLineEndings()
    .map((rowLineEnding) => `<option value="${escapeAttr(rowLineEnding)}"${draft.rowLineEnding === rowLineEnding ? " selected" : ""}>${escapeHtml(rowLineEnding)}</option>`)
    .join("");
  const previewMatrix = buildTextExportMatrix(state.table, {
    includeHiddenData: draft.includeHiddenData,
    visibleRowSet: getVisibleRowInfo().visibleRowSet,
  }).slice(0, 6);
  const previewText = serializeTextExportMatrix(previewMatrix, draft);
  return `
    <section class="floating-panel floating-panel-wide" data-panel-type="text-export" role="dialog" aria-label="Text export panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Export Text Data</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="page-setup-grid">
        <label>
          <span>Target</span>
          <select id="textExportTargetSelect">${targetOptions}</select>
        </label>
        <label>
          <span>Encoding</span>
          <select id="textExportEncodingSelect">${encodingOptions}</select>
        </label>
        <label>
          <span>Row line ending</span>
          <select id="textExportRowLineEndingSelect">${rowLineEndingOptions}</select>
        </label>
      </div>
      <div class="floating-panel-checks">
        <label><input id="textExportNormalizeLfInput" type="checkbox"${draft.normalizeCellLineBreaksToLf ? " checked" : ""} /> Cell line breaks only LF</label>
        <label><input id="textExportBomInput" type="checkbox"${draft.withBom && bomEnabled ? " checked" : ""}${bomEnabled ? "" : " disabled"} /> with BOM</label>
        <label><input id="textExportIncludeHiddenInput" type="checkbox"${draft.includeHiddenData ? " checked" : ""} /> Include hidden data</label>
        ${draft.target === "csv" ? `<label><input id="textExportQuoteAllInput" type="checkbox"${draft.quoteAllCells ? " checked" : ""} /> Quote all cells</label>` : ""}
      </div>
      <p class="floating-panel-meta">Export scope: the whole current sheet. Hidden-row handling is controlled by <strong>Include hidden data</strong>.</p>
      <p class="floating-panel-meta">Summary: ${escapeHtml(summary)}</p>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="import-preview">
        <div class="import-preview-header">
          <span>Preview</span>
          <span class="menu-item-hint">${escapeHtml(`${draft.target.toUpperCase()} / first 6 rows`)}</span>
        </div>
        <div class="import-preview-table-wrap"><pre class="text-export-preview">${escapeHtml(previewText)}</pre></div>
      </div>
      <div class="floating-panel-actions">
        <button class="button button-primary" type="button" data-panel-action="text-export-apply">Export</button>
      </div>
    </section>
  `;
}

function renderExcelImportPanel() {
  const draft = state.importDraft;
  if (!draft || draft.kind !== "excel") return "";
  const anchor = getImportAnchorCell(state.selection);
  const selected = draft.sheetOptions.find((entry) => entry.index === draft.selectedSheetIndex) || draft.sheetOptions[0];
  return `
    <section class="floating-panel" data-panel-type="excel-import" role="dialog" aria-label="Excel import panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Import Excel Sheet</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <label>
        <span>Workbook</span>
        <input type="text" value="${escapeAttr(draft.fileName)}" readonly />
      </label>
      <label>
        <span>Sheet</span>
        <select id="excelImportSheetSelect">
          ${draft.sheetOptions.map((sheet) => `<option value="${sheet.index}"${sheet.index === draft.selectedSheetIndex ? " selected" : ""}>${escapeHtml(sheet.name)} (${sheet.rowCount}x${sheet.colCount})</option>`).join("")}
        </select>
      </label>
      <p class="floating-panel-meta">Import anchor: ${escapeHtml(gridCellName(anchor.row, anchor.col))}. Selected sheet data will be written into the current document from that cell.</p>
      ${selected ? `<p class="floating-panel-meta">Selected sheet size: ${selected.rowCount} rows x ${selected.colCount} columns.</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button button-primary" type="button" data-panel-action="excel-import-apply">Import Sheet</button>
      </div>
    </section>
  `;
}

function renderFindReplacePanel() {
  const scopeLabel = formatScopeLabel();
  return `
    <section class="floating-panel" data-panel-type="find-replace" role="dialog" aria-label="Find and replace panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Find / Replace</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <label>
        <span>Find what</span>
        <input id="findTextInput" type="text" value="${escapeAttr(state.findReplace.findText)}" autocomplete="off" spellcheck="false" />
      </label>
      <label>
        <span>Replace with</span>
        <input id="replaceTextInput" type="text" value="${escapeAttr(state.findReplace.replaceText)}" autocomplete="off" spellcheck="false" />
      </label>
      <div class="floating-panel-checks">
        <label><input id="findCaseSensitiveInput" type="checkbox"${state.findReplace.caseSensitive ? " checked" : ""} /> Case Sensitive</label>
        <label><input id="findWholeCellInput" type="checkbox"${state.findReplace.wholeCell ? " checked" : ""} /> Whole Cell</label>
      </div>
      <p class="floating-panel-meta">Scope: ${escapeHtml(scopeLabel)}</p>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button" type="button" data-panel-action="find-next">Find Next</button>
        <button class="button" type="button" data-panel-action="replace-one">Replace</button>
        <button class="button button-primary" type="button" data-panel-action="replace-all">Replace All</button>
      </div>
    </section>
  `;
}

function renderAdvancedFilterPanel() {
  const draft = state.advancedFilterDraft || createAdvancedFilterDraft();
  const columnOptions = renderColumnOptions();
  return `
    <section class="floating-panel" data-panel-type="advanced-filter" role="dialog" aria-label="Advanced filter panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Advanced Filter</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="advanced-filter-list">
        ${draft.conditions.map((condition, index) => `
          <div class="advanced-filter-condition">
            <div class="advanced-filter-number">${index + 1}</div>
            <label class="grow">
              <span>Column</span>
              <select data-condition-index="${index}" data-condition-field="columnKey">
                ${columnOptions.replace(`value="${escapeAttr(condition.columnKey)}"`, `value="${escapeAttr(condition.columnKey)}" selected`)}
              </select>
            </label>
            <label class="grow">
              <span>Operator</span>
              <select data-condition-index="${index}" data-condition-field="operator">
                ${renderOperatorOptions(condition.operator)}
              </select>
            </label>
            <label class="grow">
              <span>Value</span>
              <input type="text" value="${escapeAttr(condition.value)}" data-condition-index="${index}" data-condition-field="value" spellcheck="false" />
            </label>
            <button class="link-button advanced-filter-remove" type="button" data-panel-action="advanced-remove-condition" data-condition-index="${index}"${draft.conditions.length <= 1 ? " aria-disabled=\"true\"" : ""}>Remove</button>
          </div>
        `).join("")}
      </div>
      <div class="inline-row">
        <button class="link-button" type="button" data-panel-action="advanced-add-condition"${draft.conditions.length >= 20 ? " aria-disabled=\"true\"" : ""}>Add Condition</button>
        <button class="link-button" type="button" data-panel-action="advanced-reset-logic">Reset to default logic</button>
      </div>
      <label>
        <span>Logic expression</span>
        <input id="advancedFilterLogicInput" type="text" value="${escapeAttr(draft.logic)}" spellcheck="false" />
      </label>
      <p class="floating-panel-example">Example: <code>1 AND (2 OR 3)</code></p>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button" type="button" data-panel-action="advanced-clear">Clear Advanced Filter</button>
        <button class="button button-primary" type="button" data-panel-action="advanced-apply">Apply</button>
      </div>
    </section>
  `;
}

function renderSortPanel() {
  const draft = state.sortDraft || createSortDraft();
  const columnOptions = `<option value="">None</option>${renderColumnOptions()}`;
  return `
    <section class="floating-panel" data-panel-type="sort" role="dialog" aria-label="Sort panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Sort</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="page-setup-grid">
        <label class="grow">
          <span>Primary column</span>
          <select id="sortPrimaryColumn">${columnOptions.replace(`value="${escapeAttr(draft.primaryColumn)}"`, `value="${escapeAttr(draft.primaryColumn)}" selected`)}</select>
        </label>
        <label>
          <span>Direction</span>
          <select id="sortPrimaryDirection">
            <option value="asc"${draft.primaryDirection === "asc" ? " selected" : ""}>A → Z</option>
            <option value="desc"${draft.primaryDirection === "desc" ? " selected" : ""}>Z → A</option>
          </select>
        </label>
        <label class="grow">
          <span>Secondary column</span>
          <select id="sortSecondaryColumn">${columnOptions.replace(`value="${escapeAttr(draft.secondaryColumn)}"`, `value="${escapeAttr(draft.secondaryColumn)}" selected`)}</select>
        </label>
        <label>
          <span>Direction</span>
          <select id="sortSecondaryDirection">
            <option value="asc"${draft.secondaryDirection === "asc" ? " selected" : ""}>A → Z</option>
            <option value="desc"${draft.secondaryDirection === "desc" ? " selected" : ""}>Z → A</option>
          </select>
        </label>
      </div>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button button-primary" type="button" data-panel-action="sort-apply">Apply Sort</button>
      </div>
    </section>
  `;
}

function renderPageSetupPanel() {
  const draft = state.pageSetupDraft || createPageSetupDraft(state.table.pageSetup);
  return `
    <section class="floating-panel" data-panel-type="page-setup" role="dialog" aria-label="Page setup panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Page Setup</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="page-setup-grid page-setup-basics">
        <label>
          <span>Paper Size</span>
          <select id="pageSetupPaperSize">
            ${renderFixedOptions(["A4", "A3", "Letter"], draft.paperSize)}
          </select>
        </label>
        <label>
          <span>Orientation</span>
          <select id="pageSetupOrientation">
            ${renderFixedOptions(["portrait", "landscape"], draft.orientation)}
          </select>
        </label>
      </div>
      <div class="page-setup-grid page-setup-margins">
        <label>
          <span>Top</span>
          <input id="pageSetupMarginTop" type="number" min="0" step="1" value="${escapeAttr(draft.margins.top)}" />
        </label>
        <label>
          <span>Right</span>
          <input id="pageSetupMarginRight" type="number" min="0" step="1" value="${escapeAttr(draft.margins.right)}" />
        </label>
        <label>
          <span>Bottom</span>
          <input id="pageSetupMarginBottom" type="number" min="0" step="1" value="${escapeAttr(draft.margins.bottom)}" />
        </label>
        <label>
          <span>Left</span>
          <input id="pageSetupMarginLeft" type="number" min="0" step="1" value="${escapeAttr(draft.margins.left)}" />
        </label>
      </div>
      <label>
        <span>Header</span>
        <input id="pageSetupHeader" type="text" value="${escapeAttr(draft.headerFooter.header)}" spellcheck="false" />
      </label>
      <label>
        <span>Footer</span>
        <input id="pageSetupFooter" type="text" value="${escapeAttr(draft.headerFooter.footer)}" spellcheck="false" />
      </label>
      <div class="page-setup-grid">
        <label class="grow">
          <span>Print Area</span>
          <select id="pageSetupPrintAreaMode">
            ${renderFixedOptions(["entire-sheet", "selection", "custom"], draft.printArea.mode)}
          </select>
        </label>
        <label class="grow">
          <span>Custom Range</span>
          <input id="pageSetupPrintAreaRange" type="text" value="${escapeAttr(draft.printArea.range)}" placeholder="A1:D20" spellcheck="false" />
        </label>
      </div>
      <div class="page-setup-grid">
        <label class="grow">
          <span>Background</span>
          <select id="pageSetupBackgroundMode">
            ${renderFixedOptions(["none", "solid-color"], draft.background?.mode || "none")}
          </select>
        </label>
        <label class="grow">
          <span>Color</span>
          <input id="pageSetupBackgroundColor" type="color" value="${escapeAttr(draft.background?.color || "#ffffff")}" />
        </label>
      </div>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button" type="button" data-panel-action="page-setup-apply">Apply</button>
        <button class="button button-primary" type="button" data-panel-action="page-setup-print">Apply And Print</button>
      </div>
    </section>
  `;
}

function renderGridLimitsPanel() {
  const draft = state.gridLimitsDraft || createGridLimitsDraft();
  return `
    <section class="floating-panel" data-panel-type="grid-limits" role="dialog" aria-label="Grid limits panel">
      <div class="floating-panel-header">
        <h2 class="floating-panel-title">Grid Limits</h2>
        <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
      </div>
      <div class="page-setup-grid">
        <label>
          <span>Maximum Rows</span>
          <input id="gridLimitsRowsInput" type="number" min="1" step="1" value="${escapeAttr(draft.maxRows)}" />
        </label>
        <label>
          <span>Maximum Columns</span>
          <input id="gridLimitsColumnsInput" type="number" min="1" step="1" value="${escapeAttr(draft.maxColumns)}" />
        </label>
      </div>
      <p id="gridLimitsColumnFeedback" class="floating-panel-meta">Column label: ${escapeHtml(formatGridLimitColumnFeedback(draft.maxColumns))}</p>
      <p class="floating-panel-meta">These values define the current editable grid size for this sheet.</p>
      ${state.panelError ? `<p class="floating-panel-error">${escapeHtml(state.panelError)}</p>` : ""}
      <div class="floating-panel-actions">
        <button class="button button-primary" type="button" data-panel-action="grid-limits-apply">Apply</button>
      </div>
    </section>
  `;
}

function renderImportPreviewTable(matrix) {
  if (!matrix.length) {
    return `<p class="floating-panel-meta">No preview rows are available yet.</p>`;
  }
  const previewRows = matrix.slice(0, 8);
  const previewColumnCount = Math.max(1, Math.min(6, previewRows.reduce((max, row) => Math.max(max, row.length), 0)));
  const body = previewRows
    .map((row) => `<tr>${Array.from({ length: previewColumnCount }, (_, index) => `<td>${escapeHtml(String(row[index] ?? ""))}</td>`).join("")}</tr>`)
    .join("");
  return `
    <div class="import-preview-table-wrap">
      <table class="import-preview-table">
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function renderHeaderMenu() {
  const headerMenu = state.headerMenu;
  const columnLabel = state.table.columns?.[headerMenu.columnIndex - 1]?.label || columnLabelFromIndex(headerMenu.columnIndex);
  return `
    <section class="header-menu" style="left:${headerMenu.left}px;top:${headerMenu.top}px;" role="dialog" aria-label="Header menu">
      <strong>${escapeHtml(columnLabel)}</strong>
      <div class="header-menu-actions">
        <button class="button" type="button" data-panel-action="header-sort-asc">Sort A → Z</button>
        <button class="button" type="button" data-panel-action="header-sort-desc">Sort Z → A</button>
      </div>
      <label>
        <span>Filter operator</span>
        <select id="headerMenuOperator">
          ${renderOperatorOptions(headerMenu.operator)}
        </select>
      </label>
      <label>
        <span>Filter value</span>
        <input id="headerMenuValue" type="text" value="${escapeAttr(headerMenu.value)}" spellcheck="false" />
      </label>
      <p class="header-menu-note">Applies only to rows below the formal header row.</p>
      ${headerMenu.error ? `<p class="floating-panel-error">${escapeHtml(headerMenu.error)}</p>` : ""}
      <div class="header-menu-actions">
        <button class="button" type="button" data-panel-action="header-filter-clear">Clear Filter</button>
        <button class="button button-primary" type="button" data-panel-action="header-filter-apply">Apply Filter</button>
      </div>
    </section>
  `;
}

function handleGridClick(event) {
  debugGridLog("grid-click:start", { suppressNextGridClick: state.suppressNextGridClick, target: describeEventTarget(event.target) });
  if (state.suppressNextGridClick) {
    state.suppressNextGridClick = false;
    debugGridLog("grid-click:suppressed", { target: describeEventTarget(event.target) });
    return;
  }
  if (event.target.closest("[data-fill-handle='true']")) return;
  if (event.target.closest("[data-header-menu-button='true']")) {
    const cellElement = event.target.closest("[data-cell='true']");
    const cell = cellFromDataset(cellElement);
    selectSingleCell(cell);
    openHeaderMenu(cell.col, event.target.closest("[data-header-menu-button='true']"));
    return;
  }
  if (event.target.closest("#activeCellEditor")) return;
  const cellElement = event.target.closest("[data-cell='true']");
  const rowHeaderElement = event.target.closest("[data-row-header='true']");
  const columnHeaderElement = event.target.closest("[data-col-header='true']");

  if (cellElement) {
    commitEditing("stay");
    const cell = cellFromDataset(cellElement);
    debugGridLog("grid-click:cell", { cell, shiftKey: event.shiftKey, activeCell: state.activeCell });
    if (event.shiftKey) {
      const anchorCell = state.selection.anchor || state.activeCell;
      state.activeCell = cell;
      state.selection = createRangeSelection(anchorCell, cell);
      state.findReplace.currentMatch = null;
      renderWorkspace();
      return;
    }
    if (sameCell(cell, state.activeCell) && state.selection.mode === "cell" && !state.editing) {
      debugGridLog("grid-click:begin-edit", { cell });
      beginCellEdit();
      return;
    }
    selectSingleCell(cell);
    return;
  }

  if (rowHeaderElement) {
    commitEditing("stay");
    const row = Number(rowHeaderElement.dataset.row || 1);
    const previousActiveCell = { ...state.activeCell };
    debugGridLog("grid-click:row-header", { row, activeCell: state.activeCell, shiftKey: event.shiftKey });
    state.activeCell = clampActiveCell({ row, col: state.activeCell.col }, currentView);
    if (event.shiftKey) {
      const anchorRow = state.selection.mode === "row"
        ? state.selection.anchor?.row || previousActiveCell.row
        : previousActiveCell.row;
      state.selection = createRowSelection(anchorRow, currentView.columnCount, row);
    } else {
      state.selection = createRowSelection(row, currentView.columnCount);
    }
    state.findReplace.currentMatch = null;
    renderWorkspace();
    return;
  }

  if (columnHeaderElement) {
    commitEditing("stay");
    const col = Number(columnHeaderElement.dataset.col || 1);
    const previousActiveCell = { ...state.activeCell };
    debugGridLog("grid-click:col-header", { col, activeCell: state.activeCell, shiftKey: event.shiftKey });
    state.activeCell = clampActiveCell({ row: state.activeCell.row, col }, currentView);
    if (event.shiftKey) {
      const anchorColumn = state.selection.mode === "column"
        ? state.selection.anchor?.col || previousActiveCell.col
        : previousActiveCell.col;
      state.selection = createColumnSelection(anchorColumn, currentView.rowCount, col);
    } else {
      state.selection = createColumnSelection(col, currentView.rowCount);
    }
    state.findReplace.currentMatch = null;
    renderWorkspace();
  }
}

function handleGridMouseDown(event) {
  debugGridLog("grid-mousedown:start", { button: event.button, shiftKey: event.shiftKey, target: describeEventTarget(event.target) });
  if (event.button !== 0) return;
  if (event.target.closest("[data-header-menu-button='true']")) return;
  if (event.target.closest("[data-fill-handle='true']")) {
    event.preventDefault();
    event.stopPropagation();
    const sourceBounds = getSelectionBounds(state.selection);
    state.fillDrag = {
      sourceSelection: cloneJsonValue(state.selection),
      previewCell: { row: sourceBounds.endRow, col: sourceBounds.endCol },
    };
    state.selectionDrag = null;
    renderGrid();
    return;
  }
  if (event.target.closest("#activeCellEditor")) return;
  const cellElement = event.target.closest("[data-cell='true']");
  if (!cellElement) return;
  commitEditing("stay");
  const clickedCell = cellFromDataset(cellElement);
  const selectionAnchor = event.shiftKey
    ? (state.selection.anchor || state.activeCell)
    : clickedCell;
  if (!event.shiftKey && !sameCell(clickedCell, state.activeCell)) {
    state.activeCell = clickedCell;
    state.selection = createCellSelection(clickedCell);
    state.findReplace.currentMatch = null;
    renderSelectionState();
  }
  state.selectionDrag = {
    anchor: selectionAnchor,
    focus: clickedCell,
    moved: false,
    extendSelection: event.shiftKey,
    startedOnActiveCell: !event.shiftKey && sameCell(clickedCell, state.activeCell) && state.selection.mode === "cell" && !state.editing,
  };
  debugGridLog("grid-mousedown:selection-drag", { clickedCell, selectionAnchor, activeCell: state.activeCell, selection: state.selection });
}

function handleGridMouseOver(event) {
  handleGridPointerMove(event);
}

function handleGridPointerMove(event) {
  if (state.fillDrag) {
    const cell = resolvePointerCell(event);
    if (!cell) return;
    if (sameCell(cell, state.fillDrag.previewCell)) return;
    state.fillDrag.previewCell = cell;
    renderGrid();
    return;
  }
  if (!state.selectionDrag) return;
  const cell = resolvePointerCell(event);
  if (!cell) return;
  if (sameCell(cell, state.selectionDrag.focus)) return;
  state.selectionDrag.focus = cell;
  state.selectionDrag.moved = state.selectionDrag.moved || !sameCell(cell, state.selectionDrag.anchor);
  state.activeCell = cell;
  state.selection = createRangeSelection(state.selectionDrag.anchor, cell);
  state.findReplace.currentMatch = null;
  renderSelectionState();
}

function handleGridDoubleClick(event) {
  if (event.target.closest("[data-header-menu-button='true']")) return;
  const cellElement = event.target.closest("[data-cell='true']");
  if (!cellElement) return;
  commitEditing("stay");
  const cell = cellFromDataset(cellElement);
  selectSingleCell(cell);
  beginCellEdit();
}

function handleGridInput(event) {
  const editor = event.target.closest("#activeCellEditor");
  if (!editor || !state.editing || state.editing.mode !== "cell") return;
  state.editing.draft = editor.value;
  if (refs.formulaBarInput.value !== editor.value) {
    refs.formulaBarInput.value = editor.value;
  }
  resizeTextarea(editor, 180);
  resizeTextarea(refs.formulaBarInput, 100);
}

function handleGridEditorKeydown(event) {
  const editor = event.target.closest("#activeCellEditor");
  if (!editor || !state.editing || state.editing.mode !== "cell") return;
  if (event.key === "Escape") {
    event.preventDefault();
    cancelEditing();
    return;
  }
  if (event.key === "Enter" && event.altKey) {
    event.preventDefault();
    insertLineBreakAtCursor(editor, "cell");
    return;
  }
  if (event.key === "Enter" && !event.altKey) {
    event.preventDefault();
    commitEditing(event.shiftKey ? "shift+enter" : "enter");
    return;
  }
  if (event.key === "Tab") {
    event.preventDefault();
    commitEditing(event.shiftKey ? "shift+tab" : "tab");
  }
}

function handleFormulaBarFocus() {
  if (!state.editing) {
    state.editing = {
      mode: "formula",
      draft: getCellValue(state.table, state.activeCell.row, state.activeCell.col),
    };
    return;
  }
  if (state.editing.mode !== "formula") {
    state.editing.mode = "formula";
    renderWorkspace();
  }
}

function handleFormulaBarInput(event) {
  if (!state.editing || state.editing.mode !== "formula") {
    state.editing = {
      mode: "formula",
      draft: event.currentTarget.value,
    };
  } else {
    state.editing.draft = event.currentTarget.value;
  }
  resizeTextarea(refs.formulaBarInput, 100);
}

function handleFormulaBarKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    cancelEditing();
    return;
  }
  if (event.key === "Enter" && event.altKey) {
    event.preventDefault();
    insertLineBreakAtCursor(event.currentTarget, "formula");
    return;
  }
  if (event.key === "Enter" && !event.altKey) {
    event.preventDefault();
    commitEditing(event.shiftKey ? "shift+enter" : "enter");
    return;
  }
  if (event.key === "Tab") {
    event.preventDefault();
    commitEditing(event.shiftKey ? "shift+tab" : "tab");
  }
}

function handleGlobalSearchInput(event) {
  state.globalSearch = event.currentTarget.value;
  state.findReplace.currentMatch = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus(state.globalSearch ? `Global search filtered by "${state.globalSearch}".` : "Global search cleared."));
}

function handleGlobalSearchKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    handleGlobalSearchClear();
  }
}

function handleGlobalSearchClear() {
  if (!state.globalSearch) return;
  state.globalSearch = "";
  state.findReplace.currentMatch = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus("Global search cleared."));
}

function handleFloatingLayerClick(event) {
  const actionTarget = event.target.closest("[data-panel-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.panelAction || "";
  if (actionTarget.getAttribute("aria-disabled") === "true") return;
  if (action === "close-panel") {
    closeOpenPanel();
    return;
  }
  if (action === "text-import-reread") {
    handleTextImportReread();
    return;
  }
  if (action === "text-import-apply") {
    handleApplyTextImport();
    return;
  }
  if (action === "text-export-apply") {
    handleApplyTextExport();
    return;
  }
  if (action === "excel-import-apply") {
    handleApplyExcelImport();
    return;
  }
  if (action === "find-next") {
    runFindNext();
    return;
  }
  if (action === "replace-one") {
    runReplaceOne();
    return;
  }
  if (action === "replace-all") {
    runReplaceAll();
    return;
  }
  if (action === "advanced-add-condition") {
    handleAddAdvancedCondition();
    return;
  }
  if (action === "advanced-remove-condition") {
    handleRemoveAdvancedCondition(Number(actionTarget.dataset.conditionIndex || 0));
    return;
  }
  if (action === "advanced-reset-logic") {
    handleResetAdvancedLogic();
    return;
  }
  if (action === "advanced-apply") {
    handleApplyAdvancedFilter();
    return;
  }
  if (action === "advanced-clear") {
    state.advancedFilter = { enabled: false, conditions: [], logic: "" };
    state.panelError = "";
    closeOpenPanel();
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Advanced filter cleared."));
    return;
  }
  if (action === "sort-apply") {
    handleApplySort();
    return;
  }
  if (action === "page-setup-apply") {
    handleApplyPageSetup(false);
    return;
  }
  if (action === "page-setup-print") {
    handleApplyPageSetup(true);
    return;
  }
  if (action === "grid-limits-apply") {
    handleApplyGridLimits();
    return;
  }
  if (action === "header-filter-apply") {
    handleApplyHeaderFilter();
    return;
  }
  if (action === "header-filter-clear") {
    handleClearHeaderFilter();
    return;
  }
  if (action === "header-sort-asc") {
    handleQuickSort(state.headerMenu?.columnIndex, "asc");
    return;
  }
  if (action === "header-sort-desc") {
    handleQuickSort(state.headerMenu?.columnIndex, "desc");
  }
}

function handleFloatingLayerInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
    return;
  }

  if (target.id === "findTextInput") {
    state.findReplace.findText = target.value;
    state.findReplace.currentMatch = null;
    state.panelError = "";
    return;
  }
  if (target.id === "textImportEncodingSelect" && state.importDraft?.kind === "text") {
    state.importDraft.encoding = target.value;
    state.importDraft.needsReread = true;
    state.importDraft.error = "";
    renderWorkspace();
    return;
  }
  if (target.id === "gridLimitsRowsInput" && state.gridLimitsDraft) {
    state.gridLimitsDraft.maxRows = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "gridLimitsColumnsInput" && state.gridLimitsDraft) {
    state.gridLimitsDraft.maxColumns = target.value;
    state.panelError = "";
    const feedback = document.getElementById("gridLimitsColumnFeedback");
    if (feedback) {
      feedback.textContent = `Column label: ${formatGridLimitColumnFeedback(target.value)}`;
    }
    return;
  }
  if (target.id === "textExportTargetSelect" && state.exportDraft) {
    state.exportDraft.target = normalizeTextExportTarget(target.value);
    state.exportDraft.quoteAllCells = state.exportDraft.target === "csv" && Boolean(state.exportDraft.quoteAllCells);
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportEncodingSelect" && state.exportDraft) {
    state.exportDraft.encoding = normalizeTextExportEncoding(target.value);
    if (!shouldEnableBomToggle(state.exportDraft.encoding)) {
      state.exportDraft.withBom = false;
    }
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportRowLineEndingSelect" && state.exportDraft) {
    state.exportDraft.rowLineEnding = normalizeTextExportRowLineEnding(target.value);
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportNormalizeLfInput" && state.exportDraft) {
    state.exportDraft.normalizeCellLineBreaksToLf = target.checked;
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportBomInput" && state.exportDraft) {
    state.exportDraft.withBom = shouldEnableBomToggle(state.exportDraft.encoding) && target.checked;
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportIncludeHiddenInput" && state.exportDraft) {
    state.exportDraft.includeHiddenData = target.checked;
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textExportQuoteAllInput" && state.exportDraft) {
    state.exportDraft.quoteAllCells = state.exportDraft.target === "csv" && target.checked;
    state.panelError = "";
    rememberTextExportSettings();
    renderWorkspace();
    return;
  }
  if (target.id === "textImportDelimiterSelect" && state.importDraft?.kind === "text") {
    state.importDraft.delimiterMode = target.value;
    state.importDraft.error = "";
    if (!state.importDraft.needsReread) {
      refreshTextImportDraft(state.importDraft);
    }
    renderWorkspace();
    return;
  }
  if (target.id === "excelImportSheetSelect" && state.importDraft?.kind === "excel") {
    state.importDraft.selectedSheetIndex = Number(target.value || 0);
    return;
  }
  if (target.id === "replaceTextInput") {
    state.findReplace.replaceText = target.value;
    return;
  }
  if (target.id === "findCaseSensitiveInput") {
    state.findReplace.caseSensitive = target.checked;
    state.findReplace.currentMatch = null;
    return;
  }
  if (target.id === "findWholeCellInput") {
    state.findReplace.wholeCell = target.checked;
    state.findReplace.currentMatch = null;
    return;
  }
  if (target.dataset.conditionField) {
    const index = Number(target.dataset.conditionIndex || 0);
    const field = target.dataset.conditionField;
    if (!state.advancedFilterDraft?.conditions[index]) return;
    state.advancedFilterDraft.conditions[index][field] = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "advancedFilterLogicInput") {
    if (!state.advancedFilterDraft) return;
    state.advancedFilterDraft.logic = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "sortPrimaryColumn") {
    state.sortDraft.primaryColumn = target.value;
    return;
  }
  if (target.id === "sortPrimaryDirection") {
    state.sortDraft.primaryDirection = target.value;
    return;
  }
  if (target.id === "sortSecondaryColumn") {
    state.sortDraft.secondaryColumn = target.value;
    return;
  }
  if (target.id === "sortSecondaryDirection") {
    state.sortDraft.secondaryDirection = target.value;
    return;
  }
  if (target.id === "pageSetupPaperSize") {
    state.pageSetupDraft.paperSize = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "pageSetupOrientation") {
    state.pageSetupDraft.orientation = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "pageSetupMarginTop") {
    state.pageSetupDraft.margins.top = target.value;
    return;
  }
  if (target.id === "pageSetupMarginRight") {
    state.pageSetupDraft.margins.right = target.value;
    return;
  }
  if (target.id === "pageSetupMarginBottom") {
    state.pageSetupDraft.margins.bottom = target.value;
    return;
  }
  if (target.id === "pageSetupMarginLeft") {
    state.pageSetupDraft.margins.left = target.value;
    return;
  }
  if (target.id === "pageSetupHeader") {
    state.pageSetupDraft.headerFooter.header = target.value;
    return;
  }
  if (target.id === "pageSetupFooter") {
    state.pageSetupDraft.headerFooter.footer = target.value;
    return;
  }
  if (target.id === "pageSetupPrintAreaMode") {
    state.pageSetupDraft.printArea.mode = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "pageSetupPrintAreaRange") {
    state.pageSetupDraft.printArea.range = target.value;
    state.panelError = "";
    return;
  }
  if (target.id === "pageSetupBackgroundMode") {
    state.pageSetupDraft.background = target.value === "none"
      ? null
      : { mode: "solid-color", color: state.pageSetupDraft.background?.color || "#ffffff" };
    state.panelError = "";
    return;
  }
  if (target.id === "pageSetupBackgroundColor") {
    state.pageSetupDraft.background = {
      mode: "solid-color",
      color: target.value,
    };
    return;
  }
  if (target.id === "headerMenuOperator" && state.headerMenu) {
    state.headerMenu.operator = target.value;
    state.headerMenu.error = "";
    return;
  }
  if (target.id === "headerMenuValue" && state.headerMenu) {
    state.headerMenu.value = target.value;
    state.headerMenu.error = "";
  }
}

function handleFloatingLayerKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
    if (state.headerMenu) {
      state.headerMenu = null;
      renderFloatingLayer();
      return;
    }
    closeOpenPanel();
    return;
  }
  if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.id === "findTextInput") {
    event.preventDefault();
    runFindNext();
  }
}

function handleDocumentClick(event) {
  const target = event.target;
  if (refs.appMenu.contains(target) || refs.menuButtons.some((button) => button.contains(target))) {
    return;
  }
  setMenuOpen(null);
  if (state.headerMenu && !target.closest(".header-menu") && !target.closest("[data-header-menu-button='true']")) {
    state.headerMenu = null;
    renderFloatingLayer();
  }
}

function handleDocumentMouseMove(event) {
  handleGridPointerMove(event);
}

function handleDocumentMouseUp(event) {
  debugGridLog("document-mouseup:start", { target: describeEventTarget(event.target), hasSelectionDrag: Boolean(state.selectionDrag), hasFillDrag: Boolean(state.fillDrag) });
  if (state.fillDrag) {
    const releaseCell = resolvePointerCell(event);
    if (releaseCell) {
      state.fillDrag.previewCell = releaseCell;
    }
    const previewCell = state.fillDrag.previewCell;
    const sourceSelection = state.fillDrag.sourceSelection;
    state.fillDrag = null;
    state.suppressNextGridClick = isPointerOverGrid(event);
    if (!previewCell || !sourceSelection) {
      renderGrid();
      return;
    }
    const beforeSnapshot = captureSnapshot();
    const result = fillSelectionByRepeat(state.table, sourceSelection, previewCell);
    applySnapshot(
      {
        table: result.table,
        activeCell: previewCell,
        selection: result.selection,
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, result.table),
        statusMessage: "Fill handle applied as copy-repeat.",
      },
    );
    return;
  }
  if (!state.selectionDrag) return;
  const dragState = state.selectionDrag;
  state.selectionDrag = null;
  if (!dragState.moved) {
    const releaseCell = resolvePointerCell(event) || dragState.focus || dragState.anchor;
    debugGridLog("document-mouseup:no-move", { releaseCell, startedOnActiveCell: dragState.startedOnActiveCell });
    if (releaseCell && dragState.extendSelection) {
      state.activeCell = releaseCell;
      state.selection = createRangeSelection(dragState.anchor, releaseCell);
      state.findReplace.currentMatch = null;
      state.suppressNextGridClick = isPointerOverGrid(event);
      renderSelectionState();
      return;
    }
    if (releaseCell && !dragState.startedOnActiveCell) {
      state.activeCell = releaseCell;
      state.selection = createCellSelection(releaseCell);
      state.findReplace.currentMatch = null;
      state.suppressNextGridClick = isPointerOverGrid(event);
      renderSelectionState();
    }
    return;
  }
  const releaseCell = resolvePointerCell(event) || dragState.focus;
  if (releaseCell) {
    state.activeCell = releaseCell;
    state.selection = createRangeSelection(dragState.anchor, releaseCell);
  }
  state.suppressNextGridClick = isPointerOverGrid(event);
  renderSelectionState();
}

function handleDocumentCopy(event) {
  if (isEditingTarget(event.target)) return;
  const text = selectionToDelimitedText(state.table, state.selection);
  if (event.clipboardData) {
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  }
  rememberCopiedSelection();
  const bounds = getSelectionBounds(state.selection);
  setStatus(`Copied ${bounds.endRow - bounds.startRow + 1}x${bounds.endCol - bounds.startCol + 1} range.`);
}

function handleDocumentPaste(event) {
  if (isEditingTarget(event.target)) return;
  const text = event.clipboardData?.getData("text/plain") ?? "";
  const matrix = parseDelimitedText(text, { preserveEmptyCell: true });
  if (!matrix.length) return;
  event.preventDefault();
  applyClipboardMatrix(matrix, "Pasted clipboard range into the grid.");
}

async function handleDocumentKeydown(event) {
  const isPrimaryShortcut = event.ctrlKey || event.metaKey;
  const normalizedKey = String(event.key || "").toLowerCase();
  if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "o") {
    event.preventDefault();
    setMenuOpen(null);
    refs.openFileInput.click();
    return;
  }
  if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "s") {
    event.preventDefault();
    setMenuOpen(null);
    await handleSave();
    return;
  }
  if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "p") {
    event.preventDefault();
    setMenuOpen(null);
    handlePrint();
    return;
  }
  if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "f") {
    event.preventDefault();
    openFindReplacePanel("find");
    return;
  }
  if (isPrimaryShortcut && normalizedKey === "h") {
    event.preventDefault();
    openFindReplacePanel("replace");
    return;
  }
  if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "a") {
    event.preventDefault();
    state.activeCell = { row: 1, col: 1 };
    state.selection = createRangeSelection(
      { row: 1, col: 1 },
      { row: currentView.rowCount, col: currentView.columnCount },
    );
    state.findReplace.currentMatch = null;
    renderWorkspace();
    return;
  }
  if (event.key === "Escape") {
    if (state.headerMenu) {
      state.headerMenu = null;
      renderFloatingLayer();
      return;
    }
    if (state.openPanel) {
      closeOpenPanel();
      return;
    }
    if (state.openMenuKey) {
      setMenuOpen(null);
      return;
    }
    if (clearCopiedSelection({ render: true })) {
      event.preventDefault();
      setStatus("Cleared the copied range highlight.");
      return;
    }
  }
  if (isEditingTarget(event.target)) return;
  const editIntent = getKeyboardEditIntent(event);
  if (editIntent) {
    event.preventDefault();
    beginCellEdit({
      draft: applyKeyboardEditIntent(
        getCellValue(state.table, state.activeCell.row, state.activeCell.col),
        editIntent,
      ),
    });
    return;
  }
  const direction = keyToDirection(event);
  if (!direction) return;
  event.preventDefault();
  moveGridSelection(direction, event.shiftKey);
}

function moveGridSelection(direction, extendSelection) {
  const nextCell = moveActiveCell(state.activeCell, direction, {
    rowCount: currentView.rowCount,
    columnCount: currentView.columnCount,
  });
  const anchorCell = state.selection.anchor || state.activeCell;
  state.activeCell = nextCell;
  state.selection = extendSelection
    ? createRangeSelection(anchorCell, nextCell)
    : createCellSelection(nextCell);
  state.findReplace.currentMatch = null;
  renderWorkspace();
}

function beginCellEdit(options = {}) {
  state.selection = createCellSelection(state.activeCell);
  state.editing = {
    mode: "cell",
    draft: options.draft ?? getCellValue(state.table, state.activeCell.row, state.activeCell.col),
  };
  renderWorkspace();
}

function commitEditing(direction = "stay") {
  if (!state.editing) return;
  const beforeSnapshot = captureSnapshot();
  const nextTable = setCellValue(state.table, state.activeCell.row, state.activeCell.col, state.editing.draft);
  const nextView = buildSheetGridView(nextTable);
  let nextActiveCell = clampActiveCell(state.activeCell, nextView);
  if (direction !== "stay") {
    nextActiveCell = moveActiveCell(nextActiveCell, direction, {
      rowCount: nextView.rowCount,
      columnCount: nextView.columnCount,
    });
  }
  applySnapshot(
    {
      table: nextTable,
      activeCell: nextActiveCell,
      selection: createCellSelection(nextActiveCell),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
    },
  );
}

function cancelEditing() {
  state.editing = null;
  renderWorkspace();
}

async function handleSave() {
  commitEditing("stay");
  const html = serializeLightTableToCwsHtml(state.table, {
    fileName: state.sourceFileName || state.table.sourceName,
  });
  const fileName = normalizeDownloadName(state.sourceFileName || state.table.sourceName);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  try {
    const savedWithFilePicker = await trySaveWithFilePicker(blob, fileName, [
      {
        description: "CWS HTML",
        accept: {
          "text/html": [".html", ".htm"],
        },
      },
    ]);
    if (savedWithFilePicker) {
      setStatus(`Saved CWS HTML as ${fileName}.`);
    } else {
      saveWithDownloadLink(blob, fileName);
      setStatus(`Started CWS HTML download as ${fileName}. If no download appears, this browser may block file downloads.`);
    }
  } catch (error) {
    setStatus(formatSaveErrorMessage(error));
  }
}

async function trySaveWithFilePicker(blob, fileName, types = []) {
  if (typeof window.showSaveFilePicker !== "function") {
    return false;
  }
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types,
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return true;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("Save canceled.");
    }
    return false;
  }
}

function saveWithDownloadLink(blob, fileName) {
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = fileName;
  link.hidden = true;
  document.body.append(link);
  try {
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  }
}

function formatSaveErrorMessage(error) {
  const message = String(error?.message || "");
  if (message === "Save canceled.") {
    return message;
  }
  if (/downloads are not supported/i.test(message)) {
    return "Save failed here because this browser does not support downloads. Open the app in a standard browser to save the CWS HTML file.";
  }
  return message
    ? `Save failed: ${message}`
    : "Save failed because this browser blocked the file save.";
}

function formatExportErrorMessage(error) {
  const message = String(error?.message || "");
  if (message === "Save canceled.") {
    return "Export canceled.";
  }
  if (/downloads are not supported/i.test(message)) {
    return "Export failed here because this browser does not support downloads. Open the app in a standard browser to export the file.";
  }
  return message
    ? `Export failed: ${message}`
    : "Export failed because this browser blocked the download.";
}

function handlePrint() {
  commitEditing("stay");
  state.headerMenu = null;
  setMenuOpen(null);
  renderWorkspace();
  window.print();
  setStatus("Opened the browser print dialog.");
}

function setStatus(message) {
  refs.statusMessage.textContent = message;
}

function setMenuOpen(menuKey) {
  const previousMenuKey = state.openMenuKey;
  state.openMenuKey = getMenuItems(menuKey).length ? menuKey : null;
  state.openSubmenuKey = state.openMenuKey && state.openMenuKey === previousMenuKey
    ? state.openSubmenuKey
    : "";
  refs.menuButtons.forEach((button) => {
    const isOpen = button.dataset.menuKey === state.openMenuKey;
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.classList.toggle("is-active", isOpen);
  });
  if (!state.openMenuKey) {
    refs.appMenu.classList.add("hidden");
    refs.appMenu.style.left = "";
    refs.appMenu.innerHTML = "";
    return;
  }
  renderMenu(state.openMenuKey);
}

function renderMenu(menuKey) {
  const button = refs.menuButtons.find((entry) => entry.dataset.menuKey === menuKey);
  const items = getMenuItems(menuKey);
  const submenuItems = getMenuItems(state.openSubmenuKey);
  refs.appMenu.setAttribute("aria-labelledby", button?.id || "");
  refs.appMenu.innerHTML = `
    <div class="menu-dropdown-column">
      ${items.map((item) => renderMenuItem(item, state.openSubmenuKey)).join("")}
    </div>
    ${submenuItems.length ? `<div class="menu-dropdown-column menu-dropdown-submenu">${submenuItems.map((item) => renderMenuItem(item, "")).join("")}</div>` : ""}
  `;
  refs.appMenu.classList.remove("hidden");
  refs.appMenu.style.left = `${button?.offsetLeft || 0}px`;
}

function renderMenuItem(item, activeSubmenuKey) {
  const hint = item.submenuKey ? ">" : (item.hint || "");
  const activeClass = item.submenuKey && item.submenuKey === activeSubmenuKey ? " is-active" : "";
  if (item.disabled) {
    return `<div class="menu-item is-disabled${activeClass}" role="menuitem" aria-disabled="true"><span>${escapeHtml(item.label)}</span><span class="menu-item-hint">${escapeHtml(hint)}</span></div>`;
  }
  const actionAttr = item.action ? ` data-menu-action="${escapeHtml(item.action)}"` : "";
  const submenuAttr = item.submenuKey ? ` data-menu-submenu="${escapeHtml(item.submenuKey)}" aria-haspopup="true"` : "";
  return `<button class="menu-item${activeClass}" type="button" role="menuitem"${actionAttr}${submenuAttr}><span>${escapeHtml(item.label)}</span><span class="menu-item-hint">${escapeHtml(hint)}</span></button>`;
}

function getSelectionRowCount() {
  const bounds = getSelectionBounds(state.selection);
  return bounds.endRow - bounds.startRow + 1;
}

function getSelectionColumnCount() {
  const bounds = getSelectionBounds(state.selection);
  return bounds.endCol - bounds.startCol + 1;
}

function isWholeSheetSelection() {
  const bounds = getSelectionBounds(state.selection);
  return bounds.startRow === 1
    && bounds.startCol === 1
    && bounds.endRow === currentView.rowCount
    && bounds.endCol === currentView.columnCount;
}

function shouldDisableInsertCells() {
  return isWholeSheetSelection() || state.selection.mode === "row" || state.selection.mode === "column";
}

function resolveRowInsertTarget(placement) {
  const bounds = getSelectionBounds(state.selection);
  if (state.selection.mode === "column") {
    return {
      anchorRow: state.activeCell.row,
      insertStartRow: placement === "above" ? state.activeCell.row : state.activeCell.row + 1,
      count: 1,
    };
  }
  return {
    anchorRow: placement === "above" ? bounds.startRow : bounds.endRow,
    insertStartRow: placement === "above" ? bounds.startRow : bounds.endRow + 1,
    count: getSelectionRowCount(),
  };
}

function resolveColumnInsertTarget(placement) {
  const bounds = getSelectionBounds(state.selection);
  if (state.selection.mode === "row") {
    return {
      anchorColumn: state.activeCell.col,
      insertStartColumn: placement === "left" ? state.activeCell.col : state.activeCell.col + 1,
      count: 1,
    };
  }
  return {
    anchorColumn: placement === "left" ? bounds.startCol : bounds.endCol,
    insertStartColumn: placement === "left" ? bounds.startCol : bounds.endCol + 1,
    count: getSelectionColumnCount(),
  };
}

function resolveRowDeleteTarget() {
  const bounds = getSelectionBounds(state.selection);
  if (state.selection.mode === "column") {
    return {
      startRow: state.activeCell.row,
      count: 1,
    };
  }
  return {
    startRow: bounds.startRow,
    count: getSelectionRowCount(),
  };
}

function resolveColumnDeleteTarget() {
  const bounds = getSelectionBounds(state.selection);
  if (state.selection.mode === "row") {
    return {
      startColumn: state.activeCell.col,
      count: 1,
    };
  }
  return {
    startColumn: bounds.startCol,
    count: getSelectionColumnCount(),
  };
}

function normalizeSelectionState() {
  if (!state.selection) {
    state.selection = createCellSelection(state.activeCell);
    return;
  }
  const anchor = clampActiveCell(state.selection.anchor || state.activeCell, currentView);
  const focus = clampActiveCell(state.selection.focus || state.activeCell, currentView);
  state.selection = state.selection.mode === "row"
    ? createRowSelection(anchor.row, currentView.columnCount, focus.row)
    : state.selection.mode === "column"
      ? createColumnSelection(anchor.col, currentView.rowCount, focus.col)
      : state.selection.mode === "range"
        ? createRangeSelection(anchor, focus)
        : createCellSelection(focus);
}

function selectSingleCell(cell) {
  state.activeCell = normalizeCell(cell);
  state.selection = createCellSelection(state.activeCell);
  state.editing = null;
  state.findReplace.currentMatch = null;
  renderWorkspace();
}

function resetGridInteractionState() {
  state.activeCell = { row: 1, col: 1 };
  state.selection = createCellSelection(state.activeCell);
  state.copiedSelection = null;
  state.editing = null;
  state.history = createHistoryState();
  state.fillDrag = null;
  state.selectionDrag = null;
  state.suppressNextGridClick = false;
  state.globalSearch = "";
  state.columnFilters = {};
  state.advancedFilter = { enabled: false, conditions: [], logic: "" };
  state.findReplace.currentMatch = null;
  state.openPanel = null;
  state.headerMenu = null;
  state.panelError = "";
  state.advancedFilterDraft = null;
  state.sortDraft = null;
  state.pageSetupDraft = createPageSetupDraft(state.table.pageSetup);
  state.gridLimitsDraft = null;
  state.exportDraft = null;
}

function clampActiveCell(activeCell, view) {
  const normalized = normalizeCell(activeCell);
  return {
    row: Math.max(1, Math.min(view.rowCount, normalized.row)),
    col: Math.max(1, Math.min(view.columnCount, normalized.col)),
  };
}

function ensureActiveCellIsVisible() {
  if (isViewportPaddingRow(state.table, state.activeCell.row)) return;
  const visibleRows = getVisibleRowInfo().visibleRowSet;
  if (visibleRows.has(state.activeCell.row)) return;
  const nextRow = Array.from(visibleRows.values()).sort((left, right) => left - right)[0] || getHeaderRowIndex(state.table);
  state.activeCell = clampActiveCell({ row: nextRow, col: state.activeCell.col }, currentView);
  state.selection = createCellSelection(state.activeCell);
  state.findReplace.currentMatch = null;
}

function syncEditingFocus() {
  if (state.editing?.mode === "cell") {
    const editor = document.getElementById("activeCellEditor");
    if (editor) {
      editor.focus();
      editor.selectionStart = editor.value.length;
      editor.selectionEnd = editor.value.length;
      resizeTextarea(editor, 180);
    }
  }
  if (state.pendingFocusId) {
    const target = document.getElementById(state.pendingFocusId);
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
      target.focus();
      if ("select" in target && typeof target.select === "function") {
        target.select();
      }
    }
    state.pendingFocusId = "";
  }
  if (state.pendingScrollCell) {
    const matchElement = refs.sheetGrid.querySelector(`[data-cell='true'][data-row='${state.pendingScrollCell.row}'][data-col='${state.pendingScrollCell.col}']`);
    matchElement?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
    state.pendingScrollCell = null;
  }
}

function keyToDirection(event) {
  if (event.key === "ArrowLeft") return "left";
  if (event.key === "ArrowRight") return "right";
  if (event.key === "ArrowUp") return "up";
  if (event.key === "ArrowDown") return "down";
  if (event.key === "Tab") return event.shiftKey ? "shift+tab" : "tab";
  if (event.key === "Enter") return event.shiftKey ? "shift+enter" : "enter";
  return "";
}

function resizeTextarea(element, maxHeight) {
  element.style.height = "0px";
  element.style.height = `${Math.min(element.scrollHeight, maxHeight)}px`;
}

function handleGridViewportScroll() {
  const rowWindowChanged = syncGridViewportState();
  if (!rowWindowChanged) return;
  renderGrid();
  syncEditingFocus();
}

function handleGridViewportResize() {
  const rowWindowChanged = syncGridViewportState({ recomputeMetrics: true });
  if (!rowWindowChanged) return;
  renderGrid();
  syncEditingFocus();
}

function syncGridViewportState(options = {}) {
  if (options.recomputeMetrics) {
    rebuildGridRenderState({ honorPendingScroll: false });
    updateGridViewportDebugData();
    if (debugGridEvents) {
      renderDocumentSummary();
    }
    return true;
  }
  const previousRowWindowSignature = state.rowViewport.signature;
  const previousColumnWindowSignature = state.columnViewport.signature;
  const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
  state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
    contentWidth: metrics.contentWidth,
    contentHeight: metrics.contentHeight,
  });
  state.visibleRange = calculateVisibleRange(metrics, state.viewportState);
  state.visibleRangeSignature = visibleRangeSignature(state.visibleRange);
  updateRowViewportFromVisibleRange();
  updateColumnViewportFromVisibleRange();
  rebuildCurrentView();
  updateGridViewportDebugData();
  if (debugGridEvents) {
    renderDocumentSummary();
  }
  return state.rowViewport.signature !== previousRowWindowSignature
    || state.columnViewport.signature !== previousColumnWindowSignature;
}

function resolveGridMetricOptions() {
  const viewportState = state.viewportState || createViewportState();
  const visibleColumnCount = viewportState.width > 0
    ? estimateVisibleColumnCount(viewportState.width, buildGridMetrics(state.table))
    : undefined;
  const visibleRowCount = viewportState.height > 0
    ? estimateVisibleRowCount(viewportState.height, buildGridMetrics(state.table))
    : undefined;
  return {
    minColumnCount: visibleColumnCount,
    minRowCount: visibleRowCount,
  };
}

function updateGridViewportDebugData() {
  if (!refs.gridWrap || !refs.sheetGrid) return;
  refs.gridWrap.dataset.viewportRows = `${state.visibleRange.startRow}-${state.visibleRange.endRow}`;
  refs.gridWrap.dataset.viewportColumns = `${state.visibleRange.startColumn}-${state.visibleRange.endColumn}`;
  refs.sheetGrid.dataset.visibleRange = state.visibleRangeSignature;
}

function rebuildGridRenderState(options = {}) {
  state.logicalGridMetrics = buildGridMetrics(state.table, resolveGridMetricOptions());
  state.visibleRowLayout = buildVisibleRowLayout(
    state.table,
    getVisibleRowInfo().visibleRowSet,
    state.logicalGridMetrics.rowCount,
  );
  state.rowVirtualizationEnabled = shouldUseRowVirtualization(state.visibleRowLayout.totalVisibleRowCount);
  state.columnVirtualizationEnabled = shouldUseColumnVirtualization(state.logicalGridMetrics.columnCount);
  state.gridMetrics = state.rowVirtualizationEnabled
    ? buildVirtualizedGridMetrics(state.logicalGridMetrics, state.visibleRowLayout.totalVisibleRowCount)
    : state.logicalGridMetrics;
  state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
    contentWidth: state.gridMetrics.contentWidth,
    contentHeight: state.gridMetrics.contentHeight,
  });
  state.visibleRange = calculateVisibleRange(state.gridMetrics, state.viewportState);
  if (options.honorPendingScroll) {
    applyPendingScrollCellToViewport();
  }
  state.visibleRangeSignature = visibleRangeSignature(state.visibleRange);
  updateRowViewportFromVisibleRange();
  updateColumnViewportFromVisibleRange();
  rebuildCurrentView();
}

function buildVisibleRowLayout(table, visibleRows, fullRowCount) {
  const totalRowCount = Math.max(1, Math.trunc(Number(fullRowCount) || 1));
  const tableRowCount = getSheetRowCount(table);
  const logicalRows = [];
  const rowSlotByIndex = new Map();
  for (let rowIndex = 1; rowIndex <= totalRowCount; rowIndex += 1) {
    if (rowIndex > tableRowCount || visibleRows.has(rowIndex)) {
      logicalRows.push(rowIndex);
      rowSlotByIndex.set(rowIndex, logicalRows.length);
    }
  }
  if (!logicalRows.length) {
    logicalRows.push(1);
    rowSlotByIndex.set(1, 1);
  }
  return {
    fullRowCount: totalRowCount,
    logicalRows,
    rowSlotByIndex,
    totalVisibleRowCount: logicalRows.length,
  };
}

function buildVirtualizedGridMetrics(metrics, visibleRowCount) {
  const safeMetrics = metrics || buildGridMetrics(state.table, resolveGridMetricOptions());
  const rowCount = Math.max(1, Math.trunc(Number(visibleRowCount) || 1));
  return {
    ...safeMetrics,
    rowCount,
    contentHeight: safeMetrics.columnHeaderHeight + rowCount * safeMetrics.rowHeight,
  };
}

function updateRowViewportFromVisibleRange() {
  const layout = state.visibleRowLayout || createEmptyVisibleRowLayout();
  const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
  if (!state.rowVirtualizationEnabled) {
    state.rowViewport = {
      startSlot: 1,
      endSlot: Math.max(1, layout.totalVisibleRowCount || 1),
      renderedRowIndices: [...layout.logicalRows],
      topSpacerHeight: 0,
      bottomSpacerHeight: 0,
      signature: `full:${layout.totalVisibleRowCount}`,
    };
    return;
  }
  const totalVisibleRows = Math.max(1, layout.totalVisibleRowCount || 1);
  const startSlot = clampNumber(state.visibleRange.startRow, 1, totalVisibleRows);
  const endSlot = clampNumber(state.visibleRange.endRow, startSlot, totalVisibleRows);
  const renderedRowIndices = layout.logicalRows.slice(startSlot - 1, endSlot);
  state.rowViewport = {
    startSlot,
    endSlot,
    renderedRowIndices,
    topSpacerHeight: (startSlot - 1) * metrics.rowHeight,
    bottomSpacerHeight: Math.max(0, totalVisibleRows - endSlot) * metrics.rowHeight,
    signature: `${startSlot}:${endSlot}:${layout.totalVisibleRowCount}`,
  };
}

function updateColumnViewportFromVisibleRange() {
  const metrics = state.logicalGridMetrics || state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
  const totalColumnCount = Math.max(1, metrics.columnCount || 1);
  if (!state.columnVirtualizationEnabled) {
    state.columnViewport = {
      startColumn: 1,
      endColumn: totalColumnCount,
      renderedColumnIndices: createIndexRange(1, totalColumnCount),
      leftSpacerWidth: 0,
      rightSpacerWidth: 0,
      signature: `full:${totalColumnCount}`,
    };
    return;
  }
  const startColumn = clampNumber(state.visibleRange.startColumn, 1, totalColumnCount);
  const endColumn = clampNumber(state.visibleRange.endColumn, startColumn, totalColumnCount);
  state.columnViewport = {
    startColumn,
    endColumn,
    renderedColumnIndices: createIndexRange(startColumn, endColumn),
    leftSpacerWidth: (startColumn - 1) * metrics.columnWidth,
    rightSpacerWidth: Math.max(0, totalColumnCount - endColumn) * metrics.columnWidth,
    signature: `${startColumn}:${endColumn}:${totalColumnCount}`,
  };
}

function rebuildCurrentView() {
  const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
  const layout = state.visibleRowLayout || createEmptyVisibleRowLayout();
  currentView = buildSheetGridView(state.table, {
    minColumnCount: Math.max(1, state.logicalGridMetrics?.columnCount || metrics.columnCount),
    minRowCount: Math.max(1, layout.fullRowCount || state.logicalGridMetrics?.rowCount || metrics.rowCount),
    rowIndices: state.rowViewport.renderedRowIndices,
    columnIndices: state.columnViewport.renderedColumnIndices,
  });
}

function applyPendingScrollCellToViewport() {
  if (!state.pendingScrollCell || !refs.gridWrap) return;
  const rowSlot = state.visibleRowLayout.rowSlotByIndex.get(state.pendingScrollCell.row);
  const nextScrollTop = rowSlot
    ? resolveScrollTopForRowSlot(rowSlot, state.viewportState, state.gridMetrics)
    : state.viewportState.scrollTop;
  const nextScrollLeft = resolveScrollLeftForColumn(state.pendingScrollCell.col, state.viewportState, state.gridMetrics);
  refs.gridWrap.scrollTop = nextScrollTop;
  refs.gridWrap.scrollLeft = nextScrollLeft;
  state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
    contentWidth: state.gridMetrics.contentWidth,
    contentHeight: state.gridMetrics.contentHeight,
  });
  state.visibleRange = calculateVisibleRange(state.gridMetrics, state.viewportState);
}

function resolveScrollTopForRowSlot(rowSlot, viewportState, metrics) {
  const safeSlot = Math.max(1, Math.trunc(Number(rowSlot) || 1));
  const bodyHeight = Math.max(0, viewportState.height - metrics.columnHeaderHeight);
  const rowTop = (safeSlot - 1) * metrics.rowHeight;
  const rowBottom = rowTop + metrics.rowHeight;
  if (rowTop < viewportState.scrollTop) {
    return rowTop;
  }
  if (rowBottom > viewportState.scrollTop + bodyHeight) {
    return Math.max(0, rowBottom - bodyHeight);
  }
  return viewportState.scrollTop;
}

function resolveScrollLeftForColumn(columnIndex, viewportState, metrics) {
  const safeColumn = Math.max(1, Math.trunc(Number(columnIndex) || 1));
  const bodyWidth = Math.max(0, viewportState.width - metrics.rowHeaderWidth);
  const columnLeft = (safeColumn - 1) * metrics.columnWidth;
  const columnRight = columnLeft + metrics.columnWidth;
  if (columnLeft < viewportState.scrollLeft) {
    return columnLeft;
  }
  if (columnRight > viewportState.scrollLeft + bodyWidth) {
    return Math.max(0, columnRight - bodyWidth);
  }
  return viewportState.scrollLeft;
}

function createEmptyVisibleRowLayout() {
  return {
    fullRowCount: 1,
    logicalRows: [1],
    rowSlotByIndex: new Map([[1, 1]]),
    totalVisibleRowCount: 1,
  };
}

function createEmptyRowViewport() {
  return {
    startSlot: 1,
    endSlot: 1,
    renderedRowIndices: [1],
    topSpacerHeight: 0,
    bottomSpacerHeight: 0,
    signature: "",
  };
}

function createEmptyColumnViewport() {
  return {
    startColumn: 1,
    endColumn: 1,
    renderedColumnIndices: [1],
    leftSpacerWidth: 0,
    rightSpacerWidth: 0,
    signature: "",
  };
}

function shouldUseRowVirtualization(totalVisibleRowCount) {
  return Math.max(1, Math.trunc(Number(totalVisibleRowCount) || 1)) > MIN_VIRTUALIZED_ROW_COUNT;
}

function shouldUseColumnVirtualization(totalColumnCount) {
  return Math.max(1, Math.trunc(Number(totalColumnCount) || 1)) > MIN_VIRTUALIZED_COLUMN_COUNT;
}

function createIndexRange(start, end) {
  const safeStart = Math.max(1, Math.trunc(Number(start) || 1));
  const safeEnd = Math.max(safeStart, Math.trunc(Number(end) || safeStart));
  return Array.from({ length: safeEnd - safeStart + 1 }, (_, offset) => safeStart + offset);
}

function getRenderedGridColumnSpan() {
  return 1
    + currentView.columns.length
    + (state.columnViewport.leftSpacerWidth > 0 ? 1 : 0)
    + (state.columnViewport.rightSpacerWidth > 0 ? 1 : 0);
}

function getMenuItems(menuKey) {
  if (menuKey === "edit") {
    return [
      { label: "Undo", action: "undo", disabled: !canUndo(state.history), hint: "Ctrl+Z" },
      { label: "Redo", action: "redo", disabled: !canRedo(state.history), hint: "Ctrl+Y" },
      { label: "Copy Range", action: "copy", disabled: Boolean(state.editing), hint: "Ctrl+C" },
      { label: "Paste Range", action: "paste", disabled: Boolean(state.editing), hint: "Ctrl+V" },
    ];
  }
  if (menuKey === "view") {
    return [
      { label: "Insert Row Above", action: "insert-row-above", disabled: isWholeSheetSelection() },
      { label: "Insert Row Below", action: "insert-row-below", disabled: isWholeSheetSelection() },
      { label: "Insert Column Left", action: "insert-column-left", disabled: isWholeSheetSelection() },
      { label: "Insert Column Right", action: "insert-column-right", disabled: isWholeSheetSelection() },
      { label: "Insert Cells", submenuKey: "insert-cells", disabled: shouldDisableInsertCells() },
      { label: "Delete Rows", action: "delete-rows", disabled: isWholeSheetSelection() },
      { label: "Delete Columns", action: "delete-columns", disabled: isWholeSheetSelection() },
    ];
  }
  if (menuKey === "insert-cells") {
    return [
      { label: "Shift Right", action: "insert-cells-right", disabled: shouldDisableInsertCells() },
      { label: "Shift Down", action: "insert-cells-down", disabled: shouldDisableInsertCells() },
    ];
  }
  return MENU_DEFINITIONS[menuKey] || [];
}

async function handleCopyCommand() {
  const text = selectionToDelimitedText(state.table, state.selection);
  const bounds = getSelectionBounds(state.selection);
  const copiedMessage = `Copied ${bounds.endRow - bounds.startRow + 1}x${bounds.endCol - bounds.startCol + 1} range.`;
  rememberCopiedSelection();
  if (!navigator.clipboard?.writeText) {
    setStatus(`${copiedMessage} Clipboard write is not available here; use Ctrl+C / Cmd+C inside the grid if you need the system clipboard too.`);
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    setStatus(copiedMessage);
  } catch (error) {
    const detail = String(error?.message || "").trim();
    setStatus(detail
      ? `${copiedMessage} Clipboard write failed here: ${detail}`
      : `${copiedMessage} Clipboard write is blocked here.`);
  }
}

async function handlePasteCommand() {
  if (!navigator.clipboard?.readText) {
    setStatus("Paste command is not available here. Use Ctrl+V / Cmd+V inside the grid.");
    return;
  }
  try {
    const text = await navigator.clipboard.readText();
    const matrix = parseDelimitedText(text, { preserveEmptyCell: true });
    if (!matrix.length) {
      setStatus("Clipboard is empty.");
      return;
    }
    applyClipboardMatrix(matrix, "Pasted clipboard range into the grid.");
  } catch (error) {
    setStatus(error?.message || "Paste command is blocked here. Use Ctrl+V / Cmd+V inside the grid.");
  }
}

function applyClipboardMatrix(matrix, statusMessage) {
  const beforeSnapshot = captureSnapshot();
  const writeResult = applyMatrixToTable(state.table, state.activeCell, matrix);
  applySnapshot(
    {
      table: writeResult.table,
      activeCell: state.activeCell,
      selection: selectionFromMatrix(state.activeCell, matrix),
    },
    {
      beforeSnapshot,
      recordHistory: writeResult.changed,
      statusMessage,
    },
  );
}

function handleUndo() {
  commitEditing("stay");
  const currentSnapshot = captureSnapshot();
  const result = undoHistory(state.history, currentSnapshot);
  if (!result.snapshot) {
    setStatus("Nothing to undo.");
    return;
  }
  state.history = result.history;
  applySnapshot(result.snapshot, {
    statusMessage: "Undid the last change.",
  });
}

function handleRedo() {
  commitEditing("stay");
  const currentSnapshot = captureSnapshot();
  const result = redoHistory(state.history, currentSnapshot);
  if (!result.snapshot) {
    setStatus("Nothing to redo.");
    return;
  }
  state.history = result.history;
  applySnapshot(result.snapshot, {
    statusMessage: "Redid the last change.",
  });
}

function captureSnapshot() {
  return {
    table: state.table,
    activeCell: { ...state.activeCell },
    selection: cloneJsonValue(state.selection),
  };
}

function applySnapshot(snapshot, options = {}) {
  if (options.recordHistory && options.beforeSnapshot) {
    state.history = pushHistorySnapshot(state.history, options.beforeSnapshot);
  }
  state.table = snapshot.table;
  state.activeCell = normalizeCell(snapshot.activeCell);
  state.selection = cloneJsonValue(snapshot.selection) || createCellSelection(state.activeCell);
  state.editing = null;
  state.fillDrag = null;
  state.findReplace.currentMatch = null;
  renderWorkspace();
  if (options.statusMessage) {
    setStatus(options.statusMessage);
  }
}

function hasTableChanged(left, right) {
  return JSON.stringify(left) !== JSON.stringify(right);
}

function shouldRenderFillHandle(rowIndex, columnIndex) {
  if (state.editing || state.fillDrag || state.selectionDrag) return false;
  if (!["cell", "range"].includes(state.selection.mode)) return false;
  const bounds = getSelectionBounds(state.selection);
  return rowIndex === bounds.endRow && columnIndex === bounds.endCol;
}

function isFillPreviewCell(rowIndex, columnIndex) {
  if (!state.fillDrag) return false;
  const sourceBounds = getSelectionBounds(state.fillDrag.sourceSelection);
  const previewBounds = getFillPreviewBounds();
  if (!previewBounds) return false;
  return isCellInsideBounds(rowIndex, columnIndex, previewBounds)
    && !isCellInsideBounds(rowIndex, columnIndex, sourceBounds);
}

function getCopiedSelectionBounds() {
  return state.copiedSelection ? getSelectionBounds(state.copiedSelection) : null;
}

function getCopiedRangeCellClasses(copiedBounds, rowIndex, columnIndex) {
  if (!copiedBounds || !isCellInsideBounds(rowIndex, columnIndex, copiedBounds)) {
    return [];
  }
  const edgeClasses = [];
  if (rowIndex === copiedBounds.startRow) {
    edgeClasses.push("copy-edge-top");
  }
  if (rowIndex === copiedBounds.endRow) {
    edgeClasses.push("copy-edge-bottom");
  }
  if (columnIndex === copiedBounds.startCol) {
    edgeClasses.push("copy-edge-left");
  }
  if (columnIndex === copiedBounds.endCol) {
    edgeClasses.push("copy-edge-right");
  }
  return edgeClasses.length ? ["is-copied-range", ...edgeClasses] : [];
}

function rememberCopiedSelection(selection = state.selection) {
  state.copiedSelection = cloneJsonValue(selection);
  renderGrid();
}

function clearCopiedSelection(options = {}) {
  if (!state.copiedSelection) {
    return false;
  }
  state.copiedSelection = null;
  if (options.render) {
    renderGrid();
  }
  return true;
}

function getFillPreviewBounds() {
  if (!state.fillDrag?.previewCell) return null;
  const sourceBounds = getSelectionBounds(state.fillDrag.sourceSelection);
  return {
    startRow: Math.min(sourceBounds.startRow, state.fillDrag.previewCell.row),
    endRow: Math.max(sourceBounds.endRow, state.fillDrag.previewCell.row),
    startCol: Math.min(sourceBounds.startCol, state.fillDrag.previewCell.col),
    endCol: Math.max(sourceBounds.endCol, state.fillDrag.previewCell.col),
  };
}

function isCellInsideBounds(rowIndex, columnIndex, bounds) {
  return rowIndex >= bounds.startRow
    && rowIndex <= bounds.endRow
    && columnIndex >= bounds.startCol
    && columnIndex <= bounds.endCol;
}

function isUndoShortcut(event) {
  return (event.ctrlKey || event.metaKey)
    && !event.shiftKey
    && String(event.key || "").toLowerCase() === "z";
}

function isRedoShortcut(event) {
  const key = String(event.key || "").toLowerCase();
  return (event.ctrlKey || event.metaKey)
    && (key === "y" || (key === "z" && event.shiftKey));
}

function handleGlobalUndoRedoKeydown(event) {
  if (event.defaultPrevented || isEditingTarget(event.target)) return;
  if (isUndoShortcut(event)) {
    event.preventDefault();
    event.stopPropagation();
    handleUndo();
    return;
  }
  if (isRedoShortcut(event)) {
    event.preventDefault();
    event.stopPropagation();
    handleRedo();
  }
}

function renderSelectionState() {
  renderFormulaBar();
  renderGrid();
}

function resolvePointerCell(event) {
  const pointerElement = resolvePointerElement(event);
  const hoveredCell = pointerElement?.closest?.("[data-cell='true']");
  return hoveredCell ? cellFromDataset(hoveredCell) : null;
}

function resolvePointerElement(event) {
  if (!event) return null;
  if (event.target instanceof Element) {
    return event.target;
  }
  if (typeof event.clientX !== "number" || typeof event.clientY !== "number") {
    return null;
  }
  return document.elementFromPoint(event.clientX, event.clientY);
}

function isPointerOverGrid(event) {
  return Boolean(resolvePointerElement(event)?.closest?.("#sheetGrid"));
}

function insertLineBreakAtCursor(element, mode) {
  const selectionStart = element.selectionStart ?? element.value.length;
  const selectionEnd = element.selectionEnd ?? element.value.length;
  const nextValue = `${element.value.slice(0, selectionStart)}\n${element.value.slice(selectionEnd)}`;
  element.value = nextValue;
  element.selectionStart = selectionStart + 1;
  element.selectionEnd = selectionStart + 1;
  state.selection = createCellSelection(state.activeCell);
  state.editing = {
    mode,
    draft: nextValue,
  };
  if (mode === "cell" && refs.formulaBarInput.value !== nextValue) {
    refs.formulaBarInput.value = nextValue;
  }
  resizeTextarea(element, mode === "cell" ? 180 : 100);
  resizeTextarea(refs.formulaBarInput, 100);
}

function rememberTextExportSettings(nextSettings = state.exportDraft) {
  if (!nextSettings) return;
  state.exportSettings = normalizeTextExportSettings(nextSettings);
}

function buildFilterState() {
  return {
    globalSearch: state.globalSearch,
    columnFilters: state.columnFilters,
    advancedFilter: state.advancedFilter,
  };
}

function getVisibleRowInfo() {
  const filterState = buildFilterState();
  const filterSignature = buildFilterSignature(filterState);
  const cached = state.visibleRowsCache;
  if (cached && cached.table === state.table && cached.filterSignature === filterSignature) {
    return cached;
  }
  const visibleRowSet = getVisibleRowSet(state.table, filterState);
  const headerRowIndex = getHeaderRowIndex(state.table);
  let visibleDataRowCount = 0;
  visibleRowSet.forEach((rowIndex) => {
    if (rowIndex > headerRowIndex) {
      visibleDataRowCount += 1;
    }
  });
  const nextCache = {
    table: state.table,
    filterSignature,
    visibleRowSet,
    visibleDataRowCount,
  };
  state.visibleRowsCache = nextCache;
  return nextCache;
}

function buildFilterSignature(filterState) {
  return JSON.stringify({
    globalSearch: String(filterState?.globalSearch || ""),
    columnFilters: filterState?.columnFilters || {},
    advancedFilter: filterState?.advancedFilter || {},
  });
}

function countVisibleDataRows() {
  return getVisibleRowInfo().visibleDataRowCount;
}

function buildVisibleRowStatus(prefix) {
  const totalRows = state.table.rows.length;
  const visibleRows = countVisibleDataRows();
  return `${prefix} Showing ${visibleRows} of ${totalRows} data rows.`;
}

function rowWithinPrintArea(rowIndex, printBounds) {
  return rowIndex >= printBounds.startRow && rowIndex <= printBounds.endRow;
}

function openFindReplacePanel(mode) {
  state.openPanel = "find-replace";
  state.headerMenu = null;
  state.panelError = "";
  state.pendingFocusId = mode === "replace" ? "replaceTextInput" : "findTextInput";
  renderWorkspace();
}

function openAdvancedFilterPanel() {
  state.openPanel = "advanced-filter";
  state.headerMenu = null;
  state.panelError = "";
  state.advancedFilterDraft = createAdvancedFilterDraft();
  state.pendingFocusId = "advancedFilterLogicInput";
  renderWorkspace();
}

function openSortPanel() {
  state.openPanel = "sort";
  state.headerMenu = null;
  state.panelError = "";
  state.sortDraft = createSortDraft();
  state.pendingFocusId = "sortPrimaryColumn";
  renderWorkspace();
}

function openPageSetupPanel() {
  state.openPanel = "page-setup";
  state.headerMenu = null;
  state.panelError = "";
  state.pageSetupDraft = createPageSetupDraft(state.table.pageSetup);
  state.pendingFocusId = "pageSetupPaperSize";
  renderWorkspace();
}

function openGridLimitsPanel() {
  state.openPanel = "grid-limits";
  state.headerMenu = null;
  state.panelError = "";
  state.gridLimitsDraft = createGridLimitsDraft();
  state.pendingFocusId = "gridLimitsRowsInput";
  renderWorkspace();
}

function openHelpPanel() {
  state.openPanel = "help-page";
  state.headerMenu = null;
  state.panelError = "";
  state.pendingFocusId = "";
  renderWorkspace();
}

function openVersionPanel() {
  state.openPanel = "version-page";
  state.headerMenu = null;
  state.panelError = "";
  state.pendingFocusId = "";
  renderWorkspace();
}

function openTextExportPanel(target) {
  state.openPanel = "text-export";
  state.headerMenu = null;
  state.panelError = "";
  state.exportDraft = normalizeTextExportSettings({
    ...state.exportSettings,
    target,
  });
  state.pendingFocusId = "textExportEncodingSelect";
  renderWorkspace();
}

function openImportFilePicker(mode) {
  state.importFileMode = mode;
  refs.importFileInput.accept = mode === "excel"
    ? ".xlsx,.xlsm,.xls"
    : ".csv,.tsv,.txt,.json,.xml";
  refs.importFileInput.click();
}

async function beginExcelImport(file) {
  setStatus(`Reading ${file.name}...`);
  const xlsx = await ensureXlsxLibrary();
  const workbook = xlsx.read(await file.arrayBuffer(), {
    type: "array",
    cellHTML: false,
    cellStyles: false,
  });
  const sheetOptions = listExcelWorkbookSheets(workbook);
  if (!sheetOptions.length) {
    throw new Error("The selected Excel workbook does not contain any sheets.");
  }
  if (sheetOptions.length === 1) {
    const imported = excelWorkbookToMatrix(workbook, sheetOptions[0].index);
    applyImportedMatrix(imported.matrix, `Imported ${imported.sheetName} from ${file.name}.`);
    return;
  }
  state.importDraft = {
    kind: "excel",
    fileName: file.name,
    workbook,
    sheetOptions,
    selectedSheetIndex: sheetOptions[0].index,
  };
  state.openPanel = "excel-import";
  state.headerMenu = null;
  state.panelError = "";
  state.pendingFocusId = "excelImportSheetSelect";
  renderWorkspace();
  setStatus(`Loaded ${file.name}. Choose one sheet to import.`);
}

async function beginTextImport(file) {
  const fileKind = inferImportFileKind(file.name);
  if (!isTextImportKind(fileKind)) {
    throw new Error("The selected file is not a supported text or structured-data import type.");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const draft = {
    kind: "text",
    fileName: file.name,
    fileKind,
    bytes,
    encoding: inferDefaultTextImportEncoding(bytes),
    delimiterMode: inferDefaultDelimiterMode(fileKind),
    needsReread: false,
    error: "",
    text: "",
    matrix: [],
  };
  refreshTextImportDraft(draft);
  state.importDraft = draft;
  state.openPanel = "text-import";
  state.headerMenu = null;
  state.panelError = "";
  state.pendingFocusId = "textImportEncodingSelect";
  renderWorkspace();
  setStatus(`Loaded ${file.name}. Review the preview and import it into the current sheet.`);
}

function handleTextImportReread() {
  if (state.importDraft?.kind !== "text") return;
  refreshTextImportDraft(state.importDraft);
  renderWorkspace();
}

function handleApplyTextImport() {
  const draft = state.importDraft;
  if (!draft || draft.kind !== "text") return;
  if (draft.needsReread) {
    draft.error = "Press Re-read after changing the encoding so the preview uses the original raw bytes.";
    renderWorkspace();
    return;
  }
  if (draft.error) {
    renderWorkspace();
    return;
  }
  if (!draft.matrix.length) {
    draft.error = "There is no parsed data to import.";
    renderWorkspace();
    return;
  }
  applyImportedMatrix(draft.matrix, `Imported ${draft.fileKind.toUpperCase()} data from ${draft.fileName}.`);
}

function handleApplyExcelImport() {
  const draft = state.importDraft;
  if (!draft || draft.kind !== "excel") return;
  const imported = excelWorkbookToMatrix(draft.workbook, draft.selectedSheetIndex);
  applyImportedMatrix(imported.matrix, `Imported ${imported.sheetName} from ${draft.fileName}.`);
}

async function handleApplyTextExport() {
  const draft = state.exportDraft;
  if (!draft) return;
  commitEditing("stay");
  const settings = normalizeTextExportSettings(draft);
  const visibleRowSet = getVisibleRowInfo().visibleRowSet;
  const matrix = buildTextExportMatrix(state.table, {
    includeHiddenData: settings.includeHiddenData,
    visibleRowSet,
  });
  const text = serializeTextExportMatrix(matrix, settings);
  let legacyEncode = null;
  if (settings.encoding === "Shift-JIS" || settings.encoding === "EUC-JP") {
    legacyEncode = await ensureLegacyTextExportEncoder();
  }
  const bytes = encodeTextExportBytes(text, {
    ...settings,
    legacyEncode,
  });
  const fileName = buildTextExportFileName(state.sourceFileName || state.table.sourceName, settings.target);
  const blob = new Blob([bytes], { type: getTextExportMimeType(settings.target, settings.encoding) });
  rememberTextExportSettings(settings);
  try {
    const savedWithFilePicker = await trySaveWithFilePicker(blob, fileName, getTextExportFilePickerTypes(settings.target));
    if (savedWithFilePicker) {
      setStatus(`Exported ${settings.target.toUpperCase()} as ${fileName}.`);
    } else {
      saveWithDownloadLink(blob, fileName);
      setStatus(`Started ${settings.target.toUpperCase()} download as ${fileName}. If no download appears, this browser may block file downloads.`);
    }
    closeOpenPanel();
  } catch (error) {
    setStatus(formatExportErrorMessage(error));
  }
}

function closeOpenPanel() {
  if (!state.openPanel) return;
  if (state.openPanel === "text-import" || state.openPanel === "excel-import") {
    state.importDraft = null;
  }
  if (state.openPanel === "text-export") {
    state.exportDraft = null;
  }
  if (state.openPanel === "grid-limits") {
    state.gridLimitsDraft = null;
  }
  state.openPanel = null;
  state.panelError = "";
  renderWorkspace();
}

function refreshTextImportDraft(draft) {
  try {
    const result = parseTextImportContent({
      fileName: draft.fileName,
      bytes: draft.bytes,
      encoding: draft.encoding,
      delimiterMode: draft.delimiterMode,
    });
    draft.text = result.text;
    draft.matrix = result.matrix;
    draft.error = "";
    draft.needsReread = false;
  } catch (error) {
    draft.text = "";
    draft.matrix = [];
    draft.error = error.message || "The selected file could not be parsed.";
    draft.needsReread = false;
  }
}

function applyImportedMatrix(matrix, prefix) {
  const safeMatrix = Array.isArray(matrix) ? matrix : [];
  if (!safeMatrix.length) {
    setStatus("The selected import did not contain any cells to insert.");
    closeOpenPanel();
    return;
  }
  commitEditing("stay");
  const startCell = getImportAnchorCell(state.selection);
  const beforeSnapshot = captureSnapshot();
  const writeResult = applyMatrixToTable(state.table, startCell, safeMatrix);
  const importedSelection = selectionFromMatrix(startCell, safeMatrix);
  clearCopiedSelection();
  closeOpenPanelWithoutRender();
  applySnapshot(
    {
      table: writeResult.table,
      activeCell: startCell,
      selection: importedSelection,
    },
    {
      beforeSnapshot,
      recordHistory: writeResult.changed,
      statusMessage: `${prefix} Inserted ${formatMatrixShape(safeMatrix)} at ${gridCellName(startCell.row, startCell.col)}.`,
    },
  );
}

function closeOpenPanelWithoutRender() {
  state.importDraft = null;
  state.exportDraft = null;
  state.gridLimitsDraft = null;
  state.openPanel = null;
  state.panelError = "";
}

function formatMatrixShape(matrix) {
  const rowCount = Array.isArray(matrix) ? matrix.length : 0;
  const columnCount = rowCount
    ? matrix.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0)
    : 0;
  return `${rowCount}x${columnCount}`;
}

async function ensureXlsxLibrary() {
  if (window.XLSX) return window.XLSX;
  if (!xlsxLoadPromise) {
    xlsxLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "./vendor/xlsx/dist/xlsx.full.min.js";
      script.async = true;
      script.dataset.cwsXlsxLoader = "true";
      script.onload = () => {
        if (window.XLSX) {
          resolve(window.XLSX);
          return;
        }
        xlsxLoadPromise = null;
        reject(new Error("The Excel import library loaded but did not initialize correctly."));
      };
      script.onerror = () => {
        xlsxLoadPromise = null;
        reject(new Error("Failed to load the Excel import library."));
      };
      document.head.append(script);
    });
  }
  return xlsxLoadPromise;
}

async function ensureLegacyTextExportEncoder() {
  if (window.cptable?.utils?.encode) {
    return createLegacyTextExportEncoder();
  }
  if (!codepageLoadPromise) {
    codepageLoadPromise = (async () => {
      await loadScriptOnce("./vendor/codepage/dist/cpexcel.full.js", "cwsCodepageBase");
      await loadScriptOnce("./vendor/codepage/bits/51932.js", "cwsCodepageEucJp");
      await loadScriptOnce("./vendor/codepage/cputils.js", "cwsCodepageUtils");
    })();
  }
  await codepageLoadPromise;
  return createLegacyTextExportEncoder();
}

function createLegacyTextExportEncoder() {
  return (encoding, text) => {
    const codepage = mapTextExportEncodingToCodepage(encoding);
    if (!codepage) {
      throw new Error(`No legacy encoder is configured for ${encoding}.`);
    }
    if (!window.cptable?.utils?.hascp?.(codepage)) {
      throw new Error(`${encoding} export is not available in this browser build.`);
    }
    const encoded = window.cptable.utils.encode(codepage, String(text ?? ""));
    return encoded instanceof Uint8Array ? encoded : Uint8Array.from(encoded || []);
  };
}

function mapTextExportEncodingToCodepage(encoding) {
  if (encoding === "Shift-JIS") return 932;
  if (encoding === "EUC-JP") return 51932;
  return 0;
}

async function loadScriptOnce(src, marker) {
  if (document.querySelector(`script[data-script-marker="${marker}"]`)) {
    return;
  }
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.scriptMarker = marker;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}.`));
    document.head.append(script);
  });
}

function handleSetHeaderRow() {
  commitEditing("stay");
  const bounds = getSelectionBounds(state.selection);
  const targetRow = state.selection.mode === "row" && getSelectionRowCount() > 1
    ? bounds.startRow
    : state.activeCell.row;
  const beforeSnapshot = captureSnapshot();
  const nextTable = setHeaderRow(state.table, targetRow);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: { row: targetRow, col: state.activeCell.col },
      selection: createCellSelection({ row: targetRow, col: state.activeCell.col }),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Set row ${targetRow} as the formal header row.`,
    },
  );
}

function handleInsertRows(placement) {
  if (isWholeSheetSelection()) return;
  commitEditing("stay");
  const target = resolveRowInsertTarget(placement);
  const beforeSnapshot = captureSnapshot();
  const nextTable = insertRows(state.table, target.anchorRow, target.count, placement);
  const nextView = buildSheetGridView(nextTable);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: clampActiveCell({ row: target.insertStartRow, col: state.activeCell.col }, nextView),
      selection: createRowSelection(target.insertStartRow, nextView.columnCount, target.insertStartRow + target.count - 1),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Inserted ${target.count} row${target.count === 1 ? "" : "s"} ${placement} row ${target.anchorRow}.`,
    },
  );
}

function handleInsertColumns(placement) {
  if (isWholeSheetSelection()) return;
  commitEditing("stay");
  const target = resolveColumnInsertTarget(placement);
  const beforeSnapshot = captureSnapshot();
  const nextTable = insertColumns(state.table, target.anchorColumn, target.count, placement);
  const nextView = buildSheetGridView(nextTable);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: clampActiveCell({ row: state.activeCell.row, col: target.insertStartColumn }, nextView),
      selection: createColumnSelection(target.insertStartColumn, nextView.rowCount, target.insertStartColumn + target.count - 1),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Inserted ${target.count} column${target.count === 1 ? "" : "s"} ${placement} column ${formatColumnName(target.anchorColumn)}.`,
    },
  );
}

function handleInsertCells(direction) {
  if (shouldDisableInsertCells()) return;
  commitEditing("stay");
  const beforeSnapshot = captureSnapshot();
  const bounds = getSelectionBounds(state.selection);
  const nextTable = insertCells(state.table, bounds, direction);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: { row: bounds.startRow, col: bounds.startCol },
      selection: createRangeSelection(
        { row: bounds.startRow, col: bounds.startCol },
        { row: bounds.endRow, col: bounds.endCol },
      ),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Inserted ${getSelectionRowCount()}x${getSelectionColumnCount()} blank area and shifted cells ${direction}.`,
    },
  );
}

function handleDeleteRows() {
  if (isWholeSheetSelection()) return;
  commitEditing("stay");
  const target = resolveRowDeleteTarget();
  const beforeSnapshot = captureSnapshot();
  const nextTable = deleteRows(state.table, target.startRow, target.count);
  const nextView = buildSheetGridView(nextTable);
  const nextActiveRow = Math.min(target.startRow, nextView.rowCount);
  const nextSelectionEndRow = Math.min(nextView.rowCount, nextActiveRow + target.count - 1);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: clampActiveCell({ row: nextActiveRow, col: state.activeCell.col }, nextView),
      selection: createRowSelection(nextActiveRow, nextView.columnCount, nextSelectionEndRow),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Deleted ${target.count} row${target.count === 1 ? "" : "s"} starting at row ${target.startRow}.`,
    },
  );
}

function handleDeleteColumns() {
  if (isWholeSheetSelection()) return;
  commitEditing("stay");
  const target = resolveColumnDeleteTarget();
  const beforeSnapshot = captureSnapshot();
  const nextTable = deleteColumns(state.table, target.startColumn, target.count);
  const nextView = buildSheetGridView(nextTable);
  const nextActiveColumn = Math.min(target.startColumn, nextView.columnCount);
  const nextSelectionEndColumn = Math.min(nextView.columnCount, nextActiveColumn + target.count - 1);
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: clampActiveCell({ row: state.activeCell.row, col: nextActiveColumn }, nextView),
      selection: createColumnSelection(nextActiveColumn, nextView.rowCount, nextSelectionEndColumn),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Deleted ${target.count} column${target.count === 1 ? "" : "s"} starting at column ${formatColumnName(target.startColumn)}.`,
    },
  );
}

function openHeaderMenu(columnIndex, button) {
  const existing = state.columnFilters[columnKeyForIndex(columnIndex)];
  const rect = button.getBoundingClientRect();
  state.headerMenu = {
    columnIndex,
    operator: existing?.operator || "contains",
    value: existing?.value || "",
    left: Math.max(8, rect.left - 8),
    top: rect.bottom + 8,
    error: "",
  };
  renderFloatingLayer();
}

function handleQuickSort(columnIndex, direction) {
  if (!columnIndex) return;
  commitEditing("stay");
  const beforeSnapshot = captureSnapshot();
  const nextTable = sortTableRows(state.table, [{ columnKey: columnKeyForIndex(columnIndex), direction }]);
  state.headerMenu = null;
  applySnapshot(
    {
      table: nextTable,
      activeCell: state.activeCell,
      selection: state.selection,
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: buildVisibleRowStatus(`Sorted ${state.table.columns?.[columnIndex - 1]?.label || gridCellName(getHeaderRowIndex(state.table), columnIndex)} ${direction === "asc" ? "A → Z" : "Z → A"}.`),
    },
  );
}

function handleApplyHeaderFilter() {
  if (!state.headerMenu) return;
  const operator = state.headerMenu.operator;
  const value = state.headerMenu.value;
  if ((operator === "contains" || operator === "equals") && value === "") {
    state.headerMenu.error = "Enter a filter value or use Is Empty / Is Not Empty.";
    renderFloatingLayer();
    return;
  }
  state.columnFilters = {
    ...state.columnFilters,
    [columnKeyForIndex(state.headerMenu.columnIndex)]: {
      operator,
      value,
    },
  };
  state.headerMenu = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus("Applied the column filter."));
}

function handleClearHeaderFilter() {
  if (!state.headerMenu) return;
  const nextFilters = { ...state.columnFilters };
  delete nextFilters[columnKeyForIndex(state.headerMenu.columnIndex)];
  state.columnFilters = nextFilters;
  state.headerMenu = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus("Cleared the column filter."));
}

function handleClearFilters() {
  state.columnFilters = {};
  state.advancedFilter = { enabled: false, conditions: [], logic: "" };
  state.headerMenu = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus("Cleared column and advanced filters."));
}

function runFindNext() {
  commitEditing("stay");
  if (!state.findReplace.findText) {
    state.panelError = "Enter text to find.";
    renderFloatingLayer();
    return;
  }
  const startCell = state.findReplace.currentMatch || state.activeCell;
  const includeCurrent = !state.findReplace.currentMatch;
  const match = findNextMatch(state.table, state.selection, startCell, {
    ...state.findReplace,
    includeCurrent,
  });
  if (!match) {
    state.findReplace.currentMatch = null;
    state.panelError = "No more matches were found in the current scope.";
    renderFloatingLayer();
    setStatus("No matches were found.");
    return;
  }
  state.findReplace.currentMatch = { row: match.row, col: match.col };
  state.panelError = "";
  state.activeCell = { row: match.row, col: match.col };
  state.selection = createCellSelection(state.activeCell);
  state.pendingScrollCell = state.activeCell;
  renderWorkspace();
  setStatus(`Found a match at ${gridCellName(match.row, match.col)}.`);
}

function runReplaceOne() {
  commitEditing("stay");
  if (!state.findReplace.findText) {
    state.panelError = "Enter text to find before replacing.";
    renderFloatingLayer();
    return;
  }
  const match = resolveReplaceTarget();
  if (!match) {
    state.panelError = "No match is available to replace.";
    renderFloatingLayer();
    setStatus("No match is available to replace.");
    return;
  }
  const beforeSnapshot = captureSnapshot();
  const currentValue = getCellValue(state.table, match.row, match.col);
  const nextValue = buildSingleReplacement(currentValue);
  const nextTable = setCellValue(state.table, match.row, match.col, nextValue);
  applySnapshot(
    {
      table: nextTable,
      activeCell: { row: match.row, col: match.col },
      selection: createCellSelection({ row: match.row, col: match.col }),
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Replaced the match at ${gridCellName(match.row, match.col)}.`,
    },
  );
  const nextMatch = findNextMatch(state.table, state.selection, match, {
    ...state.findReplace,
    includeCurrent: false,
  });
  if (nextMatch) {
    state.findReplace.currentMatch = { row: nextMatch.row, col: nextMatch.col };
    state.activeCell = { row: nextMatch.row, col: nextMatch.col };
    state.selection = createCellSelection(state.activeCell);
    state.pendingScrollCell = state.activeCell;
    renderWorkspace();
  }
  state.panelError = "";
  renderFloatingLayer();
}

function runReplaceAll() {
  commitEditing("stay");
  if (!state.findReplace.findText) {
    state.panelError = "Enter text to find before replacing.";
    renderFloatingLayer();
    return;
  }
  const beforeSnapshot = captureSnapshot();
  const result = replaceAllMatches(state.table, state.selection, state.findReplace);
  if (!result.count) {
    state.panelError = "No matches were found in the current scope.";
    renderFloatingLayer();
    setStatus("No matches were found.");
    return;
  }
  applySnapshot(
    {
      table: result.table,
      activeCell: state.activeCell,
      selection: state.selection,
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, result.table),
      statusMessage: `Replaced ${result.count} matches in the current scope.`,
    },
  );
  state.panelError = "";
  renderFloatingLayer();
}

function resolveReplaceTarget() {
  const currentMatch = state.findReplace.currentMatch;
  if (currentMatch && currentCellMatchesFind(currentMatch.row, currentMatch.col)) {
    return currentMatch;
  }
  return findNextMatch(state.table, state.selection, state.activeCell, {
    ...state.findReplace,
    includeCurrent: true,
  });
}

function currentCellMatchesFind(row, col) {
  const value = getCellValue(state.table, row, col);
  return state.findReplace.wholeCell
    ? compareMaybeCaseSensitive(value, state.findReplace.findText, state.findReplace.caseSensitive)
    : includesMaybeCaseSensitive(value, state.findReplace.findText, state.findReplace.caseSensitive);
}

function buildSingleReplacement(currentValue) {
  const text = String(currentValue ?? "");
  const findText = state.findReplace.findText;
  const replaceText = state.findReplace.replaceText;
  if (state.findReplace.wholeCell) {
    return replaceText;
  }
  if (state.findReplace.caseSensitive) {
    return text.replace(findText, replaceText);
  }
  const index = text.toLocaleLowerCase().indexOf(findText.toLocaleLowerCase());
  if (index < 0) return text;
  return `${text.slice(0, index)}${replaceText}${text.slice(index + findText.length)}`;
}

function handleAddAdvancedCondition() {
  if (!state.advancedFilterDraft) return;
  if (state.advancedFilterDraft.conditions.length >= 20) return;
  state.advancedFilterDraft.conditions.push(createAdvancedCondition());
  if (!state.advancedFilterDraft.logic || state.advancedFilterDraft.logic === buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length - 1)) {
    state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
  }
  state.panelError = "";
  renderFloatingLayer();
}

function handleRemoveAdvancedCondition(index) {
  if (!state.advancedFilterDraft) return;
  if (state.advancedFilterDraft.conditions.length <= 1) return;
  state.advancedFilterDraft.conditions.splice(index, 1);
  state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
  state.panelError = "";
  renderFloatingLayer();
}

function handleResetAdvancedLogic() {
  if (!state.advancedFilterDraft) return;
  state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
  state.panelError = "";
  renderFloatingLayer();
}

function handleApplyAdvancedFilter() {
  if (!state.advancedFilterDraft) return;
  const result = validateAdvancedFilterDefinition(state.advancedFilterDraft);
  if (!result.ok) {
    state.panelError = result.errors.join(" ");
    renderFloatingLayer();
    return;
  }
  state.advancedFilter = {
    enabled: result.conditions.length > 0,
    conditions: result.conditions,
    logic: result.logic,
  };
  state.panelError = "";
  state.openPanel = null;
  renderWorkspace();
  setStatus(buildVisibleRowStatus("Applied the advanced filter."));
}

function handleApplySort() {
  if (!state.sortDraft?.primaryColumn) {
    state.panelError = "Choose a primary sort column.";
    renderFloatingLayer();
    return;
  }
  const rules = [
    { columnKey: state.sortDraft.primaryColumn, direction: state.sortDraft.primaryDirection },
  ];
  if (state.sortDraft.secondaryColumn) {
    rules.push({ columnKey: state.sortDraft.secondaryColumn, direction: state.sortDraft.secondaryDirection });
  }
  const beforeSnapshot = captureSnapshot();
  const nextTable = sortTableRows(state.table, rules);
  state.openPanel = null;
  state.panelError = "";
  applySnapshot(
    {
      table: nextTable,
      activeCell: state.activeCell,
      selection: state.selection,
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: buildVisibleRowStatus("Applied the sort order."),
    },
  );
}

function handleApplyPageSetup(printAfter) {
  const validationError = validatePageSetupDraft(state.pageSetupDraft);
  if (validationError) {
    state.panelError = validationError;
    renderFloatingLayer();
    return;
  }
  const beforeSnapshot = captureSnapshot();
  const nextTable = applyPageSetup(state.table, state.pageSetupDraft);
  const changed = hasTableChanged(beforeSnapshot.table, nextTable);
  state.openPanel = null;
  state.panelError = "";
  applySnapshot(
    {
      table: nextTable,
      activeCell: state.activeCell,
      selection: state.selection,
    },
    {
      beforeSnapshot,
      recordHistory: changed,
      statusMessage: "Applied page setup settings.",
    },
  );
  if (printAfter) {
    window.print();
    setStatus("Applied page setup and opened the browser print dialog.");
  }
}

function handleApplyGridLimits() {
  const validationError = validateGridLimitsDraft(state.gridLimitsDraft);
  if (validationError) {
    state.panelError = validationError;
    renderFloatingLayer();
    return;
  }
  const nextLimits = {
    maxRows: Number(state.gridLimitsDraft.maxRows),
    maxColumns: Number(state.gridLimitsDraft.maxColumns),
  };
  const beforeSnapshot = captureSnapshot();
  const nextTable = setGridLimits(state.table, nextLimits);
  state.gridLimitsDraft = null;
  state.openPanel = null;
  state.panelError = "";
  clearCopiedSelection();
  applySnapshot(
    {
      table: nextTable,
      activeCell: clampActiveCell(state.activeCell, buildSheetGridView(nextTable)),
      selection: state.selection,
    },
    {
      beforeSnapshot,
      recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      statusMessage: `Updated the editable grid to ${nextLimits.maxRows} rows x ${nextLimits.maxColumns} columns.`,
    },
  );
}

function createAdvancedCondition() {
  return {
    columnKey: state.table.columns?.[0]?.key || columnKeyForIndex(1),
    operator: "contains",
    value: "",
  };
}

function createAdvancedFilterDraft() {
  const sourceConditions = state.advancedFilter.conditions.length
    ? cloneJsonValue(state.advancedFilter.conditions)
    : [createAdvancedCondition()];
  return {
    conditions: sourceConditions,
    logic: state.advancedFilter.logic || buildDefaultAdvancedFilterLogic(sourceConditions.length),
  };
}

function createSortDraft() {
  return {
    primaryColumn: state.table.columns?.[0]?.key || "",
    primaryDirection: "asc",
    secondaryColumn: "",
    secondaryDirection: "asc",
  };
}

function createPageSetupDraft(pageSetup) {
  const source = pageSetup || {};
  return {
    margins: {
      top: source.margins?.top ?? 12,
      right: source.margins?.right ?? 12,
      bottom: source.margins?.bottom ?? 12,
      left: source.margins?.left ?? 12,
    },
    paperSize: source.paperSize || "A4",
    orientation: source.orientation || "portrait",
    printArea: {
      mode: source.printArea?.mode || "entire-sheet",
      range: source.printArea?.range || "",
    },
    headerFooter: {
      header: source.headerFooter?.header || "",
      footer: source.headerFooter?.footer || "",
    },
    background: source.background
      ? {
        mode: source.background.mode || "solid-color",
        color: source.background.color || "#ffffff",
      }
      : null,
  };
}

function createGridLimitsDraft() {
  const limits = getGridLimits(state.table);
  return {
    maxRows: String(Math.max(currentView.rowCount, limits.maxRows)),
    maxColumns: String(Math.max(currentView.columnCount, limits.maxColumns)),
  };
}

function validatePageSetupDraft(draft) {
  if (draft.printArea.mode === "custom" && !parseCellRange(draft.printArea.range)) {
    return "Enter a valid custom range such as A1:D20.";
  }
  return "";
}

function validateGridLimitsDraft(draft) {
  const maxRows = parseStrictPositiveInteger(draft?.maxRows);
  if (!maxRows.ok) {
    return "Maximum Rows must be an integer greater than or equal to 1.";
  }
  const maxColumns = parseStrictPositiveInteger(draft?.maxColumns);
  if (!maxColumns.ok) {
    return "Maximum Columns must be an integer greater than or equal to 1.";
  }
  const headerRowIndex = getHeaderRowIndex(state.table);
  if (maxRows.value < headerRowIndex) {
    return `Maximum Rows cannot be smaller than the current formal header row ${headerRowIndex}.`;
  }
  const lastUsedRow = getLastUsedRowIndex(state.table);
  if (maxRows.value < lastUsedRow) {
    return `Maximum Rows cannot be smaller than the last used row ${lastUsedRow}.`;
  }
  const lastUsedColumn = getLastUsedColumnIndex(state.table);
  if (maxColumns.value < lastUsedColumn) {
    return `Maximum Columns cannot be smaller than the last used column ${formatGridLimitColumnFeedback(lastUsedColumn)}.`;
  }
  return "";
}

function formatScopeLabel() {
  const scope = getSelectionBounds(state.selection);
  const cellCount = (scope.endRow - scope.startRow + 1) * (scope.endCol - scope.startCol + 1);
  if (cellCount <= 1) {
    return "Whole sheet";
  }
  return `${gridCellName(scope.startRow, scope.startCol)}:${gridCellName(scope.endRow, scope.endCol)}`;
}

function renderColumnOptions() {
  if (!state.table.columns.length) {
    return `<option value="c1">Column A</option>`;
  }
  return state.table.columns
    .map((column, index) => `<option value="${escapeAttr(column.key)}">${escapeHtml(column.label || columnLabelFromIndex(index + 1))}</option>`)
    .join("");
}

function renderOperatorOptions(selected) {
  const options = [
    { value: "contains", label: "contains" },
    { value: "equals", label: "equals" },
    { value: "is-empty", label: "is empty" },
    { value: "is-not-empty", label: "is not empty" },
  ];
  return options
    .map((option) => `<option value="${option.value}"${option.value === selected ? " selected" : ""}>${escapeHtml(option.label)}</option>`)
    .join("");
}

function renderFixedOptions(options, selected) {
  return options
    .map((option) => `<option value="${escapeAttr(option)}"${option === selected ? " selected" : ""}>${escapeHtml(option)}</option>`)
    .join("");
}

function parseStrictPositiveInteger(value) {
  const text = String(value ?? "").trim();
  if (!/^[1-9]\d*$/.test(text)) {
    return { ok: false, value: 0 };
  }
  return {
    ok: true,
    value: Number(text),
  };
}

function formatGridLimitColumnFeedback(value) {
  const parsed = parseStrictPositiveInteger(value);
  if (!parsed.ok) return "Enter a column count of 1 or greater.";
  return `${parsed.value} = ${formatColumnName(parsed.value)}`;
}

function formatColumnName(columnIndex) {
  return gridCellName(1, columnIndex).replace(/\d+$/, "");
}

function clampNumber(value, minimum, maximum) {
  return Math.min(Math.max(Number(value) || minimum, minimum), maximum);
}

function cellFromDataset(element) {
  return {
    row: Number(element.dataset.row || 1),
    col: Number(element.dataset.col || 1),
  };
}

function sameCell(left, right) {
  return left?.row === right?.row && left?.col === right?.col;
}

function compareMaybeCaseSensitive(left, right, caseSensitive) {
  return caseSensitive
    ? String(left ?? "") === String(right ?? "")
    : String(left ?? "").toLocaleLowerCase() === String(right ?? "").toLocaleLowerCase();
}

function includesMaybeCaseSensitive(left, right, caseSensitive) {
  return caseSensitive
    ? String(left ?? "").includes(String(right ?? ""))
    : String(left ?? "").toLocaleLowerCase().includes(String(right ?? "").toLocaleLowerCase());
}

function isEditingTarget(target) {
  return Boolean(target?.closest?.("#activeCellEditor, #formulaBarInput, #globalSearchInput, #floatingLayer input, #floatingLayer textarea, #floatingLayer select"));
}

function normalizeDownloadName(value) {
  const text = String(value || "workbook.cws.html").trim() || "workbook.cws.html";
  return /\.html?$/i.test(text) ? text : `${text}.html`;
}

function buildTextExportFileName(sourceName, target) {
  const normalizedTarget = normalizeTextExportTarget(target);
  const rawName = String(sourceName || "workbook").trim() || "workbook";
  const withoutCwsSuffix = rawName.replace(/\.cws\.html?$/i, "");
  const withoutGenericSuffix = withoutCwsSuffix.replace(/\.(html|htm|csv|tsv|txt)$/i, "");
  const baseName = withoutGenericSuffix || "workbook";
  return `${baseName}.${normalizedTarget}`;
}

function getTextExportFilePickerTypes(target) {
  const normalizedTarget = normalizeTextExportTarget(target);
  const extensions = normalizedTarget === "csv"
    ? [".csv"]
    : normalizedTarget === "tsv"
      ? [".tsv"]
      : [".txt"];
  return [
    {
      description: `${normalizedTarget.toUpperCase()} text`,
      accept: {
        "text/plain": extensions,
      },
    },
  ];
}

function getTextExportMimeType(target, encoding) {
  const normalizedTarget = normalizeTextExportTarget(target);
  const normalizedEncoding = normalizeTextExportEncoding(encoding);
  const baseType = normalizedTarget === "csv" ? "text/csv" : "text/plain";
  return `${baseType};charset=${normalizedEncoding.toLowerCase()}`;
}

function cloneJsonValue(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function debugGridLog(label, payload) {
  if (!debugGridEvents) return;
  document.documentElement.dataset.cwsGridDebug = `${label} ${JSON.stringify(payload)}`;
  console.log(`[cws-grid] ${label}`, payload);
}

function describeEventTarget(target) {
  if (!(target instanceof Element)) {
    return { kind: typeof target };
  }
  const cell = target.closest("[data-cell='true']");
  const rowHeader = target.closest("[data-row-header='true']");
  const columnHeader = target.closest("[data-col-header='true']");
  return {
    tag: target.tagName,
    cell: cell ? { row: cell.dataset.row || "", col: cell.dataset.col || "" } : null,
    rowHeader: rowHeader ? { row: rowHeader.dataset.row || "" } : null,
    columnHeader: columnHeader ? { col: columnHeader.dataset.col || "" } : null,
  };
}
