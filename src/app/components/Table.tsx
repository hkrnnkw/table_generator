import * as React from 'react';
import { TableCellType } from '../../utils/types';
import { useCreateTable } from '../contexts/table/hooks';

type TableCellProps = {
    cell: TableCellType;
    key: number;
    isHead: boolean;
};

const TableCell = ({ cell, key, isHead }: TableCellProps) => {
    const textbox = React.useRef<HTMLInputElement>(undefined);
    const countRef = React.useCallback((element: HTMLInputElement) => {
        if (element) element.value = '5';
        textbox.current = element;
    }, []);

    const Input = () => (
        <>
            <input ref={countRef} defaultValue={cell.text} />
            {cell.helperText && <span>{cell.helperText}</span>}
        </>
    );

    return isHead ? (
        <th key={key}>
            <Input />
        </th>
    ) : (
        <td key={key}>
            <Input />
        </td>
    );
};

type TableRowProps = {
    cells: TableCellType[];
    index: number;
};

const TableRow = ({ cells, index }: TableRowProps) => (
    <tr key={index}>
        {cells.map((cell, j) => (
            <TableCell cell={cell} key={j} isHead={index === 0} />
        ))}
    </tr>
);

const Table = () => {
    const { currentTable } = useCreateTable();
    const thead = currentTable.rows.shift();
    const columns = currentTable.size.numberOfColumns;

    return (
        <table>
            <colgroup>
                {Array(columns).map((_, i) => (
                    <col key={i} />
                ))}
            </colgroup>
            <thead>
                <TableRow cells={thead.cells} index={0} />
            </thead>
            <tbody>
                {currentTable.rows.map((row, i) => (
                    <TableRow cells={row.cells} index={i + 1} />
                ))}
            </tbody>
        </table>
    );
};

export default Table;
