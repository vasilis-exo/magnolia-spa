import React from 'react';
import config  from '../magnolia.config';
import {removeExtension, inAuthor, onMagnolia, getAPIBase} from './AppHelpers';
// import MgnlPage from '../helpers/MgnlPage';

import {Page} from '@magnolia/react-editor';

class PageLoader extends React.Component {

  state = {};

  getPagePath = () => {
    let path = window.location.pathname;
    path = path.replace(process.env.REACT_APP_MGNL_BASE_AUTHOR, '');
    path = path.replace(process.env.REACT_APP_MGNL_BASE_PUBLIC, '');

    if (!onMagnolia()){
      path = process.env.REACT_APP_MGNL_APP_BASE + path
    }

    path = removeExtension(path);
    return path;
  };

  loadPage = async () => {
    // Bail out if already loaded content.
    if (this.state.pathname === window.location.pathname) return;

    const apiBase = getAPIBase();

    const pagePath = this.getPagePath();
    console.log('pagePath:' + pagePath);
    let fullContentPath = apiBase + process.env.REACT_APP_MGNL_API_PAGES + pagePath;

    const pageResponse = await fetch(fullContentPath);
    const pageJson = await pageResponse.json();
    console.log('page content: ', pageJson);
  
    const templateId = pageJson['mgnl:template'];
    console.log('templateId:', templateId);

    let templateJson = null;
    if (inAuthor()) {
      const templateResponse = await fetch(apiBase + process.env.REACT_APP_MGNL_API_TEMPLATES + '/' + templateId);
      templateJson = await templateResponse.json();
      console.log('definition:', templateJson);
    }

    this.setState({
      init: true,
      content: pageJson,
      templateDefinitions: templateJson,
      pathname: window.location.pathname
    });

  };

  componentDidMount() {
    this.loadPage();
    if (inAuthor() && window.parent.mgnlRefresh) {
      window.parent.mgnlRefresh();
    }
  }

  componentDidUpdate() {
    this.loadPage();
    if (inAuthor()  && window.parent.mgnlRefresh) {
      window.parent.mgnlRefresh();
    }
  }


  render() {
    if (this.state.init){
      console.log('config:', config);
      //const isDevMode = process.env.NODE_ENV === 'development';
      console.log("n:" + process.env.NODE_ENV)

      return (
      <Page templateDefinitions={this.state.templateDefinitions || {}} content={this.state.content} componentMappings={config} >
      </Page> 
      )

    }else{
      return <p>NO PAGE.</p>
    }
  }
}

export default PageLoader;
