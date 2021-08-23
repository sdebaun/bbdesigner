import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle, replacePositionTitle } from "../models";

const title = 'Orc'

const prepend = prependPositionTitle(title)

export const OrcLineman: Position = prepend({
    title: 'Lineman',
    ma: 5, st: 3, ag: 3, av: 9,
    startingSkills: [],
    normal: Normal.G,
    double: Double.ASP,
    cost: 50,
    max: 16,
})

export const OrcBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 6, st: 3, ag: 3, av: 9,
    startingSkills: ['Block'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 80,
    max: 4,
})

export const OrcBlackOrcBlocker: Position = prepend({
    title: 'Black Orc Blocker',
    ma: 4, st: 4, ag: 2, av: 9,
    startingSkills: [],
    normal: Normal.GS,
    double: Double.AP,
    cost: 80,
    max: 4,
})

export const OrcThrower: Position = prepend({
    title: 'Thrower',
    ma: 5, st: 3, ag: 3, av: 8,
    startingSkills: ['Pass', 'Sure Hands'],
    normal: Normal.GP,
    double: Double.AS,
    cost: 70,
    max: 2,
})

export const OrcGoblin: Position = prepend({
    title: 'Goblin',
    ma: 6, st: 2, ag: 3, av: 7,
    startingSkills: ['Dodge', 'Right Stuff', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 40,
    max: 4,
})

export const OrcTroll: Position = prepend({
    title: 'Troll',
    ma: 4, st: 5, ag: 1, av: 9,
    startingSkills: ['Loner', 'Always Hungry', 'Mighty Blow', 'Really Stupid', 'Regeneration', 'Throw Team-Mate'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 110,
    max: 1,
})

export const Orc: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        OrcLineman,
        OrcBlitzer,
        OrcBlackOrcBlocker,
        OrcThrower,
        OrcGoblin,
        OrcTroll
    ]
}