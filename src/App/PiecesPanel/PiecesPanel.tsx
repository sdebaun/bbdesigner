import { Empty, Card, Row, Col, Table, Tag, Select, InputNumber, Input } from "antd";
import { LabeledValue } from "antd/lib/select";
import Column from "antd/lib/table/Column";
import { always, concat, cond, includes, isEmpty, join, not, pipe, prop, T, times } from "ramda";
import React from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppState";
import { CloneButton, DeleteButton, Panel, SkillGroupTags } from "../components";
import { Piece, Position, SkillGroup, Skill, Skills, groupsToSkills, statsUp, pieceCost, Stat, WithStats, IncreaseSkill } from "../models";

import './PiecesPanel.css'

const defaultStyle: React.CSSProperties = { minHeight: '100%', padding: '8px' }
const canDropStyle: React.CSSProperties = Object.assign({}, defaultStyle, { backgroundColor: '#FFE' })
const isOverStyle: React.CSSProperties = Object.assign({}, defaultStyle, { backgroundColor: '#EFE' })

type DropProps = {canDrop: boolean, isOver: boolean}

const styleForDropZone: (props: DropProps) => React.CSSProperties =
    cond<DropProps, React.CSSProperties>([
        [prop('isOver'), always(isOverStyle)],
        [prop('canDrop'), always(canDropStyle)],
        [T, always(defaultStyle)]
    ])

const PiecesDropZone: React.FC =
    ({children}) => {
        const [, dispatch] = useAppState()

        const drop = (positional: Position) =>
            dispatch({type: 'addPiece', positional })

        const [props, ref] = useDrop(() => ({
            accept: 'POSITIONAL',
            drop,
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            })
        }))

        const style = styleForDropZone(props)

        return <div {...{ref, style}}>{children}</div>
    }

const NoPiecesMessage: React.FC =
    () => <Empty description='Drag a position from the left to create a piece'/>

type Stats = {
    ma: number,
    st: number,
    ag: number,
    av: number,
}

type StatsTableProps = {stats: Stats, increase: Stats, increaseOnClick: (stat: Stat) => void, decreaseOnClick: (stat: Stat) => void}

const StatsTable: React.FC<StatsTableProps> =
    ({stats, increase, increaseOnClick, decreaseOnClick}) => {
        const dataSource = [{stats, increase, key: 1}]
        const onStep: (stat: Stat) => (value: number, info: { type: 'up' | 'down'}) => void =
            stat =>
                (_ ,{type}) =>
                    type === 'up' ? increaseOnClick(stat) : decreaseOnClick(stat)

        return <Table bordered className='stats-table-editable' dataSource={dataSource} size='small' pagination={false} style={{height: '100%'}}>
                <Column title='MA' render={
                    (_, {stats: {ma: stat}, increase: {ma: increase}}: StatsTableProps) =>
                         <InputNumber min={stat} value={stat + increase} onStep={onStep('ma')} style={{width: '100%'}}/>
                }/>
                <Column title='ST' render={
                    (_, {stats: {st: stat}, increase: {st: increase}}: StatsTableProps) =>
                         <InputNumber min={stat} value={stat + increase} onStep={onStep('st')} style={{width: '100%'}}/>
                }/>
                <Column title='AG' render={
                    (_, {stats: {ag: stat}, increase: {ag: increase}}: StatsTableProps) =>
                         <InputNumber min={stat} value={stat + increase} onStep={onStep('ag')} style={{width: '100%'}}/>
                }/>
                <Column title='AV' render={
                    (_, {stats: {av: stat}, increase: {av: increase}}: StatsTableProps) =>
                         <InputNumber min={stat} value={stat + increase} onStep={onStep('av')} style={{width: '100%'}}/>
                }/>
            </Table>
    }

const PlayerCardTitle: React.FC<{title: string, subtitle: string}> =
    ({title, subtitle}) =>
        <><span style={{fontSize: '100%'}}>{title}</span> { subtitle ? <><b style={{fontSize: '90%'}}>{subtitle}</b></> : ''}</>

