import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Undead } from './Undead'
import { NecromanticFleshGolem, NecromanticWerewolf } from './Necromantic'
import { KhemriThrower, KhemriBlitzer, KhemriTombGuardian } from './Khemri'
import { Vampire } from './Vampire'

export const AfterlifeUnited: TeamType = {
    title: 'Afterlife United',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Undead.positions,
        NecromanticFleshGolem,
        NecromanticWerewolf,
        KhemriThrower,
        KhemriBlitzer,
        KhemriTombGuardian,
        ...Vampire.positions,
    ]
}
