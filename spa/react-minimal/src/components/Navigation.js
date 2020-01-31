import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
// import { getRootPath } from '../AppHelpers';
import {removeExtension } from '../AppHelpers';

import ENVIRONMENT from '../environment';


function getRootPath(path) {
    const paths = removeExtension(path).split('/');
    if (paths.length < 2) {
        return path;
    }
    return `/${paths[1]}`;
}

function Navigation() {
    const [navItems, setNavItems] = React.useState([]);

    React.useEffect(() => {

        async function fetchNav() {
            const url = ENVIRONMENT.navUrl + getRootPath(ENVIRONMENT.pathBase);
            console.log('NAV URL:' + url);
            const response = await fetch(url);
            const navData = await response.json();
            setNavItems(navData);
        }

        if (navItems.length < 1) {
            fetchNav();
        }
    },[navItems]);

    
    return (navItems['@nodes']) ? (

      <nav className="">
      <NavLink activeClassName="active" key='home' to={`${navItems['@path']}.html`}>{navItems.navigationTitle || navItems['@name']} </NavLink>
          {
              navItems['@nodes'].map(nodeName => {
                  const item = navItems[nodeName];
                  return <NavLink activeClassName="active" key={item['@id']} to={`${item['@path']}.html`}>{item.navigationTitle || item['@name']}</NavLink>
              })
          }
      </nav>

    ) : (<div />);

}
export default memo(Navigation, true);
//export default Navigation;
