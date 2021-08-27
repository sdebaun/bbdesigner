import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Piece, Position, Skill, TeamTypeKey, Upgrade, Upgrades, TeamTypes, Stat } from './models'
import { generateSlug } from 'random-word-slugs'
import { filter, find, map, pipe, prop, propEq, sortBy } from 'ramda';
// import { TeamTypes } from './models/TeamType';

export type AppState = {
  selectedTeamType?: TeamTypeKey
  pieces: Piece[]
  upgrades: Upgrades
}

type AppAction =
  | { type: 'selectTeamType', selectedTeamType: string }
  | { type: 'clearTeamType' }
  | { type: 'addPiece', positional: Position }
  | { type: 'deletePiece', title: string }
  | { type: 'increasePiece', title: string }
  | { type: 'decreasePiece', title: string }
  | { type: 'clonePiece', title: string }
  | { type: 'addSkillName', title: string, skill: Skill }
  | { type: 'removeSkillName', title: string, skill: Skill }
  | { type: 'increaseUpgrade', upgrade: Upgrade }
  | { type: 'decreaseUpgrade', upgrade: Upgrade }
  | { type: 'increaseStat', title: string, stat: Stat}
  | { type: 'decreaseStat', title: string, stat: Stat}

const initialState = {
  pieces: [],
  upgrades: {
    'Team Reroll': 0,
    'Apothecary': 0,
    'Coach': 0,
    'Cheerleader': 0,
    'Fan Factor': 0,
  }
}

export const AppStateContext = createContext<[AppState, Dispatch<AppAction>]>([initialState, () => {}]);

type AppReducer = (prev: AppState, action: AppAction) => AppState

const makePiece: (positional: Position) => Piece =
  positional => ({
    title: generateSlug(2),
    addedSkills: [],
    positional,
    count: 0,
    increase: { ma: 0, st: 0, ag: 0, av: 0}
  })

const clonePiece: (piece: Piece) => Piece =
  piece => ({
    ...piece,
    title: generateSlug(2),
    count: 0,
  })

const reducer: AppReducer =
  (prev, action) => {
    console.log(JSON.stringify(action, null, 2))

    const next = reduce(prev, action)
    console.log(JSON.stringify(next, null, 2))

    return next
  }

// const findByTitle: (title: string) => <T extends Record<'title', string>>(things: T[]) => T | undefined =
//   title =>
//     find<{title: string}>(propEq('title')('title'))

  // const findByTitle =
  //   (title: string) =>
  //     find<{title: string}>(propEq('title')('title'))

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
        if (!Object.keys(TeamTypes).includes(action.selectedTeamType)) return prev
        return ({
          ...initialState,
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
      case 'deletePiece':
        return ({
          ...prev,
          pieces: sortPieces(filter((p: Piece) => p.title !== action.title)(prev.pieces))
        })
      case 'increasePiece':
          return ({
            ...prev,
            pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, count: p.count + 1}) : p)(prev.pieces))
          })
      case 'decreasePiece':
          return ({
            ...prev,
            pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, count: p.count - 1}) : p)(prev.pieces))
          })
      case 'clonePiece':
        const toClone = find(propEq('title', action.title), prev.pieces)
        if (!toClone) return prev
        return ({
          ...prev,
          pieces: sortPieces([...prev.pieces, clonePiece(toClone)])
        })
    case 'addSkillName':
        return ({
          ...prev,
          pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, addedSkills: [...p.addedSkills, action.skill]}) : p)(prev.pieces))
        })
      case 'removeSkillName':
        return ({
          ...prev,
          pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, addedSkills: p.addedSkills.filter(sn => sn !== action.skill)}) : p)(prev.pieces))
        })
      case 'increaseUpgrade':
        return ({
          ...prev,
          upgrades: {
            ...prev.upgrades,
            [action.upgrade]: prev.upgrades[action.upgrade] + 1
          }
        })
      case 'decreaseUpgrade':
        return ({
          ...prev,
          upgrades: {
            ...prev.upgrades,
            [action.upgrade]: prev.upgrades[action.upgrade] - 1
          }
        })
      case 'increaseStat':
        return ({
          ...prev,
          pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, increase: {...p.increase, [action.stat]: p.increase[action.stat] + 1}}) : p)(prev.pieces))
        })
      case 'decreaseStat':
        return ({
          ...prev,
          pieces: sortPieces(map((p: Piece) => p.title === action.title ? ({...p, increase: {...p.increase, [action.stat]: p.increase[action.stat] - 1}}) : p)(prev.pieces))
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
