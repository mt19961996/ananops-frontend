import React,{Component} from 'react'
import {Form,Input,Radio,TextArea} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item

class Result extends Component{
  //接收父组件参数
  static propTypes = {
    setSubmit:PropTypes.func.isRequired,
    result:PropTypes.object
  }

  componentWillMount() {
    this.props.setSubmit(this.props.form)
  }

  render(){

    const result= this.props.result
  
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="ID：">
          {
            getFieldDecorator('id',{
              initialValue:result.id,
              rules:[{
                required:true,
                message:'请输入ID',
              }]
            })(
              <Input placeholder="请输入ID"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="维修维护名称：">
          {
            getFieldDecorator('title',{
              initialValue:result.title,
              disabled:true,
              rules:[{
                required:true,
                message:'请输入维修维护名称'
              }]
            })(
              <Input  disabled='true' placeholder="请输入维修维护名称"></Input>
            )
          }       
        </Item>
        <Item label="紧急程度：">
          {
            getFieldDecorator('level',{
              initialValue:result.level,
              rules:[{
                required:false,
                message:'请输入紧急程度'
              }]
            })(
              <Input disabled='true'  placeholder="请输入紧急程度"></Input>
            )
          }
         
        </Item>
      
        <Item label="方案：">
          {
            getFieldDecorator('suggestion',{
              initialValue:result.suggestion,
              rules:[{
                required:true,
                message:'请输入方案'
              }]
            })(
              <Input.TextArea  disabled='true' placeholder="请输入方案" autosize={{minRows:2,maxRows:6}}></Input.TextArea>
            )
          }
         
        </Item>
      
        <Item label="总花费：">
          {
            getFieldDecorator('totalCost',{
              initialValue:result.totalCost,
              rules:[{
                required:true,
                message:'请输入总花费（¥）'
              }]
            })(
              <Input placeholder="请输入总花费"></Input>
            )
          }
         
        </Item>
      </Form>
    )
  }
}
export default Form.create()(Result)