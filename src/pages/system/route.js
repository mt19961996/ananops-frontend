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
          path="/cbd/maintain/data"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />    
         <Route 
          exact   
          path="/cbd/maintain/data/billApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/cbd/maintain/data/serviceWait"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />  
          <Route 
          exact   
          path="/cbd/maintain/data/maintainerWait"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/cbd/maintain/data/planConfirm"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
          <Route 
          exact   
          path="/cbd/maintain/data/resultSubmit"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/cbd/maintain/data/orderApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/cbd/maintain/data/planApproval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/cbd/maintain/data/serviceConfirm"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/cbd/maintain/data/orderSubmit"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
        <Route 
          exact   
          path="/cbd/maintain/data/serviceFinish"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        /> 
         <Route 
          exact   
          path="/cbd/maintain/data/pay"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/cbd/maintain/data/comment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Test/index'),
            loading: Loading
          })}
        />  
        <Route 
          exact   
          path="/cbd/maintain/data/resultSubmit"
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
