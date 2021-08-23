import { TeamType } from '../models/TeamType'

import { ChaosDwarf } from './ChaosDwarf'
import { HighElf } from './HighElf'
import { Vampire } from './Vampire'
import { Brettonian } from './Brettonian'
import { Undead } from './Undead'
import { Necromantic } from './Necromantic'
import { Khemri } from './Khemri'
import { AfterlifeUnited } from './AfterlifeUnited'
import { SuperiorBeingRing } from './SuperiorBeingRing'
import { Orc } from './Orc'

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
    | 'Orc'

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
    Orc,
}
