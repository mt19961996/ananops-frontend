import React, { lazy, Suspense } from 'react';
import {Layout} from "antd";
import { Route, Switch, Redirect } from 'react-router-dom';
import SiderBar from '../components/layout/SideBar.jsx'
import HeaderBar from '../components/layout/HeaderBar.jsx'
import Home from '../pages/home'
import NotFind from '../pages/notFound'
import PlanApproval from '../pages/approval'
import Acceptance from '../pages/acceptance'
import Alarm from '../pages/alarm'
import Authority from '../pages/authority'
import Bill from '../pages/bill'
import Contract from '../pages/contract'
import Service from '../pages/service'
import ServiceProvider from '../pages/serviceProvider'
import User from '../pages/user'
import PlanRoute from '../pages/inspection/plan'

class Index extends React.Component {

  render() {
    const loggedIn = window.localStorage.getItem('loggedIn');
    const mainPage = (
      <Layout>
        <SiderBar></SiderBar>
        <Layout>
          <HeaderBar history={this.props.history}></HeaderBar>
          <div className="layout-content">
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            <Switch>
              <Route exact path="/" component={Home}/>
              {/* <Route path="/user/list" component={ List }/>
                <Route path="/tool/rich" component={ Rich }/> */}
              <Route path="/service" component={Service}/>
              <Route path="/contract" component={Contract}/>
              <Route path="/inspection/plan" component={PlanRoute}/>
              <Route path="/approval" component={PlanApproval}/>
              <Route path="/bill" component={Bill}/>
              <Route path="/user" component={User}/>
              <Route path="/authority" component={Authority}/>
              <Route path="/alarm" component={Alarm}/>
              <Route path="/acceptance" component={Acceptance}/>
              <Route path="/serviceProvider" component={ServiceProvider}/>
              <Route path="/404" component={NotFind}/>
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