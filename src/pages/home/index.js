import React, { Component,} from 'react'
import { Empty,Card,Col,Row,Statistic,Icon,Divider,Progress} from 'antd'
import './index.styl'


class Home extends Component{

  
render () {
    return (
        <div className="container">
        <Row  gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
            <Col span={8}>
                <Card bordered={false} style={{marginBottom:25}} >
                <Statistic title="项目总数" value={3} />
                </Card>
                <Card bordered={false} style={{marginBottom:25}}>
                <Statistic title="合同总数" value={3}/>
                </Card>
                <Card bordered={false} >
                <Statistic title="巡检总数" value={2}/>
                </Card>
            </Col>
          
            <Col span={8}>
                <Card title={"完成量"} bordered={false} style={{marginBottom:30}} >
                <Progress type="circle" percent={75} />              
                </Card>
                <Card title={"故障率"} bordered={false} >
                <Progress type="circle" strokeColor="red" percent={5} />              
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} style={{marginBottom:20}}> 
                <Statistic
                    title="活跃度"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="arrow-up" />}
                    suffix="%"
                    
                />
                <Statistic
                    title="操作率"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<Icon type="arrow-down" />}
                    suffix="%"
                />
                
                </Card>
                <Card bordered={false} >
                <Statistic title="在线时长" value={12} suffix="h"/>
                </Card>
            </Col>
        </Row>
    </div>
       
    )
}
}
export default Home