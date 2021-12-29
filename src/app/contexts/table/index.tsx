import * as React from 'react';
import { createContext, ReactChild, useReducer, Dispatch } from 'react';

export * from './constants';

import { State, initialState, CreateTableActionType } from './constants';
import { reducer } from './reducer';

// 参照用context
export const CreateTableContext = createContext<State>(initialState);
// 更新用context
export const CreateTableUpdateContext = createContext<
    Dispatch<CreateTableActionType>
>(() => {});

export const CreateTableProvider = ({ children }: { children: ReactChild }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CreateTableContext.Provider value={{ ...state }}>
            <CreateTableUpdateContext.Provider value={dispatch}>
                {children}
            </CreateTableUpdateContext.Provider>
        </CreateTableContext.Provider>
    );
};
