import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Chaos'

const prepend = prependPositionTitle(title)

export const ChaosBeastman: Position = prepend({
    title: 'Beastman',
    ma: 6, st: 3, ag: 3, av: 8,
    startingSkills: ['Horns'],
    normal: Normal.GSM,
    double: Double.AP,
    cost: 60,
    max: 16,
})

export const ChaosWarrior: Position = prepend({
    title: 'Warrior',
    ma: 5, st: 4, ag: 3, av: 9,
    startingSkills: [],
    normal: Normal.GSM,
    double: Double.AP,
    cost: 100,
    max: 4,
})

export const ChaosMinotaur: Position = prepend({
    title: 'Minotaur',
    ma: 5, st: 5, ag: 2, av: 8,
    startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
    normal: Normal.S,
    double: Double.GAPM,
    cost: 150,
    max: 16,
})

export const Chaos: TeamType = {
    title: 'Chaos',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positions: [
        ChaosBeastman,
        ChaosWarrior,
        ChaosMinotaur
    ]
}