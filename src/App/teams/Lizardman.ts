import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Lizardman'

const prepend = prependPositionTitle(title)

export const LizardmanSkink: Position = prepend({
    title: 'Skink',
    stats: { ma: 8, st: 2, ag: 3, av: 7 },
    startingSkills: ['Dodge', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 60,
    max: 16,
})

export const LizardmanSaurus: Position = prepend({
    title: 'Saurus',
    stats: { ma: 6, st: 4, ag: 1, av: 9 },
    startingSkills: [],
    normal: Normal.GS,
    double: Double.AP,
    cost: 80,
    max: 6,
})

export const LizardmanKroxigor: Position = prepend({
    title: 'Kroxigor',
    stats: { ma: 6, st: 5, ag: 1, av: 9 },
    startingSkills: ['Loner', 'Bone-Head', 'Mighty Blow', 'Prehensile Tail', 'Thick Skull'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 140,
    max: 1,
})

export const Lizardman: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        LizardmanSkink,
        LizardmanSaurus,
        LizardmanKroxigor,
    ]
}