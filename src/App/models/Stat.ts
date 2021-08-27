import { always, cond, equals, T } from "ramda"
import { Skill } from "./Skill"

const AV_COST = 30
const MA_COST = 30
const AG_COST = 40
const ST_COST = 50

export type Stat =
    | 'ma'
    | 'st'
    | 'ag'
    | 'av'

export const Stats: Stat[] = [
    'ma',
    'st',
    'ag',
    'av',
]

export type WithStats = {
    [key in Stat]: number
}

const costOfIncrease: (stat: Stat) => number =
    cond<Stat, number>([
        [equals<Stat>('ma'), always(MA_COST)],
        [equals<Stat>('st'), always(ST_COST)],
        [equals<Stat>('ag'), always(AG_COST)],
        [equals<Stat>('av'), always(AV_COST)],
        [T, always(0)],
    ])

export const statCosts: (stats: WithStats) => number =
    stats =>
        Stats.reduce((a, x) => a + costOfIncrease(x) * stats[x], 0)


export const statsUp: <T extends WithStats>(withStats: T, skills: Skill[]) => T =
    (withStats) => ({
        ...withStats,
        // ma: withStats.ma + (skills.includes('+MA') ? 1 : 0),
        // st: withStats.st + (skills.includes('+ST') ? 1 : 0),
        // ag: withStats.ag + (skills.includes('+AG') ? 1 : 0),
        // av: withStats.av + (skills.includes('+AV') ? 1 : 0),
    })
