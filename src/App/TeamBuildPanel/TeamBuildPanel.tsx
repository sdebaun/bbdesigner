import { Empty, Card, Row, Col, Table, Tag, Select, Button } from "antd";
import Column from "antd/lib/table/Column";
import { count } from "console";
import { always, cond, isEmpty, map, pipe, prop, sum, T, times } from "ramda";
import React from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppState";
import { Panel, SkillGroupTags } from "../components";
import { SkillTags } from "../components/SkillTags";
import { SelectSkills } from "../PiecesPanel/PiecesPanel";
import { Piece, Positional, SkillGroup, SkillName } from "../TeamTypes";


const NoPiecesMessage: React.FC =
    () => <Empty description='Increase your piece counts to see your roster and total cost.'/>

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
        <>{title} { subtitle ? <i style={{fontSize: '90%', paddingLeft: '12px'}}>{subtitle}</i> : ''}</>

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

type PlayerRow = Stats & {
    title: string,
    positionalTitle: string,
    startingSkills: SkillName[],
    addedSkills: SkillName[],
    cost: number
    normal: SkillGroup[],
    double: SkillGroup[],
}

const piecesToPlayerRows: (pieces: Piece[]) => PlayerRow[] =
    pieces => {
        const rows: PlayerRow[] = []

        pieces.forEach(piece => {
            times(() => rows.push({
                title: piece.title,
                positionalTitle: piece.positional.title,
                startingSkills: piece.positional.startingSkills,
                addedSkills: piece.addedSkills,
                cost: piece.positional.cost,
                ma: piece.positional.ma,
                st: piece.positional.st,
                ag: piece.positional.ag,
                av: piece.positional.av,
                normal: piece.positional.normal,
                double: piece.positional.double,

            }), piece.count)
        })

        return rows;
    }

const PlayerTable: React.FC<{pieces: Piece[]}> =
    ({pieces}) => {
        const dataSource = piecesToPlayerRows(pieces)
        return (
            <Table {...{dataSource}} size='small' pagination={false}>
                <Column title='Title' render={
                    playerRow => <><span style={{fontSize:'100%'}}>{playerRow.positionalTitle}</span><br/><i style={{fontSize: '90%'}}>{playerRow.title}</i></>
                }/>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
                <Column title='skills' render={
                    ({startingSkills, addedSkills, normal, double}: PlayerRow) => <>
                        <SelectSkills title='' disabled={true} {...{startingSkills, addedSkills, normal, double }}/>
                        {/* <SkillTags skillNames={startingSkills} color=''/>
                        <SkillTags skillNames={addedSkills} color='green'/> */}
                    </>
                }/>
                <Column title='TV' dataIndex='cost'/>
            </Table>
        )
    }
const totalCost: (pieces: Piece[]) => number =
    pipe(
        map((piece: Piece) => piece.count * piece.positional.cost),
        sum
    )

const totalPlayers: (pieces: Piece[]) => number =
            pipe( map(prop('count')), sum)

export const TeamBuildPanel: React.FC = () => {
    const [{pieces}] = useAppState()

    if (isEmpty(pieces)) return <></>

    const cost = totalCost(pieces)

    return (
            <Panel>
                    {cost > 0 ? <h2>{cost} TV</h2> : ''}
                    {totalPlayers(pieces) == 0 ? <NoPiecesMessage/> : <PlayerTable {...{pieces}}/>}
            </Panel>
    )
}
