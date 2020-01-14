import React,{Component} from 'react'
import {Form,Input,Button,Radio,Select} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const TextArea = Input.TextArea
const Option = Select.Option
class AddUpdateForm extends Component{
  //接收父组件参数
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    groupList:PropTypes.array.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render(){
    const groupList = this.props.groupList
  
    const group = groupList.map((item,index)=>
      <Option value={item[0]} key={index}>{item[1]}</Option>
    )

    const formItemLayout = {
      labelCol:{span:4},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>
        <Item label="上级组织：">
          {
            getFieldDecorator('pid',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请选择父组织'
              }]
            })(
              <Select>
                {group}
              </Select>
            )
          }
        </Item>

        <Item label="组织编码：">
          {
            getFieldDecorator('groupCode',{
              initialValue:'',
              rules:[{
                required:true,
              }]
            })(
              <Input placeholder="请输入组织编码"></Input>
            )
          }
         
        </Item>
      
        <Item label="组织名称：">
          {
            getFieldDecorator('groupName',{
              initialValue:'',
              rules:[{
                required:true,
              }]
            })(
              <Input></Input>
            )
          }
         
        </Item>
        <Item label="组织地址：">
          {
            getFieldDecorator('addressList',{
              initialValue:[368100109646176256,368100109679730688,368100109767811072],
              rules:[{
                required:true,
              }]
            })(
              <Input></Input>
            )
          }
         
        </Item>
        <Item label="联系人：">
          {
            getFieldDecorator('contact',{
              initialValue:'',
              rules:[{
                required:true,
                message:'请输入联系人'
              }]
            })(
              <Input></Input>
            )
          }
        </Item>
        <Item label="联系电话：">
          {
            getFieldDecorator('contactPhone',{
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
            getFieldDecorator('type',{
              initialValue:'',
              
            })(
              <Select>
                <Option value="公司" key="company">公司</Option>
                <Option value="部门" key="apartment">部门</Option>
              </Select>
            )
          }
        </Item>
        <Item label="状态：">
          {
            getFieldDecorator('status',{
              initialValue:'',
              
            })(
              <Radio.Group>
                <Radio value="0">启用</Radio>
                <Radio value="1">禁用</Radio>
              </Radio.Group>
            )
          }
        </Item>
        
      </Form>
    )
  }
}
export default Form.create()(AddUpdateForm)