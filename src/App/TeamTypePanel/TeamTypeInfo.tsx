import { Card, Col, Row, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useDrag } from "react-dnd"
import { useAppState } from "../AppState"
import { SkillGroupTags, TeamAssets } from "../components"
import { SkillTags } from "../components/SkillTags"
import { Position, TeamTypes, WithStats } from "../models"
import { Upgrades } from "../models/Upgrade"

type StatsRow = { stats: WithStats, increase?: WithStats }

const StatsTable: React.FC<StatsRow> =
    ({stats, increase = {ma: 0, st: 0, ag: 0, av: 0}}) => {
        const combined: WithStats = {
            ma: stats.ma + increase.ma,
            st: stats.st + increase.st,
            ag: stats.ag + increase.ag,
            av: stats.av + increase.av,
        }
        return <Table bordered dataSource={[{...combined, key: 1}]} size='small' pagination={false} style={{height: '100%'}}>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
            </Table>
    }

const PositionalCardTitle: React.FC<{positional: Position}> =
    ({positional}) =>
        <>{positional.title} (0-{positional.max})</>

const PositionalCard: React.FC<{positional: Position}> =
    ({positional}) => {
        const [{opacity}, ref] = useDrag(
            () => ({
                type: 'POSITIONAL',
                item: positional,
                collect: monitor => ({
                    opacity: monitor.isDragging() ? 0.5 : 1
                })
            }),
            []
        )

        return (
            <div {...{ref}} style={{ opacity, cursor: 'pointer' }} key={positional.title}>
                <Card type='inner' size='small' title={<PositionalCardTitle {...{positional}}/>} extra={<Tag>{positional.cost}</Tag>} hoverable style={{marginBottom: '16px'}} bodyStyle={{padding: '0px 6px'}} headStyle={{backgroundColor:'#888', color: '#FFF'}}>
                    <Row gutter={12} style={{padding: 0}}>
                        <Col span={10} style={{padding: '4px', height: '100%'}}>
                            <StatsTable {...{stats: positional.stats}}/>
                        </Col>
                        <Col span={14}>
                            <div style={{ padding: '6px 0'}}>
                                <SkillGroupTags {...{positional}}/>
                            </div>
                            <div>
                                <SkillTags skills={positional.startingSkills} color=''/>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        )

    }

const TeamAssetCosts: React.FC<{upgradeCosts: Upgrades}> =
    ({upgradeCosts}) =>
        <TeamAssets
            upgrades={upgradeCosts}
            renderCell={upgrade => (
                <div key={upgrade} style={{fontSize: '16px'}}>{upgradeCosts[upgrade]}</div>
            )}
            />

export const TeamTypeInfo: React.FC = () => {
    const [{selectedTeamType}] = useAppState()

    if (!selectedTeamType) return <></>

    const teamType = TeamTypes[selectedTeamType]

    return <>
        <div style={{padding: '8px 0px 8px 0px'}}>
        <TeamAssetCosts {...teamType}/>
        </div>
        {
            teamType.positions
                .sort((a, b) => a.cost - b.cost)
                .map(positional => <PositionalCard key={positional.title} {...{positional}}/>)
        }
    </>
}