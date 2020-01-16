import React,{Component} from 'react'
import {Form,Input,DatePicker,Select} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios';
const Item = Form.Item
//let maintain=[]
class EngineerAccept extends Component{
  //接收父组件参数
  static propTypes = {
    setLevel:PropTypes.func.isRequired,
    engineerAcceptDetail:PropTypes.object
  }
  componentWillMount() {
    this.props.setLevel(this.props.form)
  }
  render(){

    const engineerAcceptDetail = this.props.engineerAcceptDetail
  
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="任务编号：">
          {
            getFieldDecorator('id',{
              initialValue:engineerAcceptDetail.id,
              rules:[{
                required:true,
                message:'请输入任务编号',
              }]
            })(
              <Input placeholder="请输入任务编号"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="紧急程度">
          {
            getFieldDecorator('level',{
              initialValue:engineerAcceptDetail.level,
              rules:[{
                required:true,
                message:'请选择紧急程度'
              }]
            })(
                <Select
                placeholder="请选择紧急程度"
                allowClear
              >
                <Select.Option key={0} value={1}> 
                    一般
                </Select.Option>
                <Select.Option key={1} value={2}> 
                    紧急
                </Select.Option>
                <Select.Option key={2} value={3}> 
                   非常紧急
                </Select.Option>
              </Select>
            )
          }       
        </Item>       
      </Form>
    )
  }
}
export default Form.create()(EngineerAccept)