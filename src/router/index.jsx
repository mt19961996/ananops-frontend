import React, { lazy, Suspense } from 'react';
import {Layout} from "antd";
import { Route, Switch, Redirect } from 'react-router-dom';
import SiderBar from '../components/layout/SideBar.jsx'
import HeaderBar from '../components/layout/HeaderBar.jsx'
import Home from '../pages/home'
import NotFind from '../pages/notFound'
import Connect from '../pages/user/connect'


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
                <Route exact path="/" component={ Home }/>
                <Route path="/user/connect" component={ Connect }/>
                {/* <Route path="/user/list" component={ List }/>
                <Route path="/tool/rich" component={ Rich }/> */}

                <Route component={ NotFind }/>
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