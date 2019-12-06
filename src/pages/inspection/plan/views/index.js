import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class PlanRoute extends Component{
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
          path="/inspection/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/inspection/plan/subTask"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './subTask/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/subTask/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './subTask/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/subTask/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './subTask/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/subTask/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './subTask/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/inspection/plan/comment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './comments/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/plan/comment/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './comments/Create/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default PlanRoute;