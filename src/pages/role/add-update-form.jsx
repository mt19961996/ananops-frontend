import React,{Component} from 'react'
import {Form,Input,Radio} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const TextArea = Input.TextArea
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    role:PropTypes.object
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){

    const role = this.props.role
  
    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="角色编码：">
          {
            getFieldDecorator('roleCode',{
              initialValue:role.roleCode,
              rules:[{
                required:true,
                message:'角色编码必须输入'
              }]
            })(
              <Input placeholder="请输入角色编码"></Input>
            )
          }
         
        </Item>
        
        <Item label="角色名称：">
          {
            getFieldDecorator('roleName',{
              initialValue:role.roleName,
              rules:[{
                required:true,
                message:'角色名称必须输入'
              }]
            })(
              <Input placeholder="请输入角色名称"></Input>
            )
          }
         
        </Item>
      
        <Item label="角色说明：">
          {
            getFieldDecorator('remark',{
              initialValue:role.remark,
              
            })(
              <TextArea placeholder="请输入角色说明" autoSize={{minRows:2,maxRows:6}}></TextArea>
            )
          }
         
        </Item>

        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:role.status=== undefined?'ENABLE':role.status,
              
            })(
              <Radio.Group>
                <Radio value="ENABLE">启用</Radio>
                <Radio value="DISABLE">禁用</Radio>
              </Radio.Group>
            )
          }
        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddUpdateForm)