import React, {createContext, Dispatch, DispatchWithoutAction, useContext, useReducer, useState} from 'react';
import { Piece, TeamTypeKey, TEAM_TYPES } from './TeamTypes'

export type AppState = {
  selectedTeamType?: TeamTypeKey,
  pieces: Piece[]
}

type AppAction =
  // | { type: 'selectTeamType', selectedTeamType: keyof typeof TEAM_TYPES }
  | { type: 'selectTeamType', selectedTeamType: string }
  | { type: 'clearTeamType' }

const initialState = {
  pieces: []
}

export const AppStateContext = createContext<[AppState, Dispatch<AppAction>]>([initialState, () => {}]);

type AppReducer = (prev: AppState, action: AppAction) => AppState

const reducer: AppReducer =
  (prev, action) => {
    console.log(JSON.stringify(action, null, 2))

    switch (action.type) {
      case 'selectTeamType':
        if (!Object.keys(TEAM_TYPES).includes(action.selectedTeamType)) return prev
        return ({
          ...prev,
          selectedTeamType: action.selectedTeamType as TeamTypeKey,
        })
      case 'clearTeamType':
        return ({
          ...prev,
          selectedTeamType: undefined
        })
      default: return prev
    }
  }
  
  

export const AppStateProvider: React.FC = ({children}) =>(
  <AppStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppStateContext.Provider>
);

export const useAppState = () => useContext(AppStateContext);
