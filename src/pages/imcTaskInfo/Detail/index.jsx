import React,{Component,} from 'react'
import { Descriptions,Button,Row,Col,Table,Input,Popconfirm,message,Modal,Form,Popover,Rate  } from 'antd';
import { Link,Route } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
import './index.styl'
const { TextArea } = Input;


const FIRST_PAGE = 0;
const PAGE_SIZE = 100;
const Search = Input.Search;
class TaskDetail  extends Component{
  constructor(props){
    super(props)
    this.state={
      imcTaskDetail:{

      },
      id:window.localStorage.getItem('id'),
      token:window.localStorage.getItem('token'),
      role:window.localStorage.getItem('role'),
      status:1,
      statusCode:'',
      statusMsg:'',
      roleCode:window.localStorage.getItem('roleCode'),
      current: FIRST_PAGE,
      size: PAGE_SIZE,
      // total: 20, 
      nowCurrent:FIRST_PAGE,
      imcTaskIdList:[],
      imcTaskList:{

      },
      data:[],
      reviewRank:null,
      reviewContent:null,
      assignDetail:{},//分配工程师
      assignVisible:false,
    }
    this.getInfo=this.getInfo.bind(this);
    this.getDetail = this.getDetail.bind(this);
  }
  componentDidMount(){
    this.getInfo(FIRST_PAGE);

    const { 
      match : { params : { id } }
    } = this.props
    
    console.log(id)
    this.getDetail(id); 
  }

