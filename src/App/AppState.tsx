import React, {createContext, Dispatch, DispatchWithoutAction, useContext, useReducer, useState} from 'react';

export type AppState = {
  selectedTeamType?: string,
}

type AppAction =
  | { type: 'selectTeamType', selectedTeamType: string }

const initialState = {}

export const AppStateContext = createContext<[AppState, Dispatch<AppAction>]>([initialState, () => {}]);

type AppReducer = (prev: AppState, action: AppAction) => AppState

const reducer: AppReducer =
  (prev, action) => {
    console.log(JSON.stringify(action, null, 2))

    return ({
      ...prev,
      selectedTeamType: action.selectedTeamType,
    })
  }
  
  

export const AppStateProvider: React.FC = ({children}) =>(
  <AppStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppStateContext.Provider>
);

export const useAppState = () => useContext(AppStateContext);
