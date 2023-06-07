import React, {useEffect, useState} from 'react';
import config from '../magnolia.config';
import {getAPIBase, getLanguages} from './AppHelpers';
import {EditablePage, EditorContextHelper} from '@magnolia/react-editor';
import Navigation from "../components/Navigation";
function PageLoader(props) {
  const [pageLoaderProps, setPageLoaderProps] = useState({});
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;

  useEffect(() => {
    async function loadPage(pathname) {
      const config = {headers: {}};

      const props = {}
      props.nodeName = nodeName

      const magnoliaContext = EditorContextHelper.getMagnoliaContext(window.location.href, nodeName, getLanguages());
      props.magnoliaContext = magnoliaContext;

      // Check should fetch personalized content
      const isPersonalizationPage = sessionStorage.getItem(`personalized_${pathname.replace(/\//g, '_')}`);
      const ageHeader = sessionStorage.getItem('mgnlAgeHeader');
      if (isPersonalizationPage && ageHeader && !magnoliaContext.isMagnolia) {
        config.headers['X-Mgnl-Age'] = ageHeader;
      }

      const apiBase = getAPIBase();
      // Fetching page content
      const pagesRes = await fetch(apiBase + process.env.REACT_APP_MGNL_API_PAGES + magnoliaContext.nodePath + magnoliaContext.search, config);
      props.page = await pagesRes.json();

      // Fetching page navigation
      const pageNavRes = await fetch(apiBase + process.env.REACT_APP_MGNL_API_NAV + nodeName);
      props.pagenav = await pageNavRes.json();

      // Fetch template annotations only inside Magnolia WYSIWYG
      if (magnoliaContext.isMagnolia) {
        const templateAnnotationsRes = await fetch(apiBase + process.env.REACT_APP_MGNL_API_TEMPLATES + magnoliaContext.nodePath + magnoliaContext.search);
        props.templateAnnotations = await templateAnnotationsRes.json();
      }
      setPageLoaderProps(props)
    }

    loadPage(props.pathname);
  }, [nodeName, props.pathname]);

  return (
    <div className={pageLoaderProps.magnoliaContext?.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
      <header>
        {pageLoaderProps.pagenav && (
          <Navigation content={pageLoaderProps.pagenav}
                      nodeName={nodeName}
                      currentLanguage={pageLoaderProps.magnoliaContext.currentLanguage} />
        )}
      </header>
      <div className='container'>
        {pageLoaderProps.page && (
          <EditablePage templateAnnotations={pageLoaderProps.templateAnnotations || {}}
                        content={pageLoaderProps.page}
                        config={config}/>
        )}
      </div>
    </div>
  );
}

export default PageLoader;
