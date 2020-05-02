import React, { Component } from 'react';
import Main from './views/Main';
import List from './views/List';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Main /> */}
        <Router basename="/">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/statewise-details" component={List} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
