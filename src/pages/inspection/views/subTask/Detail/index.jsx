import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'


class SubTaskDetail extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
      }

      render() {
       
          return(
            <div className='bg'>
                <Descriptions bordered className='descriptions'>
                {/* <Descriptions.Item label="子项序号">1</Descriptions.Item> */}
                <Descriptions.Item label="维修任务序号">1</Descriptions.Item>
                <Descriptions.Item label="巡检任务序号">1</Descriptions.Item>
                <Descriptions.Item label="设备ID">ZKM-03-003</Descriptions.Item>
                <Descriptions.Item label="设备类型">烟雾报警器</Descriptions.Item>
                <Descriptions.Item label="设备异常等级">1</Descriptions.Item>
                <Descriptions.Item label="设备异常描述">无反应</Descriptions.Item>
                <Descriptions.Item label="预计开始时间" span={1.5}>2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="预计完成时间" span={1.5}>2018-07-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="实际开始时间" span={1.5}>2018-04-25 18:00:00</Descriptions.Item>
                <Descriptions.Item label="实际完成时间" span={1.5}>2018-08-02 18:00:00</Descriptions.Item>
                <Descriptions.Item label="截止时间" span={1.5}>2018-08-10 18:00:00</Descriptions.Item>
                <Descriptions.Item label="设备状态" span={1.5}>维修中</Descriptions.Item>
                <Descriptions.Item label="状态信息" span={3}>
                <Badge status="Error" text="暂停中" />
                </Descriptions.Item>
                <Descriptions.Item label="设备经度" span={1.5}></Descriptions.Item>
                <Descriptions.Item label="设备纬度" span={1.5}></Descriptions.Item>
                <Descriptions.Item label="描述信息">
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
                无      
                <br/>
                </Descriptions.Item>
            </Descriptions>
          
          </div>
          )
      }
}
export default SubTaskDetail;