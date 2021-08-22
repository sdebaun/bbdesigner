import React from 'react';
import { Row, Col } from 'antd'
import { TeamTypePanel } from './TeamTypePanel/TeamTypePanel';
import { PiecesPanel } from './PiecesPanel/PiecesPanel';
import { TeamBuildPanel } from './TeamBuildPanel/TeamBuildPanel';
import { Footer } from 'antd/lib/layout/layout';

export const AppLayout: React.FC = () =>
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <div style={{padding: '16px', display: 'flex', flex: '1', backgroundColor: '#EEE'}}>
        <Row gutter={[24, 24]} style={{minHeight: '100%', flex: '1', display: 'flex', alignItems: 'stretch'}}>
            <Col className='gutter-row' span={7} style={{}}>
                <TeamTypePanel/>
            </Col>
            <Col className='gutter-row' span={7}>
                <PiecesPanel/>
            </Col>
            <Col className='gutter-row' span={10}>
                <TeamBuildPanel/>
            </Col>
        </Row>
    </div>
    <Footer style={{textAlign: 'center'}}>
        <a href='mailto:sdebaun74@gmail.com'>stephen debaun</a>
        {' | '}<a target='_blank' rel='noreferrer' href='https://github.com/sdebaun/bbdesigner'>on github</a>
        {' | '}<a target='_blank' rel='noreferrer' href='https://github.com/sdebaun/bbdesigner/issues'>report issue</a>
        {' | '}<a target='_blank' rel='noreferrer' href='http://www.elyoukey.com/bbpusher'>bbpusher mock board</a>
    </Footer>
</div>
