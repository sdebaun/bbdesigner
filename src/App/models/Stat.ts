import { Skill } from "./Skill"

export type Stat =
    | 'ma'
    | 'st'
    | 'ag'
    | 'av'

export type WithStats = {
    [key in Stat]: number
}

export const statsUp: <T extends WithStats>(withStats: T, skills: Skill[]) => T =
    (withStats, skills) => ({
        ...withStats,
        ma: withStats.ma + (skills.includes('MA+') ? 1 : 0),
        st: withStats.st + (skills.includes('ST+') ? 1 : 0),
        ag: withStats.ag + (skills.includes('AG+') ? 1 : 0),
        av: withStats.av + (skills.includes('AV+') ? 1 : 0),
    })
