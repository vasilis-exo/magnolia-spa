import React from 'react';
import {Page} from '@magnolia/react-renderer';

import ENVIRONMENT from '../environment';

import config  from '../magnolia.config';

import {
  removeExtension
} from '../AppHelpers';

class PageWrapper extends React.Component {

  state = {};

  inAuthor = () => (window.parent.mgnlRefresh !== undefined)

  getPagePath = () => {
    let path = window.location.pathname.replace(ENVIRONMENT.serverPath, '');
    path = removeExtension(path);
    return path;
  };

  loadPage = async () => {
    if (this.state.pathname === window.location.pathname) return;

    const pagePath = this.getPagePath();
    console.log('pagePath:' + pagePath);
    this.loadedPath = window.location.pathname;

    const pageResponse = await fetch(ENVIRONMENT.restUrlBase + pagePath);
    const pageJson = await pageResponse.json();
    console.log('page content: ', pageJson);
  
    const templateId = pageJson['mgnl:template'];
    console.log('templateId:', templateId);

    let templateJson = null;
    if (this.inAuthor()) {
      const templateResponse = await fetch(ENVIRONMENT.templateDefinitionBase + '/' + templateId);
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
    if (this.inAuthor()) {
      window.parent.mgnlRefresh();
    }
  }

  componentDidUpdate() {
    this.loadPage();
    if (this.inAuthor()) {
      window.parent.mgnlRefresh();
    }
  }


  render() {
    console.log('RENDER');

    if (this.state.init){

      const templateId = this.state.content['mgnl:template'];
      const template = config[templateId];
      //const element = ;

      return (
      <Page templateDefinitions={this.state.templateDefinitions} content={this.state.content} componentMappings={config} >
        {template ? React.createElement(template, this.state.content) : <p>-</p>}
      </Page> 
      )

    }else{
      return <p>NO PAGE.</p>
    }
  }
}

export default PageWrapper;
