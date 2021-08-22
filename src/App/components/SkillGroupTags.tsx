import { Card, Col, Row, Select, Statistic, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useDrag } from "react-dnd"
import { useAppState } from "../AppState"
import { Positional, SkillGroup, TEAM_TYPES } from "../TeamTypes"

type Stats = {
    ma: number,
    st: number,
    ag: number,
    av: number,
}

const StatsTable: React.FC<Stats> =
    (stats) => {
        return <Table bordered dataSource={[stats].map(stat => ({...stat, key: 1}))} size='small' pagination={false} style={{height: '100%'}}>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
            </Table>
    }

const PositionalCardTitle: React.FC<{positional: Positional}> =
    ({positional}) =>
        <>{positional.title}</>

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
    
    