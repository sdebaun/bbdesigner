import { Empty, Card, Row, Col, Table, Tag, Select, Button } from "antd";
import Column from "antd/lib/table/Column";
import { always, cond, isEmpty, prop, T } from "ramda";
import React from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppState";
import { Panel, SkillGroupTags } from "../components";
import { Piece, Positional, SkillGroup, skillGroupForName, SkillName, SKILLS_AGILITY, SKILLS_GENERAL, SKILLS_MUTATION, SKILLS_STAT, SKILLS_STRENGTH } from "../TeamTypes";

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

        const drop = (positional: Positional) =>
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
        <><span style={{fontSize: '100%'}}>{title}</span> { subtitle ? <><br/><b style={{fontSize: '90%'}}>{subtitle}</b></> : ''}</>

const PieceCardTitle: React.FC<{piece: Piece}> =
    ({piece: { title: subtitle, positional: { title }}}) =>
        <PlayerCardTitle {...{title, subtitle}}/>

const PieceCardExtra: React.FC<{piece: Piece}> =
    ({piece: { title, count, positional: { cost }}}) => {
        const [, dispatch] = useAppState()

        const deleteOnClick = () =>
            dispatch({type: 'deletePiece', title })

        const increaseOnClick = () =>
            dispatch({type: 'increasePiece', title })

        const decreaseOnClick = () =>
            dispatch({type: 'decreasePiece', title })

        return (
            <Row gutter={8}>
                <Col>
                    { count > 0 ?
                        <Button danger shape='circle' size='small' onClick={decreaseOnClick}>-</Button> :
                        <Button danger shape='circle' size='small' onClick={deleteOnClick}>X</Button>
                    }
                </Col>
                <Col>
                    <Button type='primary' shape='circle' size='small' onClick={increaseOnClick}>+</Button>
                </Col>
                <Col>
                    {count} @
                </Col>
                <Col>
                    <Tag>{cost}</Tag>
                </Col>
            </Row>
        )
    }

export const SelectSkills: React.FC<{title: string, startingSkills: SkillName[], addedSkills: SkillName[], normal: SkillGroup[], double: SkillGroup[], disabled?: boolean}> =
    ({title, startingSkills, addedSkills, normal, double, disabled = false}) => {
        const [, dispatch] = useAppState()

        const value = [...startingSkills, ...addedSkills]

        const selectedSkillNames = [...startingSkills, ...addedSkills]

        const generalSkillOptions = SKILLS_GENERAL
            .map(skill => skill.key)
            .filter(skillName => !selectedSkillNames.includes(skillName))
        const strengthSkillOptions = SKILLS_STRENGTH
            .map(skill => skill.key)
            .filter(skillName => !selectedSkillNames.includes(skillName))
        const agilitySkillOptions = SKILLS_AGILITY
            .map(skill => skill.key)
            .filter(skillName => !selectedSkillNames.includes(skillName))
        // const passingSkillOptions = SKILLS_PASSING
        //     .map(skill => skill.key)
        //     .filter(skillName => !selectedSkillNames.includes(skillName))
        const mutationSkillOptions = SKILLS_MUTATION
            .map(skill => skill.key)
            .filter(skillName => !selectedSkillNames.includes(skillName))
        const statSkillOptions = SKILLS_STAT
            .map(skill => skill.key)
            .filter(skillName => !selectedSkillNames.includes(skillName))
                
        const colorForSkillGroup: (skillGroup: SkillGroup) => string = cond([
            [(skillGroup) => normal.includes(skillGroup), always('green')],
            [(skillGroup) => double.includes(skillGroup), always('orange')],
            [T, always('black')]
        ])

        const colorForSkillName: (skillName: SkillName) => string = cond([
            [skillName => startingSkills.includes(skillName), always('')],
            [skillName => normal.includes(skillGroupForName(skillName)), always('green')],
            [skillName => double.includes(skillGroupForName(skillName)), always('orange')],
            [T, always('')]
        ])

        const onSelect = (skillName: SkillName) =>
            dispatch({type: 'addSkillName', title, skillName})

        const onClose = (skillName: SkillName) =>
            dispatch({type: 'removeSkillName', title, skillName})

        return (
            <Select
                value={value}
                mode='multiple'
                size='middle'
                bordered={false}
                style={{width: '100%', margin: -6}}
                tagRender={({value}) =>
                    <Tag onClose={() => onClose(value as SkillName)} closable={!startingSkills.includes(value as SkillName) && !disabled} color={colorForSkillName(value as SkillName)}>{value}</Tag>
                }
                onSelect={onSelect}
                disabled={disabled}
                >
                    {/* <SelectSkillsOptionGroup skillNames={generalSkillOptions} color={colorFor(SkillGroup.General)}/> */}
                    <Select.OptGroup label={<b style={{color: colorForSkillGroup(SkillGroup.General)}}>General</b>}>
                        {generalSkillOptions.map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)}
                    </Select.OptGroup>
                    <Select.OptGroup label={<b style={{color: colorForSkillGroup(SkillGroup.Strength)}}>Strength</b>}>
                        {strengthSkillOptions.map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)}
                    </Select.OptGroup>
                    <Select.OptGroup label={<b style={{color: colorForSkillGroup(SkillGroup.Agility)}}>Agility</b>}>
                        {agilitySkillOptions.map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)}
                    </Select.OptGroup>
                    <Select.OptGroup label={<b style={{color: colorForSkillGroup(SkillGroup.Passing)}}>Passing</b>}>
                        {mutationSkillOptions.map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)}
                    </Select.OptGroup>
                    <Select.OptGroup label={<b style={{color: colorForSkillGroup(SkillGroup.Stat)}}>Stat</b>}>
                        {statSkillOptions.map((key) => <Select.Option {...{key, value: key}}>{key}</Select.Option>)}
                    </Select.OptGroup>

            </Select>
        )
    }

const PieceCard: React.FC<{piece: Piece}> =
    ({piece}) => {
        return (
                <Card type='inner' size='small' title={<PieceCardTitle {...{piece}}/>} extra={<PieceCardExtra {...{piece}}/>} style={{marginBottom: '16px'}} bodyStyle={{padding: '0px 6px'}} headStyle={{backgroundColor:'#888', color: '#FFF'}}>
                    <Row gutter={12} style={{padding: 0}}>
                        <Col span={10} style={{padding: '4px', height: '100%'}}>
                            <StatsTable {...piece.positional}/>
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
        return <>
            {pieces.map(piece => <PieceCard key={piece.title} {...{piece}}/>)}
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
