import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle, replacePositionTitle } from "../models";
import { OrcGoblin } from "./Orc";

const title = 'Goblin'

const prepend = prependPositionTitle(title)

const rename = replacePositionTitle('Orc', 'Goblin')

export const GoblinGoblin: Position = rename(OrcGoblin)

export const GoblinFanatic: Position = prepend({
    title: 'Fanatic',
    stats: { ma: 3, st: 7, ag: 3, av: 7 },
    startingSkills: ['Ball and Chain', 'No Hands', 'Secret Weapon', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 70,
    max: 1,
})

export const GoblinPogoer: Position = prepend({
    title: 'Pogoer',
    stats: { ma: 7, st: 2, ag: 3, av: 7 },
    startingSkills: ['Dodge', 'Stunty', 'Very Long Legs', 'Leap'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 70,
    max: 1,
})

export const GoblinLooney: Position = prepend({
    title: 'Looney',
    stats: { ma: 6, st: 2, ag: 3, av: 7 },
    startingSkills: ['Chainsaw', 'Secret Weapon', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 40,
    max: 1,
})

export const GoblinBombardier: Position = prepend({
    title: 'Bombardier',
    stats: { ma: 6, st: 2, ag: 3, av: 7 },
    startingSkills: ['Bombardier', 'Dodge', 'Secret Weapon', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 40,
    max: 1,
})

export const GoblinTroll: Position = prepend({
    title: 'Troll',
    stats: { ma: 4, st: 5, ag: 1, av: 9 },
    startingSkills: ['Loner', 'Always Hungry', 'Mighty Blow', 'Really Stupid', 'Regeneration', 'Throw Team-Mate'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 110,
    max: 2,
})

export const Goblin: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        GoblinGoblin,
        GoblinFanatic,
        GoblinPogoer,
        GoblinLooney,
        GoblinBombardier,
        GoblinTroll,
    ]
}