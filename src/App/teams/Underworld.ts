import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Skaven } from './Skaven'
import { Goblin } from "./Goblin"

export const Underworld: TeamType = {
    title: 'Underworld',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Skaven.positions,
        ...Goblin.positions,
    ]
}