const PieceCardTitle: React.FC<{piece: Piece}> =
    ({piece: { title: subtitle, positional: { title, max }}}) =>
        <PlayerCardTitle {...{title: `${title} (0-${max})`, subtitle}}/>

const PieceCount: React.FC<{value: number, increase: () => void, decrease: () => void}> =
    ({value, increase, decrease}) => {
        const onStep: (value: number, info: { type: 'up' | 'down'}) => void =
            (_ ,{type}) => type === 'up' ? increase() : decrease()
        return (
            <InputNumber size='small' min={0} style={{width: '60px'}} {...{value, onStep}}/>
        )
    }

const PieceCardExtra: React.FC<{piece: Piece}> =
    ({piece}) => {
        const [, dispatch] = useAppState()

        const cost = pieceCost(piece)
        
        const deleteOnClick = () =>
            dispatch({type: 'deletePiece', title: piece.title })

        const increaseOnClick = () =>
            dispatch({type: 'increasePiece', title: piece.title })

        const decreaseOnClick = () =>
            dispatch({type: 'decreasePiece', title: piece.title })

        const cloneOnClick = () =>
            dispatch({type: 'clonePiece', title: piece.title })

        return (
            <Row gutter={8}>
                <Col>
                    <DeleteButton onClick={deleteOnClick}/>
                    <CloneButton onClick={cloneOnClick}/>
                </Col>
                <Col>
                    <PieceCount value={piece.count} increase={increaseOnClick} decrease={decreaseOnClick}/>
                </Col>
                <Col>
                    @ <Tag>{cost}</Tag>
                </Col>
            </Row>
        )
    }

const includedIn: <T>(list: T[]) => (item: T) => boolean =
    list => item => includes(item)(list)

type SkillTagProps = {
    key: string,
    value: Skill,
}

const increaseSkillFromCount: (stat: Stat) => (countZeroBased: number) => IncreaseSkill =
    stat => count => `${join('', times(always('+'), count + 1))}${stat.toUpperCase()}` as IncreaseSkill

export const SelectSkills: React.FC<{title: string, startingSkills: Skill[], addedSkills: Skill[], normal: SkillGroup[], double: SkillGroup[], increase: WithStats, disabled?: boolean}> =
    ({title, startingSkills, addedSkills, normal, double, increase, disabled = false}) => {
        const [, dispatch] = useAppState()

        const increaseSkills: IncreaseSkill[] = [
            ...times(increaseSkillFromCount('ma'), increase.ma),
            ...times(increaseSkillFromCount('st'), increase.st),
            ...times(increaseSkillFromCount('ag'), increase.ag),
            ...times(increaseSkillFromCount('av'), increase.av),
        ]
 
        const selectedSkillNames = [...startingSkills, ...addedSkills]

        const allowedSkillGroups = [...normal, ...double]

        const skillIsntSelected: (skill: Skill) => boolean =
            pipe( includedIn(selectedSkillNames), not )

        const colorForSkillGroup: (skillGroup: SkillGroup) => string = cond([
            [(skillGroup) => normal.includes(skillGroup), always('green')],
            [(skillGroup) => double.includes(skillGroup), always('orange')],
            [T, always('black')]
        ])

        const colorForSkillName: (skill: Skill) => string = cond([
            [skillName => startingSkills.includes(skillName), always('')],
            [skillName => groupsToSkills(normal).includes(skillName), always('green')],
            [skillName => groupsToSkills(double).includes(skillName), always('orange')],
            [skillName => groupsToSkills([SkillGroup.Increase]).includes(skillName), always('orange')],
            [T, always('')]
        ])

        type t = LabeledValue // key value label

        const value = [...startingSkills, ...addedSkills, ...increaseSkills]


        const onSelect = (skill: Skill) =>
            dispatch({type: 'addSkillName', title, skill})

        const onClose = (skill: Skill) =>
            dispatch({type: 'removeSkillName', title, skill})

        const isStartingOrIncrease: (skill: Skill) => boolean =
            skill =>
                startingSkills.includes(skill) || includedIn(increaseSkills)(skill as IncreaseSkill)

        return (
            <Select<Skill[]>
                value={value}
                showSearch
                placeholder={ disabled ? '' : 'Choose Skill' }
                mode='multiple'
                size='middle'
                bordered={false}
                style={{width: '100%', margin: -6}}
                tagRender={({label, value}) =>
                    <Tag
                        onClose={() => onClose(value as Skill)}
                        closable={!isStartingOrIncrease(value as Skill) && !disabled}
                        color={colorForSkillName(value as Skill)}
                        >
                        {value}
                    </Tag>
                }
                onSelect={onSelect}
                disabled={disabled}
                >
                {
                    [SkillGroup.General, SkillGroup.Strength, SkillGroup.Agility, SkillGroup.Passing, SkillGroup.Mutation].map(skillGroup => {
                        if (!allowedSkillGroups.includes(skillGroup)) return ''
                        const selectableSkills = Skills[skillGroup].filter(skillIsntSelected)
                        return (
                            <Select.OptGroup key={skillGroup} label={<b style={{color: colorForSkillGroup(skillGroup)}}>{skillGroup}</b>}>
                                {
                                    selectableSkills
                                        .map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)
                                }
                            </Select.OptGroup>
                        )
                    })
                }
            </Select>
        )
    }

