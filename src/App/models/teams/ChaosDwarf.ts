import { BASE_UPGRADE_COSTS, SkillGroup, TeamType, Position } from "..";

export const HobgoblinRunner: Position = {
    title: 'Hobgoblin Runner',
    ma: 6, st: 3, ag: 3, av: 7,
    normal: [SkillGroup.General],
    double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
    startingSkills: [],
    cost: 40,
    max: 16,
}

export const ChaosDwarfBlocker: Position = {
    title: 'Chaos Dwarf Blocker',
    ma: 4, st: 3, ag: 2, av: 9,
    normal: [SkillGroup.General, SkillGroup.Strength],
    double: [SkillGroup.Increase, SkillGroup.Mutation, SkillGroup.Agility, SkillGroup.Passing],
    startingSkills: ['Block', 'Tackle', 'Thick Skull'],
    cost: 70,
    max: 6,
}

export const BullCentaurBlitzer: Position = {
    title: 'Bull Centaur Blitzer',
    ma: 6, st: 4, ag: 2, av: 9,
    normal: [SkillGroup.General, SkillGroup.Strength],
    double: [SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Passing],
    startingSkills: ['Sprint', 'Sure Feet', 'Thick Skull'],
    cost: 130,
    max: 2,
}

export const EnslavedMinotaur: Position = {
    title: 'Enslaved Minotaur',
    ma: 5, st: 5, ag: 2, av: 8,
    normal: [SkillGroup.Strength],
    double: [SkillGroup.Increase, SkillGroup.General, SkillGroup.Agility, SkillGroup.Passing, SkillGroup.Mutation],
    startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
    cost: 50,
    max: 16,
}

export const ChaosDwarf: TeamType = {
    title: 'Chaos Dwarf',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positionals: [
        HobgoblinRunner,
        ChaosDwarfBlocker,
        BullCentaurBlitzer,
        EnslavedMinotaur
    ]
}