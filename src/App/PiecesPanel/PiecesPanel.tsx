import { isEmpty } from "ramda";
import React from "react";
import { useAppState } from "../AppState";
import { Panel } from "../components";

export const PiecesPanel: React.FC = () => {
    const [{selectedTeamType, pieces}] = useAppState()

    if (!selectedTeamType) return <></>

    return (
        <Panel>
            <h2>Pieces</h2>
            {isEmpty(pieces) ? <p>Drag a position from the left to create a piece</p> : ''}
        </Panel>
    )
}
