import { always, cond, equals, T } from "ramda"

const NORMAL_COST = 20
const DOUBLE_COST = 30
const AV_COST = 30
const MA_COST = 30
const AG_COST = 40
const ST_COST = 50

// const COACH_COST = 10
// const CHEERLEADER_COST = 10
// const FAN_COST = 10
// const APOTHECARY_COST = 50

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

export const groupsToSkills: (skillGroups: SkillGroup[]) => Skill[] =
    skillGroups =>
        skillGroups.map(group => Skills[group]).concat().flat()

export const SkillDescriptions: {[key in Skill]?: string} = {
    Block: ''
}

export const costOfSkill: (doubleGroups: SkillGroup[]) => (skill: Skill) => number =
    (doubleGroups) =>
        cond<Skill, number>([
            [equals<Skill>('ST+'), always(ST_COST)],
            [equals<Skill>('AG+'), always(AG_COST)],
            [equals<Skill>('MA+'), always(MA_COST)],
            [equals<Skill>('AV+'), always(AV_COST)],
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