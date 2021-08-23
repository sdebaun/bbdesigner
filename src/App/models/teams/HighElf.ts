import { BASE_UPGRADE_COSTS, SkillGroup, TeamType, Position } from "..";

export const HighElfLineman: Position = {
    title: 'High Elf Lineman',
    ma: 6, st: 3, ag: 4, av: 8,
    normal: [SkillGroup.General, SkillGroup.Agility],
    double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Passing],
    startingSkills: [],
    cost: 70,
    max: 16,
}

export const HighElfThrower: Position = {
    title: 'High Elf Thrower',
    ma: 6, st: 3, ag: 4, av: 9,
    normal: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Passing],
    double: [SkillGroup.Increase, SkillGroup.Strength],
    startingSkills: ['Pass', 'Safe Throw'],
    cost: 90,
    max: 2,
}

export const HighElfCatcher: Position = {
    title: 'High Elf Catcher',
    ma: 8, st: 3, ag: 4, av: 7,
    normal: [SkillGroup.General, SkillGroup.Agility],
    double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Passing],
    startingSkills: ['Catch'],
    cost: 90,
    max: 4,
}

export const HighElfBlitzer: Position = {
    title: 'High Elf Blitzer',
    ma: 7, st: 3, ag: 4, av: 8,
    normal: [SkillGroup.General, SkillGroup.Agility],
    double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Passing],
    startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
    cost: 50,
    max: 16,
}

export const HighElf: TeamType = {
    title: 'High Elf',
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positionals: [
        HighElfLineman,
        HighElfThrower,
        HighElfCatcher,
        HighElfBlitzer
    ]
}