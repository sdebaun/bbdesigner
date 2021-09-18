import { always, cond, T } from "ramda"

const NORMAL_COST = 20
const DOUBLE_COST = 30

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
    'Catch',
    'Diving Catch',
    'Diving Tackle',
    'Dodge',
    'Jump Up',
    'Leap',
    'Side Step',
    'Sneaky Git',
    'Sprint',
    'Sure Feet',
]

export type PassingSkill =
    | 'Accurate'
    | 'Dump-Off'
    | 'Hail Mary Pass'
    | 'Leader'
    | 'Nerves of Steel'
    | 'Pass'
    | 'Safe Throw'

export const Passing: PassingSkill[] = [
    'Accurate',
    'Dump-Off',
    'Hail Mary Pass',
    'Leader',
    'Nerves of Steel',
    'Pass',
    'Safe Throw',
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
    | 'Blood Lust'
    | 'Bombardier'
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

    | 'Secret Weapon'
    | 'Stab'
    | 'Stunty'
    | 'Swoop'
    | 'Take Root'
    | 'Throw Team-Mate'
    | 'Timm-ber!'
    | 'Titchy'
    | 'Weeping Dagger'
    | 'Wild Animal'

export const Extraordinary: ExtraordinarySkill[] = [
    'Always Hungry',
    'Animosity',
    'Ball and Chain',
    'Blood Lust',
    'Bombardier',
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
    'Right Stuff',
    'Secret Weapon',
    'Stab',
    'Stunty',
    'Swoop',
    'Take Root',
    'Throw Team-Mate',
    'Timm-ber!',
    'Titchy',
    'Weeping Dagger',
    'Wild Animal',
]

export type IncreaseSkillMA = 
| '+MA'
| '++MA'
| '+++MA'
| '++++MA'
| '+++++MA'

export const IncreaseMA: IncreaseSkillMA[] = [
    '+MA',
    '++MA',
    '+++MA',
    '++++MA',
    '+++++MA',
]

export type IncreaseSkillST =
    | '+ST'
    | '++ST'
    | '+++ST'
    | '++++ST'
    | '+++++ST'

export const IncreaseST: IncreaseSkillST[] = [
    '+ST',
    '++ST',
    '+++ST',
    '++++ST',
    '+++++ST',
]

export type IncreaseSkillAG =
    | '+AG'
    | '++AG'
    | '+++AG'
    | '++++AG'
    | '+++++AG'

export const IncreaseAG: IncreaseSkillAG[] = [
    '+AG',
    '++AG',
    '+++AG',
    '++++AG',
    '+++++AG',
]

export type IncreaseSkillAV =
    | '+AV'
    | '++AV'
    | '+++AV'
    | '++++AV'
    | '+++++AV'

export const IncreaseAV: IncreaseSkillAV[] = [
    '+AV',
    '++AV',
    '+++AV',
    '++++AV',
    '+++++AV',
]


export type IncreaseSkill =
    | IncreaseSkillMA
    | IncreaseSkillST
    | IncreaseSkillAG
    | IncreaseSkillAV

export const Increase: IncreaseSkill[] = [
    ...IncreaseMA,
    ...IncreaseST,
    ...IncreaseAG,
    ...IncreaseAV,
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

export const groupsToSkills: (skillGroups: SkillGroup[]) => Skill[] =
    skillGroups =>
        skillGroups.map(group => Skills[group]).concat().flat()

export const SkillDescriptions: {[key in Skill]?: string} = {
    Block: ''
}

export const costOfSkill: (doubleGroups: SkillGroup[]) => (skill: Skill) => number =
    (doubleGroups) =>
        cond<Skill, number>([
            [skill => groupsToSkills(doubleGroups).includes(skill), always(DOUBLE_COST)],
            [T, always(NORMAL_COST)]
        ])

export const colorOfSkill: (startingSkills: Skill[], doubleGroups: SkillGroup[]) => (skill: Skill) => string =
        (startingSkills, doubleGroups) =>
            cond<Skill, string>([
                [skill => startingSkills.includes(skill), always('')],
                [skill => groupsToSkills(doubleGroups).includes(skill), always('orange')],
                [T, always('green')]
            ])

export const Normal = {
    G: [SkillGroup.General],
    GS: [SkillGroup.General, SkillGroup.Strength],
    GA: [SkillGroup.General, SkillGroup.Agility],
    GP: [SkillGroup.General, SkillGroup.Passing],
    GM: [SkillGroup.General, SkillGroup.Mutation],
    S: [SkillGroup.Strength],
    A: [SkillGroup.Agility],
    AP: [SkillGroup.Agility, SkillGroup.Passing],
    GAP: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Passing],
    GAS: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Strength],
    GSM: [SkillGroup.General, SkillGroup.Strength, SkillGroup.Mutation],
}

export const Double = {
    S: [SkillGroup.Strength],
    ASP: [SkillGroup.Agility, SkillGroup.Strength, SkillGroup.Passing],
    ASPM: [SkillGroup.Agility, SkillGroup.Strength, SkillGroup.Passing, SkillGroup.Mutation],
    SPM: [SkillGroup.Strength, SkillGroup.Passing, SkillGroup.Mutation],
    ASM: [SkillGroup.Agility, SkillGroup.Strength, SkillGroup.Mutation],
    AP: [SkillGroup.Agility, SkillGroup.Passing],
    AS: [SkillGroup.Agility, SkillGroup.Strength],
    SP: [SkillGroup.Strength, SkillGroup.Passing],
    AMP: [SkillGroup.Agility, SkillGroup.Mutation, SkillGroup.Passing],
    GAPM: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Mutation, SkillGroup.Passing],
    P: [SkillGroup.Passing],
    GAP: [SkillGroup.General, SkillGroup.Agility, SkillGroup.Passing],
    GSP: [SkillGroup.General, SkillGroup.Strength, SkillGroup.Passing],
    GS: [SkillGroup.General, SkillGroup.Strength],
}