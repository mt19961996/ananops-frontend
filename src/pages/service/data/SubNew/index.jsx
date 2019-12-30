import React,{Component,} from 'react'
import { Form,Input,Select,Button,message,DatePicker } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
class SubNew extends Component{
    constructor(props){
        super(props)
        this.state={
            subDetail:{},
            token:window.localStorage.getItem('token')
        }
    }
    componentDidMount(){
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
        if(!getFieldValue('level')){
          message.error('请填写紧急程度')
        }
        if(!getFieldValue('troubleType')){
          message.error('请输入故障类型')
        }
        if(!getFieldValue('deviceId')){
          message.error('请输入设备编码')
        }
        values.id=null
        values.taskId=id

        axios({
          method: 'POST',
          url: '/mdmc/mdmcItem/save',
          headers: {
            'Content-Type': 'application/json',
            'deviceId': this.deviceId,
            'Authorization':'Bearer '+this.state.token,
          },
          data:values
        })
      .then((res) => {
          if(res && res.status === 200){     
          // this.setState({
          //    projectDetail:res.data.result
          // });
          history.push('cbd/maintain/data')
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
            match : { params : { id,} }
          } = this.props
          const { subDetail } = this.state
        return(
            <div>
                <div className="inpection-plan-create-page">
                
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <Form.Item
                    {...createFormItemLayout}
                    label="紧急程度"
                    >
                    {getFieldDecorator('level',{
                        initialValue: id && subDetail.level,
                        rules:[{
                        required:true,
                        message:"请填写紧急程度",
                        }]
                    })(
                        <Input placeholder="请输入紧急程度" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="故障类型"
                    >
                    {getFieldDecorator('troubleType',{
                        initialValue: id && subDetail.troubleType,
                        rules:[{
                        required:true,
                        message:"请输入故障类型",
                        }]
                    })(
                        <Input placeholder="请输入故障类型" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备编码"
                    >
                    {getFieldDecorator('deviceId',{
                        initialValue: id && subDetail.deviceId,
                        rules:[{
                        required:true,
                        message:"请填写设备编码",
                        }]
                    })(
                        <Input placeholder="请输入设备编码" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备类型"
                    >
                    {getFieldDecorator('deviceType',{
                        initialValue: id && subDetail.deviceType,
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
                    label="设备所处经度"
                    >
                    {getFieldDecorator('deviceLatitude',{
                        initialValue: id && subDetail.deviceLatitude,
                        rules:[{
                        required:false,
                        message:"请输入设备所处经度",
                        }]
                    })(
                        <Input placeholder="请输入设备所处经度" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="设备所处纬度"
                    >
                    {getFieldDecorator('deviceLongitude',{
                        initialValue: id && subDetail.deviceLongitude,
                        rules:[{
                        required:false,
                        message:"请输入设备所处纬度",
                        }]
                    })(
                        <Input placeholder="请输入设备所处纬度" />
                    )}  
                    </Form.Item>
                    <Form.Item
                    {...createFormItemLayout}
                    label="描述"
                    >
                    {getFieldDecorator('description',{
                        initialValue: id && subDetail.description,
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
                        >新建
                        </Button>
                        <Button
                        style={{marginLeft:"28px"}}
                        size="default"
                        onClick={()=> {
                            const {
                            history,
                            } = this.props
                            history.push('/cbd/maintain/data')
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