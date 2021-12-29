import { TableType } from '../../../utils/types';
import {
  State,
  CreateTableActionType,
  CREATE_TABLE_ACTIONS,
} from './constants';

export const actions = {
  setCurrentTable: (table: TableType): CreateTableActionType => {
    return {
      type: CREATE_TABLE_ACTIONS.SET_CURRENT_TABLE,
      payload: { currentTable: table },
    };
  },
} as const;

export const reducer = (state: State, action: CreateTableActionType): State => {
  switch (action.type) {
    case CREATE_TABLE_ACTIONS.SET_CURRENT_TABLE:
      return { ...state, currentTable: action.payload.currentTable };
  }
};
