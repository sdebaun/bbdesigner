import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Orc } from './Orc'
import { GoblinTroll } from './Goblin'
import { Lizardman } from './Lizardman'
import { Ogre } from './Ogre'

export const ViolenceTogether: TeamType = {
    title: 'Violence Together',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Orc.positions,
        GoblinTroll,
        ...Lizardman.positions,
        ...Ogre.positions,
    ]
}
