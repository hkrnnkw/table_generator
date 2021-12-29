import { useContext } from 'react';
import { TableType } from '../../../utils/types';
import { CreateTableContext, CreateTableUpdateContext } from './index';
import { actions } from './reducer';

// tableの参照&更新
export const useCreateTable = () => {
    const { currentTable } = useContext(CreateTableContext);
    const dispatch = useContext(CreateTableUpdateContext);

    const setCurrentTable = (table: TableType) => {
        dispatch(actions.setCurrentTable(table));
    };

    return {
        currentTable,
        setCurrentTable,
    } as const;
};
