import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Home from './components/pages/Home';
import Article from './components/pages/Article';
import MenuBar from './components/menu/MenuBar';

function App() {
  return (
    <Router>
      <MenuBar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article/:id" component={Article} />
          <Route exact path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
