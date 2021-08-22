import { Panel } from "../components"
import { SelectTeamType } from "./SelectTeamType"
import { TeamTypeInfo } from "./TeamTypeInfo"

export const TeamTypePanel: React.FC = () => {
    return (
        <Panel>
            <div style={{padding: '8px'}}>
            <SelectTeamType/>
            <TeamTypeInfo/>
            </div>
        </Panel>
    )
}