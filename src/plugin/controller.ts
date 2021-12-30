import { TableType } from '../utils/types';
import { createTableFrame } from './handlers/tableRenderer';

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-table') {
    const table: TableType = msg.currentTable;
    createTableFrame(table)
      .then((frame) => {
        figma.currentPage.appendChild(frame);
        figma.currentPage.selection = [frame];
        figma.viewport.scrollAndZoomIntoView([frame]);
      })
      .then(() => {
        // This is how figma responds back to the ui
        figma.ui.postMessage({
          type: 'create-table',
          message: `Created Table: its id is ${table.id}`,
        });
      })
      .catch((err) => console.error(err));
  }
};
