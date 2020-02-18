import React, { Component, } from 'react';
import {Descriptions, Badge,Button,Popconfirm } from 'antd';
import moment from 'moment';
import './index.styl'
import axios from 'axios'
import { Link } from 'react-router-dom'
import items from '../../../../config/status'
// const token=window.localStorage.getItem('token')
const FIRST_PAGE = 0;
class ProjectDetail extends Component{
  constructor(props){
    super(props)
    this.state={
      projectDetail:{

      },
      token:window.localStorage.getItem('token'),
      statusCode:'',
      roleCode:window.localStorage.getItem('roleCode'),
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
              projectDetail:res.data.result,
              statusCode:res.data.result.status
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
      return item.status===status;
    })
    return a
  }

  //返回不同的状态按钮
  getFunction(id,status){
    const {roleCode}=this.state
    if(status===3&&roleCode==='fac_leader'){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确认接单？"
            onConfirm={()=> {this.changeStatus(id,4,'审核通过，待服务商接单')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
            >接单</Button>
          </Popconfirm>
          <Popconfirm
            title="确认拒单？"
            onConfirm={()=> {this.changeStatus(id,14,'服务商业务员拒绝工单，待平台服务员重新派单')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >拒单</Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===4&&roleCode==='fac_leader'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
            onClick={()=>{this.assign(id)}}
          >分配工程师</Button>
        </div>
      )
    }
    else if(status===5&&roleCode==='engineer'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
            onClick={()=>{this.engineerAccept(id)}}
          >接单</Button>
          <Popconfirm
            title="确认拒单？"
            onConfirm={()=> {this.changeStatus(id,15,'工程师拒绝工单，待服务商重新派单')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >拒单</Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===6&&roleCode==='engineer'){
      return (
        <div style={{textAlign:'center'}}>
          <Link
            to={`/cbd/service/plan/${id}`}
            style={{marginRight:'12px'}}
          >方案确定</Link>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            onClick={()=>{this.resultSubmit(id)}}
          >提交结果</Button>
               
        </div>
      )
    }
    else if(status===7&&roleCode==='fac_leader'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            onClick={()=>{this.planApproval(id)}}
          >备件方案通过</Button>
          <Popconfirm
            title="确认该备件方案不通过？"
            onConfirm={()=> {this.changeStatus(id,16,'备件库管理员驳回备品备件方案，待工程师重新提交备品备件申请')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >备件方案不通过
            </Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===8&&roleCode==='user_leader'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
            onClick={()=>{this.managerApproval(id)}}
          >备件方案通过</Button>
          <Popconfirm
            title="确认该备件方案不通过？"
            onConfirm={()=> {this.changeStatus(id,17,'用户负责人驳回备品备件方案，待工程师重新提交备品备件申请')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >备件方案不通过</Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===2&&(roleCode=='user_manager'||roleCode==='user_leader'||roleCode==='user_service')){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确定该工单通过审核？"
            onConfirm={()=> {this.changeStatus(id,3,'审核通过，待服务商接单')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
            >工单审核通过</Button>
          </Popconfirm>
          <Popconfirm
            title="确定该工单不通过审核？"
            onConfirm={()=> {this.changeStatus(id,1,'用户负责人审核工单未通过，工单已取消')}}
          >
            
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >工单审核不通过</Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===10&&roleCode==='user_watcher'){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确定维修完成？"
            onConfirm={()=> {this.changeStatus(id,11,'值机员确认，待用户负责人审核账单')}}
          >
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >确认完成</Button>
          </Popconfirm>
        </div>
      )
    }
    else if(status===11&&roleCode==='user_leader'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            onClick={()=>{this.pay(id)}}
          >支付</Button>
        </div>
      )
    }
    else if(status===12&&roleCode==='user_watcher'){
      return (
        <div style={{textAlign:'center'}}>
          <Button 
            type="simple"
            style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
            onClick={()=>{this.comment(id)}}
          >评价</Button>
        </div>
      
      )
    }
  }


 

  engineerAccept=(id)=>{
    var info={}
    info.id=id
    this.setState({
      engineerAcceptVisible:true,
      engineerAcceptDetail:info
    })
  }

  resultSubmit(id){
    this.setState({resultVisible:true})
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
          this.setState({result:res.data.result})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  planApproval=(id)=>{
    this.setState({ planApprovalVisible:true})
    axios({
      method: 'GET',
      url: '/rdc/deviceOrder/all/object/'+id+'/'+1,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
    })
      .then((res) => {
        if(res && res.status === 200){
          var response=res.data.result
          var info={}
          info.id=response.deviceOrderList[0].deviceOrder.id
          info.objectType=1
          //  info.objectId=res.deviceOrderList[0].deviceOrder.id
          this.setState({planApprovalDetail:info})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  managerApproval=(record)=>{
    var info={}
    info.id=record
    this.setState({
      managerApprovalVisible:true,
      noteDetail:info
    })
  }
   
  assign=(record)=>{
    var info={}
    info.id=record
    this.setState({
      assignVisible:true,
      assignDetail:info
    })}

  comment(id){
    this.setState({commentVisible:true})
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
          var receive={}
          receive.taskId=res.data.result.id
          receive.userId=res.data.result.userId
          receive.principleId=res.data.result.principleId
          this.setState({comment:receive})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  pay=(id)=>{
    alert("支付完成")
    this.changeStatus(id,12,'用户负责人支付完成，待值机员评价')
  }

  render(){
    const {projectDetail,statusCode}=this.state
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
        </Descriptions>
        {this.getFunction(id,statusCode)}
        <div style={{textAlign:'right'}}>
          <Link to={`/cbd/maintain/data`} style={{marginRight:'5px'}}>返回上一级</Link>
          {/* {projectDetail.contract&&<Link to={`/cbd/pro/contract/detail/${projectDetail.contractId}`} style={{marginRight:'5px'}}>查看合同</Link>} */}
          {projectDetail.projectId&& <Link to={`/cbd/pro/project/detail/${projectDetail.projectId}`}>查看项目</Link>}
        </div>

      </div>
    )
  }

}
export default ProjectDetail