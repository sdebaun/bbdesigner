import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Dwarf'

const prepend = prependPositionTitle(title)

export const DwarfBlocker: Position = prepend({
    title: 'Blocker',
    stats: { ma: 4, st: 3, ag: 2, av: 9 },
    startingSkills: ['Block', 'Tackle', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 70,
    max: 16,
})

export const DwarfRunner: Position = prepend({
    title: 'Runner',
    stats: { ma: 6, st: 3, ag: 3, av: 8 },
    startingSkills: ['Sure Hands', 'Thick Skull'],
    normal: Normal.GP,
    double: Double.AS,
    cost: 80,
    max: 2,
})

export const DwarfBlitzer: Position = {
    title: 'Blitzer',
    stats: { ma: 5, st: 3, ag: 3, av: 9 },
    startingSkills: ['Block', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 80,
    max: 2,
}

export const DwarfTrollSlayer: Position = {
    title: 'Troll Slayer',
    stats: { ma: 5, st: 3, ag: 2, av: 8 },
    startingSkills: ['Block', 'Frenzy', 'Dauntless', 'Thick Skull'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 90,
    max: 2,
}

export const DwarfDeathRoller: Position = {
    title: 'Deathroller',
    stats: { ma: 4, st: 7, ag: 1, av: 10 },
    startingSkills: ['Loner', 'Break Tackle', 'Dirty Player', 'Juggernaut', 'No Hands', 'Mighty Blow', 'Secret Weapon', 'Stand Firm'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 160,
    max: 1,
}

export const Dwarf: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 50, ...BASE_UPGRADE_COSTS},
    positions: [
        DwarfBlocker,
        DwarfRunner,
        DwarfBlitzer,
        DwarfTrollSlayer,
        DwarfDeathRoller
    ]
}