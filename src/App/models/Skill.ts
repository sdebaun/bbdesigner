import { always, concat, cond, equals, flatten, map, pipe, T } from "ramda"

export enum SkillGroup {
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

export type GeneralSkill =
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

export const General: GeneralSkill[] = [
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

export type StrengthSkill =
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

export const Strength: StrengthSkill[] = [
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

export type AgilitySkill =
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

export const Agility: AgilitySkill[] = [

]

export type PassingSkill =
    | 'Accurate'

export const Passing: PassingSkill[] = [
    'Accurate',
]

export type MutationSkill =
    | 'Big Hand'
    | 'Claw'
    | 'Disturbing Presence'
    | 'Extra Arms'
    | 'Foul Appearance'
    | 'Horns'
    | 'Prehensile Tail'
    | 'Tentacles'
    | 'Two Heads'
    | 'Very Long Legs'

export const Mutation: MutationSkill[] = [
    'Big Hand',
    'Claw',
    'Disturbing Presence',
    'Extra Arms',
    'Foul Appearance',
    'Horns',
    'Prehensile Tail',
    'Tentacles',
    'Two Heads',
    'Very Long Legs',
]

export type ExtraordinarySkill =
    | 'Always Hungry'
    | 'Animosity'
    | 'Ball and Chain'
    | 'Blood List'
    | 'Bombadier'
    | 'Bone-Head'
    | 'Chainsaw'
    | 'Decay'
    | 'Hypnotic Gaze'
    | 'Loner'
    | 'Monstrous Mouth'
    | 'No Hands'
    | 'Nurgles Rot'
    | 'Really Stupid'
    | 'Regeneration'
    | 'Right Stuff'

export const Extraordinary: ExtraordinarySkill[] = [
    'Always Hungry',
    'Animosity',
    'Ball and Chain',
    'Blood List',
    'Bombadier',
    'Bone-Head',
    'Chainsaw',
    'Decay',
    'Hypnotic Gaze',
    'Loner',
    'Monstrous Mouth',
    'No Hands',
    'Nurgles Rot',
    'Really Stupid',
    'Regeneration',
    'Right Stuff'
]

export type IncreaseSkill =
    | 'MA+'
    | 'ST+'
    | 'AG+'
    | 'AV+'

export const Increase: IncreaseSkill[] = [
    'MA+',
    'ST+',
    'AG+',
    'AV+',
]

export type Skill =
| GeneralSkill
| AgilitySkill
| StrengthSkill
| PassingSkill
| MutationSkill
| ExtraordinarySkill
| IncreaseSkill


export const Skills: {[key in SkillGroup]: Skill[]} = {
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

export const groupsToSkills: (skillGroups: SkillGroup[]) => Skill[] =
    skillGroups =>
        skillGroups.map(group => Skills[group]).concat().flat()

export const SkillDescriptions: {[key in Skill]?: string} = {
    Block: ''
}

const skill: Skill = 'AG+'

const newAg = 5 + (Skills.Increase.includes(skill) ? 1 : 0)


export const costOfSkill: (doubleGroups: SkillGroup[]) => (skill: Skill) => number =
    (doubleGroups) =>
        cond<Skill, number>([
            [equals<Skill>('ST+'), always(50)],
            [equals<Skill>('AG+'), always(30)],
            [equals<Skill>('MA+'), always(20)],
            [equals<Skill>('AV+'), always(10)],
            [skill => groupsToSkills(doubleGroups).includes(skill), always(30)],
            [T, always(20)]
        ])

export const colorOfSkill: (startingSkills: Skill[], doubleGroups: SkillGroup[]) => (skill: Skill) => string =
        (startingSkills, doubleGroups) =>
            cond<Skill, string>([
                [skill => startingSkills.includes(skill), always('')],
                [skill => groupsToSkills(doubleGroups).includes(skill), always('orange')],
                [T, always('green')]
            ])