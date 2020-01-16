import React, { Component, } from 'react';
import {Descriptions, Badge,Button } from 'antd';
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import { Link } from 'react-router-dom'
import items from '../../../../config/status'
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

    //获取状态数值
  setStatus=(status)=>{
    console.log(status)
    var msg=this.getStatusInfo(status)
    let statusMsg=msg.name
    return statusMsg
  }

  getStatusInfo=(status)=>{
    var a=items.find(item => {    
      return item.status === status;
    })
   return a
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
                    <Descriptions.Item label="预约时间" span={1.5}>{projectDetail.appointTime&&projectDetail.appointTime||'--'}</Descriptions.Item>
                    <Descriptions.Item label="截止时间" span={1.5}>{projectDetail.deadline&&projectDetail.deadline||'--'}</Descriptions.Item>
                    <Descriptions.Item label="计划开始时间" span={1.5}>{projectDetail.scheduledStartTime&&moment(parseInt(projectDetail.scheduledStartTime)).format('YYYY-MM-DD')||'--'}</Descriptions.Item>
                    <Descriptions.Item label="计划结束时间" span={1.5}>{projectDetail.scheduledFinishTime&&moment(parseInt(projectDetail.scheduledFinishTime)).format('YYYY-MM-DD')||'--'}</Descriptions.Item>
                    <Descriptions.Item label="实际开始时间" span={1.5}>{projectDetail.actualStartTime&&projectDetail.actualStartTime}</Descriptions.Item>
                    <Descriptions.Item label="实际结束时间" span={1.5}>{projectDetail.actualFinishTime&&projectDetail.actualFinishTime}</Descriptions.Item>                  
                    <Descriptions.Item label="地址名" span={1.5}>{projectDetail.address_name}</Descriptions.Item>
                    <Descriptions.Item label="紧急程度" span={1.5}>{projectDetail.level && projectDetail.level===1?'一般':(projectDetail.level===2?'紧急':'非常紧急')}</Descriptions.Item>
                    <Descriptions.Item label="审核人ID" span={1.5}>{projectDetail.principalId}</Descriptions.Item>
                    <Descriptions.Item label="状态" span={1.5}>{projectDetail.status&&this.setStatus(projectDetail.status)}</Descriptions.Item>
                    <Descriptions.Item label="服务商ID" span={1.5}>{projectDetail.facilitatorId}</Descriptions.Item>
                    <Descriptions.Item label="预计花费" span={1.5}>{projectDetail.totalCost}</Descriptions.Item>
                    <Descriptions.Item label="操作" span={3}>
                      <Link to={`/cbd/maintain/data`} style={{marginRight:'5px'}}>返回上一级</Link>
                      {/* {projectDetail.contract&&<Link to={`/cbd/pro/contract/detail/${projectDetail.contractId}`} style={{marginRight:'5px'}}>查看合同</Link>} */}
                     {projectDetail.projectId&& <Link to={`/cbd/pro/project/detail/${projectDetail.projectId}`}>查看项目</Link>}
                    </Descriptions.Item>
                  </Descriptions>
                
                </div>  
        )
    }

}
export default ProjectDetail