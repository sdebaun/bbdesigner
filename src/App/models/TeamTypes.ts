import { Position } from './Position'
import { Upgrades } from './Upgrade'

import { ChaosDwarf } from './teams/ChaosDwarf'
import { TeamType, TeamTypeKey } from './TeamType'

export const TeamTypes: {[k in TeamTypeKey]: TeamType} = {
    ChaosDwarf,
}
