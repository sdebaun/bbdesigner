import { TeamType } from './TeamType'

import { ChaosDwarf } from './teams/ChaosDwarf'
import { HighElf } from './teams/HighElf'
import { Vampire } from './teams/Vampire'

export type TeamTypeKey =
    | 'ChaosDwarf'
    | 'HighElf'
    | 'Vampire'

export const TeamTypes: {[k in TeamTypeKey]: TeamType} = {
    ChaosDwarf,
    HighElf,
    Vampire,
}
