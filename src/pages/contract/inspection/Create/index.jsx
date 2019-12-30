import React,{Component,} from 'react'
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
const token=window.localStorage.getItem('token')
class InspectionNew extends Component{
    constructor(props){
        super(props)
        this.state={
            inspectionDetail:{
                
            }
        }
    }
    componentDidMount(){
        const {match : { params : { id } }} = this.props   
        if(id){
          axios({
            method: 'POST',
            url: '/pmc/InspectDevice/getTaskById/'+id,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+token,
            },
          })
          .then((res) => {
            console.log(res)
            if(res && res.status === 200){     
            this.setState({
              inspectionDetail:res.data.result
            })
            }
          })
          .catch(function (error) {
              console.log(error);
          });
        }
      }

    handleSubmit = (e) => {
        e.preventDefault()
        const {
          form,
          history,
          match : { params : {projectId,id } },
        } = this.props
        console.log(id+"ffff"+projectId)
        const { getFieldValue } = form;
        const values = form.getFieldsValue()
        if(!getFieldValue('projectId')){
          message.error('请填写项目ID')
        }
        if(!getFieldValue('projectName')){
          message.error('请输入项目名称')
        }
        if(!getFieldValue('scheduledStartTime')){
          message.error('请选择预计开始时间')
        }
        if(!getFieldValue('deadlineTime')){
          message.error('请选择最晚开始时间')
        }
        if(!getFieldValue('cycleTime')){
          message.error('请输入巡检周期')
        }
        if(!getFieldValue('inspectionContent')){
          message.error('请输入巡检内容')
        }
        if(id){
          values.id=id
        }
        values.scheduledStartTime=getFieldValue('scheduledStartTime').format('YYYY-MM-DD HH:mm:ss')
        values.deadlineTime=getFieldValue('deadlineTime').format('YYYY-MM-DD HH:mm:ss')
    
        // values.partyAId=getFieldValue('partyAId')
        // values.partyBId=getFieldValue('partyBId')
        // values.atwoName=getFieldValue('atwoName')==="undefine"?getFieldValue('atwoname'):''
        // values.partyATwo=getFieldValue('partyATwo')=="undefine"?getFieldValue('partyATwo'):''
        // values.athreeName=getFieldValue('athreeName')=="undefine"?getFieldValue('athreeName'):''
        // values.partyAThree=getFieldValue('partyAThree')=="undefine"?getFieldValue('partyAThree'):''
        // values.partyBPhone=getFieldValue('partyBPhone')=="undefine"?getFieldValue('partyBPhone'):''
        // values.partyBTel=getFieldValue('partyBTel')=="undefine"?getFieldValue('partyBTel'):''
        // values.partyBEmail=getFieldValue('partyBEmail')=="undefine"?getFieldValue('partyBEmail'):''
        // values.contractId=getFieldValue('contractId')=="undefine"?getFieldValue('contractId'):''
        // values.contractName=getFieldValue('contractName')=="undefine"?getFieldValue('contractName'):''
        // values.description=getFieldValue('description')=="undefine"?getFieldValue('description'):''
        console.log(values)
        axios({
          method: 'POST',
          url: '/pmc/InspectDevice/save',
          headers: {
            'Content-Type': 'application/json',
            'deviceId': this.deviceId,
            'Authorization':'Bearer '+token,
          },
          data:JSON.stringify(values)
        })
      .then((res) => {
          if(res && res.status === 200){     
          // this.setState({
          //    projectDetail:res.data.result
          // });
          history.push('/cbd/pro/inspection/'+projectId)
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
            match : { params : { id,projectId} }
          } = this.props
          const { inspectionDetail } = this.state
          console.log(id+'ppppp'+projectId)
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
                        initialValue: id && inspectionDetail.projectId,
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
                        initialValue: id && inspectionDetail.projectName,
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
                        initialValue: id && moment(inspectionDetail.scheduledStartTime),
                        rules:[{
                        required:true,
                        message:"请选择预计开始时间",
                        }]
                    })(
                        <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择预计开始时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                      />,
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="最晚开始时间"
                    >
                    {getFieldDecorator('deadlineTime',{
                        initialValue: id && moment(inspectionDetail.deadlineTime),
                        rules:[{
                        required:true,
                        message:"请选择最晚开始时间",
                        }]
                    })(
                        <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请选择最晚开始时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备名"
                    >
                    {getFieldDecorator('deviceName',{
                        initialValue: id && inspectionDetail.deviceName,
                        rules:[{
                        required:false,
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
                        initialValue: id && inspectionDetail.deviceType,
                        rules:[{
                        required:false,
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
                        initialValue: id && inspectionDetail.cycleTime,
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
                        initialValue: id && inspectionDetail.inspectionContent,
                        rules:[{
                        required:true,
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
                        initialValue: id && inspectionDetail.inspectionCondition,
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
                        initialValue: id && inspectionDetail.dealResult,
                        rules:[{
                        required:false,
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
                        initialValue: id && inspectionDetail.description,
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
                            history.push('/cbd/pro/inspection/'+projectId)
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
export default Form.create()(InspectionNew)