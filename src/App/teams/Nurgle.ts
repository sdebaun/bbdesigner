import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Nurgle'

const prepend = prependPositionTitle(title)

export const Rotter: Position = prepend({
    title: 'Rotter',
    stats: { ma: 5, st: 3, ag: 3, av: 8 },
    startingSkills: ['Decay', 'Nurgles Rot'],
    normal: Normal.GM,
    double: Double.ASP,
    cost: 40,
    max: 16,
})

export const Pestigor: Position = prepend({
    title: 'Pestigor',
    stats: { ma: 6, st: 3, ag: 3, av: 8 },
    startingSkills: ['Horns', 'Nurgles Rot', 'Regeneration'],
    normal: Normal.GSM,
    double: Double.AP,
    cost: 80,
    max: 4,
})

export const NurgleWarrior: Position = prepend({
    title: 'Warrior',
    stats: { ma: 4, st: 4, ag: 2, av: 9 },
    startingSkills: ['Disturbing Presence', 'Foul Appearance', 'Nurgles Rot', 'Regeneration'],
    normal: Normal.GSM,
    double: Double.AP,
    cost: 110,
    max: 4,
})

export const BeastOfNurgle: Position = prepend({
    title: 'Beast of Nurgle',
    stats: { ma: 4, st: 5, ag: 1, av: 8 },
    startingSkills: ['Loner', 'Disturbing Presence', 'Foul Appearance', 'Mighty Blow', 'Nurgles Rot', 'Really Stupid', 'Regeneration', 'Tentacles'],
    normal: Normal.S,
    double: Double.GAPM,
    cost: 140,
    max: 1,
})

export const Nurgle: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        Rotter,
        Pestigor,
        NurgleWarrior,
        BeastOfNurgle
    ]
}