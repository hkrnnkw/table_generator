import {
    TableCellType,
    TableRowType,
    TableSizeType,
    TableType,
} from '../../utils/types';

export const initTable = (size: TableSizeType, id: number = 0): TableType => {
    const { numberOfColumns, numberOfRows } = size;
    const cell: TableCellType = {
        text: '',
        color: '#000000',
        helperText: '',
        backgroundColor: '#FFFFFF',
    };
    const row: TableRowType = {
        cells: [...Array(numberOfColumns)].map((_) => cell),
        height: 24,
    };
    const table: TableType = {
        id,
        size,
        rows: [...Array(numberOfRows)].map((_) => row),
    };
    return table;
};
