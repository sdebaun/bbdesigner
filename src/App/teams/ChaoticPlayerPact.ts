import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Chaos } from './Chaos'
import { Skaven } from './Skaven'
import { DarkElf } from "./DarkElf"
import { Underworld } from './Underworld'

export const ChaoticPlayerPact: TeamType = {
    title: 'Chaotic Player Pact',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Chaos.positions,
        ...Skaven.positions,
        ...DarkElf.positions,
        ...Underworld.positions,
    ]
}
