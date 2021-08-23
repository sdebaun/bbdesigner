import { lensProp, over, replace } from "ramda";
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

export const PositionLens = {
    title: lensProp<Position, 'title'>('title')
}

export const replacePositionTitle: (from: string, to: string) => (position: Position) => Position =
    (from, to) =>
        over(PositionLens.title, replace(from, to))
