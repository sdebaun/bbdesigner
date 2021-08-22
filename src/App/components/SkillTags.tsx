import { Card, Col, Row, Select, Statistic, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useDrag } from "react-dnd"
import { useAppState } from "../AppState"
import { SkillGroupTags } from "../components"
import { Positional, SkillGroup, SkillName, TEAM_TYPES } from "../TeamTypes"

export const SkillTags: React.FC<{skillNames: SkillName[], color: string}> =
    ({skillNames, color}) =>
        <>{skillNames.map(skillName => <Tag key={skillName} {...{color}}>{skillName}</Tag>)}</>
