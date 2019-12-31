import React,{Component} from 'react'
import {Form,Input,} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item

class Add extends Component{
  //接收父组件参数
  static propTypes = {
    setAdd:PropTypes.func.isRequired,
    add:PropTypes.object
  }

  componentWillMount() {
    this.props.setAdd(this.props.form)
  }

  render(){

    const add = this.props.add
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="项目ID">
          {
            getFieldDecorator('projectId',{
              initialValue:add.projectId,
              rules:[{
                required:true,
                message:'请输入项目ID',
              }]
            })(
              <Input placeholder="请输入项目ID"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="用户ID">
          {
            getFieldDecorator('userId',{
              initialValue:add.userId,
              disabled:true,
              rules:[{
                required:true,
                message:'请输入用户ID'
              }]
            })(
              <Input placeholder="请输入用户ID"></Input>
            )
          }       
        </Item>
      </Form>
    )
  }
}
export default Form.create()(Add)