import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class Service extends Component{
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
          path="/cbd/check"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Index/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Create/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Create/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/log/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Process/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/progress/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Progress/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/sub/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Sub/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/sub/new/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/SubNew/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/spare/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Fault/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/sublog/:id/:subId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/SubLog/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/subplan/:id/:subId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/SubPlan/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/plan/new/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/SubPlan/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/check/plan/new/:id/:subId"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/SubPlanNew/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default Service;

