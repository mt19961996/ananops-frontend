import React,{Component} from 'react'
import {Form,Input,Radio,Select} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    user:PropTypes.object,
    groupList:PropTypes.array.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){
    const user = this.props.user
    const groupList = this.props.groupList

    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }
  
    const group = groupList.map((item,index)=>
      <Option value={item[0]} key={index}>{item[1]}</Option>
    )

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="登录名：">
          {
            getFieldDecorator('loginName',{
              initialValue:user.loginName,
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
            getFieldDecorator('mobileNo',{
              initialValue:user.mobileNo,
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
            getFieldDecorator('userName',{
              initialValue:user.userName,
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
            getFieldDecorator('userCode',{
              initialValue:user.userCode,
              
            })(
              <Input placeholder="6-16位数字、字母"></Input>
            )
          }
         
        </Item>
        <Item label="组织名称：">
          {
            getFieldDecorator('groupId',{
              initialValue:user.groupName,
              rules:[{
                required:true,
                message:'请选择组织名称'
              }]
            })(
              <Select>
                {group}
              </Select>
            )
          }
         
        </Item>
        <Item label="邮箱：">
          {
            getFieldDecorator('email',{
              initialValue:user.email,
              rules:[{
                required:true,
                message:'邮箱必须输入'
              }]
            })(
              <Input placeholder="请输入邮箱地址"></Input>
            )
          }
         
        </Item>
        {
          user.id?null:(
            <Item label="密码：">
              {
                getFieldDecorator('loginPwd',{
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
          )
        }

        <Item label="用户说明：">
          {
            getFieldDecorator('remark',{
              initialValue:user.remark,
              
            })(
              <TextArea placeholder="请输入用户说明" autoSize={{minRows:2,maxRows:6}}></TextArea>
            )
          }
         
        </Item>

        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:user.status=== undefined?'ENABLE':user.status,
              
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