import React, {createContext, Dispatch, DispatchWithoutAction, useContext, useReducer, useState} from 'react';
import { Piece, Positional, TeamTypeKey, TEAM_TYPES } from './TeamTypes'

export type AppState = {
  selectedTeamType?: TeamTypeKey,
  pieces: Piece[]
}

type AppAction =
  | { type: 'selectTeamType', selectedTeamType: string }
  | { type: 'clearTeamType' }
  | { type: 'addPiece', positional: Positional }

const initialState = {
  pieces: []
}

export const AppStateContext = createContext<[AppState, Dispatch<AppAction>]>([initialState, () => {}]);

type AppReducer = (prev: AppState, action: AppAction) => AppState

const makePiece: (positional: Positional) => Piece =
  positional => ({
    title: '',
    normalSkills: [],
    doubleSkills: [],
    positional,
  })

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
      case 'addPiece':
        return ({
          ...prev,
          pieces: [...prev.pieces, makePiece(action.positional)]
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
