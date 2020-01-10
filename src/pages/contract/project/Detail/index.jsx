import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import { Link } from 'react-router-dom'
class ProjectDetail extends Component{
    constructor(props){
        super(props)
        this.state={
          projectDetail:{

          },
          token:window.localStorage.getItem('token')
        }
        this.getDetail = this.getDetail.bind(this);
    }
    componentDidMount(){
      const { 
        match : { params : { id } }
      } = this.props
      console.log(id)
      this.getDetail(id);   
    }
    getDetail=(id)=>{
      axios({
        method: 'POST',
        url: '/pmc/project/getById/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
    .then((res) => {
        if(res && res.status === 200){     
        this.setState({
           projectDetail:res.data.result
        }) ;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    

    }
    render(){
      const {projectDetail}=this.state
      const {match : { params : { id } }} = this.props   
      console.log(projectDetail)
        return(
                <div className="bg">
                  <Descriptions bordered className="descriptions">
                    <Descriptions.Item label="项目序号">{projectDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="项目名称">{projectDetail.projectName}</Descriptions.Item>
                    <Descriptions.Item label="项目类型">{projectDetail.projectType}</Descriptions.Item>
                    <Descriptions.Item label="甲方ID" span={1.5}>{projectDetail.partyAId}</Descriptions.Item>
                    <Descriptions.Item label="甲方名称" span={1.5}>{projectDetail.partyAName}</Descriptions.Item>
                    <Descriptions.Item label="甲方项目负责人ID" span={1.5}>{projectDetail.aleaderId}</Descriptions.Item>
                    <Descriptions.Item label="甲方项目负责人姓名" span={1.5}>{projectDetail.aleaderName}</Descriptions.Item>
                    <Descriptions.Item label="甲方项目负责人电话" span={1.5}>{projectDetail.aleaderTel}</Descriptions.Item>
                    <Descriptions.Item label="乙方ID" span={1.5}>{projectDetail.partyBId}</Descriptions.Item>
                    <Descriptions.Item label="乙方名称" span={1.5}>{projectDetail.partyBName}</Descriptions.Item>
                    <Descriptions.Item label="乙方项目负责人ID" span={1.5}>{projectDetail.bleaderId}</Descriptions.Item>
                    <Descriptions.Item label="乙方项目负责人姓名" span={1.5}>{projectDetail.bleaderName}</Descriptions.Item>
                    <Descriptions.Item label="乙方项目负责人电话" span={1.5}>{projectDetail.bleaderTel}</Descriptions.Item>
                    <Descriptions.Item label="项目是否作废" span={3}>
                     {projectDetail.isDestroy==0?<Badge status="processing" text="有效" />:<Badge status="Error" text="作废" />}
                    </Descriptions.Item>
                    <Descriptions.Item label="开始时间" span={2}>{projectDetail.startTime}</Descriptions.Item>
                    <Descriptions.Item label="结束时间" span={1.5}>{projectDetail.endTime}</Descriptions.Item>
                    <Descriptions.Item label="是否签署合同">{projectDetail.isContract==0?'是':'否'}</Descriptions.Item>
                    <Descriptions.Item label="合同ID">{projectDetail.contractId}</Descriptions.Item>
                    <Descriptions.Item label="合同名称">{projectDetail.contractName}</Descriptions.Item>
                    <Descriptions.Item label="甲方联系人" span={3}>甲方联系人1 姓名：{projectDetail.aoneName}  联系方式：{projectDetail.partyAOne} <br/>
                    甲方联系人2 姓名：{projectDetail.atwoName}  联系方式：{projectDetail.partyATwo} <br/>
                    甲方联系人3 姓名：{projectDetail.athreeName}  联系方式：{projectDetail.partyAThree}
                    </Descriptions.Item>
                    <Descriptions.Item label="乙方负责人联系方式" span={2}>{projectDetail.partyBOne}</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时开通的移动电话" span={1.5}>{projectDetail.partyBPhone}</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时值班电话" span={2}>{projectDetail.partyBTel}</Descriptions.Item>
                    <Descriptions.Item label="乙方24小时开通邮箱" span={1.5}>{projectDetail.partyBEmail}</Descriptions.Item>
                    <Descriptions.Item label="描述" span={3}>{projectDetail.description}</Descriptions.Item>
                    <Descriptions.Item label="操作">
                      <Link to={`/cbd/pro/project`}>返回上一级</Link>
                    </Descriptions.Item>
                  </Descriptions>
                
                </div>  
        )
    }

}
export default ProjectDetail