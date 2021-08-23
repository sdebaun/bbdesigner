import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double } from "../models";

export const HighElfLineman: Position = {
    title: 'High Elf Lineman',
    ma: 6, st: 3, ag: 4, av: 8,
    startingSkills: [],
    normal: Normal.GA,
    double: Double.SP,
    cost: 70,
    max: 16,
}

export const HighElfThrower: Position = {
    title: 'High Elf Thrower',
    ma: 6, st: 3, ag: 4, av: 9,
    startingSkills: ['Pass', 'Safe Throw'],
    normal: Normal.GAP,
    double: Double.S,
    cost: 90,
    max: 2,
}

export const HighElfCatcher: Position = {
    title: 'High Elf Catcher',
    ma: 8, st: 3, ag: 4, av: 7,
    startingSkills: ['Catch'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 90,
    max: 4,
}

export const HighElfBlitzer: Position = {
    title: 'High Elf Blitzer',
    ma: 7, st: 3, ag: 4, av: 8,
    startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 100,
    max: 2,
}

export const HighElf: TeamType = {
    title: 'High Elf',
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        HighElfLineman,
        HighElfThrower,
        HighElfCatcher,
        HighElfBlitzer
    ]
}