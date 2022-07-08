import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ShowUsers from './ShowUsers';
import FormUser from "./FormUser";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/user/:id' component={FormUser}/>
            <Route path='/' exact={true} component={ShowUsers}/>
          </Switch>
        </Router>
    )
  }
}

export default App;