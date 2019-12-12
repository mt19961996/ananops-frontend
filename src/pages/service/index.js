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
          path="/service/data"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Index/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/service/data/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Create/index'),
            loading: Loading
          })}
        />
           <Route 
          exact   
          path="/service/data/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Create/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/service/data/process/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Process/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/service/data/progress/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Progress/index'),
            loading: Loading
          })}
        />
          <Route 
          exact   
          path="/service/data/sub/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Sub/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/service/data/fault/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './data/Fault/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/service/system"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './system/Index/index'),
            loading: Loading
          })}
        />
       
      </Switch>
    );
  }

}


export default Service;

