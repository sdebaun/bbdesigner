import { Skill, SkillGroup } from "./Skill";

export type Position = {
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