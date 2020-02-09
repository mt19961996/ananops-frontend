import React , { Component } from 'react';
import { Form,Input,message,Col,Button,Icon,Row,Upload,Select,DatePicker,Checkbox } from 'antd';
import './index.styl'
import {reqEditProvider} from '../../../../axios/index'

const { Option } = Select;
const { TextArea } = Input;
const FormItem = Form.Item;
const provinceData = ['北京','浙江'];
const cityData = {
  北京: ['北京'],
  浙江: ['南京', '苏州', '镇江'],
};

class EditBasicInfo extends Component{
  constructor(props){
    super(props);
  }

    state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
    
    handleProvinceChange = value => {
      this.setState({
        cities: cityData[value],
        secondCity: cityData[value][0],
      });
    };
    
    onSecondCityChange = value => {
      this.setState({
        secondCity: value,
      });
    };

    onPhoneRq(rule, value, callback){
      if(/^\d*$/g.test(value)){
        if(value.length != 11){
          callback('请输入11位电话号码!');
        }
      }else{
        callback('请输入正确的电话号码!');
      }
    }

    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
  
    handleSubmit = async e => {
      e.preventDefault();
      const value = this.props.form.getFieldsValue()
      value.expirationDate = value.expirationDate.format("YYYY-MM-DD HH:mm:ss")
      console.log(value)
      // this.props.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values);
      //   }
      // });
      const result = await reqEditProvider(value)
      if(result.code===200){
        message.success("修改成功")
        this.props.form.resetFields()
        this.props.history.goBack()
      }
    }
  
    componentWillMount(){
      const providerInfo = this.props.location.state
      console.log(providerInfo)
      this.providerInfo = providerInfo || {}
    }

    getOptUploadFileReqDto() {
      return {
        fileType: 'picture',
        bucketName: 'ananops',
        filePath: 'ananops/spc/'
      };
    };

    getOptUploadFileReqDto1() {
      return {
        fileType: 'png',
        bucketName: 'ananops',
        filePath: 'accountOpeningLicense'
      };
    };

    render(){
      const loginName = window.localStorage.getItem('loginName');
      const providerInfo = this.providerInfo
      const { cities } = this.state;
      const { secondArea } = this.state;
      var deviceId = new Date().getTime();

      const formItemLayout  = {
        labelCol : { span: 7 },
        wrapperCol : { span: 12 }
      };
      const tailFormItemLayout = {
        wrapperCol: {
          span: 14,
          offset: 10
        }
      };
      const { getFieldDecorator } = this.props.form;

      const props = {
        name: 'file',
        action: 'http://www.ananops.com:29995/opc/file/uploadFile',
        headers: {
          authorization: 'Bearer '+window.localStorage.getItem('token'),
          'deviceId': deviceId,
        },
        data: this.getOptUploadFileReqDto,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

      const props1 = {
        name: 'file',
        action: 'http://www.ananops.com:29995/spc/company/uploadCompanyPicture',
        transformFile(file) {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const canvas = document.createElement('canvas');
              const img = document.createElement('img');
              img.src = reader.result;
              img.onload = () => {
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'middle';
                ctx.fillText(loginName, 20, 20);
                canvas.toBlob(resolve);
              };
            };
          });
        },
        headers: {
          authorization: 'Bearer '+window.localStorage.getItem('token'),
          'deviceId': deviceId,
        },
        data: this.getOptUploadFileReqDto1,
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

