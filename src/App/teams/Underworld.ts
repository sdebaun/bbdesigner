import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Undead } from './Undead'
import { NecromanticFleshGolem, NecromanticWerewolf } from './Necromantic'
import { KhemriThrower, KhemriBlitzer, KhemriTombGuardian } from './Khemri'
import { Vampire } from './Vampire'

import { Chaos } from './Chaos'
import { Skaven } from './Skaven'
import { DarkElf } from "./DarkElf"
import { Goblin } from "./Goblin"

export const Underworld: TeamType = {
    title: 'Underworld',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Skaven.positions,
        ...Goblin.positions,
    ]
}
