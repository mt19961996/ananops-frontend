import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'


class PlanDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
      check=()=>{
        const {
          history,
        } = this.props
        history.push('/inspection/subTask')
      }
      render() {
       
        return(
          <div className="bg">
            <Descriptions bordered className="descriptions">
              <Descriptions.Item label="任务序号">1</Descriptions.Item>
              <Descriptions.Item label="负责人序号">23</Descriptions.Item>
              <Descriptions.Item label="服务商序号">34</Descriptions.Item>
              <Descriptions.Item label="巡检类型">设备巡检</Descriptions.Item>
              <Descriptions.Item label="所属项目ID">44</Descriptions.Item>
              <Descriptions.Item label="地址">枫蓝国际电梯01号门</Descriptions.Item>
              <Descriptions.Item label="预计开始时间" span={1.5}>2018-04-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="预计完成时间" span={1.5}>2018-07-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="最迟完成时间" span={1.5}>2018-08-10 18:00:00</Descriptions.Item>
              <Descriptions.Item label="实际开始时间" span={1.5}>2018-04-25 18:00:00</Descriptions.Item>
              <Descriptions.Item label="实际完成时间" span={1.5}>2018-08-02 18:00:00</Descriptions.Item>
              <Descriptions.Item label="维修维护花费" span={1.5}>¥387.00</Descriptions.Item>
              <Descriptions.Item label="状态" span={3}>
                <Badge status="processing" text="进行中" />
              </Descriptions.Item>
              <Descriptions.Item label="总花费" span={3}>¥560.00</Descriptions.Item>
              <Descriptions.Item label="备注">
                {/* Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br /> */}
                电梯器械修复与人工服务费用      
                <br/>
              </Descriptions.Item>
              <Descriptions.Item label="操作" span={3}>
                {/* <Button style={{marginRight:5}} onClick={this.check}>查看子项</Button>
                    <Button>查看评论</Button> */}
                <Link
                  to={`/inspection/plan/subTask`}
                  style={{marginRight:'12px'}}
                >查看子项</Link>
                <Link
                  to={`/inspection/plan/comment`}
                  style={{marginRight:'12px'}}
                >查看评论</Link>
              </Descriptions.Item>
            </Descriptions>
          
          </div>
        )
      }
}
export default PlanDetail;