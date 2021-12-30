import { TableCellType, TableType } from '../../utils/types';

const createCellText = async (
  cell: TableCellType,
  columnWidth: number,
  rowHeight: number,
  x: number,
  y: number
): Promise<TextNode> => {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
  const text = figma.createText();
  text.x = x * columnWidth;
  text.y = y * rowHeight;
  text.resize(columnWidth, rowHeight);
  text.characters = cell.text;
  text.fills = [{ type: 'SOLID', color: cell.color }];
  return text;
};

const createCellRect = (
  cell: TableCellType,
  columnWidth: number,
  rowHeight: number,
  x: number,
  y: number
): RectangleNode => {
  const rect = figma.createRectangle();
  rect.x = x * columnWidth;
  rect.y = y * rowHeight;
  rect.resize(columnWidth, rowHeight);
  rect.fills = [{ type: 'SOLID', color: cell.backgroundColor }];
  return rect;
};

export const createTableFrame = async (
  table: TableType
): Promise<FrameNode> => {
  const frame = figma.createFrame();

  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    if (i === 0) {
      frame.resize(frame.width, row.height);
    } else {
      frame.resize(frame.width, frame.height + row.height);
    }
    for (let j = 0; j < table.columns.length; j++) {
      const columnId = row.cells[j].columnId;
      const column = table.columns.find((column) => column.id === columnId);
      const cellRect = createCellRect(
        row.cells[j],
        column.width,
        row.height,
        j,
        i
      );
      const cellText = await createCellText(
        row.cells[j],
        column.width,
        row.height,
        j,
        i
      );
      const nodes: BaseNode[] = [cellRect, cellText];
      const cellGroup = figma.group(nodes, figma.currentPage);
      frame.appendChild(cellGroup);
      if (j === 0) {
        frame.resize(column.width, frame.height);
      } else {
        frame.resize(frame.width + column.width, frame.height);
      }
    }
  }

  return frame;
};
