import { TeamType } from './TeamType'

import { ChaosDwarf } from '../teams/ChaosDwarf'
import { HighElf } from '../teams/HighElf'
import { Vampire } from '../teams/Vampire'
import { Brettonian } from '../teams/Brettonian'

import { SuperiorBeingRing } from '../teams/SuperiorBeingRing'

export type TeamTypeKey =
    | 'ChaosDwarf'
    | 'HighElf'
    | 'Vampire'
    | 'Brettonian'
    | 'SuperiorBeingRing'

export const TeamTypes: {[k in TeamTypeKey]: TeamType} = {
    ChaosDwarf,
    HighElf,
    Vampire,
    Brettonian,
    SuperiorBeingRing,
}
