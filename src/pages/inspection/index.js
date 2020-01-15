import React, { Component, } from 'react';
import {Route} from 'react-router-dom';
import { Tabs } from 'antd';
import Inspection from './Inspection';
import InspectionItem from '../inspectionItem/inspectionItem'
import axios from 'axios'
import './index.styl'
const TabPane = Tabs.TabPane;

class InspectionData extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tabKey:"",
        role:window.localStorage.getItem('role'),
        partyA_show:'none',
        partyB_show:'none',
        partyC_show:'none',
    };
    this.onTabChange=this.onTabChange.bind(this);
    // this.getUserInfo=this.getUserInfo.bind(this)
  }
  componentDidMount(){
    this.props.history.replace({pathname:"/cbd/inspection/check",state:{tabKey:'check'}});
    if(this.state.role && this.state.role.includes("用户")){
      this.setState({
        partyA_show:'block',
        partyB_show:'none',
        partyC_show:'none',
      })
    }else if(this.state.role &&this.state.role.includes("服务商")){
      this.setState({
        partyA_show:'none',
        partyB_show:'block',
        partyC_show:'none',
      })
    }else if(this.state.role && this.state.role.includes("维修工"))
    {
      this.setState({
        partyA_show:'none',
        partyB_show:'none',
        partyC_show:'block',
      })
    }
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
        style={{display:this.state.partyA_show}}
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="负责人待审核"
            key="check"
            >
            <Route exact 
                path="/cbd/inspection/check" 
                component={Inspection} 
                />
            </TabPane>
            <TabPane 
            tab="服务商待接单"
            key="accept"
            >
            <Route exact 
                path="/cbd/inspection/accept" 
                component={Inspection} 
                />
            </TabPane>
            <TabPane 
            tab="巡检正在执行"
            key="execute"
            >
            <Route exact 
                path="/cbd/inspection/execute" 
                component={Inspection} 
                />
            </TabPane>
            <TabPane 
            tab="巡检等待确认"
            key="confirm"
            >  
               <Route exact 
                path="/cbd/inspection/confirm" 
                component={Inspection} 
                />                         
            </TabPane>
            <TabPane tab="巡检等待付款"
            key="pay"
            >  
               <Route exact 
                path="/cbd/inspection/pay" 
                component={Inspection} 
                />                         
            </TabPane>
            <TabPane tab="巡检等待评论"
            key="comment"
            >  
               <Route exact 
                path="/cbd/inspection/comment" 
                component={Inspection} 
                />                         
            </TabPane>
            <TabPane tab="本次巡检结束"
            key="finish"
            >  
               <Route exact 
                path="/cbd/inspection/finish" 
                component={Inspection} 
                />                         
            </TabPane>
            <TabPane tab="已被否决任务"
            key="deny"
            >  
               <Route exact 
                path="/cbd/inspection/deny" 
                component={Inspection} 
                />                         
            </TabPane>
      </Tabs>
      <Tabs 
        style={{display:this.state.partyB_show}}
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="服务商待接单"
            key="accept"
            >
            <Route exact 
                path="/cbd/inspection/accept" 
                component={Inspection} 
                />
            </TabPane>
            <TabPane 
            tab="待分配维修工"
            key="appoint"
            >
            <Route exact 
                path="/cbd/inspection/appoint" 
                component={Inspection} 
                />
            </TabPane>
            {/* <TabPane 
            tab="已分配维修工"
            key="alreadyAppoint"
            >
            <Route exact 
                path="/cbd/inspection/alreadyAppoint" 
                component={Inpection} 
                />
            </TabPane> */}
      </Tabs>
      <Tabs 
        style={{display:this.state.partyC_show}}
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="维修工待接单"
            key="waitForMaintainer"
            >
            <Route exact 
                path="/cbd/inspection/waitForMaintainer" 
                component={InspectionItem} 
                />
            </TabPane>
            <TabPane 
            tab="维修工已接单"
            key="maintainerAccept"
            >
            <Route exact 
                path="/cbd/inspection/maintainerAccept" 
                component={InspectionItem} 
                />
            </TabPane>
      </Tabs>
    </div>
      
    );
  }
}

export default InspectionData;