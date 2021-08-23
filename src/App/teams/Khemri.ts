import { BASE_UPGRADE_COSTS, TeamType, Position, Normal, Double, replacePositionTitle } from "../models";
import { UndeadSkeleton } from "./Undead";

const rename = replacePositionTitle('Undead', 'Khemri')

export const KhemriSkeleton = rename(UndeadSkeleton)

export const KhemriThrower: Position = {
    title: 'Khemri Thrower',
    ma: 6, st: 3, ag: 2, av: 7,
    startingSkills: ['Pass', 'Regeneration', 'Sure Hands'],
    normal: Normal.GP,
    double: Double.AS,
    cost: 70,
    max: 2,
}

export const KhemriBlitzer: Position = {
    title: 'Khemri Blitzer',
    ma: 6, st: 3, ag: 2, av: 8,
    startingSkills: ['Block', 'Regeneration'],
    normal: Normal.GS,
    double: Double.AP,
    cost: 90,
    max: 2,
}

export const KhemriTombGuardian: Position = {
    title: 'Khemri Tomb Guardian',
    ma: 4, st: 5, ag: 1, av: 9,
    startingSkills: ['Regeneration', 'Decay'],
    normal: Normal.S,
    double: Double.GAP,
    cost: 100,
    max: 4,
}

export const Khemri: TeamType = {
    title: 'Khemri',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positions: [
        KhemriSkeleton,
        KhemriThrower,
        KhemriBlitzer,
        KhemriTombGuardian,
    ]
}