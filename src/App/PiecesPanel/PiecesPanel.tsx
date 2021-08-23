import { Empty, Card, Row, Col, Table, Tag, Select, InputNumber } from "antd";
import Column from "antd/lib/table/Column";
import { always, cond, includes, isEmpty, not, pipe, prop, T } from "ramda";
import React from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppState";
import { DeleteButton, Panel, SkillGroupTags } from "../components";
import { Piece, Position, SkillGroup, Skill, Skills, groupsToSkills, statsUp, pieceCost } from "../models";

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

const StatsTable: React.FC<Stats> =
    (stats) => {
        return <Table bordered dataSource={[stats].map(stat => ({...stat, key: 1}))} size='small' pagination={false} style={{height: '100%'}}>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
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

        return (
            <Row gutter={8}>
                <Col>
                    <DeleteButton onClick={deleteOnClick}/>
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

export const SelectSkills: React.FC<{title: string, startingSkills: Skill[], addedSkills: Skill[], normal: SkillGroup[], double: SkillGroup[], disabled?: boolean}> =
    ({title, startingSkills, addedSkills, normal, double, disabled = false}) => {
        const [, dispatch] = useAppState()

        const value = [...startingSkills, ...addedSkills]

        const selectedSkillNames = [...startingSkills, ...addedSkills]

        const allowedSkillGroups = [...normal, ...double]

        // const skillIsntSelected = (skill: Skill) => !selectedSkillNames.includes(skill)
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
            [T, always('')]
        ])

        const onSelect = (skill: Skill) =>
            dispatch({type: 'addSkillName', title, skill})

        const onClose = (skill: Skill) =>
            dispatch({type: 'removeSkillName', title, skill})

        return (
            <Select<Skill[]>
                value={value}
                showSearch
                placeholder={ disabled ? '' : 'Choose Skill' }
                mode='multiple'
                size='middle'
                bordered={false}
                style={{width: '100%', margin: -6}}
                tagRender={({value}) =>
                    <Tag onClose={() => onClose(value as Skill)} closable={!startingSkills.includes(value as Skill) && !disabled} color={colorForSkillName(value as Skill)}>{value}</Tag>
                }
                onSelect={onSelect}
                disabled={disabled}
                >
                {
                    Object.values(SkillGroup).map(skillGroup => {
                        if (!allowedSkillGroups.includes(skillGroup)) return ''
                        return (
                            <Select.OptGroup key={skillGroup} label={<b style={{color: colorForSkillGroup(skillGroup)}}>{skillGroup}</b>}>
                                {
                                    Skills[skillGroup]
                                        .filter(skillIsntSelected)
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
        const stats = statsUp(piece.positional, piece.addedSkills)
        return (
                <Card type='inner' size='small' title={<PieceCardTitle {...{piece}}/>} extra={<PieceCardExtra {...{piece}}/>} style={{marginBottom: '16px'}} bodyStyle={{padding: '0px 6px'}} headStyle={{backgroundColor:'#888', color: '#FFF'}}>
                    <Row gutter={12} style={{padding: 0}}>
                        <Col span={10} style={{padding: '4px', height: '100%'}}>
                            <StatsTable {...stats}/>
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

