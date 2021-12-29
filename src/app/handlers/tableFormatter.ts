import { TableCellType, TableRowType, TableType } from '../../utils/types';

export const initTable = (
  numberOfColumns: number,
  numberOfRows: number,
  id: number = 0
): TableType => {
  const cell = (columnId: number): TableCellType => ({
    text: '',
    color: '#000000',
    columnId,
    helperText: '',
    backgroundColor: '#FFFFFF',
  });
  const row: TableRowType = {
    cells: [...Array(numberOfColumns)].map((_, i) => cell(i)),
    height: 56,
  };
  const table: TableType = {
    id,
    rows: [...Array(numberOfRows)].map((_) => row),
    columns: [...Array(numberOfColumns)].map((_, i) => ({ id: i, width: 104 })),
  };
  return table;
};
