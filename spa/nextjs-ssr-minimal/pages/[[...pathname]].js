import { EditablePage } from '@magnolia/react-editor';
import Navigation from '../templates/components/Navigation';
import Basic from '../templates/pages/Basic';
import Contact from '../templates/pages/Contact';
import Headline from '../templates/components/Headline';
import Image from '../templates/components/Image';
import Paragraph from '../templates/components/Paragraph';
import Expander from '../templates/components/Expander';
import List from '../templates/components/List';
import Item from '../templates/components/Item';
import { languages, getCurrentLanguage, setURLSearchParams } from '../utils';

const nodeName = '/nextjs-ssr-minimal';
const config = {
  componentMappings: {
    'nextjs-ssr-minimal-lm:pages/basic': Basic,
    'nextjs-ssr-minimal-lm:pages/contact': Contact,

    'spa-lm:components/headline': Headline,
    'spa-lm:components/image': Image,
    'spa-lm:components/paragraph': Paragraph,
    'spa-lm:components/expander': Expander,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': Item,
  },
};

// Use different defaultBaseUrl to point to public instances
const defaultBaseUrl = 'http://localhost:8080/magnoliaAuthor';
const pagesApi = defaultBaseUrl + '/.rest/delivery/pages/v1';
const templateAnnotationsApi = defaultBaseUrl + '/.rest/template-annotations/v1';
const pagenavApi = defaultBaseUrl + '/.rest/delivery/pagenav/v1';

//
// TO BE USED ONCE THE P13N WITH NEW SPA IS RELEASED
//
// Fetch all variants inside Magnolia WYSIWYG in edit mode
// function p13n(pagePath, mgnlPreview) {
//   let newPagePath = pagePath;

//   if (mgnlPreview === 'false') {
//     newPagePath += newPagePath.indexOf('?') > -1 ? '&' : '?';
//     newPagePath += 'variants=all';
//   }

//   return newPagePath;
// }

export async function getServerSideProps(context) {
  const resolvedUrl = context.resolvedUrl;
  const currentLanguage = getCurrentLanguage(resolvedUrl);
  const isDefaultLanguage = currentLanguage === languages[0];
  const isPagesApp = context.query?.mgnlPreview || null;
  let props = {
    isPagesApp,
    isPagesAppEdit: isPagesApp === 'false',
    basename: isDefaultLanguage ? '' : '/' + currentLanguage,
  };

  global.mgnlInPageEditor = props.isPagesAppEdit;

  // Find out page path to fetch from Magnolia
  let pagePath = nodeName + context.resolvedUrl.replace(new RegExp('.*' + nodeName), '');

  if (!isDefaultLanguage) {
    pagePath = pagePath.replace('/' + currentLanguage, '');
  }

  // Fetching page content
  const pagesRes = await fetch(setURLSearchParams(pagesApi + pagePath, 'lang=' + currentLanguage));
  props.page = await pagesRes.json();

  // Fetching page navigation
  const pagenavRes = await fetch(setURLSearchParams(pagenavApi + nodeName, 'lang=' + currentLanguage));
  props.pagenav = await pagenavRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (isPagesApp) {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    props.templateAnnotations = await templateAnnotationsRes.json();
  }

  return {
    props,
  };
}

export default function Pathname(props) {
  const { page, templateAnnotations, pagenav, isPagesAppEdit, basename } = props;

  return (
    <div className={isPagesAppEdit ? 'disable-a-pointer-events' : ''}>
      {pagenav && <Navigation content={pagenav} nodeName={nodeName} basename={basename} />}
      {page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}
    </div>
  );
}
