import { Col, Row, Statistic } from "antd"
import { useAppState } from "../AppState"
import { Panel } from "../components"
import { Positional, TEAM_TYPES } from "../TeamTypes"
import { SelectTeamType } from "./SelectTeamType"

const PositionalCard: React.FC<{positional: Positional}> =
    ({positional: { title, ma, st, ag, av, startingSkills, normal, double, cost }}) =>
        <div>
            {title}
        </div>

const TeamAssetCosts: React.FC =
    () =>
        <Row>
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
        </Row>

export const TeamTypeInfo: React.FC = () => {
    const [{selectedTeamType}] = useAppState()

    if (!selectedTeamType) return <></>

    const teamType = TEAM_TYPES[selectedTeamType]

    return <>
        <TeamAssetCosts/>
        {teamType.positionals.map(positional => <PositionalCard {...{positional}}/>)}
    </>
}