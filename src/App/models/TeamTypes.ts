import { TeamType } from './TeamType'

import { ChaosDwarf } from '../teams/ChaosDwarf'
import { HighElf } from '../teams/HighElf'
import { Vampire } from '../teams/Vampire'
import { Brettonian } from '../teams/Brettonian'
import { Undead } from '../teams/Undead'
import { Necromantic } from '../teams/Necromantic'
import { Khemri } from '../teams/Khemri'
import { AfterlifeUnited } from '../teams/AfterlifeUnited'

import { SuperiorBeingRing } from '../teams/SuperiorBeingRing'

export type TeamTypeKey =
    | 'ChaosDwarf'
    | 'HighElf'
    | 'Vampire'
    | 'Brettonian'
    | 'SuperiorBeingRing'
    | 'Undead'
    | 'Necromantic'
    | 'Khemri'
    | 'AfterlifeUnited'

export const TeamTypes: {[k in TeamTypeKey]: TeamType} = {
    ChaosDwarf,
    HighElf,
    Vampire,
    Brettonian,
    SuperiorBeingRing,
    Undead,
    Necromantic,
    Khemri,
    AfterlifeUnited,
}
