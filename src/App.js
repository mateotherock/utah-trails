import React, { Component } from 'react';
import './App.css';
// import './reset.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home.js';
import Profile from './Components/Profile/Profile.js';
import Trail from './Components/Trail/Trail.js';
import Search from './Components/Search/Search.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path = '/' component = { Home } />
            <Route path = '/profile' component = { Profile } />
            <Route path = '/trail/:name' component = { Trail } />
            <Route path = '/search' component = { Search } />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
