import React, { Component, } from 'react';
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';
const token=window.localStorage.getItem('token')
const id=window.localStorage.getItem('id')

class OrderNew extends Component{
    constructor(props){
        super(props)
        this.state={
            orderDetail:{},
            id:'',
            token:window.localStorage.getItem('token')
        }
    }
    componentDidMount(){
        this.setState({id:id})
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
        if(!getFieldValue('call')){
          message.error('请输入报修人电话')
        }
        if(!id){
          values.id=null
          values.userId=this.state.id
        }
        values.mdmcAddTaskItemDtoList=[{id:null}]
      //  values.appointTime=getFieldValue('appointTime').format('YYYY-MM-DD HH:mm:ss')
        
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
            // var id=res.data.result.id
            // this.changeStatus(id,2,'维修申请提交后，进入审核')   
            history.push('/system')
            
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
                label="报修人电话"
                >
                {getFieldDecorator('call',{
                    initialValue: id && orderDetail.call,
                    rules:[{
                    required:true,
                    message:"请输入报修人电话",
                    }]
                })(
                    <Input placeholder="请输入报修人电话" />
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
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择开始时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="紧急程度"
                >
                {getFieldDecorator('level',{
                    initialValue: id && orderDetail.level,
                    rules:[{
                    required:false,
                    message:"请输入紧急程度",
                    }]
                })(
                    <Input placeholder="请输入紧急程度" />
                )}  
                </Form.Item>
               
                <Form.Item
                {...createFormItemLayout}
                label="审核人ID"
                >
                {getFieldDecorator('principalId',{
                    initialValue: id && orderDetail.principalId,
                    rules:[{
                    required:false,
                    message:"请选择审核人ID",
                    }]
                })(
                    <Input placeholder="请选择审核人ID"/>,
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="项目ID"
                >
                {getFieldDecorator('projectId',{
                    initialValue: id && orderDetail.projectId,
                    rules:[{
                    required:false,
                    message:"请输入项目ID",
                    }]
                })(
                    <Input placeholder="请输入项目ID" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同ID"
                >
                {getFieldDecorator('contractId',{
                    initialValue: id && orderDetail.contractId,
                    rules:[{
                    required:false,
                    message:"请输入合同ID",
                    }]
                })(
                    <Input placeholder="请输入合同ID" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="服务商ID"
                >
                {getFieldDecorator('facilitatorId',{
                    initialValue: id && orderDetail.facilitatorId,
                    rules:[{
                    required:false,
                    message:"请输入服务商ID",
                    }]
                })(
                    <Input placeholder="请输入服务商ID" />
                )}  
                </Form.Item>
               
                <Form.Item
                {...createFormItemLayout}
                label="维修建议"
                >
                {getFieldDecorator('suggestion',{
                    initialValue: id && orderDetail.suggestion,
                    rules:[{
                    required:false,
                    message:"请输入维修建议",
                    }]
                })(
                    <Input placeholder="请输入维修建议" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="总花费"
                >
                {getFieldDecorator('totalCost',{
                    initialValue: id && orderDetail.totalCost,
                    rules:[{
                    required:false,
                    message:"请选择总花费",
                    }]
                })(
                    <Input placeholder="请输入总花费" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="维修结果"
                >
                {getFieldDecorator('result',{
                    initialValue: id && orderDetail.result,
                    rules:[{
                    required:false,
                    message:"请输入维修结果",
                    }]
                })(
                    <Input placeholder="请输入维修结果" />
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
                        history.push('/system')
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