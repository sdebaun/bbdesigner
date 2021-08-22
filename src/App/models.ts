import { always, concat, cond, equals, flatten, map, pipe, T } from "ramda"

export enum SkillGroupName {
    General = 'General',
    Strength = 'Strength',
    Agility = 'Agility',
    Passing = 'Passing',
    Mutation = 'Mutation',
    Extraordinary = 'Extraordinary',
    Increase = 'Increase',
}

// export type SkillGroupName =
//     | 'General'
//     | 'Strength'
//     | 'Agility'
//     | 'Passing'
//     | 'Mutation'
//     | 'Extraordinary'
//     | 'Stat'

export type GeneralSkillName =
    | 'Block'
    | 'Dauntless'
    | 'Dirty Player'
    | 'Fend'
    | 'Frenzy'
    | 'Kick'
    | 'Kick-off Return'
    | 'Pass Block'
    | 'Pro'
    | 'Shadowing'
    | 'Strip Ball'
    | 'Sure Hands'
    | 'Tackle'
    | 'Wrestle'

export const General: GeneralSkillName[] = [
    'Block',
    'Dauntless',
    'Dirty Player',
    'Fend',
    'Frenzy',
    'Kick',
    'Kick-off Return',
    'Pass Block',
    'Pro',
    'Shadowing',
    'Strip Ball',
    'Sure Hands',
    'Tackle',
    'Wrestle',
]

export type StrengthSkillName =
    | 'Break Tackle'
    | 'Grab'
    | 'Guard'
    | 'Juggernaut'
    | 'Mighty Blow'
    | 'Multiple Block'
    | 'Piling On'
    | 'Stand Firm'
    | 'Strong Arm'
    | 'Thick Skull'

export const Strength: StrengthSkillName[] = [
    'Break Tackle',
    'Grab',
    'Guard',
    'Juggernaut',
    'Mighty Blow',
    'Multiple Block',
    'Piling On',
    'Stand Firm',
    'Strong Arm',
    'Thick Skull',
]

export type AgilitySkillName =
    | 'Catch'
    | 'Diving Catch'
    | 'Diving Tackle'
    | 'Dodge'
    | 'Jump Up'
    | 'Leap'
    | 'Side Step'
    | 'Sneaky Git'
    | 'Sprint'
    | 'Sure Feet'

export const Agility: AgilitySkillName[] = [

]

export type PassingSkillName =
    | 'Accurate'

export const Passing: PassingSkillName[] = [
    'Accurate',
]

export type MutationSkillName =
    | ''

export const Mutation: MutationSkillName[] = [
    ''
]

export type ExtraordinarySkillName =
    | ''

export const Extraordinary: ExtraordinarySkillName[] = [
    ''
]

export type IncreaseSkillName =
    | 'MA+'
    | 'ST+'
    | 'AG+'
    | 'AV+'

export const Increase: IncreaseSkillName[] = [
    'MA+',
    'ST+',
    'AG+',
    'AV+',
]

export type SkillName =
| GeneralSkillName
| AgilitySkillName
| StrengthSkillName
| PassingSkillName
| MutationSkillName
| ExtraordinarySkillName
| IncreaseSkillName


export const Skills: {[key in SkillGroupName]: SkillName[]} = {
    General,
    Strength,
    Agility,
    Passing,
    Mutation,
    Extraordinary,
    Increase
}

// const normalGroups = [SkillGroupName.General, SkillGroupName.Strength]
// const doubleGroups = [SkillGroupName.Agility, SkillGroupName.Passing]

// const normalSkills = normalGroups.map(group => Skills[group]).concat().flat()
// const doubleSkills = doubleGroups.map(group => Skills[group]).concat().flat()

const groupsToSkills: (skillGroups: SkillGroupName[]) => SkillName[] =
    skillGroups =>
        skillGroups.map(group => Skills[group]).concat().flat()

export const SkillDescriptions: {[key in SkillName]?: string} = {
    Block: ''
}

const skill: SkillName = 'AG+'

const newAg = 5 + (Skills.Increase.includes(skill) ? 1 : 0)

type Stat =
    | 'ma'
    | 'st'
    | 'ag'
    | 'av'

type WithStats = {
    [key in Stat]: number
}

export const statsUp: <T extends WithStats>(withStats: T, skills: SkillName[]) => T =
    (withStats, skills) => ({
        ...withStats,
        ma: withStats.ma + (skills.includes('MA+') ? 1 : 0),
        st: withStats.st + (skills.includes('ST+') ? 1 : 0),
        ag: withStats.ag + (skills.includes('AG+') ? 1 : 0),
        av: withStats.av + (skills.includes('AV+') ? 1 : 0),
    })

export const costOfSkill: (doubleGroups: SkillGroupName[]) => (skill: SkillName) => number =
    (doubleGroups) =>
        cond<SkillName, number>([
            [equals<SkillName>('ST+'), always(50)],
            [equals<SkillName>('AG+'), always(30)],
            [equals<SkillName>('MA+'), always(20)],
            [equals<SkillName>('AV+'), always(10)],
            [skill => groupsToSkills(doubleGroups).includes(skill), always(30)],
            [T, always(20)]
        ])

export const colorOfSkill: (startingSkills: SkillName[], doubleGroups: SkillGroupName[]) => (skill: SkillName) => string =
        (startingSkills, doubleGroups) =>
            cond<SkillName, string>([
                [skill => startingSkills.includes(skill), always('')],
                [skill => groupsToSkills(doubleGroups).includes(skill), always('orange')],
                [T, always('green')]
            ])