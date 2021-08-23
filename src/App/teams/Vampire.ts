import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double } from "../models";

export const VampireThrall: Position = {
    title: 'Thrall',
    ma: 6, st: 3, ag: 3, av: 7,
    startingSkills: [],
    normal: Normal.G,
    double: Double.ASP,
    cost: 40,
    max: 16,
}

export const VampireVampire: Position = {
    title: 'Vampire',
    ma: 6, st: 4, ag: 4, av: 8,
    startingSkills: ['Regeneration', 'Hypnotic Gaze', 'Blood Lust'],
    normal: Normal.GAS,
    double: Double.P,
    cost: 110,
    max: 6,
}

export const Vampire: TeamType = {
    title: 'Vampire',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        VampireThrall,
        VampireVampire,
    ]
}