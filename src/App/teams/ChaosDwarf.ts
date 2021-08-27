import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double } from "../models";

export const HobgoblinRunner: Position = {
    title: 'Hobgoblin Runner',
    stats: { ma: 6, st: 3, ag: 3, av: 7 },
    startingSkills: [],
    normal: Normal.G,
    double: Double.ASP,
    cost: 40,
    max: 16,
}

export const ChaosDwarfBlocker: Position = {
    title: 'Chaos Dwarf Blocker',
    stats: { ma: 4, st: 3, ag: 2, av: 9 },
    startingSkills: ['Block', 'Tackle', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AMP,
    cost: 70,
    max: 6,
}

export const BullCentaurBlitzer: Position = {
    title: 'Bull Centaur Blitzer',
    stats: { ma: 6, st: 4, ag: 2, av: 9 },
    startingSkills: ['Sprint', 'Sure Feet', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 130,
    max: 2,
}

export const EnslavedMinotaur: Position = {
    title: 'Enslaved Minotaur',
    stats: { ma: 5, st: 5, ag: 2, av: 8 },
    startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
    normal: Normal.S,
    double: Double.GAPM,
    cost: 150,
    max: 16,
}

export const ChaosDwarf: TeamType = {
    title: 'Chaos Dwarf',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        HobgoblinRunner,
        ChaosDwarfBlocker,
        BullCentaurBlitzer,
        EnslavedMinotaur
    ]
}