import React, { Component, } from 'react';
import { Form,Input,Select,Button,message } from 'antd';
import { Link } from 'react-router-dom'

class ManagementNew extends Component{
    constructor(props){
        super(props)
        this.state={
            managementDetail:{}
        }
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
          const { managementDetailtail } = this.state
        return(
            <div className="inpection-plan-create-page">
            
            <Form
                onSubmit={this.handleSubmit}
            >
                <Form.Item
                {...createFormItemLayout}
                label="合同名称"
                >
                {getFieldDecorator('contractName',{
                    initialValue: id && managementDetailtail.contractName,
                    rules:[{
                    required:true,
                    message:"请填写合同名称",
                    }]
                })(
                    <Input placeholder="请输入合同名称" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同类型"
                >
                {getFieldDecorator('contractType',{
                    initialValue: id && managementDetailtail.contractType,
                    rules:[{
                    required:true,
                    message:"请输入合同类型",
                    }]
                })(
                    <Input placeholder="请输入合同类型" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="甲方ID"
                >
                {getFieldDecorator('partyAId',{
                    initialValue: id && managementDetailtail.partyAId,
                    rules:[{
                    required:true,
                    message:"请选择甲方ID",
                    }]
                })(
                    <Input placeholder="请选择甲方ID"/>,
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="甲方组织名称"
                >
                {getFieldDecorator('partyAName',{
                    initialValue: id && managementDetailtail.partyAName,
                    rules:[{
                    required:true,
                    message:"请选择甲方组织名称",
                    }]
                })(
                    <Input placeholder="请输入甲方组织名称" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方ID"
                >
                {getFieldDecorator('partyBId',{
                    initialValue: id && managementDetailtail.partyBId,
                    rules:[{
                    required:true,
                    message:"请输入乙方ID",
                    }]
                })(
                    <Input placeholder="请输入乙方ID" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方组织名称"
                >
                {getFieldDecorator('partyBName',{
                    initialValue: id && managementDetailtail.partyBName,
                    rules:[{
                    required:false,
                    message:"请输入乙方组织名称",
                    }]
                })(
                    <Input placeholder="请输入乙方组织名称" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同签订时间"
                >
                {getFieldDecorator('signTime',{
                    initialValue: id && managementDetailtail.signTime,
                    rules:[{
                    required:true,
                    message:"请输入合同签订时间",
                    }]
                })(
                    <Input placeholder="请输入合同签订时间" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同开始时间"
                >
                {getFieldDecorator('startTime',{
                    initialValue: id && managementDetailtail.startTime,
                    rules:[{
                    required:true,
                    message:"请输入合同开始时间",
                    }]
                })(
                    <Input placeholder="请输入合同开始时间" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同结束时间"
                >
                {getFieldDecorator('endTime',{
                    initialValue: id && managementDetailtail.endTime,
                    rules:[{
                    required:true,
                    message:"请输入合同结束时间",
                    }]
                })(
                    <Input placeholder="请输入合同结束时间" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方代理内容"
                >
                {getFieldDecorator('agentContent',{
                    initialValue: id && managementDetailtail.agentContent,
                    rules:[{
                    required:false,
                    message:"请输入乙方代理内容",
                    }]
                })(
                    <Input placeholder="请输入乙方代理内容" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方开户银行"
                >
                {getFieldDecorator('bankName',{
                    initialValue: id && managementDetailtail.bankName,
                    rules:[{
                    required:false,
                    message:"请输入乙方开户银行",
                    }]
                })(
                    <Input placeholder="请输入乙方开户银行" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方银行账号"
                >
                {getFieldDecorator('bankAccount',{
                    initialValue: id && managementDetailtail.bankAccount,
                    rules:[{
                    required:false,
                    message:"请输入乙方银行账号",
                    }]
                })(
                    <Input placeholder="请输入乙方银行账号" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙供辅料金额"
                >
                {getFieldDecorator('assitMoney',{
                    initialValue: id && managementDetailtail.assitMoney,
                    rules:[{
                    required:false,
                    message:"请输入乙供辅料金额",
                    }]
                })(
                    <Input placeholder="请输入乙供辅料金额" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="乙方是否包备品备件"
                >
                {getFieldDecorator('isSpareService',{
                    initialValue: id && managementDetailtail.isSpareService,
                    rules:[{
                    required:false,
                    message:"请选择乙方是否包备品备件",
                    }]
                })(
                    <Input placeholder="请选择乙方是否包备品备件" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="维修维护最迟响应时间（小时）"
                >
                {getFieldDecorator('lastResponseTime',{
                    initialValue: id && managementDetailtail.lastResponseTime,
                    rules:[{
                    required:false,
                    message:"请输入维修维护最迟响应时间",
                    }]
                })(
                    <Input placeholder="请输入维修维护最迟响应时间" />
                )}  
                </Form.Item>
                
                <Form.Item
                {...createFormItemLayout}
                label="付款时间"
                >
                {getFieldDecorator('paymentTime',{
                    initialValue: id && managementDetailtail.paymentTime,
                    rules:[{
                    required:false,
                    message:"请输入付款时间",
                    }]
                })(
                    <Input placeholder="请输入付款时间" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="支付方式"
                >
                {getFieldDecorator('paymentType',{
                    initialValue: id && managementDetailtail.paymentType,
                    rules:[{
                    required:false,
                    message:"请选择支付方式",
                    }]
                })(
                    <Input placeholder="请选择支付方式" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="项目金额"
                >
                {getFieldDecorator('projectMoney',{
                    initialValue: id && managementDetailtail.projectMoney,
                    rules:[{
                    required:false,
                    message:"请输入项目金额",
                    }]
                })(
                    <Input placeholder="请输入项目金额" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="月度记录表提交周期（天）"
                >
                {getFieldDecorator('recordTime',{
                    initialValue: id && managementDetailtail.recordTime,
                    rules:[{
                    required:false,
                    message:"请输入月度记录表提交周期",
                    }]
                })(
                    <Input placeholder="请输入月度记录表提交周期" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同是否变更"
                >
                {getFieldDecorator('isChange',{
                    initialValue: id && managementDetailtail.isChange,
                    rules:[{
                    required:false,
                    message:"请选择合同是否变更",
                    }]
                })(
                    <Input placeholder="请选择合同是否变更" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="合同是否作废"
                >
                {getFieldDecorator('isDestory',{
                    initialValue: id && managementDetailtail.isDestory,
                    rules:[{
                    required:false,
                    message:"请输入合同是否作废",
                    }]
                })(
                    <Input placeholder="请输入合同是否作废" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="是否自动顺延"
                >
                {getFieldDecorator('isPostpone',{
                    initialValue: id && managementDetailtail.isPostpone,
                    rules:[{
                    required:false,
                    message:"请选择是否自动顺延",
                    }]
                })(
                    <Input placeholder="请选择是否自动顺延" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="维修工身份验证流程"
                >
                {getFieldDecorator('verification',{
                    initialValue: id && managementDetailtail.verification,
                    rules:[{
                    required:false,
                    message:"请输入维修工身份验证流程",
                    }]
                })(
                    <Input placeholder="请输入维修工身份验证流程" />
                )}  
                </Form.Item>
                <Form.Item
                {...createFormItemLayout}
                label="描述"
                >
                {getFieldDecorator('description',{
                    initialValue: id && managementDetailtail.description,
                    rules:[{
                    required:false,
                    message:"请输入描述",
                    }]
                })(
                    <Input placeholder="请输入描述" />
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
                        history.push('/contract/management')
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
export default Form.create(ManagementNew)