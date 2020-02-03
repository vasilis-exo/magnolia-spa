import React from 'react';
import { NavLink } from 'react-router-dom';
import ENVIRONMENT from '../environment';

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
            const url = ENVIRONMENT.navUrl + ENVIRONMENT.appBase;
            console.log('NAV URL:' + url);
            const response = await fetch(url);
            const data = await response.json();
            let items = data['@nodes'].map(nodeName => {return data[nodeName]})
            setNavItems([data, ...items]);
        }

        if (navItems.length < 1) {
            fetchNav();
        }
    },[navItems]);

    
    return (navItems) ? (
        
        <nav className="Navigation">
            {
                navItems.map(item => {
                    return <NavLink activeClassName="active" key={item['@id']} to={`${removeAppBase(item['@path'])}.html`}>{item.navigationTitle || item.title || item['@name']}</NavLink>
                })
            }
        </nav>

    ) : (<div />);
}

export default Navigation;
