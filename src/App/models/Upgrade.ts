import { map, pipe, sum } from "ramda"

export type Upgrade =
    | 'Team Reroll'
    | 'Cheerleader'
    | 'Coach'
    | 'Apothecary'
    | 'Fan Factor'

export type Upgrades = { [k in Upgrade]: number }

export const costOfUpgrades: (costs: Upgrades, amounts: Upgrades) => number =
    (costs, amounts) =>
        pipe(
            map((upgrade: Upgrade) => costs[upgrade] * amounts[upgrade]),
            sum
        )(Object.keys(costs) as Upgrade[])
