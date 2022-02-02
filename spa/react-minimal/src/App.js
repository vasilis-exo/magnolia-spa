import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/Navigation';
import './App.css';
import { getRouterBasename } from './helpers/AppHelpers';

function App() {
  return (
    <BrowserRouter basename={getRouterBasename()}>
      <header>
        <Navigation />
      </header>

      <div className='container'>
        <Routes>
          <Route path='/' element={<PageLoader />} />
          <Route path='/:pathname' element={<PageLoader />} />
        </Routes>
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
