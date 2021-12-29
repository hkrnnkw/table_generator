import { TableType } from '../utils/types';

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-table') {
    const table: TableType = msg.currentTable;
    const nodes: RectangleNode[] = [];

    for (let i = 0; i < table.rows.length; i++) {
      const row = table.rows[i];
      for (let j = 0; j < table.columns.length; j++) {
        const rect = figma.createRectangle();
        const columnId = row.cells[j].columnId;
        const column = table.columns.find((column) => column.id === columnId);
        rect.x = j * column.width;
        rect.y = i * row.height;
        rect.resize(column.width, row.height);
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
      }
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-table',
      message: `Created Table: its id is ${table.id}`,
    });
  }
};
