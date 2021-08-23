import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { ChaosDwarf } from "./ChaosDwarf"
import { Orc } from "./Orc"
import { GoblinTroll } from "./Goblin";
import { Skaven } from "./Skaven";
import { Ogre } from "./Ogre";

const title = 'Far East Association'

export const FarEastAssociation: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        ...ChaosDwarf.positions,
        ...Orc.positions,
        GoblinTroll,
        ...Skaven.positions,
        ...Ogre.positions,
    ]
}
