import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Skaven'

const prepend = prependPositionTitle(title)

export const SkavenLineman: Position = prepend({
    title: 'Lineman',
    ma: 7, st: 3, ag: 3, av: 7,
    startingSkills: [],
    normal: Normal.G,
    double: Double.ASPM,
    cost: 50,
    max: 16,
})

export const SkavenBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 6, st: 3, ag: 3, av: 8,
    startingSkills: ['Block'],
    normal: Normal.GS,
    double: Double.AMP,
    cost: 90,
    max: 2,
})

export const SkavenGutterRunner: Position = prepend({
    title: 'Gutter Runner',
    ma: 9, st: 2, ag: 4, av: 7,
    startingSkills: ['Dodge'],
    normal: Normal.GA,
    double: Double.SPM,
    cost: 80,
    max: 4,
})

export const SkavenThrower: Position = prepend({
    title: 'Thrower',
    ma: 7, st: 3, ag: 3, av: 7,
    startingSkills: [],
    normal: Normal.GP,
    double: Double.ASM,
    cost: 70,
    max: 2,
})

export const SkavenRatOgre: Position = prepend({
    title: 'Rat Ogre',
    ma: 4, st: 5, ag: 1, av: 9,
    startingSkills: ['Loner', 'Frenzy', 'Mighty Blow', 'Prehensile Tail', 'Wild Animal'],
    normal: Normal.S,
    double: Double.GAPM,
    cost: 150,
    max: 1,
})

export const Skaven: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        SkavenLineman,
        SkavenBlitzer,
        SkavenGutterRunner,
        SkavenThrower,
        SkavenRatOgre
    ]
}