import { Position } from './Position'
import { Upgrades } from './Upgrade'

export type TeamType = {
    title: string
    dataEntryBy?: string
    upgradeCosts: Upgrades,
    positionals: Position[]
}
