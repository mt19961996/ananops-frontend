import React, { Component, } from 'react';
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import locale from 'antd/es/date-picker/locale/zh_CN';
import axios from 'axios'
import moment from 'moment';
const token=window.localStorage.getItem('token')
const id=window.localStorage.getItem('id')
//let project=[]
class OrderNew extends Component{
    constructor(props){
        super(props)
        this.state={
            orderDetail:{},
            id:'',
            project:[],
            user:[],
            parentGroupId:'',
            token:window.localStorage.getItem('token'),
            groupId:JSON.parse(window.localStorage.getItem('loginAfter')).loginAuthDto.groupId,
            roleCode:window.localStorage.getItem('roleCode'),
        }
        // this.createBill=this.createBill.bind(this)
        this.getProject=this.getProject.bind(this)
    }
    componentDidMount(){
        this.setState({id:id})
        this.getProject()
      }
    getProject=()=>{
        const {roleCode}=this.state
        if(roleCode==='user_watcher'){
            this.getProjectListByUser()
        }
        else this.getProjectListByGroup()
        
        // const {groupId}=this.state
        // axios({
        //     method: 'POST',
        //     url: '/pmc/project/getProjectListByGroupId/'+groupId,
        //     headers: {
        //       'deviceId': this.deviceId,
        //       'Authorization':'Bearer '+this.state.token,
        //     },
        // })
        // .then((res) => {
        //     if(res && res.status === 200){  
        //        console.log(res.data.result)                 
        //        this.setState({
        //            project:res.data.result
        //        })
        //     }
        // })
        // .catch(function (error) {
        //       console.log(error);
        // });
    }
    //如果用户是user
    getProjectListByUser=()=>{
        axios({
            method: 'GET',
            url: '/uac/user/getPGIdByUserId/'+id,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
        })
        .then((res) => {
            if(res && res.status === 200){  
               console.log(res.data.result)                 
               this.setState({
                   groupId:res.data.result
               })
               this.getProjectListByGroup()
            }
        })
        .catch(function (error) {
              console.log(error);
        });
    }
    //如果用户是用户负责人
    getProjectListByGroup=()=>{
        const {groupId}=this.state
        axios({
            method: 'POST',
            url: '/pmc/project/getProjectListByGroupId/'+groupId,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
        })
        .then((res) => {
            if(res && res.status === 200){  
               console.log(res.data.result)                 
               this.setState({
                   project:res.data.result
               })
            }
        })
        .catch(function (error) {
              console.log(error);
        });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {
            form,
            history,
            match : { params : {id } },
        } = this.props
        const { getFieldValue } = form;
        const values = form.getFieldsValue()
        if(!getFieldValue('title')){
            message.error('请输入维修任务名称')
        }
        if(!getFieldValue('userId')){
            message.error('请选择值机员')
        }
        if(!id){
            values.id=null
            values.userId=this.state.id
        }
        values.mdmcAddTaskItemDtoList=[{id:null}]
        values.appointTime=getFieldValue('appointTime').format('YYYY-MM-DD HH:mm:ss')
        
        axios({
            method: 'POST',
            url: '/mdmc/mdmcTask/save',
            headers: {
                'Content-Type': 'application/json',
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            },
            data:JSON.stringify(values)
            })
        .then((res) => {
            if(res && res.status === 200){  
            console.log(res.data.result.id)
            alert("工单创建成功");
            // var id=res.data.result.id
            // this.changeStatus(id,2,'维修申请提交后，进入审核')   
            history.push('/cbd/amc/process')
            this.createBill(res.data.result)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    createBill=(data)=>{
        var values={}
        values.workorderid=data.id
        // values.userid=data.userId
        // values.supplier=data.facilitatorId
        values.userid='2'
        values.supplier='4'
        values.state="创建中"
        axios({
            method: 'POST',
            url: '/bill/bill/create',
            headers: {
                'Content-Type': 'application/json',
                'deviceId': this.deviceId,
                'Authorization':'Bearer '+this.state.token,
            },
            data:values
            })
        .then((res) => {
            if(res && res.status === 200){  
            console.log(res.data)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }
    getOption=()=>{
        const {project}=this.state
        var projectitem=project&&project.map((item, index) => (
            <Select.Option key={index} value={item.id}> 
                {item.projectName}
            </Select.Option>
        ))
        return projectitem
    }
    //根据所选项目，获取其用户值机员
    getUserInfo=(value)=>{
        axios({
            method: 'GET',
            url: '/uac/user/getSubordinateUserList/'+value,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
            })
            .then((res) => {
                if(res && res.status === 200){  
                    this.setState({
                        user:res.data.result
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });       
    }
    //根据所选项目，预生成金额
    getMoney=()=>{
        let values={}
        values.supplier='4'
        values.userid='2'
        axios({
            method: 'POST',
            url: '/bill/bill/createFakeOrder',
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
            data:values
            })
            .then((res) => {
                if(res && res.status === 200){  
                var info=this.state.orderDetail               
                info.totalCost=res.data.result
                this.setState({
                    orderDetail:info
                })
                }
            })
            .catch(function (error) {
                console.log(error);
            });     
    }
    selectProject=(value)=>{
       const {user}=this.state
       axios({
        method: 'POST',
        url: '/pmc/project/getById/'+value,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+this.state.token,
        },
        })
        .then((res) => {
            if(res && res.status === 200){  
            var info={}
            info.principalId=res.data.result.aleaderId       
            info.facilitatorId=res.data.result.bleaderId  
            this.setState({
                orderDetail:info
            })    
           
            this.getUserInfo(info.principalId);
            this.getMoney()
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    getUser=()=>{
        const {user}=this.state
        var useritem=user&&user.map((item, index) => (
            <Select.Option key={index} value={item.loginName}> 
                {item.userName}
            </Select.Option>
        ))
        return useritem
    }
    selectUser=(value)=>{
        axios({
            method: 'POST',
            url: '/uac/user/queryUserInfo/'+value,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
            },
            })
            .then((res) => {
                if(res && res.status === 200){  
                var info=this.state.orderDetail
                
                info.userId=res.data.result.id
                info.call=res.data.result.mobileNo 
                console.log(res.data.result.mobileNo)
                this.setState({
                    orderDetail:info
                })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){

        const createFormItemLayout = {
            labelCol: {span:8},
            wrapperCol : {span:8},
          }
          const { 
            form: { getFieldDecorator }, 
            match : { params : { id } }
          } = this.props
          const { orderDetail } = this.state
        return(
            <div className="inpection-plan-create-page">
            <Form
                onSubmit={this.handleSubmit}
            >
                <Form.Item
                {...createFormItemLayout}
                label="维修任务名称"
                >
                {getFieldDecorator('title',{
                    initialValue: id && orderDetail.title,
                    rules:[{
                    required:true,
                    message:"请输入维修任务名称",
                    }]
                })(
                    <Input placeholder="请输入维修任务名称" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="项目名称"
                >
                {getFieldDecorator('projectId',{
                    initialValue: id && orderDetail.projectId,
                    rules:[{
                    required:true,
                    message:"请选择项目",
                    }]
                })(
                   <Select
                   placeholder="请选择项目"
                   className="inspection-log-abnormal-select"
                   onChange={(value) => { this.selectProject(value) }}
                   allowClear
                 >
                    {this.getOption()}
                 </Select>
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="审核人编号"
                >
                {getFieldDecorator('principalId',{
                    initialValue:orderDetail.principalId,
                    rules:[{
                    required:false,
                    message:"请选择审核人ID",
                    }]
                })(
                    <Input placeholder="请选择审核人ID" disabled='true'/>,
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="服务商编号"
                >
                {getFieldDecorator('facilitatorId',{
                    initialValue: orderDetail.facilitatorId,
                    rules:[{
                    required:false,
                    message:"请输入服务商ID",
                    }]
                })(
                    <Input placeholder="请输入服务商ID" disabled='true'/>
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="值机员姓名"
                >
                {getFieldDecorator('userId',{
                    initialValue:orderDetail.userId,
                    rules:[{
                    required:false,
                    message:"请输入值机员姓名",
                    }]
                })(
                    <Select
                        placeholder="请选择值机员姓名"
                        className="inspection-log-abnormal-select"
                        onChange={(value) => { this.selectUser(value) }}
                        allowClear
                    >
                        {this.getUser()}
                    </Select>
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="值机员电话"
                >
                {getFieldDecorator('call',{
                    initialValue: orderDetail.call,
                    rules:[{
                    required:true,
                    message:"请输入值机员电话",
                    }]
                })(
                    <Input placeholder="请输入值机员电话" disabled='true'/>
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="预约时间"
                >
                {getFieldDecorator('appointTime',{
                    initialValue: id && moment(orderDetail.appointTime),
                    rules:[{
                    required:true,
                    message:"请选择预约时间",
                    }]
                })(
                    <DatePicker
                        locale={locale}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                )}  
                </Form.Item>   
                <Form.Item
                {...createFormItemLayout}
                label="地址"
                >
                {getFieldDecorator('addressName',{
                    initialValue: id && orderDetail.addressName,
                    rules:[{
                    required:true,
                    message:"请输入地址",
                    }]
                })(
                    <Input placeholder="请输入地址" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="总花费"
                >
                {getFieldDecorator('totalCost',{
                    initialValue: orderDetail.totalCost,
                    rules:[{
                    required:false,
                    message:"请选择总花费",
                    }]
                })(
                    <Input placeholder="请输入总花费" />
                )}  
                </Form.Item>
                <section className="operator-container">
                <div style={{textAlign:"center"}}>
                    <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                    >{id ? '编辑' : '新建'}
                    </Button>
                    <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                        const {
                        history,
                        } = this.props
                        history.push('/cbd/amc/process')
                    }}
                    >取消
                    </Button>
                </div>
                </section>
            </Form>
            </div>
          
        )
    }
}
export default Form.create()(OrderNew)