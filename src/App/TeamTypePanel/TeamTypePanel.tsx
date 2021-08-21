import { useAppState } from "../AppState"
import { Panel } from "../components"
import { SelectTeamType } from "./SelectTeamType"
import { TeamTypeInfo } from "./TeamTypeInfo"

export const TeamTypePanel: React.FC = () => {
    const [{selectedTeamType}] = useAppState()

    return (
        <Panel>
            <SelectTeamType/>
            <TeamTypeInfo/>
        </Panel>
    )
}