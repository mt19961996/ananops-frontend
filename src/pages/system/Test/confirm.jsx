import React,{Component} from 'react'
import {Form,Input,} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item

class Confirm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    detail:PropTypes.object
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){

    const detail = this.props.detail
  
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="工单编码：">
          {
            getFieldDecorator('taskId',{
              initialValue:detail.taskId,
              rules:[{
                required:true,
                message:'请输入工单编码',
              }]
            })(
              <Input placeholder="请输入工单编码"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="负责人ID：">
          {
            getFieldDecorator('principalId',{
              initialValue:detail.principalId,
              disabled:true,
              rules:[{
                required:true,
                message:'请输入负责人ID'
              }]
            })(
              <Input  disabled='true' placeholder="请输入负责人ID"></Input>
            )
          }       
        </Item>
        <Item label="维修工ID：">
          {
            getFieldDecorator('maintainerId',{
              initialValue:detail.maintainerId,
              rules:[{
                required:false,
                message:'请输入维修工ID'
              }]
            })(
              <Input placeholder="请输入维修工ID"></Input>
            )
          }
         
        </Item>
      
        <Item label="设备ID：">
          {
            getFieldDecorator('deviceId',{
              initialValue:detail.deviceId,
              rules:[{
                required:true,
                message:'请输入设备ID'
              }]
            })(
              <Input placeholder="请输入设备ID"></Input>
            )
          }
         
        </Item>
        <Item label="设备类型：">
          {
            getFieldDecorator('deviceType',{
              initialValue:detail.deviceType,
              rules:[{
                required:true,
                message:'请输入设备类型'
              }]
            })(
              <Input placeholder="请输入设备类型"></Input>
            )
          }
         
        </Item>
        <Item label="总花费：">
          {
            getFieldDecorator('cost',{
              initialValue:detail.cost,
              rules:[{
                required:false,
                message:'请输入总花费'
              }]
            })(
              <Input  placeholder="请输入总花费（¥）"></Input>
            )
          }
         
        </Item>
        <Item label="总计：">
          {
            getFieldDecorator('count',{
              initialValue:detail.count,
              rules:[{
                required:false,
                message:'请输入总计'
              }]
            })(
              <Input  placeholder="请输入总计"></Input>
            )
          }
         
        </Item>
      </Form>
    )
  }
}
export default Form.create()(Confirm)