import { Table } from "antd"
import Column from "antd/lib/table/Column"
import { keys } from "ramda"
import { Upgrade, Upgrades } from "../models"

export const TeamAssets: React.FC<{upgrades: Upgrades, renderCell: (upgrade: Upgrade) => React.ReactNode}> =
    ({upgrades, renderCell}) => {
        const dataSource = [upgrades]

        return (
            <Table<Upgrades> {...{dataSource}}
                size='small'
                pagination={false}
                bordered
                >
                {
                    keys(upgrades).map(upgrade => (
                        <Column width='20%' title={upgrade} dataIndex={upgrade} key={upgrade} render={() => 
                            renderCell(upgrade)
                        }/>
                    ))
                }
                
            </Table>
        )
    }