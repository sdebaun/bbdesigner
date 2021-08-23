import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Human'

const prepend = prependPositionTitle(title)

export const HumanLineman: Position = prepend({
    title: 'Lineman',
    ma: 6, st: 3, ag: 3, av: 8,
    startingSkills: [],
    normal: Normal.G,
    double: Double.ASP,
    cost: 50,
    max: 16,
})

export const HumanCatcher: Position = prepend({
    title: 'Catcher',
    ma: 8, st: 2, ag: 3, av: 7,
    startingSkills: ['Catch', 'Dodge'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 60,
    max: 4,
})

export const HumanThrower: Position = prepend({
    title: 'Thrower',
    ma: 6, st: 3, ag: 3, av: 8,
    startingSkills: ['Pass', 'Sure Hands'],
    normal: Normal.GP,
    double: Double.AS,
    cost: 70,
    max: 2,
})

export const HumanBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 7, st: 3, ag: 3, av: 8,
    startingSkills: ['Block'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 90,
    max: 4,
})

export const HumanOgre: Position = prepend({
    title: 'Ogre',
    ma: 5, st: 5, ag: 2, av: 9,
    startingSkills: ['Loner', 'Bone-Head', 'Mighty Blow', 'Thick Skull', 'Throw Team-Mate'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 140,
    max: 1,
})

export const Human: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        HumanLineman,
        HumanBlitzer,
        HumanThrower,
        HumanCatcher,
        HumanOgre
    ]
}