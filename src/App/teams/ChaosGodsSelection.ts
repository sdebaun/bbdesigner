import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Chaos } from './Chaos';
import { Nurgle } from './Nurgle'

export const ChaosGodsSelection: TeamType = {
    title: 'Chaos Gods Selection',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Chaos.positions,
        ...Nurgle.positions,
    ]
}
