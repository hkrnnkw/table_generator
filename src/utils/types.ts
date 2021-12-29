export type TableType = {
  id: number;
  rows: TableRowType[];
  columns: TableColumnType[];
};

export type TableRowType = {
  cells: TableCellType[];
  height: number;
};

export type TableCellType = {
  text: string;
  color: RGB;
  columnId: number;
  helperText?: string;
  backgroundColor: RGB;
};

export type TableColumnType = {
  id: number;
  width: number;
};
