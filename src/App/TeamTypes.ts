import { map, pipe, toPairs } from "ramda"

export enum Stat {
    MA = 'ma',
    ST = 'st',
    AG = 'ag',
    AV = 'av',
}

export enum SkillGroup {
    General = 'general',
    Strength = 'strength',
    Agility = 'agility',
    Passing = 'passing',
    Mutation = 'mutation',
    Extraordinary = 'extraordinary',
    Stat = 'stat',
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
    normalSkills: SkillName[],
    doubleSkills: SkillName[],
}

export type Team = {
    pieces: Piece[]
}

type SkillName =
    | 'Block'
    | 'Tackle'
    | 'Sure Hands'
    | 'Dodge'
    | 'Guard'
    | 'MA+1'
    | 'ST+1'
    | 'AG+1'
    | 'AV+1'
    | 'Regeneration'

export type TeamTypeKey =
    | 'AFTERLIFE_UNITED'
    | 'VIOLENCE_TOGETHER'

export type TeamTypeDictionary = { [key in TeamTypeKey]: TeamType }
// export type TeamTypeDictionary = { [key: string]: TeamType }

const SKILLS_GENERAL: SkillWithoutGroup[] = [
    { key: 'Block', description: ''},
    { key: 'Tackle', description: ''},
    { key: 'Sure Hands', description: ''},
]

const SKILLS_STRENGTH: SkillWithoutGroup[] = [
    { key: 'Guard', description: ''},
]

const SKILLS_AGILITY: SkillWithoutGroup[] = [
    { key: 'Dodge', description: ''}
]
const SKILLS_EXTRAORDINARY: SkillWithoutGroup[] = [
    { key: 'Regeneration', description: ''}
]
const SKILLS_STAT: SkillWithoutGroup[] = [
    { key: 'MA+1', description: '+1 to movement', increase: Stat.MA },
    { key: 'ST+1', description: '+1 to strength', increase: Stat.ST },
    { key: 'AG+1', description: '+1 to agility', increase: Stat.AG },
    { key: 'AV+1', description: '+1 to armor value', increase: Stat.AV },
]
export const SKILLS_DATA: Skill[] = [
    ...SKILLS_GENERAL.map(s => ({...s, group: SkillGroup.General})),
    ...SKILLS_STRENGTH.map(s => ({...s, group: SkillGroup.Strength})),
    ...SKILLS_AGILITY.map(s => ({...s, group: SkillGroup.Agility})),
    ...SKILLS_STAT.map(s => ({...s, group: SkillGroup.Stat})),
    ...SKILLS_EXTRAORDINARY.map(s => ({...s, group: SkillGroup.Extraordinary})),
]

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
            title: 'Ghoul',
            ma: 7, st: 3, ag: 3, av: 7,
            normal: [SkillGroup.General, SkillGroup.Agility],
            double: [SkillGroup.Stat, SkillGroup.Strength, SkillGroup.Passing],
            startingSkills: ['Dodge'],
            cost: 40,
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