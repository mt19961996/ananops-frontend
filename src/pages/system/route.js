import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class system extends Component{
  constructor(props){
    super(props);
    this.state = {
     
    };
 
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
          path="/system"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />    
         <Route 
          exact   
          path="/system/billApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/system/serviceWait"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />  
          <Route 
          exact   
          path="/system/maintainerWait"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/system/planConfirm"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
          <Route 
          exact   
          path="/system/resultSubmit"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/system/orderApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/system/planApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/system/serviceConfirm"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/system/orderSubmit"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/system/serviceFinish"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
         <Route 
          exact   
          path="/system/pay"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/system/comment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />  
        <Route 
          exact   
          path="/system/resultSubmit"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />     
      </Switch>
    );
  }

}


export default system;
