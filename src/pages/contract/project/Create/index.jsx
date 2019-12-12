import React, { Component, } from 'react';
import { Form,Input,Select,Button,message } from 'antd';
import { Link } from 'react-router-dom'
 
class ProjectNew extends Component{
    constructor(props){
        super(props)
        this.state={
            projectDetail:{               
            }
        }
    }
    render(){
        const createFormItemLayout = {
            labelCol: {span:8},
            wrapperCol : {span:8},
          }
          const { 
            form: { getFieldDecorator }, 
            match : { params : { id } }
          } = this.props
          const { projectDetail } = this.state
        return(
            <div>
                <div className="inpection-plan-create-page">
          
          <Form
            onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...createFormItemLayout}
              label="项目名称"
            >
              {getFieldDecorator('projectName',{
                initialValue: id && projectDetail.projectName,
                rules:[{
                  required:true,
                  message:"请填写项目名称",
                }]
              })(
                <Input placeholder="请输入项目名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="项目类型"
            >
              {getFieldDecorator('projectType',{
                initialValue: id && projectDetail.projectType,
                rules:[{
                  required:true,
                  message:"请输入项目类型",
                }]
              })(
                <Input placeholder="请输入项目类型" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="开始时间"
            >
              {getFieldDecorator('startTime',{
                initialValue: id && projectDetail.startTime,
                rules:[{
                  required:true,
                  message:"请选择开始时间",
                }]
              })(
                <Select
                  //  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择开始时间"
                >
                </Select>,
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="结束时间"
            >
              {getFieldDecorator('endTime',{
                initialValue: id && projectDetail.endTime,
                rules:[{
                  required:true,
                  message:"请选择结束时间",
                }]
              })(
                <Input placeholder="请输入结束时间" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方ID"
            >
              {getFieldDecorator('partAId',{
                initialValue: id && projectDetail.partAId,
                rules:[{
                  required:true,
                  message:"请输入甲方ID",
                }]
              })(
                <Input placeholder="请输入甲方ID" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方名称"
            >
              {getFieldDecorator('partAName',{
                initialValue: id && projectDetail.partAName,
                rules:[{
                  required:true,
                  message:"请输入甲方名称",
                }]
              })(
                <Input placeholder="请输入甲方名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人联系方式1"
            >
              {getFieldDecorator('partyAOne',{
                initialValue: id && projectDetail.partyAOne,
                rules:[{
                  required:true,
                  message:"请输入甲方项目负责人联系方式1",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人联系方式1" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人联系方式2"
            >
              {getFieldDecorator('partyATwo',{
                initialValue: id && projectDetail.partyATwo,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人联系方式2",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人联系方式2" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人联系方式3"
            >
              {getFieldDecorator('partyAThree',{
                initialValue: id && projectDetail.partyAThree,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人联系方式3",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人联系方式3" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方ID"
            >
              {getFieldDecorator('partyBId',{
                initialValue: id && projectDetail.partyBId,
                rules:[{
                  required:true,
                  message:"请输入乙方ID",
                }]
              })(
                <Input placeholder="请输入乙方ID" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方名称"
            >
              {getFieldDecorator('partyBName',{
                initialValue: id && projectDetail.partyBName,
                rules:[{
                  required:false,
                  message:"请输入乙方名称",
                }]
              })(
                <Input placeholder="请输入乙方名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方项目负责人联系方式"
            >
              {getFieldDecorator('partyBOne',{
                initialValue: id && projectDetail.partyBOne,
                rules:[{
                  required:false,
                  message:"请输入乙方项目负责人联系方式",
                }]
              })(
                <Input placeholder="请输入乙方项目负责人联系方式" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方24小时移动电话"
            >
              {getFieldDecorator('partyBPhone',{
                initialValue: id && projectDetail.partyBPhone,
                rules:[{
                  required:false,
                  message:"请输入乙方24小时移动电话",
                }]
              })(
                <Input placeholder="请输入乙方24小时移动电话" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方24小时值班电话"
            >
              {getFieldDecorator('partyBTel',{
                initialValue: id && projectDetail.partyBTel,
                rules:[{
                  required:false,
                  message:"请输入乙方24小时值班电话",
                }]
              })(
                <Input placeholder="请输入乙方24小时值班电话" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="是否签署合同"
            >
              {getFieldDecorator('isContract',{
                initialValue: id && projectDetail.isContract,
                rules:[{
                  required:false,
                  message:"请输入是否签署合同",
                }]
              })(
                <Input placeholder="请输入是否签署合同" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="合同ID"
            >
              {getFieldDecorator('contractId',{
                initialValue: id && projectDetail.contractId,
                rules:[{
                  required:false,
                  message:"请输入合同ID",
                }]
              })(
                <Input placeholder="请输入合同ID" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="合同名称"
            >
              {getFieldDecorator('contractName',{
                initialValue: id && projectDetail.contractName,
                rules:[{
                  required:false,
                  message:"请输入合同名称",
                }]
              })(
                <Input placeholder="请输入合同名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="描述"
            >
              {getFieldDecorator('description',{
                initialValue: id && projectDetail.description,
                rules:[{
                  required:false,
                  message:"请输入描述",
                }]
              })(
                <Input placeholder="请输入描述" />
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
                    history.push('/contract/project')
                  }}
                >取消
                </Button>
              </div>
            </section>
          </Form>
        </div>
            </div>
        )
    }
}
export default Form.create()(ProjectNew);