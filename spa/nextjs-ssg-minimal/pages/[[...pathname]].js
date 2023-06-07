import {EditablePage} from '@magnolia/react-editor';
import Navigation from '../templates/components/Navigation';
import Basic from '../templates/pages/Basic';
import Contact from '../templates/pages/Contact';
import Headline from '../templates/components/Headline';
import Image from '../templates/components/Image';
import Paragraph from '../templates/components/Paragraph';
import Expander from '../templates/components/Expander';
import List from '../templates/components/List';
import Item from '../templates/components/Item';
import {getProps, languages, nodeName, pagenavApi} from '../utils';

const config = {
  componentMappings: {
    'nextjs-ssg-minimal-lm:pages/basic': Basic,
    'nextjs-ssg-minimal-lm:pages/contact': Contact,

    'spa-lm:components/headline': Headline,
    'spa-lm:components/image': Image,
    'spa-lm:components/paragraph': Paragraph,
    'spa-lm:components/expander': Expander,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': Item,
  },
};


function getStaticPath(node, paths) {
  let pathname = node['@path'].replace(nodeName, '');

  pathname = pathname.split('/');

  pathname.shift();

  languages.forEach((language, i) => {
    let i18nPathname = JSON.parse(JSON.stringify(pathname));

    if (i !== 0) i18nPathname.unshift(language);

    paths.push({params: {pathname: i18nPathname}});
  });

  node['@nodes'].forEach((nodeName) => getStaticPath(node[nodeName], paths));
}

export async function getStaticPaths() {
  let paths = [];

  const navRes = await fetch(pagenavApi + nodeName);
  const nav = await navRes.json();

  getStaticPath(nav, paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  let resolvedUrl = context.params.pathname ? "/" + context.params.pathname.join("/") : "";
  if (context.preview) {
    const { slug, ...query } = context.previewData.query;
    let params = new URLSearchParams(query);
    resolvedUrl = resolvedUrl + '?' + params.toString();
  }
  return await getProps(resolvedUrl);
}

export default function Pathname(props) {
  const {nodeName, page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext} = props;

  return (
    <div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
      {pagenav && <Navigation content={pagenav} nodeName={nodeName} currentLanguage={magnoliaContext.currentLanguage}/>}
      {page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations}/>}
    </div>
  );
}
