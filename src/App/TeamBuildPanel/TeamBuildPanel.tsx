import { Empty, Table } from "antd";
import Column from "antd/lib/table/Column";
import { isEmpty, map, pipe, prop, sum, times } from "ramda";
import React from "react";
import { useAppState } from "../AppState";
import { Panel } from "../components";
import { SelectSkills } from "../PiecesPanel/PiecesPanel";
import { Piece, SkillGroup, Skill } from "../models";


const NoPiecesMessage: React.FC =
    () => <Empty style={{paddingBottom: '24px'}} description='Increase your piece counts to see your roster and total cost.'/>

type Stats = {
    ma: number,
    st: number,
    ag: number,
    av: number,
}

type PlayerRow = Stats & {
    title: string,
    positionalTitle: string,
    startingSkills: Skill[],
    addedSkills: Skill[],
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
                <div style={{padding: '8px 8px 0px 8px'}}>
                {cost > 0 ? <h2>{cost} TV</h2> : ''}
                </div>
                {totalPlayers(pieces) === 0 ? <NoPiecesMessage/> : <PlayerTable {...{pieces}}/>}
            </Panel>
    )
}
