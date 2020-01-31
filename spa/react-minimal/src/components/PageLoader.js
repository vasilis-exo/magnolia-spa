import React from 'react';
import {Page} from '@magnolia/react-renderer';
import ENVIRONMENT from '../environment';
import config  from '../magnolia.config';
import {removeExtension, inAuthor } from '../AppHelpers';


class PageLoader extends React.Component {

  state = {};

  getPagePath = () => {
    let path = window.location.pathname.replace(ENVIRONMENT.magnoliaBase, '');
    path = removeExtension(path);
    return path;
  };

  loadPage = async () => {
    if (this.state.pathname === window.location.pathname) return;

    const pagePath = this.getPagePath();
    console.log('pagePath:' + pagePath);

    let fullContentPath;
    if (!inAuthor()){
      fullContentPath = ENVIRONMENT.contentUrl + pagePath;
    }else{
      fullContentPath = ENVIRONMENT.contentUrl + ENVIRONMENT.appBase + pagePath
    }
    const pageResponse = await fetch(fullContentPath);
    const pageJson = await pageResponse.json();
    console.log('page content: ', pageJson);
  
    const templateId = pageJson['mgnl:template'];
    console.log('templateId:', templateId);

    let templateJson = null;
    if (inAuthor()) {
      const templateResponse = await fetch(ENVIRONMENT.templateDefinitionUrl + '/' + templateId);
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
    if (inAuthor()) {
      window.parent.mgnlRefresh();
    }
  }

  componentDidUpdate() {
    this.loadPage();
    if (inAuthor()) {
      window.parent.mgnlRefresh();
    }
  }


  render() {
    console.log('PageLoader Render');

    if (this.state.init){

      const templateId = this.state.content['mgnl:template'];
      const template = config[templateId];

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

export default PageLoader;
