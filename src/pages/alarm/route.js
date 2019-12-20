import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class Alarm extends Component{
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
          path="/alarm/all"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './All/index'),
            loading: Loading
          })}
        />    
         <Route 
          exact   
          path="/alarm/check"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Check/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/alarm/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Approval/index'),
            loading: Loading
          })}
        />  
          <Route 
          exact   
          path="/alarm/examine"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Examine/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/alarm/maintain"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Maintain/index'),
            loading: Loading
          })}
        /> 
         <Route 
          exact   
          path="/alarm/pay"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Pay/index'),
            loading: Loading
          })}
        />   
         <Route 
          exact   
          path="/alarm/comment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Comment/index'),
            loading: Loading
          })}
        />  
        <Route 
          exact   
          path="/alarm/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Check/Create/index'),
            loading: Loading
          })}
        />     
      </Switch>
    );
  }

}


export default Alarm;
