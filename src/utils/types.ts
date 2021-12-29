export type TableSizeType = {
    numberOfColumns: number;
    numberOfRows: number;
};

export type TableType = {
    id: number;
    rows: TableRowType[];
    size: TableSizeType;
};

export type TableRowType = {
    cells: TableCellType[];
    height: number;
};

export type TableCellType = {
    text: string;
    color: string;
    helperText?: string;
    backgroundColor: string;
};
