import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/Navigation';
import './App.css';
import { onMagnolia } from './helpers/AppHelpers';

function App() {
  let base = '';

  if (onMagnolia()) {
    if (Boolean(process.env.REACT_APP_MGNL_IS_PREVIEW)) {
      base = process.env.REACT_APP_MGNL_BASE_AUTHOR + process.env.REACT_APP_MGNL_APP_BASE;
    } else {
      base = process.env.REACT_APP_MGNL_BASE_PUBLIC + process.env.REACT_APP_MGNL_APP_BASE;
    }
  }

  return (
    <BrowserRouter basename={base} forceRefresh={true}>
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