  getDetail=(id)=>{
    axios({
      method: 'GET',
      url: '/imc/inspectionTask/getTaskByTaskId/'+id,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
    })
      .then((res) => {
        if(res && res.status === 200){   
          console.log(res.data.result)  
          this.setState({
            imcTaskDetail:res.data.result,
            statusCode:res.data.result.status

          }) ;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  

  }
  //根据不同的路由，加载不同的信息
  getInfo(page){  
    var location=this.props.location.pathname
    var status
    if(location == '/cbd/inspection/deny'){
      status=-1
    }
    else if(location == '/cbd/inspection/check'){
      status=0
    }  
    else if(location =='/cbd/inspection/accept'){  
      status=2
    }
    else if(location =='/cbd/inspection/execute'){  
      status=3
    }
    else if(location =='/cbd/inspection/confirm'){  
      status=4
    }
    else if(location =='/cbd/inspection/pay'){  
      status=5
    }
    else if(location==='/cbd/inspection/comment'){
      status=6
    }
    else if(location==='/cbd/inspection/finish'){
      status=7
    }
    else if(location === '/cbd/inspection/appoint'){
      status=3
    }
    else if(location === '/cbd/inspection/waitForMaintainer'){
      status=3
    }
    console.log(status)
    const { size, } = this.state;
    const values={orderBy: "appointTime",pageSize:size,pageNum:page,id:this.state.id,roleCode:this.state.roleCode,status:status,projectId:null}
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/getTaskByUserIdAndStatus',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:values
    })
      .then((res) => {
        if(res && res.status === 200){
          this.setState({
            data: res.data.result,
            nowCurrent:res.data.result.pageNum,
            status:status,
            // roleCode:roleCode,
          });
          console.log(res.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //返回不同的状态按钮
  getFunction(id,status){
    if(status===-1){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确定删除该任务？"
            onConfirm={()=> {this.deleteTask(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >删除</Button>
          </Popconfirm> 
        </div>
      )
    }
    else if(status=== 0 && this.state.role.includes('用户')){
      return (
        <div   style={{textAlign:'center'}}>
          <Popconfirm
            title="确定同意该巡检任务的执行？"
            onConfirm={()=> {this.approveImcTaskByA(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >同意执行</Button>
          </Popconfirm>  

          <Popconfirm
            title="确定否决该巡检任务的执行？"
            onConfirm={()=> {this.denyImcTaskByA(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >否决执行</Button>
          </Popconfirm>     
          <Popconfirm
            title="确定删除该任务？"
            onConfirm={()=> {this.deleteTask(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >删除</Button>
          </Popconfirm> 
        </div>
      )
    }
    else if(status===2  && this.state.role.includes('服务商')){
      return (
        <div style={{textAlign:'center'}}>
          {this.getAllUnConfirmedImcTask()}
          <Popconfirm
            title="确定接单？"
            onConfirm={()=> {this.acceptImcTaskByB(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >接单</Button>
          </Popconfirm>  

          <Popconfirm
            title="确定拒单？"
            onConfirm={()=> {this.denyImcTaskByB(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >拒单</Button>
          </Popconfirm> 
        
        </div>
      )
    }
    else if(status=== 3  && this.state.role.includes('服务商')){
      return (   
        <div style={{textAlign:'center'}}>
          {this.getAllUnDistributedImcTask()}
          <Popover 
            content={
              <div>
                <TextArea rows={4} value={this.state.reviewContent} />
                <Rate value = {this.state.reviewRank}></Rate>
              </div>
            } 
            title="任务评价情况"
            trigger="click"
          >
            <Button 
              onClick={()=>{this.getTaskReview(id)}}
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >查看评论</Button>
          </Popover>    
        </div>

      )
    }
    else if(status=== 4  && this.state.role.includes('用户')){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确认巡检结果？"
            onConfirm={()=> {this.confirmFinished(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >确认完成</Button>
          </Popconfirm>  
        </div>
      )
    }
    else if(status=== 5 && this.state.role.includes('用户')){
      return (
        <div style={{textAlign:'center'}}>
          <Popconfirm
            title="确定付款？"
            onConfirm={()=> {this.payImcTask(id)}}
          >
            <Button 
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >付款</Button>
          </Popconfirm> 
        </div>
      )
    }
    else if(status=== 6 && this.state.role.includes('用户')){
      return (
        <Link
          to={`/cbd/imcTaskInfo/review/${id}`}
          style={{marginRight:'12px',textAlign:'center'}}
        >评论</Link>  
      )
    }
    else if( status === 7 ){
      return (
        <div style={{textAlign:'center'}}>
          <Popover 
            content={
              <div>
                <TextArea rows={4} value={this.state.reviewContent} />
                <Rate value = {this.state.reviewRank}></Rate>
              </div>
            } 
            title="任务评价情况"
            trigger="click"
          >
            <Button 
              onClick={()=>{this.getTaskReview(id)}}
              type="simple"
              style={{marginRight:'12px',border:'none',padding:0,color:"#357aff",background:'transparent'}}
            >查看评论</Button>
          </Popover>
        </div>
      )
    }
  }

  //获取全部未审批的巡检工单
  getAllUnConfirmedImcTask = async()=>{
    const data = {
      orderBy:"string",
      pageNum:0,
      pageSize:100
    }
    const res1 = await axios({
      method: 'POST',
      url: '/spc/workorder/getAllUnConfirmedWorkOrders',
      headers: {
        'Content-Type':'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:JSON.stringify(data)
    })
    if(res1 && res1.status ===200){
      console.log("ppppp:" + JSON.stringify(res1.data.result))
      let imcTaskOrderList = res1.data.result.list;
      let length=0;
      // for(let imcTaskOrder in imcTaskOrderList){
      //   length++;
      // }
      // let imcTaskIdList = [];
      // for(let i = 0;i<length;i++){
      //   imcTaskIdList.push(imcTaskOrderList[i].id)
      // }
      this.setState({
        data:res1.data.result.list
      })
      console.log("未审批的巡检任务的id列表：" + this.state.imcTaskIdList);
    }
  }
  //获取全部为分配工程师的巡检任务
  getAllUnDistributedImcTask = async()=>{
    const data = {
      orderBy:"string",
      pageNum:0,
      pageSize:100
    }
    const res1 = await axios({
      method: 'POST',
      url: '/spc/workorder/getAllUnDistributedWorkOrders',
      headers: {
        'Content-Type':'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:JSON.stringify(data)
    })
    if(res1 && res1.status ===200){
      let imcTaskOrderList = res1.data.result.list;
      let length=0;
      // for(let imcTaskOrder in imcTaskOrderList){
      //   length++;
      // }
      // let imcTaskIdList = [];
      // for(let i = 0;i<length;i++){
      //   let res2
      //   imcTaskIdList.push(imcTaskOrderList[i].id)
      // }
      this.setState({
        data:res1.data.result.list
      })
      console.log("未分配工程师的巡检任务的id列表：" + JSON.stringify(this.state.data));
    }
  }
  //甲方负责人同意该巡检任务的执行
  approveImcTaskByA=(id)=>{
    console.log("当前巡检任务id为：" + id)
    const data={
      taskId:id
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/acceptImcTaskByPrincipal',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:data
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //甲方负责人否决该巡检任务的执行
  denyImcTaskByA=(id)=>{
    console.log("当前巡检任务id为：" + id)
    const data={
      taskId:id
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/denyImcTaskByPrincipal',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:data
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //服务商接单
  acceptImcTaskByB=(id)=>{
    console.log("当前巡检任务id为：" + id)
    const data={
      taskId:id
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/acceptTaskByFacilitator',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:data
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //服务商拒单
  denyImcTaskByB=(id)=>{
    console.log("当前巡检任务id为：" + id)
    const data={
      taskId:id
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/refuseTaskByFacilitator',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:data
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //删除巡检任务
  deleteTask=(id)=>{
    console.log("当前巡检任务id为：" + id)
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/deleteTaskByTaskId/' + id,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //甲方用户确认巡检完成
  confirmFinished=(imcTaskId)=>{
    const data = {
      status:5,
      taskId:imcTaskId
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/modifyTaskStatusByTaskId',
      headers: {
        'Content-Type':'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:JSON.stringify(data)
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          alert("巡检任务已经确认完成！")
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //甲方付款
  payImcTask=(imcTaskId)=>{
    const data = {
      status:6,
      taskId:imcTaskId
    }
    axios({
      method: 'POST',
      url: '/imc/inspectionTask/modifyTaskStatusByTaskId',
      headers: {
        'Content-Type':'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
      data:JSON.stringify(data)
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(res.data)
          alert("巡检任务付款成功！")
          this.getInfo(FIRST_PAGE)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //获取任务的评价
  getTaskReview = (taskId)=>{
    axios({
      method: 'GET',
      url: '/imc/inspectionReview/getReviewByTaskId/' + taskId,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
    })
      .then((res) => {
        if(res && res.status === 200){
          console.log(JSON.stringify(res.data.result))
          this.setState({
            reviewRank:res.data.result.score,
            reviewContent:res.data.result.contents,
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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

  render(){
    const {data,nowCurrent,size,  statusCode} = this.state;
    const current = nowCurrent+1
    const limit = size

    const {imcTaskDetail}=this.state
    const {match : { params : { id } }} = this.props   
    console.log("日志信息：" + JSON.stringify(imcTaskDetail))
    return(
      <div>
        <div className="bg">
          <Descriptions bordered className="descriptions">
            <Descriptions.Item label="巡检任务ID " span={3}>{imcTaskDetail.id}</Descriptions.Item>
            <Descriptions.Item label="巡检任务名称" span={1.5}>{imcTaskDetail.taskName}</Descriptions.Item>
            {/* <Descriptions.Item label="巡检任务对应的甲方用户id" span={1.5}>{imcTaskDetail.userId}</Descriptions.Item>    */}
            <Descriptions.Item label="计划起始时间" span={1.5}>{imcTaskDetail.scheduledStartTime}</Descriptions.Item>
            {/* <Descriptions.Item label="实际起始时间" span={1.5}>{imcTaskDetail.actualStartTime}</Descriptions.Item> */}
            <Descriptions.Item label="实际完成时间" span={1.5}>{imcTaskDetail.actualFinishTime}</Descriptions.Item>
            <Descriptions.Item label="项目ID " span={1.5}>{imcTaskDetail.projectId}</Descriptions.Item>
            <Descriptions.Item label="项目负责人ID" span={1.5}>{imcTaskDetail.principalId}</Descriptions.Item>
            <Descriptions.Item label="服务商ID" span={1.5}>{imcTaskDetail.facilitatorId}</Descriptions.Item>
            <Descriptions.Item label="巡检任务对应的服务商组织的Id " span={1.5}>{imcTaskDetail.facilitatorGroupId}</Descriptions.Item>
            <Descriptions.Item label="计划完成天数" span={1.5}>{imcTaskDetail.days}</Descriptions.Item>
            <Descriptions.Item label="巡检类型" span={1.5}>{imcTaskDetail.inspectionType}</Descriptions.Item>
            <Descriptions.Item label="巡检周期" span={3}>{imcTaskDetail.frequency}</Descriptions.Item>
            <Descriptions.Item label="巡检产生的维修维护费用" span={1.5}>{imcTaskDetail.maintenanceCost}</Descriptions.Item>
            <Descriptions.Item label="备注" span={1.5}>{imcTaskDetail.remark}</Descriptions.Item>
          </Descriptions>
        </div >
        {this.getFunction(id, statusCode)}
        <div style={{textAlign:"right"}}>
          <Link to={`/cbd/inspection`}>返回上一级</Link>
          
        </div>  
        
      </div>
    )
  }

}
export default TaskDetail