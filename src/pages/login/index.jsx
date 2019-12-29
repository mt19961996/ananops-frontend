import React from 'react';
import { Form,Icon,Input,Button,message,Col,Row} from 'antd';
import { Redirect } from 'react-router-dom';
import './login.styl'
import api from '../../axios/index'
import axios from 'axios'
import { tokenToString } from 'typescript';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageCode: '',
      deviceId: '',
    }
    this.getImage=this.getImage.bind(this);
  }
  componentDidMount(){
    this.getImage();
  }
  componentDidCatch(error, info) {
    
  }
  handleSubmit = e => {
    e.preventDefault();
    var values = this.props.form.getFieldsValue();
    var isCompanyUscc = values.companyUscc;
    if (isCompanyUscc) {
      this.signUp(values);
    } else {
      this.login(values);
    }
  };
  signUp =(values)=> {
    let company = values.company;
    let companyUscc = values.companyUscc;
    let loginPasswd = values.loginPasswd;
    let confirmPasswd = values.confirmPasswd;
    let contactName = values.contactName;
    let personPhone = values.personPhone;
    let verifyCode = values.verifyCode;
    if (!company || !companyUscc || !loginPasswd || !confirmPasswd || !contactName || !personPhone || !verifyCode) {
      message.info('加*必填');
      return;
    }
    if (loginPasswd !== confirmPasswd) {
      message.info('两次输入的密码不一致');
      return;
    }
    console.log('serviceRegistry+');
    console.log(values);
  }
  login =(values)=> {
    let loginName =values.username;
    let loginPwd = values.password;
  
    let captchaCode=values.captchaCode;
    if (!loginName || !loginPwd || !captchaCode) {
      message.info('加*必填');
      return;
    }
    axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'deviceId': this.state.deviceId
      },
      url: '/uac/auth/form',
      auth: {
        username: 'ananops-client-uac',
        password: 'ananopsClientSecret'
      },
      params: {
        username: loginName,
        password: loginPwd,
        imageCode: captchaCode,
        // imageCode: this.loginForm.captchaCode
      },
     
    }).then((res) => {
      this.getImage();
      // this.getImage();
      console.log('123')
      console.log(res)
      if (res && res.data.code === 200) {
        console.log('its ok');
        console.log(res.data.result)
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem('loginName',res.data.result.loginName);
        window.localStorage.setItem('access_token',res.data.result.access_token)
        window.localStorage.setItem('refresh_token',res.data.result.refresh_token)
        window.localStorage.setItem('token',res.data.result.access_token)
        console.log('access_token:',window.localStorage.getItem('access_token'))
        console.log('refresh_token:',window.localStorage.getItem('refresh_token'))
        this.props.history.push('/');
        // window.location.href = this.redirectUri;
      }
    }).catch((err) => {
      console.log(err);
      message.info('验证码错误')
    });
  } 
  getImage=()=> {
    var deviceId=new Date().getTime();
    this.setState({deviceId:deviceId});
    axios({
      method: 'POST',
      url: '/uac/auth/code/image',
      headers: {
        'deviceId': deviceId
      }
    }).then((res) => {
      var image='data:image/jpg;base64,' + res.data.result
      this.setState({imageCode:image})

    });
  }
  getRegistry=()=> {
    const registed = window.localStorage.getItem('isRegistry');
    if (registed) {
      window.localStorage.removeItem('isRegistry');
    } else {
      window.localStorage.setItem('isRegistry', true);
    }
    this.props.history.push('/registry');
  }
  onPhoneRq(rule, value, callback){
    if(/^\d*$/g.test(value)){
        if(value.length != 11){
            callback('请输入11位电话号码!');
        }
    }else{
        callback('请输入正确的电话号码!');
    }
  }
  onPhoneRq(rule, value, callback){
    if(/^\d*$/g.test(value)){
        if(value.length != 11){
            callback('请输入11位电话号码!');
        }
    }else{
        callback('请输入正确的电话号码!');
    }
  }
  onUsccRq(rule, value, callback){
    if(/^\d*$/g.test(value)){
        if(value.length != 18){
            callback('请输入18位统一社会信用代码!');
        }
    }else{
        callback('请输入正确的统一社会信用代码!');
    }
  }
  onGetCode(){
    const form = this.props.form;
    if(form.getFieldValue('personPhone')){
        if(form.getFieldValue('personPhone').length == 11){
            this.props.getCode({url:'/api/seller/apply/sendVerifyCode',method:'POST',data:{mobileNo:form.getFieldValue('personPhone')}});
        }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const loggedIn = window.localStorage.getItem('loggedIn');
    const isRegistry = window.localStorage.getItem('isRegistry');
    const formItemLayout  = {
      labelCol : { span: 6 },
      wrapperCol : { span: 12 }
    };
    const tailFormItemLayout = {
        wrapperCol: {
            span: 14,
            offset: 6
        }
    };
    const LoginForm = (
      <div className="login">
        <header className="login-header">
          <h1>安安运维平台</h1>
        </header>
        <section className="login-content">
          <h2>登 录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" className="login-icon" />} placeholder="用户名admin"/>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" className="login-icon"/>} type="password" placeholder="密码123"/>,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('captchaCode', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <div>
                  <Col span={8}>
                    <Input placeholder="输入验证码"/>
                  </Col>
              
                  <img src={this.state.imageCode} onClick={this.getImage}/>
                  <a onClick={this.getRegistry}>服务商注册</a>
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
    const RegistryForm = (
      <div className="login">
        <header className="login-header">
          <h1>安安运维平台</h1>
        </header>
        <section className="registry-content">
          <h2>服 务 商 注 册</h2>
            <Form onSubmit = {this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
                    label="主体单位名称"
                    hasFeedback>
                    {getFieldDecorator('company', {
                        rules: [{ required: true, message: '请输入公司名称!' }]
                    })(
                        <Input placeholder="请输入公司名称" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="统一社会信用代码">
                    {getFieldDecorator('companyUscc',{
                      rules: [
                        {required: true, message: '请输入主体统一社会信用代码!' },
                        {validator: this.onUsccRq}
                      ]
                    })(
                        <Input placeholder="若没有统一社会信用代码，请填写（QT+16位数字）" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="登录密码">
                    {getFieldDecorator('loginPasswd',{
                      rules: [{ required: true, message: '请输入登录密码!' }]
                    })(
                        <Input placeholder="请填写登录密码" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback>
                    {getFieldDecorator('confirmPasswd',{
                        rules:[{required:true,message:'请填写确认密码!'}]
                    })(
                        <Input placeholder="请填写确认密码" />
                    )}
                </Form.Item>
                <Form.Item
                        {...formItemLayout}
                        label="联系人姓名"
                        hasFeedback>
                        {getFieldDecorator('contactName',{
                            rules:[{required:true,message:'请填写联系人姓名'}]
                        })(
                            <Input placeholder="请填写联系人姓名" />
                        )}
                    </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="联系人手机"
                    >
                    {getFieldDecorator('personPhone',{
                        rules:[
                            {required:true,message:'必填项不能为空'},
                            {validator: this.onPhoneRq}
                        ]
                    })(
                        <Input placeholder="请输入手机号" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="联系人邮箱"
                    >
                    {getFieldDecorator('personEmail',{
                        rules:[
                            {required:true,message:'必填项不能为空'},
                            {validator: this.onPhoneRq}
                        ]
                    })(
                        <Input placeholder="请输入邮箱" />
                    )}
                </Form.Item>
                <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol= {{ span: 12 }}
                    label="手机验证码"
                    >
                    {getFieldDecorator('verifyCode',{
                        rules:[
                            {required:true,message:'必填项不能为空'}
                        ]
                    })(
                        <div className="yzm-box">
                            <Row gutter={16}>
                                <Col span={10}><Input  placeholder="请输入验证码"/></Col>
                                <Col span={6}><Button  className="btnStore" onClick={this.onGetCode}>获取验证码</Button></Col>
                                <Col span={5}><a  className="reLogin" onClick={this.getRegistry}>返回登录</a></Col>
                            </Row>
                        </div>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">注册</Button>
                </Form.Item>
            </Form>
        </section>
      </div>
    );
    return (
      loggedIn ? (
        <Redirect to="/"/>
      ) : isRegistry ? RegistryForm : LoginForm
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
