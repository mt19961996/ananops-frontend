import React,{Component} from 'react'
import {Form,Input,Radio,Select} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){

    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="登录名：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'登录名必须输入'
              }]
            })(
              <Input placeholder="请输入登录名"></Input>
            )
          }
         
        </Item>
        
        <Item label="手机号：">
          {
            getFieldDecorator('roleName',{
              initialValue:'',
              rules:[{
                required:true,
                message:'手机号必须输入'
              }]
            })(
              <Input placeholder="请输入手机号"></Input>
            )
          }
         
        </Item>
      
        <Item label="真实姓名：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'真实姓名必须输入'
              }]
            })(
              <Input placeholder="请输入真实姓名"></Input>
            )
          }
         
        </Item>

        <Item label="工号：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              
            })(
              <Input placeholder="6-16位数字、字母"></Input>
            )
          }
         
        </Item>
        <Item label="组织名称：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请选择组织名称'
              }]
            })(
              <Select></Select>
            )
          }
         
        </Item>
        <Item label="邮箱：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'邮箱必须输入'
              }]
            })(
              <Input placeholder="请输入邮箱地址"></Input>
            )
          }
         
        </Item>
        <Item label="密码：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'密码必须输入'
              }]
            })(
              <Input placeholder="请输入数组字母下划线组合"></Input>
            )
          }
         
        </Item>

        <Item label="状态：">
          <Radio.Group defaultChecked={'on'}>
            <Radio value={'on'}>启用</Radio>
            <Radio value={'off'}>禁用</Radio>
          </Radio.Group>
        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddUpdateForm)