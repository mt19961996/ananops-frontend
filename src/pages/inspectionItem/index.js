import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin,Tabs } from 'antd';
import Loadable from 'react-loadable';
import imcItem from './inspectionItem'
const TabPane = Tabs.TabPane;

class Item extends Component{
  constructor(props){
    super(props);
    this.state = {
      tabKey:"",
      role:window.localStorage.getItem('role'),
      imcTaskId:null
  };
  this.onTabChange=this.onTabChange.bind(this);
  }
  componentDidMount(){
    const { 
      match : { params : { imcTaskId } }
    } = this.props
    this.setState({
      imcTaskId:imcTaskId
    })
    this.props.history.replace({pathname:"/cbd/item/" + "waitForMaintainer/" + imcTaskId,state:{tabKey:'waitForMaintainer'}});
    console.log(this.state.imcTaskId)
  }
  //tab栏每一个状态之间切换
  onTabChange=(key)=>{
    console.log(this.state.imcTaskId)
    this.setState({tabKey:key});
    this.props.history.replace({pathname:"/cbd/item/"+key + "/" + this.state.imcTaskId,state:{tabKey:key}});
    
  }
  render(){
    const Loading = () => {
      return (
        <div className="loading">
          <Spin size="large"></Spin>
        </div>
      );
    };
    return (
      <div className="plan-approval-list-page">
        
        <Tabs 
        activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''}
        onChange={this.onTabChange}>
            <TabPane 
            tab="待分配工程师"
            key="waitForMaintainer"
            >
            <Route exact 
                path="/cbd/item/waitForMaintainer/:imcTaskId" 
                component={imcItem} 
                />
            </TabPane>
            <TabPane 
            tab="工程师待接单"
            key="waitForAccept"
            >
            <Route exact 
                path="/cbd/item/waitForAccept/:imcTaskId" 
                component={imcItem} 
                />
            </TabPane>
            <TabPane 
            tab="子项正在执行"
            key="execute"
            >
            <Route exact 
                path="/cbd/item/execute/:imcTaskId" 
                component={imcItem} 
                />
            </TabPane>
            <TabPane 
            tab="子项执行结束"
            key="finish"
            >  
               <Route exact 
                path="/cbd/item/finish/:imcTaskId" 
                component={imcItem} 
                />                         
            </TabPane>
            <TabPane 
            tab="子项确认完毕"
            key="confirmed"
            >  
               <Route exact 
                path="/cbd/item/confirmed/:imcTaskId" 
                component={imcItem} 
                />                         
            </TabPane>
    </Tabs>
    </div>
    );
  }

}


export default Item;

