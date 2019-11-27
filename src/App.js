import React, { Component, } from 'react';
import Login from './pages/login';
import PrimaryLayout from './pages/primiaryLayout';
import { Router, Route, } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.styl';

class App extends Component {
 
  render(){
    const history = createBrowserHistory()
    return (
      <Router history={history}>
        {/* 登录页面 */}
        <Route path="/login" component={Login} />
        {/* 使用路由的钩子函数 */}
        <Route exact path="/" component={PrimaryLayout}/>
      </Router>
    );
  }
}

export default App;
