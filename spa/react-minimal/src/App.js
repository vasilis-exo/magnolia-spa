import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import './App.css';

import ENVIRONMENT from './environment';


function App() {
//    <Router basename="/magnoliaAuthor">

  console.log('App');
  
  let base = '';
  if (window.parent.mgnlRefresh !== undefined) {
    base = ENVIRONMENT.serverPath;
  }

  return (
    
    <Router basename={base}>
      <header>
        <nav>
          <Link to="/react-sample">Home</Link>
          <Link to="/react-sample/contact">Contact</Link>
        </nav>
      </header>
      <div className="container">

        <Switch>
          <Route path="/react-sample/contact">
            <PageWrapper />
          </Route>
          <Route path="/react-sample">
            <PageWrapper />
          </Route>
          <Route path="/">
            <PageWrapper />
          </Route>
        </Switch>

      </div>
      <footer>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        <br />
        Copyright © 2019
      </footer>
    </Router>
  );
}

export default App;
