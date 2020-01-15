import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PageWrapper from './components/PageWrapper';
import './App.css';

function App() {
  return (
    <Router basename="/magnoliaAuthor">
      <header>
        <nav>
          <Link to="/spa-lm">Home</Link>
          <Link to="/spa-lm/contact">Contact</Link>
        </nav>
      </header>
      <div className="container">
        <Switch>
          <Route path="/spa-lm/contact">
            <PageWrapper />
          </Route>
          <Route path="/spa-lm">
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
