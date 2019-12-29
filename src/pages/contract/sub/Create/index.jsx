import React,{Component,} from 'react'
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
class SubNew extends Component{
    constructor(props){
        super(props)
        this.state={
            inspectionDetail:{},
            token:window.localStorage.getItem('token')
        }
    }
    componentDidMount(){
        const {match : { params : { subId } }} = this.props   
        if(subId){
          axios({
            method: 'POST',
            url: '/pmc/inspectDetail/getInspectDetailById/'+subId,
            headers: {
              'deviceId': this.deviceId,
              'Authorization':'Bearer '+this.state.token,
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
          match : { params : {projectId,id,subId } },
        } = this.props
        const { getFieldValue } = form;
        const values = form.getFieldsValue()
        if(!getFieldValue('name')){
          message.error('请填写名称')
        }
        if(!getFieldValue('inspectionTaskId')){
          message.error('请输入巡检任务ID')
        }
        if(!getFieldValue('inspectionTaskName')){
          message.error('请输入巡检任务名')
        }
        if(subId){
          values.id=subId
        }
        console.log(values)
        axios({
          method: 'POST',
          url: '/pmc/inspectDetail/save',
          headers: {
            'Content-Type': 'application/json',
            'deviceId': this.deviceId,
            'Authorization':'Bearer '+this.state.token,
          },
          data:JSON.stringify(values)
        })
      .then((res) => {
          if(res && res.status === 200){     
          // this.setState({
          //    projectDetail:res.data.result
          // });
          history.push('/cbd/pro/sub/'+projectId+'/'+id)
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
            match : { params : { id,projectId,subId} }
          } = this.props
          const { inspectionDetail } = this.state
          console.log(subId)
        return(
            <div>
                <div className="inpection-plan-create-page">
                
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Item
                    {...createFormItemLayout}
                    label="名称"
                    >
                    {getFieldDecorator('name',{
                        initialValue: subId && inspectionDetail.name,
                        rules:[{
                        required:true,
                        message:"请填写名称",
                        }]
                    })(
                        <Input placeholder="请填写名称" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="巡检任务ID"
                    >
                    {getFieldDecorator('inspectionTaskId',{
                        initialValue: subId && inspectionDetail.inspectionTaskId,
                        rules:[{
                        required:true,
                        message:"请输入巡检任务ID",
                        }]
                    })(
                        <Input placeholder="请输入巡检任务ID" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="巡检任务名"
                    >
                    {getFieldDecorator('inspectionTaskName',{
                        initialValue: subId && inspectionDetail.inspectionTaskName,
                        rules:[{
                        required:true,
                        message:"请输入巡检任务名",
                        }]
                    })(
                        <Input placeholder="请输入巡检任务名" />
                    )}  
                    </Form.Item>
                  
                   
                    <Form.Item
                    {...createFormItemLayout}
                    label="事件名称"
                    >
                    {getFieldDecorator('itemName',{
                        initialValue: subId && inspectionDetail.itemName,
                        rules:[{
                        required:false,
                        message:"请输入事件名称",
                        }]
                    })(
                        <Input placeholder="请输入事件名称" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="维修人员姓名"
                    >
                    {getFieldDecorator('maintainerName',{
                        initialValue: subId && inspectionDetail.maintainerName,
                        rules:[{
                        required:false,
                        message:"请输入维修人员姓名",
                        }]
                    })(
                        <Input placeholder="请输入维修人员姓名" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="维修人员ID"
                    >
                    {getFieldDecorator('maintainerId',{
                        initialValue: subId && inspectionDetail.maintainerId,
                        rules:[{
                        required:false,
                        message:"请输入维修人员ID",
                        }]
                    })(
                        <Input placeholder="请输入维修人员ID" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="评论"
                    >
                    {getFieldDecorator('remark',{
                        initialValue: subId && inspectionDetail.remark,
                        rules:[{
                        required:false,
                        message:"请输入评论",
                        }]
                    })(
                        <Input placeholder="请输入评论" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="结果"
                    >
                    {getFieldDecorator('result',{
                        initialValue: subId && inspectionDetail.result,
                        rules:[{
                        required:false,
                        message:"请输入结果",
                        }]
                    })(
                        <Input placeholder="请输入结果" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="状态"
                    >
                    {getFieldDecorator('status',{
                        initialValue: subId && inspectionDetail.status,
                        rules:[{
                        required:false,
                        message:"请输入状态",
                        }]
                    })(
                        <Input placeholder="请输入状态" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="描述"
                    >
                    {getFieldDecorator('description',{
                        initialValue: subId && inspectionDetail.description,
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
export default Form.create()(SubNew)