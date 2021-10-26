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

// const languages = ['en', 'de'];
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

const pagesApi = 'http://localhost:8080/magnoliaAuthor/.rest/delivery/pages/v1';
const templateAnnotationsApi = 'http://localhost:8080/magnoliaAuthor/.rest/template-annotations/v1';
const pagenavApi = 'http://localhost:8080/magnoliaAuthor/.rest/delivery/pagenav/v1';

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
  const mgnlPreview = context.query.mgnlPreview;
  let props = {
    isEdit: mgnlPreview === 'false',
  };

  // Find out page path in Magnolia
  const pagePath = nodeName + context.resolvedUrl.replace(new RegExp('^' + nodeName), '');

  // Fetching page content
  const pagesRes = await fetch(pagesApi + pagePath);
  props.page = await pagesRes.json();

  // Fetching page navigation
  const pagenavRes = await fetch(pagenavApi + nodeName);
  props.pagenav = await pagenavRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (mgnlPreview) {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    props.templateAnnotations = await templateAnnotationsRes.json();
  }

  return {
    props,
  };
}

export default function Pathname(props) {
  const { page, templateAnnotations, pagenav, isEdit } = props;

  return (
    <div className={isEdit ? 'disable-a-pointer-events' : ''}>
      {pagenav && <Navigation content={pagenav} />}
      {page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}
    </div>
  );
}
