import React, { Component, } from 'react';
import {Route} from 'react-router-dom';
import { Tabs } from 'antd';
import Examine from './Examine';
import Check from './Check';
import Maintain from './Maintain';
import Comment from './Comment';
import Approval from './Approval'
import Pay from './Pay'
import All from './All';
import axios from 'axios'
import './index.styl'
const TabPane = Tabs.TabPane;

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabKey:""
    };
    this.onTabChange=this.onTabChange.bind(this);
    this.getUserInfo=this.getUserInfo.bind(this)
  }
  componentDidMount(){
      this.getUserInfo()
  }
  onTabChange=(key)=>{

    this.setState({tabKey:key});
    this.props.history.replace({pathname:"/system/"+key,state:{tabKey:key}});
    
  }
  getUserInfo(){
    const username=window.localStorage.getItem('loginName')
    const token=window.localStorage.getItem('token')
    axios({
      method: 'POST',
      url: '/uac/user/queryUserInfo/'+username,
      headers: {
        'deviceId': this.deviceId,
        'Authorization':'Bearer '+token,
      },
    })
  .then((res) => {
      if(res && res.status === 200){
      console.log(res.data.result.roles[0].roleName)
      var role=res.data.result.roles?res.data.result.roles[0].roleName:null
      window.localStorage.setItem('role',role)
      console.log(role)
      window.localStorage.setItem('id',res.data.result.id)
      }
  })
  .catch(function (error) {
      console.log(error);
  });
  }
  getRole=(role)=>{
      console.log(role)
    if(role==='用户负责人'){
        return(
            <Tabs  
            activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
            onChange={this.onTabChange}>
                <TabPane 
                tab="全部"
                key=""
                >
                <Route exact 
                    path="/system" 
                    component={All} 
                    />
                </TabPane>
                <TabPane 
                tab="待审核"
                key="2"
                >
                <Route exact 
                    path="/system/approval" 
                    component={Approval} 
                    />
                </TabPane>
                <TabPane tab="待支付"
                key="3"
                >  
                   <Route exact 
                    path="/system/Pay" 
                    component={Pay} 
                    />                        
                </TabPane>
        </Tabs>
        )
    }
    else if(role=='维修工程师'){
        return(
            <Tabs 
            activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
            onChange={this.onTabChange}>
                <TabPane 
                tab="全部"
                key=""
                >
                <Route exact 
                    path="/system" 
                    component={All} 
                    />
                </TabPane>
                <TabPane 
                tab="待接单"
                key="2"
                >
                <Route exact 
                    path="/system/check" 
                    component={Check} 
                    />
                </TabPane>
                <TabPane tab="维修中"
                key="3"
                >  
                   <Route exact 
                    path="/system/maintain" 
                    component={Maintain} 
                    />                         
                </TabPane>
        </Tabs>
        )
    }
    else if(role=='用户值机员'){
        return(
            <Tabs
            activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
            onChange={this.onTabChange}>
                 <TabPane 
                tab="全部"
                key=""
                >
                  <Route exact 
                    path="/system" 
                    component={All} 
                    />
                </TabPane>
                <TabPane tab="待确认"
                key="check"
                >  
                    <Route exact 
                    path="/system/check" 
                    component={Check} 
                    />                                          
                </TabPane>
                <TabPane 
                tab="维修中"
                key="maintain"
                >
                   <Route exact 
                    path="/system/maintain" 
                    component={Maintain} 
                    />
                </TabPane>
                <TabPane 
                tab="待验收"
                key="examine"
                >
                   <Route exact 
                    path="/system/examine" 
                    component={Examine} 
                    />
                </TabPane>
                <TabPane 
                tab="待评价"
                key="comment"
                >
                    <Route exact 
                    path="/system/comment" 
                    component={Comment} 
                    />
                </TabPane>
        </Tabs>
        )
    }
    else if(role=='服务商负责人'){
        return(
            <Tabs
            activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
            onChange={this.onTabChange}>
                 <TabPane 
                tab="全部"
                key=""
                >
                  <Route exact 
                    path="/system" 
                    component={All} 
                    />
                </TabPane>
                <TabPane 
                tab="待接单"
                key="check"
                >
                   <Route exact 
                    path="/system/check" 
                    component={Check} 
                    />
                </TabPane>
                <TabPane 
                tab="待审核"
                key="approval"
                >
                    <Route exact 
                    path="/system/approval" 
                    component={Approval} 
                    />
                </TabPane>
        </Tabs>
        )
    }
    else{
        return(
            <Tabs
            activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
            onChange={this.onTabChange}>
                <TabPane 
                tab="全部订单"
                key=""
                >
                    <Route exact 
                    path="/system" 
                    component={All} 
                    />
                </TabPane>
        </Tabs>
        )
    }
  }
  render() {
    const role=window.localStorage.getItem('role')
    return (    
      <div className="plan-approval-list-page">
          {this.getRole(role)}
        
      </div>
      
    );
  }
}

export default Data;