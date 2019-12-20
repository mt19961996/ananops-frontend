import React from 'react';
import { Form, Icon, Input, Button, message,Col } from 'antd';
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
    this.getImage=this.getImage.bind(this)
  }
  componentDidMount(){
    this.getImage();
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values);
      }
    });
  };


  

  login =(values)=> {
    let loginName =values.username;
    let loginPwd = values.password;

  
    let captchaCode=values.captchaCode;
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
    var deviceId=new Date().getTime()
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const loggedIn = window.localStorage.getItem('loggedIn');
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
                rules: [{ required: true, message: '请输入用户名!' }],
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
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <div>
                  <Col span={2}>
                    <Input placeholder="输入验证码"/>
                  </Col>
              
                  <img src={this.state.imageCode} onClick={this.getImage}/>
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
    return (
      loggedIn ? (
        <Redirect to="/"/>
      ) : LoginForm
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
