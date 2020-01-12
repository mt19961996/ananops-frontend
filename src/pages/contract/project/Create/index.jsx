import React, { Component, } from 'react';
import { Form,Input,Select,Button,message,DatePicker,Radio } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
import locale from 'antd/es/date-picker/locale/zh_CN';
const token = window.localStorage.getItem('token')
class ProjectNew extends Component{
    constructor(props){
        super(props)
        this.state={
            contractDetail:{

            },
            projectDetail:{ 
                            
            },
        }
        this.getDetail = this.getDetail.bind(this);
    }
    // disabledDate=(current)=> {
    //   // Can not select days before today and today
    //   return current && current < moment().endOf('day');
    // }
    handleEmail (e) {
      let value = e.target.value;
      if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
        message.info('请填写有效邮箱信息');
      }
  }

  componentDidMount(){
    
    const data = this.props.location.query;//this.props.history.location.query.id;
    const {
      match : { params : {id } },
    } = this.props
    if(id){
      axios({
        method: 'POST',
        url: '/pmc/project/getById/'+id,
        headers: {
          'deviceId': this.deviceId,
          'Authorization':'Bearer '+token,
        },
      })
      .then((res) => {
        if(res && res.status === 200){     
        console.log(res.data.result)
        this.setState({
          projectDetail:res.data.result
        })
        }
      })
      .catch(function (error) {
          console.log(error);
      });
    }else{//如果项目id为空，则说明不是修改项目，而是从合同创建的项目
      const {contractId} = data;
      if(contractId){
        console.log("合同id为：" + contractId)
        this.getDetail(contractId);
      }
    }
  }
  //获得该项目对应的合同的详情
  getDetail=(id)=>{
    axios({
      method: 'POST',
      url: '/pmc/contract/getContractById/'+id,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+token,
      },
    })
    .then((res) => {
        //console.log(res);
        if(res && res.status === 200){     
        
          this.setState({
              contractDetail:res.data.result
          }) ;
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      form,
      history,
      match : { params : {id } },
    } = this.props
    const { getFieldValue } = form;
    const values = form.getFieldsValue()
    if(!getFieldValue('projectName')){
      message.error('请填写项目名称')
    }
    if(!getFieldValue('projectType')){
      message.error('请填写项目类型')
    }
    if(!getFieldValue('startTime')){
      message.error('请选择开始时间')
    }
    if(!getFieldValue('endTime')){
      message.error('请选择结束时间')
    }
    if(!getFieldValue('partyBName')){
      message.error('请输入乙方名称')
    }
    if(!getFieldValue('bleaderName')){
      message.error('请输入乙方负责人姓名')
    }
    if(!getFieldValue('bleaderTel')){
      message.error('请输入乙方项目负责人联系方式')
    }
    if(id){
      values.id=id
    }
    values.startTime=getFieldValue('startTime').format('YYYY-MM-DD HH:mm:ss')
    values.endTime=getFieldValue('endTime').format('YYYY-MM-DD HH:mm:ss')
    // values.partyAId=getFieldValue('partyAId')
    // values.partyBId=getFieldValue('partyBId')
    // values.atwoName=getFieldValue('atwoName')==="undefine"?getFieldValue('atwoname'):''
    // values.partyATwo=getFieldValue('partyATwo')=="undefine"?getFieldValue('partyATwo'):''
    // values.athreeName=getFieldValue('athreeName')=="undefine"?getFieldValue('athreeName'):''
    // values.partyAThree=getFieldValue('partyAThree')=="undefine"?getFieldValue('partyAThree'):''
    // values.partyBPhone=getFieldValue('partyBPhone')=="undefine"?getFieldValue('partyBPhone'):''
    // values.partyBTel=getFieldValue('partyBTel')=="undefine"?getFieldValue('partyBTel'):''
    // values.partyBEmail=getFieldValue('partyBEmail')=="undefine"?getFieldValue('partyBEmail'):''
    // values.contractId=getFieldValue('contractId')=="undefine"?getFieldValue('contractId'):''
    // values.contractName=getFieldValue('contractName')=="undefine"?getFieldValue('contractName'):''
    // values.description=getFieldValue('description')=="undefine"?getFieldValue('description'):''
    console.log(values.isContract)
    axios({
      method: 'POST',
      url: '/pmc/project/save',
      headers: {
        'Content-Type': 'application/json',
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+token,
      },
      data:JSON.stringify(values)
    })
    .then((res) => {
        if(res && res.status === 200){     
        // this.setState({
        //    projectDetail:res.data.result
        // });
        history.push('/cbd/pro/project')
        }
    })
    .catch(function (error) {
        console.log(error);
    });
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
        const { projectDetail,contractDetail} = this.state
        // console.log("合同为：" + JSON.stringify(this.state.contractDetail))
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
                initialValue: id && moment(projectDetail.startTime),
                rules:[{
                  required:true,
                  message:"请选择开始时间",
                }]
              })(
                <DatePicker
                locale={locale}
                format="YYYY-MM-DD HH:mm:ss"
              //  disabledDate={this.disabledDate}
                placeholder="请选择开始时间"
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="结束时间"
            >
              {getFieldDecorator('endTime',{
                initialValue: id && moment(projectDetail.endTime),
                rules:[{
                  required:true,
                  message:"请选择结束时间",
                }]
              })(
                <DatePicker
                locale={locale}
                format="YYYY-MM-DD HH:mm:ss"
              //  disabledDate={this.disabledDate}
                placeholder="请选择结束时间"
                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方ID"
            >
              {getFieldDecorator('partyAId',{
                initialValue: id && projectDetail.partyAId || contractDetail.partyAId,
                rules:[{
                  required:false,
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
              {getFieldDecorator('partyAName',{
                initialValue: id && projectDetail.partyAName || contractDetail.partyAName,
                rules:[{
                  required:false,
                  message:"请输入甲方名称",
                }]
              })(
                <Input placeholder="请输入甲方名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人id"
            >
              {getFieldDecorator('aleaderId',{
                initialValue: id && projectDetail.aleaderId,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人id",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人id" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人姓名"
            >
              {getFieldDecorator('aleaderName',{
                initialValue: id && projectDetail.aleaderName,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人姓名",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人姓名" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人电话"
            >
              {getFieldDecorator('aleaderTel',{
                initialValue: id && projectDetail.aleaderTel,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人电话",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人电话" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方联系人1姓名"
            >
              {getFieldDecorator('aoneName',{
                initialValue: id && projectDetail.aoneName,
                rules:[{
                  required:false,
                  message:"请输入甲方联系人1姓名",
                }]
              })(
                <Input placeholder="请输入甲方联系人1姓名" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方项目负责人联系方式1"
            >
              {getFieldDecorator('partyAOne',{
                initialValue: id && projectDetail.partyAOne,
                rules:[{
                  required:false,
                  message:"请输入甲方项目负责人联系方式1",
                }]
              })(
                <Input placeholder="请输入甲方项目负责人联系方式1" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="甲方联系人2姓名"
            >
              {getFieldDecorator('atwoName',{
                initialValue: id && projectDetail.atwoName,
                rules:[{
                  required:false,
                  message:"请输入甲方联系人2姓名",
                }]
              })(
                <Input placeholder="请输入甲方联系人2姓名" />
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
              label="甲方联系人3姓名"
            >
              {getFieldDecorator('athreeName',{
                initialValue: id && projectDetail.athreeName,
                rules:[{
                  required:false,
                  message:"请输入甲方联系人3姓名",
                }]
              })(
                <Input placeholder="请输入甲方联系人3姓名" />
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
                initialValue: id && projectDetail.partyBId || contractDetail.partyBId,
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
                initialValue: id && projectDetail.partyBName || contractDetail.partyBName,
                rules:[{
                  required:true,
                  message:"请输入乙方名称",
                }]
              })(
                <Input placeholder="请输入乙方名称" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方项目负责人ID"
            >
              {getFieldDecorator('bleaderId',{
                initialValue: id && projectDetail.bleaderId,
                rules:[{
                  required:true,
                  message:"请输入乙方项目负责人ID",
                }]
              })(
                <Input placeholder="请输入乙方项目负责人ID" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方项目负责人姓名"
            >
              {getFieldDecorator('bleaderName',{
                initialValue: id && projectDetail.bleaderName,
                rules:[{
                  required:true,
                  message:"请输入乙方项目负责人姓名",
                }]
              })(
                <Input placeholder="请输入乙方项目负责人姓名" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="乙方项目负责人电话"
            >
              {getFieldDecorator('bleaderTel',{
                initialValue: id && projectDetail.bleaderTel,
                rules:[{
                  required:true,
                  message:"请输入乙方项目负责人电话",
                }]
              })(
                <Input placeholder="请输入乙方项目负责人电话" />
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
              label="乙方24小时开通邮箱"
            >
              {getFieldDecorator('partyBEmail',{
                initialValue: id && projectDetail.partyBEmail,
                rules:[{
                  required:false,
                  message:"请输入乙方24小时开通邮箱",
                }]
              })(
                <Input onChange={this.handleEmail.bind(this)} placeholder="请输入乙方24小时开通邮箱" />
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="是否签署合同"
            >
              {getFieldDecorator('isContract',{
                initialValue: id && projectDetail.isContract || contractDetail != null,
                rules:[{
                  required:true,
                  message:"请选择是否签署合同",
                }]
              })(
                // <Input placeholder="请输入是否签署合同" />
                <Radio.Group defaultValue={1}>
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </Radio.Group>
              )}  
            </Form.Item>
            <Form.Item
              {...createFormItemLayout}
              label="合同ID"
            >
              {getFieldDecorator('contractId',{
                initialValue: id && projectDetail.contractId || contractDetail.contractCode,
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
                initialValue: id && projectDetail.contractName || contractDetail.contractName,
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
              label="项目是否作废"
            >
              {getFieldDecorator('isDestroy',{
                initialValue: id && projectDetail.isDestroy || contractDetail == null,
                rules:[{
                  required:true,
                  message:"请选择项目是否作废",
                }]
              })(
                // <Input placeholder="请输入项目是否作废" />
                <Radio.Group defaultValue={1}>
                <Radio value={1}>作废</Radio>
                <Radio value={0}>有效</Radio>
              </Radio.Group>
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
                    history.push('/cbd/pro/project')
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