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

        <Item label="菜单名称：">
          <Select></Select>
         
        </Item>
        
        <Item label="权限编码：">
          {
            getFieldDecorator('roleName',{
              initialValue:'',
              rules:[{
                required:true,
                message:'权限编码必须输入'
              }]
            })(
              <Input placeholder="请输入权限编码"></Input>
            )
          }
         
        </Item>
      
        <Item label="权限名称：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'权限名称必须输入'
              }]
            })(
              <Input placeholder="请输入权限名称"></Input>
            )
          }
         
        </Item>
        <Item label="权限地址：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              rules:[{
                required:true,
                message:'权限地址必须输入'
              }]
            })(
              <Input placeholder="请输入权限地址"></Input>
            )
          }
         
        </Item>

        <Item label="权限说明：">
          {
            getFieldDecorator('roleCode',{
              initialValue:'',
              
            })(
              <Input placeholder="请输入权限说明"></Input>
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