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
import { Lizardman } from './Lizardman'
import { Ogre } from './Ogre'
import { Goblin } from './Goblin'
import { ViolenceTogether } from './ViolenceTogether'
import { Skaven } from './Skaven'
import { FarEastAssociation } from './FarEastAssociation'
import { Chaos } from './Chaos'
import { DarkElf } from './DarkElf'
import { ChaoticPlayerPact } from './ChaoticPlayerPact'
import { Underworld } from './Underworld'
import { Human } from './Human'
import { Dwarf } from './Dwarf'
import { Halfling } from './Halfling'
import { WoodElf } from './WoodElf'
import { AllianceOfGoodness } from './AllianceOfGoodness'
import { Nurgle } from './Nurgle'
import { ChaosGodsSelection } from './ChaosGodsSelection'
import { UnionOfSmallPeople } from './UnionOfSmallPeople'
import { Kislev } from './Kislev'

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
    | 'Lizardman'
    | 'Ogre'
    | 'Goblin'
    | 'ViolenceTogether'
    | 'Skaven'
    | 'FarEastAssociation'
    | 'Chaos'
    | 'DarkElf'
    | 'ChaoticPlayerPact'
    | 'Underworld'
    | 'Human'
    | 'Dwarf'
    | 'Halfling'
    | 'WoodElf'
    | 'AllianceOfGoodness'
    | 'Nurgle'
    | 'ChaosGodsSelection'
    | 'UnionOfSmallPeople'
    | 'Kislev'

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
    Lizardman,
    Ogre,
    Goblin,
    ViolenceTogether,
    Skaven,
    FarEastAssociation,
    Chaos,
    DarkElf,
    ChaoticPlayerPact,
    Underworld,
    Human,
    Dwarf,
    Halfling,
    WoodElf,
    AllianceOfGoodness,
    Nurgle,
    ChaosGodsSelection,
    UnionOfSmallPeople,
    Kislev,
}
