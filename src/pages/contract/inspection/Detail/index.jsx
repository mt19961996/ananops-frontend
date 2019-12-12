import React,{Component,} from 'react'
import {Descriptions, Badge,Button, Form } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'
import Inspection from '../Index';

class InspectionDetail extends Component{
    constructor(props){
        super(props)
        this.state={
           
        }
    }
    render(){
        return(
            <div className="bg">
            <Descriptions bordered className="descriptions">
              <Descriptions.Item label="巡检设备ID">1</Descriptions.Item>
              <Descriptions.Item label="设备名字">23</Descriptions.Item>
              <Descriptions.Item label="设备类型">34</Descriptions.Item>
              <Descriptions.Item label="项目ID" span={1.5}>设备巡检</Descriptions.Item>
              <Descriptions.Item label="项目名称" span={1.5}>44</Descriptions.Item>
              <Descriptions.Item label="预计开始时间" span={1.5}>枫蓝国际电梯01号门</Descriptions.Item>
              <Descriptions.Item label="最晚开始时间" span={1.5}>枫蓝国际电梯01号门</Descriptions.Item>
              <Descriptions.Item label="巡检周期（天）" span={1.5}>2018-04-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="描述">无</Descriptions.Item>
              <Descriptions.Item label="巡检内容" span={3}> </Descriptions.Item>           
              <Descriptions.Item label="巡检情况" span={3}>2018-07-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="处理结果" span={3}>是</Descriptions.Item>
             
            </Descriptions>
          
          </div>  
        )
    }
}
export default InspectionDetail
