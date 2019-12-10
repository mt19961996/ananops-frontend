import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'

class ManagementDetail extends Component{
    constructor(props){
        super(props)
            this.state={

            }
    }
    render(){
        return(
            <div className="bg">
            <Descriptions bordered className="descriptions">
              <Descriptions.Item label="合同ID" span={1.5}>1</Descriptions.Item>
              <Descriptions.Item label="合同编号" span={1.5}>238378</Descriptions.Item>
              <Descriptions.Item label="合同名称" span={1.5}>电梯安全维修维护</Descriptions.Item>
              <Descriptions.Item label="合同类型" span={1.5}>商务合同</Descriptions.Item>
              <Descriptions.Item label="合同开始时间" span={1.5}>2018-04-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="合同结束时间" span={1.5}>2023-07-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="合同签订时间" span={1.5}>2018-03-24 18:00:00</Descriptions.Item>       
              <Descriptions.Item label="付款时间" span={1.5}>2018-03-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="支付方式" span={1.5}>支付宝</Descriptions.Item>
              <Descriptions.Item label="项目金额" span={1.5}>¥1200000</Descriptions.Item>
              <Descriptions.Item label="乙方是否包备品备件">否</Descriptions.Item>
              <Descriptions.Item label="乙方是否提供备品备件替换服务">否</Descriptions.Item>
              <Descriptions.Item label="维修维护最迟响应时间（小时）">24</Descriptions.Item>
              <Descriptions.Item label="月度记录表提交周期（天）">10</Descriptions.Item>
              <Descriptions.Item label="维修工身份验证流程">无</Descriptions.Item>
              <Descriptions.Item label="合同是否变更" >否</Descriptions.Item>
              <Descriptions.Item label="合同是否作废" >否</Descriptions.Item>
              <Descriptions.Item label="是否自动顺延" >否</Descriptions.Item>
              <Descriptions.Item label="描述">无</Descriptions.Item>
            </Descriptions>         
          </div>
        )
    }
}
export default ManagementDetail