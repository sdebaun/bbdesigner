import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Ogre } from './Ogre'
import { Goblin } from './Goblin'
import { Halfling } from './Halfling'

export const UnionOfSmallPeople: TeamType = {
    title: 'Union of Small People',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Ogre.positions,
        ...Goblin.positions,
        ...Halfling.positions,
    ]
}
