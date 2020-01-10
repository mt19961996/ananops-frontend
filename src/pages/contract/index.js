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
          path="/cbd/pro/contract"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './management/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/contract/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './management/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/contract/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './management/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/contract/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './management/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/pro/project"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './project/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/project/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './project/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/project/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './project/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/project/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './project/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/pro/inspection/:projectId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './inspection/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/inspection/new/:projectId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './inspection/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/inspection/edit/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './inspection/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/cbd/pro/inspection/detail/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './inspection/Detail/index'),
            loading: Loading
          })}
        />
        />
        <Route
          exact
          path="/cbd/pro/sub/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './sub/Index/index'),
            loading: Loading
          })}
        />
         <Route
          exact
          path="/cbd/pro/sub/new/:projectId/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './sub/Create/index'),
            loading: Loading
          })}
        />
         <Route
          exact
          path="/cbd/pro/sub/edit/:projectId/:id/:subId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './sub/Create/index'),
            loading: Loading
          })}
        />
         <Route
          exact
          path="/cbd/pro/sub/detail/:projectId/:id/:subId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './sub/Detail/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default ManageRoute;
