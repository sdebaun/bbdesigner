import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle, replacePositionTitle } from "../models";
import { HalflingTreeman } from "./Halfling";

const title = 'Wood Elf'

const prepend = prependPositionTitle(title)
const rename = replacePositionTitle('Halfling', 'Wood Elf')

export const WoodElfLineman: Position = prepend({
    title: 'Lineman',
    stats: { ma: 7, st: 3, ag: 4, av: 7 },
    startingSkills: [],
    normal: Normal.GA,
    double: Double.SP,
    cost: 70,
    max: 16,
})

export const WoodElfThrower: Position = prepend({
    title: 'Thrower',
    stats: { ma: 7, st: 3, ag: 4, av: 7 },
    startingSkills: ['Pass'],
    normal: Normal.GAP,
    double: Double.S,
    cost: 90,
    max: 2,
})

export const WoodElfCatcher: Position = prepend({
    title: 'Catcher',
    stats: { ma: 8, st: 2, ag: 4, av: 7 },
    startingSkills: ['Catch', 'Dodge', 'Sprint'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 90,
    max: 4,
})

export const WoodElfWardancer: Position = prepend({
    title: 'Wardancer',
    stats: { ma: 8, st: 3, ag: 4, av: 7 },
    startingSkills: ['Block', 'Dodge', 'Leap'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 120,
    max: 2,
})

export const WoodElfTreeman: Position = {
    ...rename(HalflingTreeman),
    max: 1,
}

export const WoodElf: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        WoodElfLineman,
        WoodElfThrower,
        WoodElfCatcher,
        WoodElfWardancer,
        WoodElfTreeman
    ]
}