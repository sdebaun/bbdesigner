import { Tag } from "antd"
import { SkillName } from "../TeamTypes"

export const SkillTags: React.FC<{skillNames: SkillName[], color: string}> =
    ({skillNames, color}) =>
        <>{skillNames.map(skillName => <Tag key={skillName} {...{color}}>{skillName}</Tag>)}</>
