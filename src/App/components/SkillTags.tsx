import { Tag } from "antd"
import { Skill } from "../models"

export const SkillTags: React.FC<{skills: Skill[], color: string}> =
    ({skills, color}) =>
        <>{skills.map(skill => <Tag key={skill} {...{color}}>{skill}</Tag>)}</>
