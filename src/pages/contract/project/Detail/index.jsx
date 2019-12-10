import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'

class ProjectDetail extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
                <div className="bg">
                  <Descriptions bordered className="descriptions">
                    <Descriptions.Item label="项目序号">1</Descriptions.Item>
                    <Descriptions.Item label="项目名称">23</Descriptions.Item>
                    <Descriptions.Item label="项目类型">34</Descriptions.Item>
                    <Descriptions.Item label="甲方ID" span={1.5}>设备巡检</Descriptions.Item>
                    <Descriptions.Item label="甲方组织名称" span={1.5}>44</Descriptions.Item>
                    <Descriptions.Item label="乙方ID" span={1.5}>枫蓝国际电梯01号门</Descriptions.Item>
                    <Descriptions.Item label="乙方组织名称" span={1.5}>枫蓝国际电梯01号门</Descriptions.Item>
                    <Descriptions.Item label="项目是否作废" span={3}>
                      <Badge status="processing" text="进行中" />
                    </Descriptions.Item>
                    <Descriptions.Item label="开始时间" span={1.5}>2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="结束时间" span={1.5}>2018-07-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="是否签署合同">是</Descriptions.Item>
                    <Descriptions.Item label="合同ID">是</Descriptions.Item>
                    <Descriptions.Item label="合同名称">是</Descriptions.Item>
                    <Descriptions.Item label="甲方负责人联系方式" span={3}>联系人1: 130-2322-4323 <br/>
                    联系人2: 180-3223-5344 <br/>
                    联系人3: 187-2321-4343
                    </Descriptions.Item>
                    <Descriptions.Item label="乙方负责人联系方式" span={1.5}>183-2893-2894</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时开通的移动电话" span={1.5}>192-2973-2894</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时值班电话" span={1.5}>010-3828392</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时开通邮箱" span={1.5}>bbb@163.com</Descriptions.Item>
                    <Descriptions.Item label="描述">无</Descriptions.Item>
                  </Descriptions>
                
                </div>  
        )
    }

}
export default ProjectDetail