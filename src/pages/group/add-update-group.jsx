import React,{Component} from 'react'
import {Form,Input,Button,Radio} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const TextArea = Input.TextArea
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    group:PropTypes.object
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){

    const group = this.props.group
  
    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="上级组织：">
          {
            getFieldDecorator('parentMenu',{
              initialValue:'',
              
            })(
              <Input placeholder="请输入角色编码"></Input>
            )
          }
         
        </Item>
        
        <Item label="组织编码：">
          {
            getFieldDecorator('menuCode',{
              initialValue:'',
              
            })(
              <Input placeholder="请输入菜单编码"></Input>
            )
          }
         
        </Item>
      
        <Item label="组织名称：">
          {
            getFieldDecorator('icon',{
              initialValue:'',
              
            })(
              <Input></Input>
            )
          }
         
        </Item>

        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:'',
              
            })(
              <Radio.Group>
                <Radio value="ENABLE">启用</Radio>
                <Radio value="DISABLE">禁用</Radio>
              </Radio.Group>
            )
          }
        </Item>
        
        <Item label="联系人：">
          {
            getFieldDecorator('number',{
              initialValue:'',
              
            })(
              <Input></Input>
            )
          }
        </Item>
        <Item label="联系电话：">
          {
            getFieldDecorator('url',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请输入联系电话'
              }]
            })(
              <Input></Input>
            )
          }
        </Item>
        <Item label="组织类型：">
          {
            getFieldDecorator('remark',{
              initialValue:'',
              
            })(
              <TextArea autoSize={{minRows:2,maxRows:6}}></TextArea>
            )
          }
        </Item>
        <Button type="primary">保存</Button>
      </Form>
    )
  }
}
export default Form.create()(AddUpdateForm)