      return (
        <div className="store-box">
          <Button icon="rollback" onClick={() => this.props.history.goBack()}>返回</Button>

          <Form onSubmit = {this.handleSubmit}>
            <Row gutter={24} style={{marginLeft:80}}><h1><b>|基本信息</b></h1></Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="主体名称"
                  hasFeedback
                >
                  {getFieldDecorator('groupName', {
                    initialValue:providerInfo.groupName || '',
                    rules: [{ required: true, message: '请输入公司名称!' }]
                  })(
                    <Input placeholder="请输入公司名称" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>

              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="主体机构类别"
                  hasFeedback
                >
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择主体机构类别!' }]
                  })(
                    <Select initialValue="0" style={{ width: 200 }}>
                      <Option value="0">企业</Option>
                      <Option value="1">机关法人</Option>
                      <Option value="2">事业单位</Option>
                      <Option value="3">社会组织</Option>
                      <Option value="4">其他</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="主体行业"
                  hasFeedback
                >
                  {getFieldDecorator('mainWork')(
                    <Select initialValue="0" style={{ width: 200 }}>
                      <Option value="0">通信</Option>
                      <Option value="1">互联网</Option>
                      <Option value="2">安防</Option>
                      <Option value="3">其他</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="法定代表人姓名"
                  hasFeedback
                >
                  {getFieldDecorator('legalPersonName', {
                    rules: [{ required: true, message: '请输入法定代表人姓名!' }]
                  })(
                    <Input placeholder="请输入法定代表人姓名" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="法定代表人联系电话"
                  hasFeedback
                >
                  {getFieldDecorator('legalPersonPhone',{
                    initialValue:''
                  })(
                    <Input placeholder="法定代表人联系电话" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="法人代表证件号"
                  hasFeedback
                >
                  {getFieldDecorator('legalPersonNumber')(
                    <div>
                      <Select initialValue="0" style={{ width: 100 }}>
                        <Option value="0">身份证</Option>
                        <Option value="1">护照号</Option>
                      </Select>
                      <Input placeholder="输入证件号" style={{ width: 156 }}/>
                    </div>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="附件上传"
                  hasFeedback
                >
                  {getFieldDecorator('legalCertification')(
                    <Upload {...props1}>
                      <Button>
                        <Icon type="upload"/> 附件上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              {/* <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="注册地"
                  hasFeedback
                >
                  {getFieldDecorator('companyRegistryLoc')(
                    <div>
                      <Select
                        defaultValue={provinceData[0]}
                        style={{ width: 120 }}
                        onChange={this.handleProvinceChange}
                      >
                        {provinceData.map(province => (
                          <Option key={province}>{province}</Option>
                        ))}
                      </Select>
                      <Select
                        style={{ width: 120 }}
                        value={this.state.secondCity}
                        onChange={this.onSecondCityChange}
                      >
                        {cities.map(city => (
                          <Option key={city}>{city}</Option>
                        ))}
                      </Select>
                    </div>
                  )}
                </FormItem>
              </Col> */}
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="邮政编码"
                  hasFeedback
                >
                  {getFieldDecorator('zipCode',{initialValue:''})(
                    <Input placeholder="请填入邮政编码" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="详细地址"
                  hasFeedback
                >
                  {getFieldDecorator('detailAddress',{initialValue:''})(
                    <Input placeholder="请填入主体详细地址" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                            
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="联系人"
                  hasFeedback
                >
                  {getFieldDecorator('contact', {
                    rules: [{ required: true, message: '请输入联系人!' }]
                  })(
                    <Input placeholder="请输入联系人姓名" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="联系人手机"
                  hasFeedback
                >
                  {getFieldDecorator('contactPhone',{
                    rules:[
                      {required: true,message:'请填入联系人手机号'},
                      {validator: this.onPhoneRq}
                    ]
                  })(
                    <Input placeholder="请输入手机号" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24} style={{marginLeft:80}}><h1><b>|基本账户开户许可证</b></h1></Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="开户行帐号"
                  hasFeedback
                >
                  {getFieldDecorator('accountNumber',{
                    rules:[
                      {required:true,message:'必填项不能为空'}
                    ]
                  })(
                    <Input placeholder="开户行帐号" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="附件上传"
                  hasFeedback
                >
                  {getFieldDecorator('bankCertification', {
                    rules: [
                      {/* {required: true, message: '请上传基本户开户行许可证影印件!' } */}
                    ]
                  })(
                    <Upload {...props1}>
                      <Button>
                        <Icon type="upload"/> 附件上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={24} style={{marginLeft:80}}><h1><b>|营业执照</b></h1></Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="类型"
                  hasFeedback
                >
                  {getFieldDecorator('licenseType',{
                    rules:[
                      {required:true,message:'根据类型填写，如-有限责任公司'}
                    ]
                  })(
                    <Input placeholder="根据类型填写，如-有限责任公司" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="注册资本"
                  hasFeedback
                >
                  {getFieldDecorator('registeredCaptial')(
                    <div>
                      <Select initialValue="0" style={{ width: 80 }}>
                        <Option value="0">人民币</Option>
                        <Option value="1">美元</Option>
                        <Option value="2">欧元</Option>
                      </Select>
                      <Input placeholder="输入注册资本" style={{ width: 156 }}/>
                    </div>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="统一社会信用代码"
                >
                  {getFieldDecorator('groupCode',{
                    initialValue:providerInfo.groupCode || '',
                    rules: [
                      {required: true, message: '请输入主体统一社会信用代码!' },
                      {validator: this.onUsccRq}
                    ]
                  })(
                    <Input placeholder="若没有统一社会信用代码，请填写（QT+16位数字）" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="有效期"
                  hasFeedback
                >
                  {getFieldDecorator('expirationDate',{
                    rules:[
                      {required:true,message:'填写营业执照有效期'}
                    ]
                  })(
                    <DatePicker
                      showTime
                      placeholder="请选择营业执照有效期"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="附件上传"
                  hasFeedback
                >
                  {getFieldDecorator('buLicensePhoto',{
                    rules: [
                      {/* {required: true, message: '请上传营业执照影印件!' } */}
                    ]
                  })(
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload"/> 附件上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                            
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="经营范围"
                  hasFeedback
                >
                  {getFieldDecorator('businessScope',{initialValue:''})(
                    <TextArea placeholder="请填入公司经营范围" />
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="供应产品类别"
                  hasFeedback
                >
                  {getFieldDecorator('productCategory',{initialValue:''})(
                    <TextArea placeholder="请填入公司供应产品类别" />
                  )}
                </FormItem>        
              </Col>
            </Row>
            <Row gutter={24}>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" size="large" htmlType="submit">保存</Button>
              </FormItem>
            </Row>
          </Form>
        </div>
      )
    }
}

export default Form.create({})(EditBasicInfo);