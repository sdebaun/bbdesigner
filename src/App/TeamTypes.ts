import { map, pipe, toPairs } from "ramda"

export enum Stat {
    MA = 'ma',
    ST = 'st',
    AG = 'ag',
    AV = 'av',
}

export enum SkillGroup {
    General = 'General',
    Strength = 'Strength',
    Agility = 'Agility',
    Passing = 'Passing',
    Mutation = 'Mutation',
    Extraordinary = 'Extraordinary',
    Stat = 'Stat',
}

type SkillWithoutGroup = {
    key: SkillName
    description: string
    increase?: Stat
}

export type Skill = SkillWithoutGroup & {
    group: SkillGroup
}

export type Positional = {
    title: string
    ma: number
    st: number
    ag: number
    av: number
    normal: SkillGroup[]
    double: SkillGroup[]
    startingSkills: SkillName[]
    cost: number
}

export type PositionalsAllowed = {
    positional: Positional,
    max: number,
}

export type TeamType = {
    title: string

    positionals: Positional[]
}

export type Piece = {
    title: string,
    positional: Positional,
    addedSkills: SkillName[],
    count: number,
}

export type Team = {
    pieces: Piece[]
}

export type SkillName =
    | 'Block'
    | 'Tackle'
    | 'Sure Hands'
    | 'Frenzy'
    | 'Dodge'
    | 'Guard'
    | 'Stand Firm'
    | 'Thick Skull'
    | 'Mighty Blow'
    | 'MA+1'
    | 'ST+1'
    | 'AG+1'
    | 'AV+1'
    | 'Regeneration'
    | 'Claw'

export type TeamTypeKey =
    | 'AFTERLIFE_UNITED'
    | 'VIOLENCE_TOGETHER'

export type TeamTypeDictionary = { [key in TeamTypeKey]: TeamType }
// export type TeamTypeDictionary = { [key: string]: TeamType }

const _SKILLS_GENERAL: SkillWithoutGroup[] = [
    { key: 'Block', description: ''},
    { key: 'Tackle', description: ''},
    { key: 'Sure Hands', description: ''},
    { key: 'Frenzy', description: ''},
]
export const SKILLS_GENERAL = _SKILLS_GENERAL.map(s => ({...s, group: SkillGroup.General}))

const _SKILLS_STRENGTH: SkillWithoutGroup[] = [
    { key: 'Guard', description: ''},
    { key: 'Stand Firm', description: ''},
    { key: 'Thick Skull', description: ''},
    { key: 'Mighty Blow', description: ''},
]
export const SKILLS_STRENGTH = _SKILLS_STRENGTH.map(s => ({...s, group: SkillGroup.Strength}))

const _SKILLS_AGILITY: SkillWithoutGroup[] = [
    { key: 'Dodge', description: ''}
]
export const SKILLS_AGILITY = _SKILLS_AGILITY.map(s => ({...s, group: SkillGroup.Agility}))

const _SKILLS_MUTATION: SkillWithoutGroup[] = [
    { key: 'Claw', description: ''}
]
export const SKILLS_MUTATION = _SKILLS_MUTATION.map(s => ({...s, group: SkillGroup.Mutation}))

const _SKILLS_EXTRAORDINARY: SkillWithoutGroup[] = [
    { key: 'Regeneration', description: ''}
]
export const SKILLS_EXTRAORDINARY = _SKILLS_EXTRAORDINARY.map(s => ({...s, group: SkillGroup.Extraordinary}))

const _SKILLS_STAT: SkillWithoutGroup[] = [
    { key: 'MA+1', description: '+1 to movement', increase: Stat.MA },
    { key: 'ST+1', description: '+1 to strength', increase: Stat.ST },
    { key: 'AG+1', description: '+1 to agility', increase: Stat.AG },
    { key: 'AV+1', description: '+1 to armor value', increase: Stat.AV },
]
export const SKILLS_STAT = _SKILLS_STAT.map(s => ({...s, group: SkillGroup.Stat}))

export const SKILLS_DATA: Skill[] = [
    ...SKILLS_GENERAL.map(s => ({...s, group: SkillGroup.General})),
    ...SKILLS_STRENGTH.map(s => ({...s, group: SkillGroup.Strength})),
    ...SKILLS_AGILITY.map(s => ({...s, group: SkillGroup.Agility})),
    ...SKILLS_STAT.map(s => ({...s, group: SkillGroup.Stat})),
    ...SKILLS_MUTATION.map(s => ({...s, group: SkillGroup.Mutation})),
    ...SKILLS_EXTRAORDINARY.map(s => ({...s, group: SkillGroup.Extraordinary})),
]

export const skillGroupForName = (skillName: SkillName) =>
    SKILLS_DATA.find(skill => skill.key === skillName)?.group || SkillGroup.General

const AFTERLIFE_UNITED: TeamType = {
    title: 'Afterlife United',
    positionals: [
        {
            title: 'Zombie',
            ma: 4, st: 3, ag: 2, av: 8,
            normal: [SkillGroup.General],
            double: [SkillGroup.Stat, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration'],
            cost: 40,
        },
        {
            title: 'Skeleton',
            ma: 5, st: 3, ag: 2, av: 7,
            normal: [SkillGroup.General],
            double: [SkillGroup.Stat, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration', 'Thick Skull'],
            cost: 40,
        },
        {
            title: 'Ghoul',
            ma: 7, st: 3, ag: 3, av: 7,
            normal: [SkillGroup.General, SkillGroup.Agility],
            double: [SkillGroup.Stat, SkillGroup.Strength, SkillGroup.Passing],
            startingSkills: ['Dodge'],
            cost: 70,
        },
        {
            title: 'Wight',
            ma: 6, st: 3, ag: 3, av: 8,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Stat, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Block', 'Regeneration'],
            cost: 90,
        },
        {
            title: 'Flesh Golem',
            ma: 4, st: 4, ag: 2, av: 9,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Stat, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration', 'Stand Firm', 'Thick Skull'],
            cost: 110,
        },
        {
            title: 'Werewolf',
            ma: 8, st: 3, ag: 3, av: 8,
            normal: [SkillGroup.General, SkillGroup.Agility],
            double: [SkillGroup.Stat, SkillGroup.Strength, SkillGroup.Passing],
            startingSkills: ['Claw', 'Frenzy', 'Regeneration'],
            cost: 120,
        },
        {
            title: 'Mummy',
            ma: 3, st: 5, ag: 1, av: 9,
            normal: [SkillGroup.Strength],
            double: [SkillGroup.General, SkillGroup.Stat, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Mighty Blow', 'Regeneration'],
            cost: 110,
        },

    ],
}

const VIOLENCE_TOGETHER: TeamType = {
    title: 'Violence Together',
    positionals: [],
}
export const TEAM_TYPES: TeamTypeDictionary = {
    AFTERLIFE_UNITED,
    VIOLENCE_TOGETHER,
}

const mapDataToOptions = pipe<TeamTypeDictionary, [string, TeamType][], SelectOption[]>(
    toPairs,
    map(([key, teamType]) => ({ value: key, label: teamType.title }))
)

type SelectOption = { value: string, label: string }

export const TEAM_TYPE_SELECT_OPTIONS: SelectOption[] = mapDataToOptions(TEAM_TYPES)