import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import PageLoader from './components/PageLoader';
import Navigation from './components/Navigation';
import './App.css';
import { inAuthor } from './AppHelpers';


function App() {

  console.log('App');

  let base = '';
  if (inAuthor()) {
    base = process.env.REACT_APP_MGNL_BASE + process.env.REACT_APP_MGNL_APP_BASE;
 
  }

  return (
    <BrowserRouter basename={base} forceRefresh={false}>
      
      <header>
        <Navigation />
      </header>  
      
      <div className="container">
        <Switch>
          <Route path="/" component={PageLoader} />
        </Switch>
      </div>

      <footer>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        <br />
        Copyright © 2020
      </footer>
    </BrowserRouter>
  );
}

export default App;
