import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class serviceProviderRoute extends Component{
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
                    path="/serviceProvider/provider"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/Index/index'),
                        loading: Loading
                    })}
                 />
                  <Route 
                    exact   
                    path="/serviceProvider/provider/detail/:id"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/Detail/index'),
                        loading: Loading
                    })}
                 />
                   <Route 
                    exact   
                    path="/serviceProvider/provider/new"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/Create/index'),
                        loading: Loading
                    })}
                 />
                  <Route 
                    exact   
                    path="/serviceProvider/provider/edit/:id"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/Create/index'),
                        loading: Loading
                    })}
                 />
                 <Route 
                    exact   
                    path="/cbd/alliance/engineer"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/index'),
                        loading: Loading
                    })}
                 />
                  <Route 
                    exact   
                    path="/cbd/alliance/engineer/new"
                    component={Loadable({
                        loader: () => import(
                        /* webpackChunkName: "EntranceWork" */
                        './engineer/new'),
                        loading: Loading
                    })}
                 />
                 
            </Switch>
          )
    }
}
export default serviceProviderRoute