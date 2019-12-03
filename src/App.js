import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Main from './router';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/" component={ Main }/>
          <Redirect to="/"/>
        </Switch>
      </div>
    );
  }
}

export default App;
