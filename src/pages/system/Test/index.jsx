import React,{Component,} from 'react'
import { Button,Row,Col,Table,Input,Popconfirm,message,Modal,Form  } from 'antd';
import { Link } from 'react-router-dom'
import Confirm from './confirm'
import Result from './result'
import Comment from './comment'
import moment from 'moment';
import axios from 'axios';
import { platform } from 'os';
import { copyFileSync } from 'fs';

const FIRST_PAGE = 0;
const PAGE_SIZE = 100;
const Search = Input.Search;
class Test extends Component{
    constructor(props){
        super(props)
        this.state={
            id:window.localStorage.getItem('id'),
            token:window.localStorage.getItem('token'),
            role:'',
            status:null,
            statusMsg:'',
            roleCode:window.localStorage.getItem('roleCode'),
            current: FIRST_PAGE,
            size: PAGE_SIZE,
            // total: 20, 
            nowCurrent:FIRST_PAGE,
            data:[],
            visible: false,
            chooseid:'',
            detail:{},
            result:{},
            comment:{},
            commentVisible:false,
            resultVisible:false,
        }
        this.getInfo=this.getInfo.bind(this)
    }
    componentDidMount(){
        this.getInfo(FIRST_PAGE)
    }

  //根据不同的路由，加载不同的信息
  getInfo(page){
    var location=this.props.location.pathname
    var status
 
    if(location=='/cbd/maintain/data'){
    
      status=null
    }
    else if(location==='/cbd/maintain/data/serverWait'){
      status=3
    }
    else if(location==='/cbd/maintain/data/billApproval'){
      status=11
    }
    else if(location==='/cbd/maintain/data/maintainerWait'){
      status=4
    }
    else if(location==='/cbd/maintain/data/planConfirm'){
      status=5
    }
    else if(location==='/cbd/maintain/data/resultSubmit'){
      status=7
    }
    else if(location==='/cbd/maintain/data/orderApproval'){
      status=2
    }
    else if(location==='/cbd/maintain/data/planApproval'){
      status=6
    }
    else if(location==='/cbd/maintain/data/serviceConfirm'){
      status=9
    }
    else if(location==='/cbd/maintain/data/orderSubmit'){
      status=2
    }
    else if(location==='/cbd/maintain/data/serviceFinish'){
      status=10
    }
    else if(location==='/cbd/maintain/data/pay'){
      status=11
    }
    else if(location==='/cbd/maintain/data/comment'){
      status=12
    }
    // this.setState({status:status})
    console.log(status)
    const { size, } = this.state;
    const values={orderBy: "string",pageSize:size,pageNum:page,id:this.state.id,roleCode:this.state.roleCode,status:status}
        axios({
            method: 'POST',
            url: '/mdmc/mdmcTask/getTaskList',
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
            data:values
          })
        .then((res) => {
            if(res && res.status === 200){
            this.setState({
                data: res.data.result.taskList,
                nowCurrent:res.data.result.pageNum,
                status:status,
               // roleCode:roleCode,
            });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
      
}
  //返回不同的状态按钮
  getFunction(record,status,roleCode){
    if(status===3){
      return (
        <div>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
              onClick={()=>{this.changeStatus(record.id,4,'服务商业务员已接单，待维修工接单')}}
              >接单</Button>
              <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,14,'服务商业务员拒绝工单')}}
              >拒单</Button>
        </div>
      )
    }
    else if(status===4){
      return (
        <div>
          <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
              onClick={()=>{this.changeStatus(record.id,5,'维修工已接单，进入维修中')}}
              >接单</Button>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,15,'维修工拒绝工单')}}
              >拒单</Button>
        </div>
      )
    }
    else if(status===5){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.confirm(record.id)}}
              >方案确定</Button>
      )
    }
    else if(status===6&&roleCode=='user_leader'){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,7,'用户负责人通过备件方案，二次维修')}}
              >方案通过</Button>
      )
    }
    else if(status===7){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.submit(record.id)}}
              >结果提交</Button>
      )
    }
    else if(status===8){
      return (
        <div>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
              onClick={()=>{this.changeStatus(record.id,8,'维修工提交维修结果，待服务商审核维修结果')}}
              >通过</Button>
              <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,16,'服务商拒绝账单')}}
              >拒绝</Button>
        </div>
      )
    }
    else if(status===2&&roleCode=='user_leader'){
      return (
        <div>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
              onClick={()=>{this.changeStatus(record.id,3,'审核通过，待服务商接单')}}
            >通过</Button>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,1,'用户负责人审核工单未通过，工单已取消')}}
            >拒绝</Button>
        </div>
      )
    }
    else if(status===9){
      return (
        <div>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent',marginRight:'12px'}}
              onClick={()=>{this.changeStatus(record.id,10,'负责人审核账单通过，待值机员确认')}}
            >通过</Button>
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,17,'负责人拒绝账单')}}
            >拒绝</Button>
        </div>
      )
    }
    else if(status===10){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.changeStatus(record.id,11,'值机员确认服务，待负责人支付')}}
              >确认</Button>
      )
    }
    else if(status===11){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={this.pay}
              >支付</Button>
      )
    }
    else if(status===12){
      return (
            <Button 
              type="simple"
              style={{border:'none',padding:0,color:"#357aff",background:'transparent'}}
              onClick={()=>{this.comment(record.id)}}
              >评价</Button>
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

  //提交方案，获取已填信息
  confirm(id){
    this.setState({visible:true})
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
        var plan={}
        plan.id=null
        plan.taskId=res.data.result.id
        plan.taskItemId=null
        plan.principalId=res.data.result.principalId
        plan.maintainerId=res.data.result.maintainerId
        plan.deviceId=null
        plan.deviceType=''
        plan.cost=res.data.result.totalCost
        plan.count=null
       this.setState({detail:plan})
      }
  })
  .catch(function (error) {
      console.log(error);
  });
  }

  //提交方案modal框
  showModal = () => {
    this.setState({    
      visible: true,
    });
  };
  //编辑提交的信息 包括总花费以及方案
  handleOk = e => {  
    this.setState({
      visible: false,
    });
    const values = this.form.getFieldsValue()
    console.log(values)
    axios({
      contentType:'application/json',
      method: 'POST',
      url: '/mdmc/mdmcDevice/save',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
       data:values
    })
    .then((res) => {
      if(res && res.status === 200){
        this.changeStatus(res.data.result.id,6,'维修工提交备件方案后，待用户负责人审核')
      }
    })
    .catch(function (error) {
        console.log(error);
    });
  

  };
 //取消方案确定模态框
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
 
  //提交结果，获取已填部分
  submit(id){
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
    values.result = 1
    console.log(values)
    axios({
      contentType:'application/json',
      method: 'POST',
      url: '/mdmc/mdmcTask/modify',
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+this.state.token,
      },
       data:values
    })
    .then((res) => {
      if(res && res.status === 200){
        this.changeStatus(res.data.result.id,8,'维修工提交维修结果，待服务商审核维修结果')
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
        receive.principalId=res.data.result.principalId
        receive.userId=res.data.result.userId
        receive.score=null
        receive.content=''
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
        this.changeStatus(res.data.result.taskId,13,'值机员评价完成，订单完成')
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

  render(){
    const {
      data,
      nowCurrent,
      size, 
      status,
      roleCode,
      detail,
      result,
      comment,
      } = this.state;
      const current = nowCurrent+1
      const limit = size

    return(
        <div>
        <div className="searchPart">
          <Row>
            {/* <Col span={2}>巡检人姓名：</Col> */}
            {/* <Col span={5}>
              <Search
                placeholder="搜索从这里开始"
                enterButton
                onSearch={value => this.selectActivity(value)}
              />
            </Col> */}
             {(roleCode=="user_watcher"&&status==2)&&<Col push={21}>
              <Link to={`/cbd/service/new`}>
                <Button type="primary">
                            +创建工单
                </Button>
              </Link>
            </Col>}
          </Row> 
        </div>
        <Table
          className="group-list-module"
          bordered
          showHeader={true}
          pagination={{
            current,
            pageSize: limit,
            onChange: this.handlePageChange,
            // showTotal: () => `共${allCount} 条数据`
          }}
          rowClassName={this.setRowClassName}
          dataSource={data}
          columns={[
          //   {
          //   title: 'ID ',
          //   key: 'id',
          //   render: (text, record) => {
          //     return ((record.id && record.id) || '--')
          //   }   
          // }, 
          {
            title: '维修任务名称',
            key: 'title',
            render: (text, record) => {
              return (record.title && record.title) || '--'
            }
          }, {
            title: '审核人ID',
            key: 'principalId',
            render: (text, record) => {
              return (record.principalId && record.principalId) || '--'
            }
          },{
            title: '项目ID', 
            key: 'projectId',
            render: (text, record) => {
              return (record.projectId && record.projectId) || '--'
            }
          }, {
            title: '服务商ID',
            key: 'facilitatorId',
            render: (text, record) => {
              return (record.facilitatorId && record.facilitatorId) || '--'
            }
          },{
            title: '报修人ID',
            key: 'userId',
            render: (text, record) => {
              return (record.userId && record.userId) || '--'
            }
          },{
            title: '总花费',
            key: 'totalCost',
            render: (text, record) => {
              return (record.totalCost && record.totalCost) || '--'
            }
          },
          // {
          //   title: '合同ID',
          //   key: 'contractId',
          //   render: (text, record) => {
          //     return (record.contractId && record.contractId) || '--'
          //   }
          // },
          {
            title: '操作',
            render: (text, record, index) => (
              <div className="operate-btns"
                style={{ display: 'block' }}
              >
                <Link
                  to={`/cbd/service/sub/${record.id}`}
                  style={{marginRight:'12px'}}
                >任务子项</Link>                
                <Link
                  to={`/cbd/service/log/${record.id}`}
                  style={{marginRight:'12px'}}
                >任务日志</Link>
                <br/>
                <Link
                  to={`/cbd/service/spare/${record.id}`}
                  style={{marginRight:'12px'}}
                >备品备件</Link>
                 <Link
                  to={`/cbd/service/detail/${record.id}`}
                  style={{marginRight:'12px'}}
                >详情</Link>
                {this.getFunction(record,status,roleCode)}            
              </div>
            ),
          }]}
        />
         <Modal
          title="方案提交"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Confirm setForm={(form)=>{this.form = form}} detail={detail}/>
        </Modal>
        <Modal
          title="提交结果"
          visible={this.state.resultVisible}
          onOk={this.resultOk}
          onCancel={this.resultCancel}
          okText="结束并提交"
          cancelText="取消"
        >
          <Result setSubmit={(form)=>{this.form = form}}  result={result}/>
        </Modal>
        <Modal
          title="评价"
          visible={this.state.commentVisible}
          onOk={this.commentOk}
          onCancel={this.commentCancel}
          okText="确定"
          cancelText="取消"
        >
          <Comment setComment={(form)=>{this.form = form}}  comment={comment}/>
        </Modal>
      </div>  
    )
}
}
export default Test;