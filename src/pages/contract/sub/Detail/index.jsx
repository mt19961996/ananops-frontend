import React,{Component,} from 'react'
import {Descriptions, Badge,Button, Form, message } from 'antd';
import moment from 'moment';
import './index.styl'
import { Link } from 'react-router-dom'
import Inspection from '../Index';
import axios from 'axios'

class SubDetail extends Component{
    constructor(props){
        super(props)
        this.state={
          inspectionDetail:{
          },
          token:window.localStorage.getItem('token')
        }
      this.getDetail = this.getDetail.bind(this);
    }
    componentDidMount(){
      const { 
        match : { params : { subId } }
      } = this.props
      this.getDetail(subId);   
    }
    getDetail=(id)=>{
      axios({
        method: 'POST',
        url: '/pmc/inspectDetail/getInspectDetailById/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
      })
    .then((res) => {
        if(res && res.status === 200){     
        this.setState({
           inspectionDetail:res.data.result
        }) ;
        }
    })
    .catch(function (error) {
        console.log(error);
        message.info("您不具备该权限")
    });
    

    }
    render(){
      const { 
        match : { params : { projectId,id, } }
      } = this.props
      const {inspectionDetail}=this.state
        return(
            <div className="bg">
            <Descriptions bordered className="descriptions">
              <Descriptions.Item label="名称">{inspectionDetail.name}</Descriptions.Item>
              <Descriptions.Item label="巡检任务ID">{inspectionDetail.inspectionTaskId}</Descriptions.Item>
              <Descriptions.Item label="巡检任务名">{inspectionDetail.inspectionTaskName}</Descriptions.Item>
              <Descriptions.Item label="事件名称" span={1.5}>{inspectionDetail.itemName}</Descriptions.Item>
              <Descriptions.Item label="维修人员姓名" span={1.5}>{inspectionDetail.maintainerName}</Descriptions.Item>
              <Descriptions.Item label="维修人员ID" span={1.5}>{inspectionDetail.maintainerId}</Descriptions.Item>
              <Descriptions.Item label="评论" span={1.5}>{inspectionDetail.remark}</Descriptions.Item>
              <Descriptions.Item label="结果" span={1.5}>{inspectionDetail.result}</Descriptions.Item>
              <Descriptions.Item label="状态" span={1.5}>{inspectionDetail.status}</Descriptions.Item>
              <Descriptions.Item label="描述" span={3}>{inspectionDetail.description}</Descriptions.Item>           
              <Descriptions.Item label="操作" span={3}><Link to={`/cbd/pro/sub/${projectId}/${id}`}>返回上级</Link></Descriptions.Item>
            </Descriptions>
          
          </div>  
        )
    }
}
export default SubDetail
