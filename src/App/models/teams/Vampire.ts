import { BASE_UPGRADE_COSTS, SkillGroup, TeamType, Position } from "..";

export const VampireThrall: Position = {
    title: 'Thrall',
    ma: 6, st: 3, ag: 3, av: 7,
    normal: [SkillGroup.General],
    double: [SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Strength, SkillGroup.Passing],
    startingSkills: [],
    cost: 40,
    max: 16,
}

export const VampireVampire: Position = {
    title: 'Vampire',
    ma: 6, st: 4, ag: 4, av: 8,
    normal: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Strength],
    double: [SkillGroup.Increase, SkillGroup.Passing],
    startingSkills: ['Regeneration', 'Hypnotic Gaze', 'Blood Lust'],
    cost: 110,
    max: 6,
}

export const Vampire: TeamType = {
    title: 'Vampire',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positionals: [
        VampireThrall,
        VampireVampire,
    ]
}