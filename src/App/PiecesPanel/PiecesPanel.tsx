import { Empty, Card } from "antd";
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

const PieceCard: React.FC<{piece: Piece}> =
    ({piece}) =>
        <Card>
            {piece.title}
            <br/>
            {piece.positional.title}
        </Card>

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
