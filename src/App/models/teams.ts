import { map, pipe, toPairs } from "ramda"
import { Piece } from "./Piece"
import { Skill, SkillGroup } from "./Skill"
import { Upgrades } from "./Upgrade"

export type Positional = {
    title: string
    ma: number
    st: number
    ag: number
    av: number
    normal: SkillGroup[]
    double: SkillGroup[]
    startingSkills: Skill[]
    cost: number
    max: number
}

export type TeamType = {
    title: string
    dataEntryBy?: string
    upgradeCosts: Upgrades,
    positionals: Positional[]
}

export type Team = {
    pieces: Piece[]
}

export type TeamTypeKey =
    | 'AFTERLIFE_UNITED'
    | 'VIOLENCE_TOGETHER'
    | 'CHAOS_DWARF'

export type TeamTypeDictionary = { [key in TeamTypeKey]: TeamType }

const BASE_UPGRADE_COSTS: Omit<Upgrades, 'Team Reroll'> = {
    Apothecary: 50,
    Coach: 10,
    Cheerleader: 10,
    "Fan Factor": 10,
}

const AFTERLIFE_UNITED: TeamType = {
    title: 'Afterlife United',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positionals: [
        {
            title: 'Zombie',
            ma: 4, st: 3, ag: 2, av: 8,
            normal: [SkillGroup.General],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration'],
            cost: 40,
            max: 16,
        },
        {
            title: 'Skeleton',
            ma: 5, st: 3, ag: 2, av: 7,
            normal: [SkillGroup.General],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration', 'Thick Skull'],
            cost: 40,
            max: 16,
        },
        {
            title: 'Ghoul',
            ma: 7, st: 3, ag: 3, av: 7,
            normal: [SkillGroup.General, SkillGroup.Agility],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Passing],
            startingSkills: ['Dodge'],
            cost: 70,
            max: 4,
        },
        {
            title: 'Wight',
            ma: 6, st: 3, ag: 3, av: 8,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Block', 'Regeneration'],
            cost: 90,
            max: 2,
        },
        {
            title: 'Flesh Golem',
            ma: 4, st: 4, ag: 2, av: 9,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Regeneration', 'Stand Firm', 'Thick Skull'],
            cost: 110,
            max: 2,
        },
        {
            title: 'Werewolf',
            ma: 8, st: 3, ag: 3, av: 8,
            normal: [SkillGroup.General, SkillGroup.Agility],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Passing],
            startingSkills: ['Claw', 'Frenzy', 'Regeneration'],
            cost: 120,
            max: 2,
        },
        {
            title: 'Mummy',
            ma: 3, st: 5, ag: 1, av: 9,
            normal: [SkillGroup.Strength],
            double: [SkillGroup.General, SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Mighty Blow', 'Regeneration'],
            cost: 110,
            max: 2,
        },
    ],
}

const VIOLENCE_TOGETHER: TeamType = {
    title: 'Violence Together',
    upgradeCosts: {'Team Reroll': 60, ...BASE_UPGRADE_COSTS},
    positionals: [
        {
            title: 'Orc Lineman',
            ma: 5, st: 3, ag: 3, av: 9,
            normal: [SkillGroup.General],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: [],
            cost: 50,
            max: 16,
        },

    ],
}

const CHAOS_DWARF: TeamType = {
    title: 'Chaos Dwarf',
    upgradeCosts: {'Team Reroll': 70, ...BASE_UPGRADE_COSTS},
    positionals: [
        {
            title: 'Hobgoblin Runner',
            ma: 6, st: 3, ag: 3, av: 7,
            normal: [SkillGroup.General],
            double: [SkillGroup.Increase, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: [],
            cost: 40,
            max: 16,
        },
        {
            title: 'Chaos Dwarf Blocker',
            ma: 4, st: 3, ag: 2, av: 9,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Increase, SkillGroup.Mutation, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Block', 'Tackle', 'Thick Skull'],
            cost: 70,
            max: 6,
        },
        {
            title: 'Bull Centaur Blitzer',
            ma: 6, st: 4, ag: 2, av: 9,
            normal: [SkillGroup.General, SkillGroup.Strength],
            double: [SkillGroup.Increase, SkillGroup.Agility, SkillGroup.Passing],
            startingSkills: ['Sprint', 'Sure Feet', 'Thick Skull'],
            cost: 130,
            max: 2,
        },
        {
            title: 'Enslaved Minotaur',
            ma: 5, st: 5, ag: 2, av: 8,
            normal: [SkillGroup.Strength],
            double: [SkillGroup.Increase, SkillGroup.General, SkillGroup.Agility, SkillGroup.Passing, SkillGroup.Mutation],
            startingSkills: ['Loner', 'Frenzy', 'Horns', 'Mighty Blow', 'Thick Skull', 'Wild Animal'],
            cost: 50,
            max: 16,
        }
    ]
}
export const TEAM_TYPES: TeamTypeDictionary = {
    AFTERLIFE_UNITED,
    VIOLENCE_TOGETHER,
    CHAOS_DWARF,
}

const mapDataToOptions = pipe<TeamTypeDictionary, [string, TeamType][], SelectOption[]>(
    toPairs,
    map(([key, teamType]) => ({ value: key, label: teamType.title }))
)

type SelectOption = { value: string, label: string }

export const TEAM_TYPE_SELECT_OPTIONS: SelectOption[] = mapDataToOptions(TEAM_TYPES)