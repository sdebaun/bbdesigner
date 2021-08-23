import { BASE_UPGRADE_COSTS, TeamType } from "..";

import { ChaosDwarf } from './ChaosDwarf'
import { HighElf } from './HighElf'
import { Vampire } from './Vampire'
import { Brettonian } from './Brettonian'

export const SuperiorBeingRing: TeamType = {
    title: 'Superior Being Ring',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...ChaosDwarf.positions,
        ...HighElf.positions,
        ...Vampire.positions,
        ...Brettonian.positions,
    ]
}
