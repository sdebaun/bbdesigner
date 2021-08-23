import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'High Elf'

const prepend = prependPositionTitle(title)

export const HighElfLineman: Position = prepend({
    title: 'Lineman',
    ma: 6, st: 3, ag: 4, av: 8,
    startingSkills: [],
    normal: Normal.GA,
    double: Double.SP,
    cost: 70,
    max: 16,
})

export const HighElfThrower: Position = prepend({
    title: 'Thrower',
    ma: 6, st: 3, ag: 4, av: 9,
    startingSkills: ['Pass', 'Safe Throw'],
    normal: Normal.GAP,
    double: Double.S,
    cost: 90,
    max: 2,
})

export const HighElfCatcher: Position = prepend({
    title: 'Catcher',
    ma: 8, st: 3, ag: 4, av: 7,
    startingSkills: ['Catch'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 90,
    max: 4,
})

export const HighElfBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 7, st: 3, ag: 4, av: 8,
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
        HighElfLineman,
        HighElfThrower,
        HighElfCatcher,
        HighElfBlitzer
    ]
}