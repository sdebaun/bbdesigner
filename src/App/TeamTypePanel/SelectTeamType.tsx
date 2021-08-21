import { Select } from "antd"
import { useAppState } from "../AppState"
import { TEAM_TYPE_SELECT_OPTIONS } from "../TeamTypes"

export const SelectTeamType: React.FC = () => {
    const [{selectedTeamType: value}, dispatch] = useAppState()
  
    const onChange = (value: string) =>
      value && dispatch({type: 'selectTeamType', selectedTeamType: value})

    const onClear = () =>
        dispatch({type: 'clearTeamType'})
  
    return <Select {...{value, onChange, onClear}} allowClear placeholder='Choose team type' size='large' options={TEAM_TYPE_SELECT_OPTIONS} style={{width: '100%'}}/>
  
  }