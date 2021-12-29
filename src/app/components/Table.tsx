import * as React from 'react';
import { TableCellType, TableRowType } from '../../utils/types';
import { useCreateTable } from '../contexts/table/hooks';

type TableCellProps = {
  cell: TableCellType;
};

const Input = ({ cell }: TableCellProps) => {
  const textbox = React.useRef<HTMLInputElement>(undefined);
  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  return (
    <>
      <input ref={countRef} defaultValue={cell.text} />
      {cell.helperText && <span>{cell.helperText}</span>}
    </>
  );
};

const TableHeaderCell = (props: TableCellProps) => {
  return (
    <th>
      <Input {...props} />
    </th>
  );
};

const TableDataCell = (props: TableCellProps) => {
  return (
    <td>
      <Input {...props} />
    </td>
  );
};

type TableRowProps = {
  cells: TableCellType[];
  isHead: boolean;
};

const TableRow = ({ cells, isHead }: TableRowProps) => (
  <tr>
    {cells.map((cell, j) =>
      isHead ? (
        <TableHeaderCell cell={cell} key={j} />
      ) : (
        <TableDataCell cell={cell} key={j} />
      )
    )}
  </tr>
);

const Table = () => {
  const { currentTable } = useCreateTable();
  const thead: TableRowType = currentTable.rows[0];
  const tbody: TableRowType[] = currentTable.rows.slice(1);

  return (
    <table>
      <colgroup>
        {currentTable.columns.map((_, i) => (
          <col key={i} />
        ))}
      </colgroup>
      <thead>
        <TableRow cells={thead.cells} isHead={true} />
      </thead>
      <tbody>
        {tbody.map((row, i) => (
          <TableRow cells={row.cells} isHead={false} key={i} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
