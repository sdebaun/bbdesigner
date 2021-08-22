import { Tag } from "antd"
import { Positional, SkillGroup } from "../models"

const colorFor = (skillGroup: SkillGroup, normal: SkillGroup[], double: SkillGroup[]) => {
    if (normal.includes(skillGroup)) return 'green'
    if (double.includes(skillGroup)) return 'orange'
    return 'red'
}

const SkillGroupTag: React.FC<{positional: Positional, skillGroup: SkillGroup}> =
    ({skillGroup, positional: { normal, double }}) =>
        <Tag color={colorFor(skillGroup, normal, double)}>{skillGroup.toString()[0]}</Tag>

export const SkillGroupTags: React.FC<{positional: Positional}> =
    ({positional}) =>
        <>
            <SkillGroupTag skillGroup={SkillGroup.General} {...{positional}}/>
            <SkillGroupTag skillGroup={SkillGroup.Strength} {...{positional}}/>
            <SkillGroupTag skillGroup={SkillGroup.Agility} {...{positional}}/>
            <SkillGroupTag skillGroup={SkillGroup.Passing} {...{positional}}/>
            <SkillGroupTag skillGroup={SkillGroup.Mutation} {...{positional}}/>
        </>
    
    