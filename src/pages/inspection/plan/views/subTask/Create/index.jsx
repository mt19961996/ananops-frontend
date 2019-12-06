import React, { Component, } from 'react';
import { Form,Input,Select,Button,message } from 'antd';
import './index.styl'

class SubTaskNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planDetail:{}
    };
  }
  render() {
    const createFormItemLayout = {
      labelCol: {span:8},
      wrapperCol : {span:8},
    }
    const { 
      form: { getFieldDecorator }, 
      match : { params : { id } }
    } = this.props
    const { planDetail } = this.state
    return (
      <div>
        <div className="subTask-create-page">
          
            <Form
              onSubmit={this.handleSubmit}
            >
              <Form.Item
                {...createFormItemLayout}
                label="维修任务序号"
              >
                {getFieldDecorator('duration',{
                  initialValue: id && planDetail.duration,
                  rules:[{
                    required:true,
                    message:"请填写维修任务序号",
                  }]
                })(
                  <Input placeholder="请输入维修任务序号" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备类型"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入设备类型",
                  }]
                })(
                  <Input placeholder="请输入设备类型" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备异常等级"
              >
                {getFieldDecorator('activity_range',{
                  initialValue: id && planDetail.activity_range,
                  rules:[{
                    required:true,
                    message:"请选择设备异常等级",
                  }]
                })(
                    <Select
                    //  mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择设备异常等级"
                  >
                  </Select>,
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备异常描述"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入设备异常描述",
                  }]
                })(
                  <Input placeholder="请输入设备异常描述" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备状态"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入设备状态",
                  }]
                })(
                  <Input placeholder="请输入设备状态" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预计开始时间（年/月/日）"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入预计开始时间",
                  }]
                })(
                  <Input placeholder="请输入预计开始时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="预计完成时间（年/月/日）"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入预计完成时间",
                  }]
                })(
                  <Input placeholder="请输入预计完成时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="实际开始时间（年/月/日）"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入实际开始时间",
                  }]
                })(
                  <Input placeholder="请输入实际开始时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="实际完成时间（年/月/日）"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入实际完成时间",
                  }]
                })(
                  <Input placeholder="请输入实际完成时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="截止日期（年/月/日）"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:true,
                    message:"请输入最迟完成时间",
                  }]
                })(
                  <Input placeholder="请输入最迟完成时间" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="状态信息"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入状态信息",
                  }]
                })(
                  <Input placeholder="请输入状态信息" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备经度"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入设备经度",
                  }]
                })(
                  <Input placeholder="请输入设备经度" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="设备纬度"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入设备纬度",
                  }]
                })(
                  <Input placeholder="请输入设备纬度" />
                )}  
              </Form.Item>
              <Form.Item
                {...createFormItemLayout}
                label="描述信息"
              >
                {getFieldDecorator('work_number',{
                  initialValue: id && planDetail.work_number,
                  rules:[{
                    required:false,
                    message:"请输入描述信息",
                  }]
                })(
                  <Input placeholder="请输入描述信息" />
                )}  
              </Form.Item>

              <section className="operator-container">
                <div style={{textAlign:"center"}}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="default"
                  >{id ? '编辑' : '新建'}
                  </Button>
                  <Button
                    style={{marginLeft:"28px"}}
                    size="default"
                    onClick={()=> {
                      const {
                        history,
                      } = this.props
                      history.push('/inspection/plan/subTask')
                    }}
                  >取消
                  </Button>
                </div>
              </section>
            </Form>
        </div>
      </div>

    );
  }
}

export default Form.create()(SubTaskNew);