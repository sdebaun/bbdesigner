import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, replacePositionTitle, prependPositionTitle } from "../models";
import { UndeadZombie, UndeadGhoulRunner, UndeadWightBlitzer } from "./Undead";

const title = 'Necromantic'

const prepend = prependPositionTitle(title)

const rename = replacePositionTitle('Undead', title)

export const NecromanticZombie = rename(UndeadZombie)

export const NecromanticGhoulRunner = rename(UndeadGhoulRunner)

export const NecromanticWightBlitzer = rename(UndeadWightBlitzer)

export const NecromanticFleshGolem: Position = prepend({
    title: 'Flesh Golem',
    stats: { ma: 4, st: 4, ag: 2, av: 9 },
    startingSkills: ['Regeneration', 'Stand Firm', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 110,
    max: 2,
})

export const NecromanticWerewolf: Position = prepend({
    title: 'Werewolf',
    stats: { ma: 8, st: 3, ag: 3, av: 8 },
    startingSkills: ['Claw', 'Frenzy', 'Regeneration'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 120,
    max: 2,
})

export const Necromantic: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        NecromanticZombie,
        NecromanticGhoulRunner,
        NecromanticWightBlitzer,
        NecromanticFleshGolem,
        NecromanticWerewolf,
    ]
}