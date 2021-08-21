import { Empty, Card, Row, Col, Table, Tag, Select, Button } from "antd";
import Column from "antd/lib/table/Column";
import { count } from "console";
import { always, cond, isEmpty, prop, T } from "ramda";
import React from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppState";
import { Panel } from "../components";
import { Piece, Positional } from "../TeamTypes";

const defaultStyle: React.CSSProperties = { minHeight: '40px' }
const canDropStyle: React.CSSProperties = Object.assign({}, defaultStyle, { backgroundColor: 'green' })
const isOverStyle: React.CSSProperties = Object.assign({}, defaultStyle, { backgroundColor: 'blue' })

type DropProps = {canDrop: boolean, isOver: boolean}

const styleForDropZone: (props: DropProps) => React.CSSProperties =
    cond<DropProps, React.CSSProperties>([
        [prop('canDrop'), always(canDropStyle)],
        [prop('isOver'), always(isOverStyle)],
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

// const PieceCard: React.FC<{piece: Piece}> =
//     ({piece}) =>
//         <Card>
//             {piece.title}
//             <br/>
//             {piece.positional.title}
//         </Card>

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

const PlayerCardTitle: React.FC<{title: string, subtitle: string}> =
    ({title, subtitle}) =>
        <>{title} { subtitle ? <i style={{fontSize: '90%', paddingLeft: '12px'}}>{subtitle}</i> : ''}</>

const PieceCardTitle: React.FC<{piece: Piece}> =
    ({piece: { title: subtitle, positional: { title }}}) =>
        <PlayerCardTitle {...{title, subtitle}}/>

// const PieceCardExtra: React.FC<{piece: Piece}> =
//     ({piece: { count, positional: { cost }}}) =>
//         <>
//             <Button danger shape='circle' size='small'>-</Button>
//             <Button type='primary' shape='circle' size='small'>+</Button>
//             {count}
//             @
//             <Tag>{cost}</Tag>
//         </>

const PieceCardExtra: React.FC<{piece: Piece}> =
    ({piece: { count, positional: { cost }}}) =>
        <Row gutter={8}>
            <Col>
                <Button danger shape='circle' size='small'>-</Button>
            </Col>
            <Col>
                <Button type='primary' shape='circle' size='small'>+</Button>
            </Col>
            <Col>
                {count} @
            </Col>
            <Col>
                <Tag>{cost}</Tag>
            </Col>
        </Row>

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
                                <Tag color='green'>G</Tag>
                                <Tag color='green'>S</Tag>
                                <Tag color='orange'>A</Tag>
                                <Tag color='orange'>P</Tag>
                                <Tag color='orange'>M</Tag>
                            </div>
                            <div>
                                {piece.positional.startingSkills.map(skill => <Tag>{skill}</Tag>)}
                            </div>
                        </Col>                            
                    </Row>
                    <Row gutter={12} style={{padding: 0}}>
                            <Select mode='tags' placeholder='Add skills...' defaultValue={[]} size='middle' bordered={false} style={{width: '100%'}}>
                                <Select.Option value='Block'>Block</Select.Option>
                                <Select.Option value='Tackle'>Tackle</Select.Option>
                                <Select.Option value='Sure Hands'>Sure Hands</Select.Option>
                            </Select>
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
            <Panel>
                <PiecesDropZone>
                    <h2>Pieces</h2>
                    {isEmpty(pieces) ? <NoPiecesMessage/> : <PieceList/>}
                </PiecesDropZone>
            </Panel>
    )
}
