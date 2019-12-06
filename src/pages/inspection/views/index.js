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
          path="/inspection"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/inspection/subTask"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './subTask/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/subTask/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './subTask/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/subTask/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './subTask/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/subTask/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Dssevice" */
              './subTask/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/inspection/comment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './comments/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/comment/new"
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