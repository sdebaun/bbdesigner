import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Halfling'

const prepend = prependPositionTitle(title)

export const HalflingLineman: Position = prepend({
    title: 'Lineman',
    ma: 5, st: 2, ag: 3, av: 6,
    startingSkills: ['Dodge', 'Right Stuff', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 30,
    max: 16,
})

export const HalflingCatcher: Position = prepend({
    title: 'Catcher',
    ma: 5, st: 2, ag: 3, av: 6,
    startingSkills: ['Catch', 'Dodge', 'Right Stuff', 'Sprint', 'Stunty'],
    normal: Normal.A,
    double: Double.GSP,
    cost: 50,
    max: 2,
})

export const HalflingHefty: Position = prepend({
    title: 'Hefty',
    ma: 5, st: 2, ag: 3, av: 7,
    startingSkills: ['Dodge', 'Fend', 'Stunty'],
    normal: Normal.AP,
    double: Double.GS,
    cost: 50,
    max: 2,
})

export const HalflingTreeman: Position = prepend({
    title: 'Treeman',
    ma: 4, st: 5, ag: 1, av: 9,
    startingSkills: ['Mighty Blow', 'Stand Firm', 'Strong Arm', 'Take Root', 'Thick Skull', 'Throw Team-Mate', 'Timm-ber!'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 120,
    max: 2,
})

export const Halfling: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        HalflingLineman,
        HalflingCatcher,
        HalflingHefty,
        HalflingTreeman,
    ]
}