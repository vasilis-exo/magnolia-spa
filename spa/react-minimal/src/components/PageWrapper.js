import React from 'react';
import { Page } from 'react-magnolia';

const isInAuthor = window.self !== window.top && window.singlePageConfig;

class PageWrapper extends React.Component {
  state = {
    page: isInAuthor ? window.singlePageConfig.content : {}
  };

  getPage = () => {
    if (isInAuthor || this.state.pathname === window.location.pathname) return;

    const path = window.location.pathname.replace('/magnoliaAuthor', '');

    fetch('http://localhost:8080/magnoliaAuthor/.rest/pages' + path)
      .then(res => res.json())
      .then(json => this.setState({ page: json, pathname: window.location.pathname }));
  };

  componentDidMount() {
    this.getPage();
  }

  componentDidUpdate() {
    this.getPage();
  }

  render() {
    const { page } = this.state;

    return page ? <Page {...page} /> : null;
  }
}

export default PageWrapper;
