import { Card, Col, Row, Statistic } from "antd"
import { useDrag } from "react-dnd"
import { useAppState } from "../AppState"
import { Panel } from "../components"
import { Positional, TEAM_TYPES } from "../TeamTypes"
import { SelectTeamType } from "./SelectTeamType"

const PositionalCard: React.FC<{positional: Positional}> =
    ({positional: item}) => {
        const [{opacity}, ref] = useDrag(
            () => ({
                type: 'POSITIONAL',
                item,
                collect: monitor => ({
                    opacity: monitor.isDragging() ? 0.5 : 1
                })
            }),
            []
        )

        return (
            <div {...{ref}} style={{ opacity, cursor: 'pointer' }}>
                <Card>
                    {item.title}
                </Card>
            </div>
        )
    }

const TeamAssetCosts: React.FC =
    () =>
        <Row>
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
          <Col span={6}><Statistic title='Coaching' value={60}/></Col>  
          <Col span={6}><Statistic title='Apothecary' value={60}/></Col>  
          <Col span={6}><Statistic title='Cheerleaders' value={60}/></Col>  
        </Row>

export const TeamTypeInfo: React.FC = () => {
    const [{selectedTeamType}] = useAppState()

    if (!selectedTeamType) return <></>

    const teamType = TEAM_TYPES[selectedTeamType]

    return <>
        <TeamAssetCosts/>
        {teamType.positionals.map(positional => <PositionalCard key={positional.title} {...{positional}}/>)}
    </>
}