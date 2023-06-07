import React, { useState, useEffect } from 'react';
import PageLoader from './helpers/PageLoader';
import './App.css';
import { events } from './helpers/AppHelpers';

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopstate() {
      setPathname(window.location.pathname);
    }

    events.on('popstate', handlePopstate);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      events.removeListener('popstate', handlePopstate);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <>
      <PageLoader pathname={pathname} />
      <footer>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        <br />
        Copyright © 2020
      </footer>
    </>
  );
}

export default App;
