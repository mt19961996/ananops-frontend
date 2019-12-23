import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class ManageRoute extends Component{
  constructor(props){
    super(props);
    this.state = {};
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
      <Switch>
        <Route 
          exact   
          path="/contract/management"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './management/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/management/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './management/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/management/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './management/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/management/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './management/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/project"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './project/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/project/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './project/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/project/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './project/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/project/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './project/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/inspection/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './inspection/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/inspection/new/:projectId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './inspection/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/inspection/edit/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './inspection/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/contract/inspection/detail/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './inspection/Detail/index'),
            loading: Loading
          })}
        />
       
      </Switch>
    );
  }

}


export default ManageRoute;
