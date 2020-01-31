import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import PageLoader from './components/PageLoader';
import Navigation from './components/Navigation';
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
    <>

    <BrowserRouter basename={base} forceRefresh={false}>
      
      <header>
        <Navigation />
      </header>  
      
      <div className="container">
        <Switch>
          <Route path="/:slug" component={PageLoader} />
        </Switch>
      </div>

      <footer>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        <br />
        Copyright © 2020
      </footer>
    </BrowserRouter>
    </>
  );
}

export default App;
