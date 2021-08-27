import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, prependPositionTitle } from "../models";

const title = 'Undead'

const prepend = prependPositionTitle(title)

export const UndeadSkeleton: Position = prepend({
    title: 'Skeleton',
    stats: { ma: 5, st: 3, ag: 2, av: 7 },
    startingSkills: ['Regeneration', 'Thick Skull'],
    normal: Normal.G,
    double: Double.ASP,
    cost: 40,
    max: 16,
})

export const UndeadZombie: Position = prepend({
    title: 'Zombie',
    stats: { ma: 4, st: 3, ag: 2, av: 8 },
    startingSkills: ['Regeneration'],
    normal: Normal.G,
    double: Double.ASP,
    cost: 40,
    max: 16,
})

export const UndeadGhoulRunner: Position = prepend({
    title: 'Ghoul Runner',
    stats: { ma: 7, st: 3, ag: 3, av: 7 },
    startingSkills: ['Dodge'],
    normal: Normal.GA,
    double: Double.SP,
    cost: 70,
    max: 4,
})

export const UndeadWightBlitzer: Position = prepend({
    title: 'Wight Blitzer',
    stats: { ma: 6, st: 3, ag: 3, av: 8 },
    startingSkills: ['Block', 'Regeneration'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 90,
    max: 2,
})

export const UndeadMummy: Position = prepend({
    title: 'Mummy',
    stats: { ma: 3, st: 5, ag: 1, av: 9 },
    startingSkills: ['Mighty Blow', 'Regeneration'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 120,
    max: 2,
})

export const Undead: TeamType = {
    title: 'Undead',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        UndeadSkeleton,
        UndeadZombie,
        UndeadGhoulRunner,
        UndeadWightBlitzer,
        UndeadMummy
    ]
}