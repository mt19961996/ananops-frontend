import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class imcTaskInfo extends Component{
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
          path="/cbd/imcTaskInfo/log/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Log/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/cbd/imcTaskInfo/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Detail/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default imcTaskInfo;

