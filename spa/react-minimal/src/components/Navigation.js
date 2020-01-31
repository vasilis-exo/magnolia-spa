import React from 'react';
import { NavLink } from 'react-router-dom';
import {removeExtension } from '../AppHelpers';
import ENVIRONMENT from '../environment';

function getRootPath(path) {
    const paths = removeExtension(path).split('/');
    if (paths.length < 2) {
        return path;
    }
    return `/${paths[1]}`;
}

function removeAppBase(path){
    const base = ENVIRONMENT.appBase;
    if (base !== ''){
        if (base === path.substring(0, base.length)){
            return path.substring(base.length);
        }
    }
    return path;
}


function Navigation() {
    const [navItems, setNavItems] = React.useState([]);

    React.useEffect(() => {

        async function fetchNav() {
            const url = ENVIRONMENT.navUrl + getRootPath(ENVIRONMENT.appBase);
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
      <NavLink activeClassName="active" key='home' to={`${removeAppBase(navItems['@path'])}.html`}>{navItems.navigationTitle || navItems.title || navItems['@name']} </NavLink>
          {
              navItems['@nodes'].map(nodeName => {
                  const item = navItems[nodeName];
                  return <NavLink activeClassName="active" key={item['@id']} to={`${removeAppBase(item['@path'])}.html`}>{item.navigationTitle || item.title || item['@name']}</NavLink>
              })
          }
      </nav>

    ) : (<div />);
}

export default Navigation;
