import { Empty, InputNumber, Table } from "antd";
import Column from "antd/lib/table/Column";
import { isEmpty, map, pipe, prop, sum, times } from "ramda";
import React from "react";
import { useAppState } from "../AppState";
import { Panel } from "../components";
import { SelectSkills } from "../PiecesPanel/PiecesPanel";
import { Piece, SkillGroup, Skill, pieceCost, WithStats, TeamTypes } from "../models";
import { costOfUpgrades, Upgrade, Upgrades } from "../models/Upgrade";
import { TeamAssets } from "../components";
// import { TeamTypes } from "../models/TeamType";

const NoPiecesMessage: React.FC =
    () => <Empty style={{paddingBottom: '24px'}} description='Increase your piece counts to see your roster and total cost.'/>

type PlayerRow = WithStats & {
    rowKey: string,
    title: string,
    positionalTitle: string,
    startingSkills: Skill[],
    addedSkills: Skill[],
    cost: number
    normal: SkillGroup[],
    double: SkillGroup[],
    increase: WithStats,
}

const piecesToPlayerRows: (pieces: Piece[]) => PlayerRow[] =
    pieces => {
        const rows: PlayerRow[] = []

        pieces.forEach(piece => {
            times(i => rows.push({
                rowKey: `${piece.title}-${i}`,
                title: piece.title,
                positionalTitle: piece.positional.title,
                startingSkills: piece.positional.startingSkills,
                addedSkills: piece.addedSkills,
                cost: pieceCost(piece),
                ma: piece.positional.stats.ma + piece.increase.ma,
                st: piece.positional.stats.st + piece.increase.st,
                ag: piece.positional.stats.ag + piece.increase.ag,
                av: piece.positional.stats.av + piece.increase.av,
                normal: piece.positional.normal,
                double: piece.positional.double,
                increase: piece.increase,
            }), piece.count)
        })

        return rows;
    }

const PlayerTable: React.FC<{pieces: Piece[]}> =
    ({pieces}) => {
        const dataSource = piecesToPlayerRows(pieces)
        return (
            <Table {...{dataSource}} size='small' pagination={false} rowKey='rowKey'>
                <Column title='Title' render={
                    playerRow => <><span style={{fontSize:'100%'}}>{playerRow.positionalTitle}</span><br/><b style={{fontSize: '90%'}}>{playerRow.title}</b></>
                }/>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
                <Column title='skills' render={
                    ({startingSkills, addedSkills, normal, double, increase}: PlayerRow) => <>
                        <SelectSkills title='' disabled={true} {...{startingSkills, addedSkills, normal, double, increase }}/>
                    </>
                }/>
                <Column title='TV' dataIndex='cost'/>
            </Table>
        )
    }

const totalCost: (pieces: Piece[]) => number =
    pipe(
        map((piece: Piece) => piece.count * pieceCost(piece)),
        sum
    )

const totalPlayers: (pieces: Piece[]) => number =
            pipe( map(prop('count')), sum)

const TeamAssetCount: React.FC<{value: number, increase?: () => void, decrease?: () => void}> =
    ({value, increase, decrease}) => {
        if (increase && decrease) {
            const onStep: (value: number, info: { type: 'up' | 'down'}) => void =
                (_ ,{type}) => type === 'up' ? increase() : decrease()

            return (
                    <InputNumber bordered={false} size='large' min={0} style={{width: '100%'}} {...{value, onStep}}/>
            )
        }
        return <span>{value}</span>
    }

const TeamAssetCounts: React.FC<{upgrades: Upgrades}> =
    ({upgrades}) => {
        const [, dispatch] = useAppState()

        const increase: (upgrade: Upgrade) => () => void =
            upgrade => () => dispatch({type: 'increaseUpgrade', upgrade})

        const decrease: (upgrade: Upgrade) => () => void =
            upgrade => () => dispatch({type: 'decreaseUpgrade', upgrade})

        return (
            <TeamAssets
                upgrades={upgrades}
                renderCell={upgrade => (
                    <TeamAssetCount key={upgrade} value={upgrades[upgrade]} increase={increase(upgrade)} decrease={decrease(upgrade)}/>
                )}
                />
        )
    }
        
export const TeamBuildPanel: React.FC = () => {
    const [{pieces, selectedTeamType, upgrades}] = useAppState()

    if (isEmpty(pieces) || !selectedTeamType) return <></>

    const teamType = TeamTypes[selectedTeamType]

    const cost = totalCost(pieces) + costOfUpgrades(teamType.upgradeCosts, upgrades)

    const playerCount = totalPlayers(pieces)

    return (
            <Panel>
                <div style={{padding: '8px 8px 0px 8px'}}>
                    <h2>{cost} TV <span style={{fontSize: '80%'}}>{playerCount}/11</span></h2>
                </div>
                <div style={{padding: '0px 8px 8px 8px'}}>
                    <TeamAssetCounts {...{upgrades}}/>
                </div>
                {playerCount === 0 ? <NoPiecesMessage/> : <PlayerTable {...{pieces}}/>}
            </Panel>
    )
}