const PieceCard: React.FC<{piece: Piece}> =
    ({piece}) => {
        const [, dispatch] = useAppState()
        // const stats = statsUp(piece.positional, piece.addedSkills)
        // const stats = piece.positional.stats
        const increaseOnClick: (stat: Stat) => void =
            stat =>
                dispatch({type: 'increaseStat', title: piece.title, stat})

        const decreaseOnClick: (stat: Stat) => void =
            stat =>
                dispatch({type: 'decreaseStat', title: piece.title, stat})
            return (
                <Card type='inner' size='small' title={<PieceCardTitle {...{piece}}/>} extra={<PieceCardExtra {...{piece}}/>} style={{marginBottom: '16px'}} bodyStyle={{padding: '0px 6px'}} headStyle={{backgroundColor:'#888', color: '#FFF'}}>
                    <Row gutter={12} style={{padding: 0}}>
                        <Col span={10} style={{padding: '4px', height: '100%'}}>
                            <StatsTable {...{stats: piece.positional.stats, increase: piece.increase, increaseOnClick, decreaseOnClick}}/>
                        </Col>
                        <Col span={14}>
                            <div style={{ padding: '6px 0'}}>
                                <SkillGroupTags positional={piece.positional}/>
                            </div>
                            <div>
                                <SelectSkills
                                    title={piece.title}
                                    startingSkills={piece.positional.startingSkills}
                                    addedSkills={piece.addedSkills}
                                    normal={piece.positional.normal}
                                    double={piece.positional.double}
                                    increase={piece.increase}
                                    />
                            </div>
                        </Col>                            
                    </Row>
                </Card>
        )

    }

const PieceList: React.FC =
    () => {
        const [{pieces}] = useAppState()

        const sorted = pieces.sort((a, b) => a.positional.cost - b.positional.cost)

        return <>
            {sorted.map(piece => <PieceCard key={piece.title} {...{piece}}/>)}
        </>
    }

export const PiecesPanel: React.FC = () => {
    const [{selectedTeamType, pieces}] = useAppState()

    if (!selectedTeamType) return <></>

    return (
            <Panel height='100%'>
                <PiecesDropZone>
                    <h2>Pieces</h2>
                    {isEmpty(pieces) ? <NoPiecesMessage/> : <PieceList/>}
                </PiecesDropZone>
            </Panel>
    )
}

