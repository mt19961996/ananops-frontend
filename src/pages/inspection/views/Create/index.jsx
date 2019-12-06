import React, { Component, } from 'react';
import { Form,Input,Select,Button,message } from 'antd';
import './index.styl'

class PlanNew extends Component {
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
        <div className="inpection-plan-create-page">
          
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="负责人序号"
            >
              {getFieldDecorator('duration',{
                initialValue: id && planDetail.duration,
                rules:[{
                  required:true,
                  message:"请填写负责人序号",
                }]
              })(
                <Input placeholder="请输入负责人序号" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="服务商序号"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:true,
                  message:"请输入服务商序号",
                }]
              })(
                <Input placeholder="请输入服务商序号" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="巡检类型"
            >
              {getFieldDecorator('activity_range',{
                initialValue: id && planDetail.activity_range,
                rules:[{
                  required:true,
                  message:"请选择巡检类型",
                }]
              })(
                <Select
                  //  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择巡检类型"
                >
                </Select>,
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="所属项目"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:true,
                  message:"请输入所属项目",
                }]
              })(
                <Input placeholder="请输入所属项目" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="地址"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:true,
                  message:"请输入地址",
                }]
              })(
                <Input placeholder="请输入地址" />
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
              label="最迟完成时间（年/月/日）"
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
              label="维修维护花费（¥）"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:false,
                  message:"请输入维修维护花费",
                }]
              })(
                <Input placeholder="请输入维修维护花费" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="状态"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:false,
                  message:"请输入状态",
                }]
              })(
                <Input placeholder="请输入状态" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="总花费（¥）"
            >
              {getFieldDecorator('work_number',{
                initialValue: id && planDetail.work_number,
                rules:[{
                  required:false,
                  message:"请输入总花费",
                }]
              })(
                <Input placeholder="请输入总花费" />
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
                    history.push('/inspection')
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

export default Form.create()(PlanNew);