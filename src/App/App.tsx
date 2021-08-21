import React, { SyntheticEvent } from 'react';
import { Grid, Header, Segment, Select, DropdownProps } from 'semantic-ui-react'
import { AppStateProvider, useAppState } from './AppState'

type TeamTypeOption = {
  key: string, value: string, text: string
}

const teamTypeOptions: TeamTypeOption[] = [
  { key: 'vt', value: 'vt', text: 'Violence Together' },
  { key: 'au', value: 'au', text: 'Afterlife United' }
]

const AppHeaderGridRow: React.FC = ({children}) =>
  <Grid.Row columns={1}>
    <Header as='h4'>{children}</Header>
  </Grid.Row>

const SelectTeamType: React.FC = () => {
  const [{selectedTeamType: value}, dispatch] = useAppState()

  const onChange = (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) =>
    data.value && dispatch({type: 'selectTeamType', selectedTeamType: data.value?.toString()})

  return <Select selection {...{value}} placeholder='Choose team type' options={teamTypeOptions} onChange={onChange}/>
}

export const App: React.FC = () =>
  <AppStateProvider>
    <div style={{padding: '1em'}}>
      <Grid padded={true}>
        <AppHeaderGridRow>Blood Bowl Team Builder</AppHeaderGridRow>
        <Grid.Row columns={3}>
          <Grid.Column>
            <Segment>
              <SelectTeamType/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Select placeholder='Choose team type' options={teamTypeOptions}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Select placeholder='Choose team type' options={teamTypeOptions}/>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  </AppStateProvider>
