import { BASE_UPGRADE_COSTS, TeamType } from "../models";

import { Brettonian } from "./Brettonian";
import { Human } from "./Human";
import { Dwarf } from "./Dwarf";
import { Halfling } from "./Halfling";
import { WoodElf } from "./WoodElf";


export const AllianceOfGoodness: TeamType = {
    title: 'Alliance of Goodness',
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        ...Brettonian.positions,
        ...Human.positions,
        ...Dwarf.positions,
        ...Halfling.positions,
        ...WoodElf.positions,
    ]
}
