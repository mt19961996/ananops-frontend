import React,{Component} from 'react'
import {Form,Input,Radio,Select} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    auth:PropTypes.object
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){

    const auth = this.props.auth
    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="菜单名称：">
          {
            getFieldDecorator('menuId',{
              initialValue:auth.menuId,
              
            })(
              <Select>
                <Option value="1111" key="1111">角色管理</Option>
                <Option value="1112" key="1112">用户管理</Option>
                <Option value="1113" key="1113">菜单管理</Option>
                <Option value="1114" key="1114">权限管理</Option>
                <Option value="1115" key="1115">组织管理</Option>
                <Option value="399623736623501312" key="399623736623501312">数据字典</Option>
              </Select>
            )
          }
        </Item>
        
        <Item label="权限编码：">
          {
            getFieldDecorator('actionCode',{
              initialValue:auth.actionCode,
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
            getFieldDecorator('actionName',{
              initialValue:auth.actionName,
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
            getFieldDecorator('url',{
              initialValue:auth.url,
              rules:[{
                required:true,
                message:'权限地址必须输入'
              }]
            })(
              <Input placeholder="请输入权限URL地址"></Input>
            )
          }
         
        </Item>

        <Item label="权限说明：">
          {
            getFieldDecorator('remark',{
              initialValue:auth.remark,
              
            })(
              <Input placeholder="请输入权限说明"></Input>
            )
          }
         
        </Item>
        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:auth.status=== undefined?'ENABLE':auth.status,
              
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