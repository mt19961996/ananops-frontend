import React,{Component} from 'react'
import {Form,Input,Radio,TextArea,Select} from 'antd'
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

        <Item label="工单编号：">
          {
            getFieldDecorator('id',{
              initialValue:result.id,
              rules:[{
                required:true,
                message:'请输入工单编号',
              }]
            })(
              <Input placeholder="请输入工单编号"  disabled='true'></Input>
            )
          }
         
        </Item>
        <Item label="紧急程度">
          {
            getFieldDecorator('level',{
              initialValue:result.level,
              rules:[{
                required:true,
                message:'请选择紧急程度'
              }]
            })(
              <Select
                placeholder="请选择紧急程度"
                allowClear
              >
                <Select.Option key={0} value={1}> 
                    一般
                </Select.Option>
                <Select.Option key={1} value={2}> 
                    紧急
                </Select.Option>
                <Select.Option key={2} value={3}> 
                   非常紧急
                </Select.Option>
              </Select>
            )
          }       
        </Item>      
        <Item label="维修结果：">
          {
            getFieldDecorator('result',{
              initialValue:result.result,
              rules:[{
                required:true,
                message:'请输入维修结果'
              }]
            })(
              <Select
                placeholder="请选择紧急程度"
                allowClear
              >
                <Select.Option key={0} value={0}> 
                  维修结束
                </Select.Option>
                <Select.Option key={1} value={2}> 
                  维修暂停
                </Select.Option>
                <Select.Option key={2} value={3}> 
                  维修中止
                </Select.Option>
              </Select>
            )
          }
         
        </Item>
      
        <Item label="维修建议：">
          {
            getFieldDecorator('suggestion',{
              initialValue:result.suggestion,
              rules:[{
                required:true,
                message:'请输入维修建议'
              }]
            })(
              <Input.TextArea  placeholder="请输入维修结果" autosize={{minRows:2,maxRows:6}} allowClear></Input.TextArea>
            )
          }
         
        </Item>
      </Form>
    )
  }
}
export default Form.create()(Result)