import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Piece, Positional, TeamTypeKey, TEAM_TYPES } from './TeamTypes'
import { generateSlug } from 'random-word-slugs'
import { pipe, prop, sortBy } from 'ramda';

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
    title: generateSlug(2),
    normalSkills: [],
    doubleSkills: [],
    positional,
  })

const reducer: AppReducer =
  (prev, action) => {
    console.log(JSON.stringify(action, null, 2))

    const next = reduce(prev, action)
    console.log(JSON.stringify(next, null, 2))

    return next
  }

const piecePositionalTitle: (piece: Piece) => string =
  pipe(prop('positional'), prop('title'))

const pieceTitle: (piece: Piece) => string =
  prop('title')

const pieceComparator: (piece: Piece) => string =
  piece =>
    piecePositionalTitle(piece) + pieceTitle(piece)

const sortPieces = sortBy(pieceComparator)

const reduce: AppReducer =
  (prev, action) => {
    switch (action.type) {
      case 'selectTeamType':
        if (!Object.keys(TEAM_TYPES).includes(action.selectedTeamType)) return prev
        return ({
          ...prev,
          pieces: [],
          selectedTeamType: action.selectedTeamType as TeamTypeKey,
        })
      case 'clearTeamType':
        return ({
          ...prev,
          pieces: [],
          selectedTeamType: undefined
        })
      case 'addPiece':
        return ({
          ...prev,
          pieces: sortPieces([...prev.pieces, makePiece(action.positional)])
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
