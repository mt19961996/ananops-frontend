import React, { Component, } from 'react';
import { Form,Input,Select,Button,message } from 'antd';
import { Link } from 'react-router-dom'

class OrderNew extends Component{
    constructor(props){
        super(props)
        this.state={
            orderDetail:{}
        }
    }
    render(){
        console.log('create')
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
                label="报修人ID"
                >
                {getFieldDecorator('userId',{
                    initialValue: id && orderDetail.userId,
                    rules:[{
                    required:true,
                    message:"请填写报修ID",
                    }]
                })(
                    <Input placeholder="请输入报修ID" />
                )}  
                </Form.Item>
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
                label="审核人ID"
                >
                {getFieldDecorator('principalId',{
                    initialValue: id && orderDetail.principalId,
                    rules:[{
                    required:true,
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
                    required:true,
                    message:"请输入项目ID",
                    }]
                })(
                    <Input placeholder="请输入项目ID" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="服务商ID"
                >
                {getFieldDecorator('mainWork',{
                    initialValue: id && orderDetail.mainWork,
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
                label="支付方式"
                >
                {getFieldDecorator('payMode',{
                    initialValue: id && orderDetail.payMode,
                    rules:[{
                    required:true,
                    message:"请输入支付方式",
                    }]
                })(
                    <Input placeholder="请输入支付方式" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="总花费"
                >
                {getFieldDecorator('totalCost',{
                    initialValue: id && orderDetail.totalCost,
                    rules:[{
                    required:true,
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
                        history.push('/serviceorderDetail/orderDetail')
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
export default Form.create(OrderNew)