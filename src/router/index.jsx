import React, { lazy, Suspense } from 'react';
import {Layout} from "antd";
import { Route, Switch, Redirect } from 'react-router-dom';
import SiderBar from '../components/layout/SideBar.jsx'
import HeaderBar from '../components/layout/HeaderBar.jsx'
import Home from '../pages/home'
import PlanApproval from '../pages/approval'
import Acceptance from '../pages/acceptance'
import Alarm from '../pages/alarm'
import Authority from '../pages/authority'
import Bill from '../pages/bill'
import Device from '../pages/device'
import Contract from '../pages/contract'
import System from '../pages/system'
import Service from '../pages/service'
import ServiceProvider from '../pages/serviceProvider'
import User from '../pages/user'
import OnlineUsers from '../pages/user/online-users'
import DetailUser from '../pages/user/user-detail'
import Role from '../pages/role'
import Menu from '../pages/menu'
import Group from '../pages/group'
import PlanRoute from '../pages/inspection'
import Report from '../pages/report'
import Zipkin from '../pages/monitor/zipkin'
import Boot from '../pages/monitor/boot'
import Swagger from '../pages/monitor/swagger'
import Druid from '../pages/monitor/druid'
import Log from '../pages/monitor/log'
import Token from '../pages/monitor/token'
import Exception from '../pages/monitor/exception'
import Item from '../pages/inspectionItem'
import axios from 'axios';
class Index extends React.Component {
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  
  render() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const mainPage = (
      <Layout>
        <SiderBar></SiderBar>
        <Layout>
          <HeaderBar history={this.props.history}></HeaderBar>
          <div className="layout-content" style={{height:'100%'}}>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Switch>
              <Route exact path="/" component={Home}/>
              {/* <Route path="/user/list" component={ List }/>
                <Route path="/tool/rich" component={ Rich }/> */}
              <Route path="/cbd/service" component={Service}/>
              <Route path="/cbd/maintain/data" component={System}/>
              <Route path="/cbd/pro" component={Contract}/>
              <Route path="/cbd/inspection" component={PlanRoute}/>
              <Route path="/cbd/item" component={Item}/>
              <Route path="/cbd/examine" component={PlanApproval}/>
              <Route path="/cbd/bill" component={Bill}/>
              <Route path="/cbd/rdc" component={Device}/>
              <Route path="/cbd/alarm" component={Alarm}/>
              <Route path="/cbd/check" component={Acceptance}/>
              <Route path="/cbd/alliance" component={ServiceProvider}/>
              <Route path="/report" component={Report}/>


              <Route exact path="/uas/user/list" component={User}/>
              <Route path="/uas/user/list/online" component={OnlineUsers}/>
              <Route path="/uas/user/list/detail" component={DetailUser}/>
              <Route path="/uas/role/list" component={Role}/>
              <Route path="/uas/menu/list" component={Menu}/>
              <Route path="/uas/action/list" component={Authority}/>
              <Route path="/uas/group/list" component={Group}/>
              
            
              <Route path="/uas/monitor/zipkin" component={Zipkin}/>
              <Route path="/uas/monitor/boot" component={Boot}/>
              <Route path="/uas/monitor/swagger" component={Swagger}/>
              <Route path="/uas/monitor/druid" component={Druid}/>
              <Route path="/uas/monitor/log" component={Log}/>
              <Route path="/uas/monitor/token" component={Token}/>
              <Route path="/uas/monitor/exception" component={Exception}/>
            </Switch>
            {/* </Suspense> */}
          </div>
        </Layout>
      </Layout>
    );
    return (
      loggedIn ? (
        mainPage
      ) : (
        <Redirect to="/login"/>
      )
    );
  }
}

export default Index;