import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { OgreOgre, OgreGnoblar } from './Ogre'
import { GoblinGoblin, GoblinFanatic, GoblinPogoer, GoblinLooney, GoblinBombardier, GoblinTroll } from './Goblin'
import { NecromanticFleshGolem, NecromanticWerewolf } from './Necromantic'

export const UnionOfSmallPeople: TeamType = {
    title: 'Union of Small People',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Ogre.positions,
        ...Goblin.positions,
        ...Halfling.positions,
    ]
}
