import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class contractRoute extends Component{
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
    return(
      <Switch>
        <Route 
          exact   
          path="/contract/project"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './project/Index/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/project/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './project/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/project/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './project/Create/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/management"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './management/Index/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/management/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './management/Detail/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/contract/management/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './management/Create/index'),
            loading: Loading
          })}
        />
      </Switch>
    )
  }
}
export default contractRoute