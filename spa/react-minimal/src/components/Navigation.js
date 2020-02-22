import React from 'react';
import { NavLink } from 'react-router-dom';
import {getAPIBase} from '../utils/AppHelpers';

//TODO - Is this still needed now that we use .env files?
function removeAppBase(path){
    const base = process.env.REACT_APP_MGNL_APP_BASE
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
            
            let API_BASE = getAPIBase();
            const url = API_BASE + process.env.REACT_APP_MGNL_API_NAV + process.env.REACT_APP_MGNL_APP_BASE;
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
