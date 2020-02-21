import React, { Component, } from 'react';
import {Descriptions, Badge,Button,Popconfirm,Row,Col,Table,Input,message,Modal,Form} from 'antd';
import moment from 'moment';
import './index.styl'
import Confirm from '../../../system/Test/confirm'
import Result from  '../../../system/Test/result'
import Comment from '../../../system/Test/comment'
import Assign from '../../../system/Test/assign'
import Level from '../../../system/Test/level'
import Note from '../../../system/Test//note'
import Approval from '../../../system/Test//approval'
import axios from 'axios'
import { Link } from 'react-router-dom'
import items from '../../../../config/status'
import { platform } from 'os';
import { copyFileSync } from 'fs';
// const token=window.localStorage.getItem('token')
const FIRST_PAGE = 0;
const PAGE_SIZE = 100;
class ProjectDetail extends Component{
  constructor(props){
    super(props)
    this.state={
      projectDetail:{

      },
      token:window.localStorage.getItem('token'),
      statusCode:'',
      roleCode:window.localStorage.getItem('roleCode'),
      size: PAGE_SIZE,
      // total: 20, 
      nowCurrent:FIRST_PAGE,
      data:[],
      chooseid:'',
      statusMsg:'',
      commentVisible:false,
      comment:{},//值机员评价
      visible: false,
      result:{},
      assignDetail:{},//分配工程师
      detail:{},
      engineerAcceptDetail:{},//工程师接单定级
      noteDetail:{},//用户备件审核意见
      planApprovalDetail:{}, //服务商进行计划审批
      resultVisible:false,
      assignVisible:false,
      engineerAcceptVisible:false,
      managerApprovalVisible:false,
      planApprovalVisible:false,
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
  //操作改变进行状态之间的切换
  changeStatus(id,status,statusMsg){
    const values={"status": status,"statusMsg": statusMsg,"taskId":id}
    axios({
      method: 'POST',
      url: '/mdmc/mdmcTask/modifyTaskStatusByTaskId/{taskId}',
      headers: {
        'Content-Type': 'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:JSON.stringify(values)
    })
      .then((res) => {
        if(res && res.status === 200){
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
          {projectDetail.projectId&& <Link to={`/cbd/pro/project/detail/${projectDetail.projectId}`} style={{marginRight:'5px'}}>查看项目</Link>}   
          <Link to={`/cbd/maintain/data`} >返回上一级</Link>
  
  
          {/* {projectDetail.contract&&<Link to={`/cbd/pro/contract/detail/${projectDetail.contractId}`} style={{marginRight:'5px'}}>查看合同</Link>} */}
         
        </div>

        <div>
          <Modal
            title="备品备件审核"
            visible={this.state.planApprovalVisible}
            onOk={this.planApprovalOk}
            onCancel={this.planApprovalCancel}
            okText="确定"
            cancelText="取消"
          >
            <Approval setApproval={(form)=>{this.form = form}}  planApprovalDetail={this.planApprovalDetail}/>
          </Modal>
          <Modal
            title="分配工程师"
            visible={this.state.assignVisible}
            onOk={this.assignOk}
            onCancel={this.assignCancel}
            okText="确定"
            cancelText="取消"
          >
            <Assign setAssign={(form)=>{this.form = form}} assignDetail={this.assignDetail}/>
          </Modal>
          <Modal
            title="工程师定级"
            visible={this.state.engineerAcceptVisible}
            onOk={this.engineerAcceptOK}
            onCancel={this.engineerAcceptCancel}
            okText="确定"
            cancelText="取消"
          >
            <Level setLevel={(form)=>{this.form = form}} engineerAcceptDetail={this.engineerAcceptDetail}/>
          </Modal>
          <Modal
            title="备品备件审核"
            visible={this.state.managerApprovalVisible}
            onOk={this.managerApprovalOK}
            onCancel={this.managerApprovalCancel}
            okText="确定"
            cancelText="取消"
          >
            <Note setNote={(form)=>{this.form = form}} noteDetail={this.noteDetail}/>
          </Modal>
          <Modal
            title="提交结果"
            visible={this.state.resultVisible}
            onOk={this.resultOk}
            onCancel={this.resultCancel}
            okText="结束并提交"
            cancelText="取消"
          >
            <Result setSubmit={(form)=>{this.form = form}}  result={this.result}/>
          </Modal>
          <Modal
            title="评价"
            visible={this.state.commentVisible}
            onOk={this.commentOk}
            onCancel={this.commentCancel}
            okText="确定"
            cancelText="取消"
          >
            <Comment setComment={(form)=>{this.form = form}}  comment={this.comment}/>
          </Modal>
        </div>  

      </div>
    )
  }
 //备件库管理员处理后，待用户管理员审核
 managerApproval=(record)=>{
   var info={}
   info.id=record
   this.setState({
     managerApprovalVisible:true,
     noteDetail:info
   })
 }
//获取工程师信息
assign=(record)=>{
  var info={}
  info.id=record
  this.setState({
    assignVisible:true,
    assignDetail:info
  })
}

//提交方案modal框
showModal = () => {
  this.setState({    
    visible: true,
  });
};

//工程师接单
engineerAccept=(id)=>{
  var info={}
  info.id=id
  this.setState({
    engineerAcceptVisible:true,
    engineerAcceptDetail:info
  })
}

//服务商审批备品备件
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
//提交结果，获取已填部分
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

//确认提交
resultOk = e =>{
  this.setState({
    resultVisible: false,
  });
  const values = this.form.getFieldsValue() 
  values.status = 10
  console.log(values)
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/mdmc/mdmcTask/save',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        this.getInfo(FIRST_PAGE)
        //   this.changeStatus(res.data.result.id,8,'维修工提交维修结果，待服务商审核维修结果')
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}
//取消提交
resultCancel = e => {
  console.log(e);
  this.setState({
    resultVisible: false,
  });
};

//评论模态框，获取已知信息
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

//提交评论信息
commentOk = e =>{
  this.setState({
    commentVisible: false,
  });
  const values = this.form.getFieldsValue() 
  values.status=13
  console.log(values)
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/mdmc/mdmcReview/save',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        // this.changeStatus(res.data.result.taskId,13,'值机员评价完成，订单完成')
        this.getInfo(FIRST_PAGE)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

//取消评论模态框
commentCancel=e=>{
  this.setState({
    commentVisible:false
  })
}

//指定工程师模态框
assignOk=e=>{
  this.setState({assignVisible:false})
  const values = this.form.getFieldsValue() 
  console.log(values.maintainId)
  values.status=5
  values.deadline=this.form.getFieldValue('deadline').format('YYYY-MM-DD HH:mm:ss')
  console.log(values)
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/mdmc/mdmcTask/save',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        alert('提交成功')
        this.getInfo(FIRST_PAGE)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}
//取消指定
assignCancel=e=>{
  this.setState({
    assignVisible:false
  })
}

//工程师指定等级
engineerAcceptOK=()=>{
  this.setState({engineerAcceptVisible:false})
  const values = this.form.getFieldsValue() 
  values.status=6
  console.log(values)
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/mdmc/mdmcTask/save',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        alert('提交成功')
        this.getInfo(FIRST_PAGE)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

//工程师取消modal框
engineerAcceptCancel=()=>{
  this.setState({
    planApprovalVisible:false
  })
}

//用户支付流程
pay=(id)=>{
  alert("支付完成")
  this.changeStatus(id,12,'用户负责人支付完成，待值机员评价')
}

//备品备件服务商审批
planApprovalOk=()=>{
  this.setState({planApprovalVisible:false})
  const values=this.form.getFieldsValue()
  values.objectId=values.id
  values.status=1
  console.log(values)
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/rdc/deviceOrder/operation',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        alert('提交成功')
        this.getInfo(FIRST_PAGE)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
//备品备件用户审核意见确认
managerApprovalOK=()=>{
  this.setState({managerApprovalVisible:false})
  const values = this.form.getFieldsValue() 
  values.status=6
  axios({
    contentType:'application/json',
    method: 'POST',
    url: '/mdmc/mdmcTask/save',
    headers: {
      'deviceId': this.deviceId,
      'Authorization':'Bearer '+this.state.token,
    },
    data:values
  })
    .then((res) => {
      if(res && res.status === 200){
        alert('提交成功')
        this.getInfo(FIRST_PAGE)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

//备品备件审核取消
planApprovalCancel=()=>{
  this.setState({
    planApprovalVisible:false
  })
}
//备品备件用户审核取消
managerApprovalCancel=()=>{
  this.setState({
    managerApprovalVisible:false
  })
}


}
export default ProjectDetail