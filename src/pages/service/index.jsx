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
          path="/service/my"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './my/index.jsx'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/service/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './new/index.jsx'),
            loading: Loading
          })}
        />
       
      </Switch>
    );
  }

}


export default Service;

