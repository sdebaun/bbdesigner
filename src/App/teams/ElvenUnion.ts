import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Elven Union'

const prepend = prependPositionTitle(title)

export const ElvenUnionLineman: Position = prepend({
    title: 'Lineman',
    stats: { ma: 6, st: 3, ag: 4, av: 8 },
    startingSkills: [],
    normal: Normal.GA,
    double: Double.SP,
    cost: 60,
    max: 16,
})

export const HighElfThrower: Position = prepend({
    title: 'Thrower',
    stats: { ma: 6, st: 3, ag: 4, av: 8 },
    startingSkills: ['Pass', 'Safe Throw'],
    normal: Normal.GAP,
    double: Double.S,
    cost: 90,
    max: 2,
})

export const HighElfCatcher: Position = prepend({
    title: 'Catcher',
    stats: { ma: 8, st: 3, ag: 4, av: 7 },
    startingSkills: ['Catch'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 90,
    max: 4,
})

export const HighElfBlitzer: Position = prepend({
    title: 'Blitzer',
    stats: { ma: 7, st: 3, ag: 4, av: 8 },
    startingSkills: ['Block'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 100,
    max: 2,
})

export const HighElf: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        ElvenUnionLineman,
        HighElfThrower,
        HighElfCatcher,
        HighElfBlitzer
    ]
}