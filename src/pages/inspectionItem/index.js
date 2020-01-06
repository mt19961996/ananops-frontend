import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class Item extends Component{
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
          path="/cbd/item/log/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Log/index'),
            loading: Loading
          })}
        />
        <Route 
          exact   
          path="/cbd/item/sub/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Sub/index'),
            loading: Loading
          })}
        />
         <Route 
          exact   
          path="/cbd/item/detail/:id"
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


export default Item;

