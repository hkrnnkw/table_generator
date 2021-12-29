import { TableType } from '../../../utils/types';
import { initTable } from '../../handlers/tableFormatter';

export type State = {
  currentTable: TableType;
};

export const initialState: State = {
  currentTable: initTable(3, 3),
} as const;

export const CREATE_TABLE_ACTIONS = {
  SET_CURRENT_TABLE: 'CreateTableActions:setCurrentTable',
} as const;

export type CreateTableActionType = {
  type: typeof CREATE_TABLE_ACTIONS.SET_CURRENT_TABLE;
  payload: { currentTable };
};
