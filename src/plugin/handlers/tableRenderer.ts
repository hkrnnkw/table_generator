import { TableType } from '../../utils/types';

export const createTableFrame = (table: TableType): FrameNode => {
  const frame = figma.createFrame();

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (i === 0) {
      frame.resize(frame.width, row.height);
    } else {
      frame.resize(frame.width, frame.height + row.height);
    }
    for (let j = 0; j < table.columns.length; j++) {
      const rect = figma.createRectangle();
      const columnId = row.cells[j].columnId;
      const column = table.columns.find((column) => column.id === columnId);
      rect.x = j * column.width;
      rect.y = i * row.height;
      rect.resize(column.width, row.height);
      rect.fills = [{ type: 'SOLID', color: row.cells[j].backgroundColor }];
      frame.appendChild(rect);
      if (j === 0) {
        frame.resize(column.width, frame.height);
      } else {
        frame.resize(frame.width + column.width, frame.height);
      }
    }
  }

  return frame;
};
