import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Undead } from './Undead'
import { NecromanticFleshGolem, NecromanticWerewolf } from './Necromantic'
import { KhemriThrower, KhemriBlitzer, KhemriTombGuardian } from './Khemri'
import { Vampire } from './Vampire'

import { Chaos } from './Chaos'
import { Skaven } from './Skaven'
import { DarkElf } from "./DarkElf"
// import { Underworld } from './Underworld'

export const ChaoticPlayerPact: TeamType = {
    title: 'Chaotic Player Pact',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Chaos.positions,
        ...Skaven.positions,
        ...DarkElf.positions,
        // ...Underworld.positions,
    ]
}
