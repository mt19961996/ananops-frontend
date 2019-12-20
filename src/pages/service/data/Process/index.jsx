import React,{Component,} from 'react'
import {Descriptions, Badge,Button } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import './index.styl'
class Process extends Component{

    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
                <div className="bg">
                    <Descriptions bordered className="descriptions">
                    <Descriptions.Item label="工单编号" span={3}>1</Descriptions.Item>
                    <Descriptions.Item label="开始时间" span={1.5}>23</Descriptions.Item>
                    <Descriptions.Item label="结束时间" span={1.5}>34</Descriptions.Item>
                    <Descriptions.Item label="维修状态" span={3}>设备巡检</Descriptions.Item>
                    <Descriptions.Item label="维修任务名称" span={3}>44</Descriptions.Item>
                    <Descriptions.Item label="操作" span={3}><Link to="/alarm">返回上级</Link></Descriptions.Item>
                    </Descriptions>           
                </div>  
            )
        }
    
    }
export default Process