import { Card, Col, Row, Select, Statistic, Table, Tag } from "antd"
import Column from "antd/lib/table/Column"
import { useDrag } from "react-dnd"
import { useAppState } from "../AppState"
import { Positional, TEAM_TYPES } from "../TeamTypes"

type Stats = {
    ma: number,
    st: number,
    ag: number,
    av: number,
}

const StatsTable: React.FC<Stats> =
    (stats) => {
        return <Table bordered dataSource={[stats].map(stat => ({...stat, key: 1}))} size='small' pagination={false} style={{height: '100%'}}>
                <Column title='MA' dataIndex='ma'/>
                <Column title='ST' dataIndex='st'/>
                <Column title='AG' dataIndex='ag'/>
                <Column title='AV' dataIndex='av'/>
            </Table>
    }

const PositionalCardTitle: React.FC<{positional: Positional}> =
    ({positional}) =>
        <>{positional.title}</>
    
const PositionalCard: React.FC<{positional: Positional}> =
    ({positional}) => {
        const [{opacity}, ref] = useDrag(
            () => ({
                type: 'POSITIONAL',
                item: positional,
                collect: monitor => ({
                    opacity: monitor.isDragging() ? 0.5 : 1
                })
            }),
            []
        )

        return (
            <div {...{ref}} style={{ opacity, cursor: 'pointer' }} key={positional.title}>
                <Card type='inner' size='small' title={<PositionalCardTitle {...{positional}}/>} extra={<Tag>{positional.cost}</Tag>} hoverable style={{marginBottom: '16px'}} bodyStyle={{padding: '0px 6px'}} headStyle={{backgroundColor:'#888', color: '#FFF'}}>
                    <Row gutter={12} style={{padding: 0}}>
                        <Col span={10} style={{padding: '4px', height: '100%'}}>
                            <StatsTable {...positional}/>
                        </Col>
                        <Col span={14}>
                            <div style={{ padding: '6px 0'}}>
                                <Tag color='green'>G</Tag>
                                <Tag color='green'>S</Tag>
                                <Tag color='orange'>A</Tag>
                                <Tag color='orange'>P</Tag>
                                <Tag color='orange'>M</Tag>
                            </div>
                            <div>
                                {positional.startingSkills.map(skill => <Tag>{skill}</Tag>)}
                            </div>
                            {/* <Select open={false} mode='tags' defaultValue={['Block', 'Tackle', 'Sure Hands']} bordered={false} size='small'>
                                <Select.Option value='Block'>Block</Select.Option>
                                <Select.Option value='Tackle'>Tackle</Select.Option>
                                <Select.Option value='Sure Hands'>Sure Hands</Select.Option>
                            </Select> */}
                        </Col>
                    </Row>
                </Card>
            </div>
        )

    }

const TeamAssetCosts: React.FC =
    () =>
        <Row>
          <Col span={6}><Statistic title='Team Rerolls' value={60}/></Col>  
          <Col span={6}><Statistic title='Coaching' value={60}/></Col>  
          <Col span={6}><Statistic title='Apothecary' value={60}/></Col>  
          <Col span={6}><Statistic title='Cheerleaders' value={60}/></Col>  
        </Row>

export const TeamTypeInfo: React.FC = () => {
    const [{selectedTeamType}] = useAppState()

    if (!selectedTeamType) return <></>

    const teamType = TEAM_TYPES[selectedTeamType]

    return <>
        <TeamAssetCosts/>
        {teamType.positionals.map(positional => <PositionalCard key={positional.title} {...{positional}}/>)}
    </>
}