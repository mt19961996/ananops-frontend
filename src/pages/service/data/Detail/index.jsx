import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import { Link } from 'react-router-dom'
// const token=window.localStorage.getItem('token')
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
        method: 'GET',
        url: '/mdmc/mdmcTask/getTaskByTaskId/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
    .then((res) => {
        if(res && res.status === 200){   
            console.log(res.data.result)  
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
                    <Descriptions.Item label="工单编号" span={3}>{projectDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="维修任务名称" span={1.5}>{projectDetail.title}</Descriptions.Item>
                    <Descriptions.Item label="报修人电话" span={1.5}>{projectDetail.call}</Descriptions.Item>
                    <Descriptions.Item label="预约时间" span={1.5}>{projectDetail.appointTime}</Descriptions.Item>
                    <Descriptions.Item label="紧急程度" span={1.5}>{projectDetail.level}</Descriptions.Item>
                    <Descriptions.Item label="审核人ID" span={1.5}>{projectDetail.principalId}</Descriptions.Item>
                    <Descriptions.Item label="项目ID" span={1.5}>{projectDetail.projectId}</Descriptions.Item>
                    <Descriptions.Item label="合同ID" span={1.5}>{projectDetail.contractId}</Descriptions.Item>
                    <Descriptions.Item label="服务商ID" span={1.5}>{projectDetail.facilitatorId}</Descriptions.Item>
                    <Descriptions.Item label="维修建议" span={3}>{projectDetail.suggestion}</Descriptions.Item>
                    <Descriptions.Item label="总花费" span={1.5}>{projectDetail.totalCost}</Descriptions.Item>
                    <Descriptions.Item label="维修结果" span={1.5}>{projectDetail.result}</Descriptions.Item>
                    <Descriptions.Item label="操作" span={3}>
                      <Link to={`/cbd/maintain/data`}>返回上一级</Link>
                    </Descriptions.Item>
                  </Descriptions>
                
                </div>  
        )
    }

}
export default ProjectDetail