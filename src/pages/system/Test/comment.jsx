import React,{Component} from 'react'
import {Form,Input,Rate} from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item

class Comment extends Component{
  //接收父组件参数
  static propTypes = {
    setComment:PropTypes.func.isRequired,
    comment:PropTypes.object
  }

  componentWillMount() {
    this.props.setComment(this.props.form)
  }

  render(){

    const comment = this.props.comment
  
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }

    const {getFieldDecorator} = this.props.form
    return (
      <Form {...formItemLayout}>

        <Item label="任务编号：">
          {
            getFieldDecorator('taskId',{
              initialValue:comment.taskId,
              rules:[{
                required:true,
                message:'请输入任务编号',
              }]
            })(
              <Input placeholder="请输入任务编号"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="负责人ID：">
          {
            getFieldDecorator('principalId',{
              initialValue:comment.principalId,
              disabled:true,
              rules:[{
                required:true,
                message:'请输入负责人ID'
              }]
            })(
              <Input disable='true' placeholder="请输入负责人ID"></Input>
            )
          }       
        </Item>
        <Item label="用户ID">
          {
            getFieldDecorator('userId',{
              initialValue:comment.userId,
              rules:[{
                required:true,
                message:'请输入用户ID'
              }]
            })(
              <Input disable='true' placeholder="请输入用户ID"></Input>
            )
          }
         
        </Item>
        <Item label="评分：">
          {
            getFieldDecorator('score',{
              initialValue:comment.totalCost,
              rules:[{
                required:true,
                message:'请输入评分'
              }]
            })(
              <Rate />
            )
          }
         
        </Item>
        <Item label="评论：">
          {
            getFieldDecorator('content',{
              initialValue:comment.content,
              rules:[{
                required:true,
                message:'请输入评论'
              }]
            })(
              <Input.TextArea placeholder="请输入评论" autosize={{minRows:2,maxRows:6}}></Input.TextArea>
            )
          }
         
        </Item>
      
        
      </Form>
    )
  }
}
export default Form.create()(Comment)