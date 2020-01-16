import React from 'react';
import { Layout, Menu, Dropdown, Icon, Breadcrumb,Modal } from 'antd';
// import customUrl from '../../images/custom.jpeg';
import { connect } from 'react-redux';
const { Header } = Layout;
const loginName=window.localStorage.getItem('loginName')

class UserInfo extends React.Component {
  state = {
    visible: false,   // 菜单是否显示
    isShowChangePwd:false
  };

  handleLogout = e => {
    if (e.key === 'outLogin') {
      this.setState({
        visible: false
      });
      //window.localStorage.removeItem('loggedIn');
      window.localStorage.clear();
      this.props.history.push('/login');
    }
  };

  handleUserInfo = () => {

  }

  handleChangePwd = () => {

  }

  isShowChangePwd = () => {
    this.setState({isShowChangePwd:true})
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const {isShowChangePwd} = this.state
    const menu = (
      <Menu>
        {/* <Menu.Item key="userInfo" onClick={this.handleUserInfo}>个人信息</Menu.Item>
        <Menu.Item key="changePwd" onClick={this.isShowChangePwd}>修改密码</Menu.Item> */}
        <Menu.Item key="outLogin" onClick={this.handleLogout}>退出登录</Menu.Item>
      </Menu>
    );
    const changePwd = (
      <Modal
        title="修改密码"
        visible={isShowChangePwd}
        onOk={this.handleChangePwd}
        onCancel={() => {this.setState({isShowChangePwd:false});this.form.resetFields();}}
        okText="确认"
        cancelText="取消"
      >
        
      </Modal>
    )
    return (
      <Dropdown overlay={menu} onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
        <div className="ant-dropdown-link">
          {loginName}
          <Icon type="caret-down" />
        </div>
      </Dropdown>
    );
  }
}

const HeaderBar = (props) => {
  return (
    <Header>
      <Breadcrumb>
        {
          props.menuName.map((item) => {
            return (
              <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            );
          })
        }
      </Breadcrumb>
      <UserInfo history={props.history}/>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    menuName: state.menuName
  }
};

export default connect(mapStateToProps)(HeaderBar);