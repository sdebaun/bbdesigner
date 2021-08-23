import { Position } from './Position'
import { Upgrades } from './Upgrade'

import { ChaosDwarf } from './teams/ChaosDwarf'

export type TeamTypeKey =
    | 'ChaosDwarf'

export type TeamType = {
    title: string
    dataEntryBy?: string
    upgradeCosts: Upgrades,
    positionals: Position[]
}

// export const TeamTypes: {[k in TeamTypeKey]: TeamType} = {
//     ChaosDwarf,
// }
