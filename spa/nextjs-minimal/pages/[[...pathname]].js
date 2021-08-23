import { EditablePage } from '@magnolia/react-editor';
import Basic from '../templates/pages/Basic';
import Contact from '../templates/pages/Contact';
import Headline from '../templates/components/Headline';
import Image from '../templates/components/Image';
import Paragraph from '../templates/components/Paragraph';
import Expander from '../templates/components/Expander';
import List from '../templates/components/List';
import Item from '../templates/components/Item';

const nodeName = '/nextjs-minimal';
const config = {
  componentMappings: {
    'nextjs-minimal-lm:pages/basic': Basic,
    'nextjs-minimal-lm:pages/contact': Contact,

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

function getStaticPath(node, paths) {
  let pathname = node['@path'].replace(nodeName, '');

  pathname = pathname.split('/');
  pathname.shift();
  paths.push({ params: { pathname } });
  node['@nodes'].forEach((nodeName) => getStaticPath(node[nodeName], paths));
}

export async function getStaticPaths() {
  let paths = [];

  const navRes = await fetch(pagenavApi + nodeName);
  const nav = await navRes.json();

  getStaticPath(nav, paths);

  console.log(JSON.stringify(paths));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let templateAnnotations = {};

  const pagePath = nodeName + (context.params.pathname ? '/' + context.params.pathname.join('/') : '');
  const pagesRes = await fetch(pagesApi + pagePath);
  const page = await pagesRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (context.preview) {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    templateAnnotations = await templateAnnotationsRes.json();
  }

  return {
    props: { page, templateAnnotations },
  };
}

export default function Pathname(props) {
  const { page, templateAnnotations } = props;

  return <div>{page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}</div>;
}
