import React from 'react';
import { Page, Area } from '@magnolia/react-renderer';

import ENVIRONMENT from '../environment';

import config  from '../magnolia.config';

import {
  removeExtension
} from '../AppHelpers';

//const isInAuthor = false;//window.self !== window.top && window.singlePageConfig;

class PageWrapper extends React.Component {
  // state = {
  //   page: isInAuthor ? window.singlePageConfig.content : {}
  // };
  state = {};

  //debugger;

  
  
  async loadTemplateDefinitions(templateId) {
    console.log('templateId', templateId);
    
    //const templateEndpointUrl = `${ENVIRONMENT.templateDefinitionBase}/${templateId}`;
    //CLZ_ALERT
    const templateEndpointUrl = `http://localhost:8080/magnoliaAuthor/.rest/templateDefinition/v1/${templateId}`;


    // Loads the single page config
    const response = await fetch(templateEndpointUrl);
    const json = await response.json();

    console.log('Definition', json);

    this.setState({
        init: true,
        templateDefinitions: json
    });
  } 

   getPage = async () => {
    //if (isInAuthor || this.state.pathname === window.location.pathname) return;

    
    const path = window.location.pathname.replace('/magnoliaAuthor', '');
    console.log('path:' + path)

    // fetch('http://localhost:8080/magnoliaAuthor/.rest/pages' + path)
    //   .then(res => res.json())
    //   .then(json => this.setState({ page: json, pathname: window.location.pathname }));

    //debugger;

    //CLZ_ALERT
    const fullURL = 'http://localhost:8080/magnoliaAuthor/.rest/delivery/pages' + removeExtension(path);
      const response = await fetch(fullURL);

        const json = await response.json();

        //debugger;

        console.log('CONTENT===', json);

        this.setState({
            content: json
        }, () => this.loadTemplateDefinitions(json['mgnl:template']));

  };

  componentDidMount() {
    this.getPage();
    if (window.parent.mgnlRefresh !== undefined) {
      window.parent.mgnlRefresh();
  }
  }

  componentDidUpdate() {
    //this.getPage();
    if (window.parent.mgnlRefresh !== undefined) {
      window.parent.mgnlRefresh();
  }
  }


  render() {
    //const { page } = this.state;
    const page = this.state;
    
    
    if (page.init){

      const pageId = page.content['mgnl:template'];
      const template = config[pageId];

      return (
      <Page templateDefinitions={page.templateDefinitions} content={page.content} componentMappings={config} >
        
        {template ? React.createElement(template, page.content) : null}
      </Page> 
      )

    }else{
      return <p>NO PAGE.</p>
    }
  }
}

export default PageWrapper;
