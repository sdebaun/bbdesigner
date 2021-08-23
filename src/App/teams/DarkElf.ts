import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Dark Elf'

const prepend = prependPositionTitle(title)

export const DarkElfLineman: Position = prepend({
    title: 'Lineman',
    ma: 6, st: 3, ag: 4, av: 8,
    startingSkills: [],
    normal: Normal.GA,
    double: Double.SP,
    cost: 70,
    max: 16,
})

export const DarkElfRunner: Position = prepend({
    title: 'Runner',
    ma: 7, st: 3, ag: 4, av: 7,
    startingSkills: ['Dump-Off'],
    normal: Normal.GAP,
    double: Double.S,
    cost: 80,
    max: 2,
})

export const DarkElfAssassin: Position = prepend({
    title: 'Assassin',
    ma: 6, st: 3, ag: 4, av: 7,
    startingSkills: ['Shadowing', 'Stab'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 90,
    max: 2,
})

export const DarkElfBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 7, st: 3, ag: 4, av: 8,
    startingSkills: ['Block'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 100,
    max: 4,
})

export const DarkElfWitchElf: Position = prepend({
    title: 'Witch Elf',
    ma: 7, st: 3, ag: 4, av: 7,
    startingSkills: ['Dodge', 'Frenzy', 'Jump Up'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 110,
    max: 2,
})

export const DarkElf: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        DarkElfLineman,
        DarkElfRunner,
        DarkElfAssassin,
        DarkElfBlitzer,
        DarkElfWitchElf,
    ]
}