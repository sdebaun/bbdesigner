import React from 'react';
import { AppStateProvider, useAppState } from './AppState'
import { Row, Col, Select } from 'antd'
import { Panel } from './components';
import { TeamTypePanel } from './TeamTypePanel/TeamTypePanel';
import { PiecesPanel } from './PiecesPanel/PiecesPanel';

export const App: React.FC = () =>
  <AppStateProvider>
    <div style={{width: '100vw', height: '100vh', backgroundColor: '#DDD', padding: '16px'}}>
      <Row>
        <Col span={24}><h1>Blood Bowl Team Builder</h1></Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col className='gutter-row' span={8}>
          <TeamTypePanel/>
        </Col>
        <Col className='gutter-row' span={8}>
          <PiecesPanel/>
        </Col>
        <Col className='gutter-row' span={8}>three</Col>
      </Row>
    </div>
  </AppStateProvider>