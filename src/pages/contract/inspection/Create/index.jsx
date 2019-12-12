import React,{Component,} from 'react'
import { Form,Input,Select,Button,message } from 'antd';
import { Link } from 'react-router-dom'

class InspectionNew extends Component{
    constructor(props){
        super(props)
        this.state={
            inspectionDetail:{}
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
          const { inspectionDetailtail } = this.state
        return(
            <div>
                <div className="inpection-plan-create-page">
                
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Item
                    {...createFormItemLayout}
                    label="项目ID"
                    >
                    {getFieldDecorator('projectId',{
                        initialValue: id && inspectionDetailtail.projectId,
                        rules:[{
                        required:true,
                        message:"请填写项目ID",
                        }]
                    })(
                        <Input placeholder="请输入项目ID" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="项目名称"
                    >
                    {getFieldDecorator('projectName',{
                        initialValue: id && inspectionDetailtail.projectName,
                        rules:[{
                        required:true,
                        message:"请输入项目名称",
                        }]
                    })(
                        <Input placeholder="请输入项目名称" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="预计开始时间"
                    >
                    {getFieldDecorator('scheduledStartTime',{
                        initialValue: id && inspectionDetailtail.scheduledStartTime,
                        rules:[{
                        required:true,
                        message:"请选择预计开始时间",
                        }]
                    })(
                        <Select
                        //  mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="请选择预计开始时间"
                        >
                        </Select>,
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="最晚开始时间"
                    >
                    {getFieldDecorator('deadlineTime',{
                        initialValue: id && inspectionDetailtail.deadlineTime,
                        rules:[{
                        required:true,
                        message:"请选择最晚开始时间",
                        }]
                    })(
                        <Input placeholder="请选择最晚开始时间" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备名"
                    >
                    {getFieldDecorator('deviceName',{
                        initialValue: id && inspectionDetailtail.deviceName,
                        rules:[{
                        required:true,
                        message:"请输入设备名",
                        }]
                    })(
                        <Input placeholder="请输入设备名" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备类型"
                    >
                    {getFieldDecorator('deviceType',{
                        initialValue: id && inspectionDetailtail.deviceType,
                        rules:[{
                        required:true,
                        message:"请输入设备类型",
                        }]
                    })(
                        <Input placeholder="请输入设备类型" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="巡检周期（天）"
                    >
                    {getFieldDecorator('cycleTime',{
                        initialValue: id && inspectionDetailtail.cycleTime,
                        rules:[{
                        required:true,
                        message:"请输入巡检周期",
                        }]
                    })(
                        <Input placeholder="请输入巡检周期" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="巡检内容"
                    >
                    {getFieldDecorator('inspectionContent',{
                        initialValue: id && inspectionDetailtail.inspectionContent,
                        rules:[{
                        required:false,
                        message:"请输入巡检内容",
                        }]
                    })(
                        <Input placeholder="请输入巡检内容" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="巡检情况"
                    >
                    {getFieldDecorator('inspectionCondition',{
                        initialValue: id && inspectionDetailtail.inspectionCondition,
                        rules:[{
                        required:false,
                        message:"请输入巡检情况",
                        }]
                    })(
                        <Input placeholder="请输入巡检情况" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="处理结果"
                    >
                    {getFieldDecorator('dealResult',{
                        initialValue: id && inspectionDetailtail.dealResult,
                        rules:[{
                        required:true,
                        message:"请输入处理结果",
                        }]
                    })(
                        <Input placeholder="请输入处理结果" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="描述"
                    >
                    {getFieldDecorator('description',{
                        initialValue: id && inspectionDetailtail.description,
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
                            history.push('/contract/inspection')
                        }}
                        >取消
                        </Button>
                    </div>
                    </section>
                </Form>
                </div>
                    </div>
        )
    }
}
export default Form.create(InspectionNew)