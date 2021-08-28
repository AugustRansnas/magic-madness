import React, {createContext, useContext, useReducer} from 'react';
import reducer from './reducer';
import * as core from './core';

const store = createContext({});
const {Provider} = store;

export function StateProvider({children}) {
    const [state, dispatch] = useReducer(reducer, core.createInitialState());
    return <Provider value={{state, dispatch}}>{children}</Provider>;
}

export function useStore() {
    return useContext(store);
}
