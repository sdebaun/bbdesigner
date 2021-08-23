import { Select } from "antd"
import { map, pipe, toPairs } from "ramda"
import { useAppState } from "../AppState"
import { TeamTypes, TeamType } from '../models'

const mapDataToOptions = pipe<typeof TeamTypes, [string, TeamType][], { value: string, label: string }[]>(
  toPairs,
  map(([key, teamType]) => ({ value: key, label: teamType.title }))
)

const options = mapDataToOptions(TeamTypes)

export const SelectTeamType: React.FC = () => {
    const [{selectedTeamType: value}, dispatch] = useAppState()
  
    const onChange = (value: string) =>
      value && dispatch({type: 'selectTeamType', selectedTeamType: value})

    const onClear = () =>
        dispatch({type: 'clearTeamType'})
  
    return <Select
              {...{value, onChange, onClear, options}}
              showSearch allowClear placeholder='Choose team type' size='large' style={{width: '100%'}}
              />
  }