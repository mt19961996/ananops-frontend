import React, { Component, } from 'react';
import {Route} from 'react-router-dom';
import { Tabs } from 'antd';
import Inpection from './Inspection';
import axios from 'axios'
import './index.styl'
const TabPane = Tabs.TabPane;

class InspectionData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabKey:"",
        role:window.localStorage.getItem('role'),
    };
    this.onTabChange=this.onTabChange.bind(this);
    // this.getUserInfo=this.getUserInfo.bind(this)
  }
  componentDidMount(){
    //   this.getUserInfo()
  }

  //tab栏每一个状态之间切换
  onTabChange=(key)=>{

    this.setState({tabKey:key});
    this.props.history.replace({pathname:"/cbd/inspection/"+key,state:{tabKey:key}});
    
  }
  render() {
    console.log('123')
    return (    
      <div className="plan-approval-list-page">
        <Tabs 
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="负责人待审核"
            key="check"
            >
            <Route exact 
                path="/cbd/inspection/check" 
                component={Inpection} 
                />
            </TabPane>
            <TabPane 
            tab="服务商待接单"
            key="accept"
            >
            <Route exact 
                path="/cbd/inspection/accept" 
                component={Inpection} 
                />
            </TabPane>
            <TabPane 
            tab="巡检正在执行"
            key="execute"
            >
            <Route exact 
                path="/cbd/inspection/execute" 
                component={Inpection} 
                />
            </TabPane>
            <TabPane 
            tab="巡检等待确认"
            key="confirm"
            >  
               <Route exact 
                path="/cbd/inspection/confirm" 
                component={Inpection} 
                />                         
            </TabPane>
            <TabPane tab="巡检等待付款"
            key="pay"
            >  
               <Route exact 
                path="/cbd/inspection/pay" 
                component={Inpection} 
                />                         
            </TabPane>
            <TabPane tab="巡检等待评论"
            key="comment"
            >  
               <Route exact 
                path="/cbd/inspection/comment" 
                component={Inpection} 
                />                         
            </TabPane>
            <TabPane tab="本次巡检结束"
            key="finish"
            >  
               <Route exact 
                path="/cbd/inspection/finish" 
                component={Inpection} 
                />                         
            </TabPane>
    </Tabs>
      </div>
      
    );
  }
}

export default InspectionData;