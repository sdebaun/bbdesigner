import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, replacePositionTitle, prependPositionTitle } from "../models";
import { UndeadSkeleton } from "./Undead";

const title = 'Khemri'

const prepend = prependPositionTitle(title)

const rename = replacePositionTitle('Undead', title)

export const KhemriSkeleton = rename(UndeadSkeleton)

export const KhemriThrower: Position = prepend({
    title: 'Thrower',
    ma: 6, st: 3, ag: 2, av: 7,
    startingSkills: ['Pass', 'Regeneration', 'Sure Hands'],
    normal: Normal.GP,
    double: Double.AS,
    cost: 70,
    max: 2,
})

export const KhemriBlitzer: Position = prepend({
    title: 'Blitzer',
    ma: 6, st: 3, ag: 2, av: 8,
    startingSkills: ['Block', 'Regeneration'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 90,
    max: 2,
})

export const KhemriTombGuardian: Position = prepend({
    title: 'Tomb Guardian',
    ma: 4, st: 5, ag: 1, av: 9,
    startingSkills: ['Regeneration', 'Decay'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 100,
    max: 4,
})

export const Khemri: TeamType = {
    title,
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        KhemriSkeleton,
        KhemriThrower,
        KhemriBlitzer,
        KhemriTombGuardian,
    ]
}