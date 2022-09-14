import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Kislev'

const prepend = prependPositionTitle(title)

export const KislevLineman: Position = prepend({
    title: 'Lineman',
    stats: { ma: 6, st: 3, ag: 3, av: 8 },
    startingSkills: ['Leap', 'VLL'],
    normal: Normal.G,
    double: Double.ASP,
    cost: 60,
    max: 16,
})

export const KislevCatcher: Position = prepend({
    title: 'Catcher',
    stats: { ma: 7, st: 2, ag: 4, av: 7 },
    startingSkills: ['Diving Catch', 'Leap', 'VLL'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 80,
    max: 4,
})

export const KislevBlitzer: Position = prepend({
    title: 'Blitzer',
    stats: { ma: 7, st: 3, ag: 3, av: 8 },
    startingSkills: ['Diving Tackle', 'Jump Up', 'Leap', 'VLL'],
    normal: Normal.GAS,
    double: Double.P,
    cost: 110,
    max: 4,
})

export const KislevTamedBear: Position = prepend({
    title: 'Tamed Bear',
    stats: { ma: 6, st: 5, ag: 1, av: 9 },
    startingSkills: ['Loner', 'Bone-Head', 'Mighty Blow', 'Thick Skull', 'Prehensile Chain(Tail)'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 140,
    max: 1,
})

export const Kislev: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        KislevLineman,
        KislevBlitzer,
        KislevCatcher,
        KislevTamedBear
    ]
}