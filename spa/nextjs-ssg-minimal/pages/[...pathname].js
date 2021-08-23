import { EditablePage } from '@magnolia/react-editor';
import Basic from '../templates/pages/Basic';
import Contact from '../templates/pages/Contact';
import Headline from '../templates/components/Headline';
import Image from '../templates/components/Image';
import Paragraph from '../templates/components/Paragraph';
import Expander from '../templates/components/Expander';
import List from '../templates/components/List';
import Item from '../templates/components/Item';

const nodeName = '/nextjs-ssg-minimal';
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
const pagesApi = 'http://localhost:8080/magnoliaAuthor/.rest/delivery/pages/v1';
const templateAnnotationsApi = 'http://localhost:8080/magnoliaAuthor/.rest/template-annotations/v1';

export async function getPage(context) {
  let templateAnnotations = {};

  const pagePath = nodeName + context.resolvedUrl;
  const pagesRes = await fetch(pagesApi + pagePath);
  const page = await pagesRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (context.query.mgnlPreview === 'false') {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    templateAnnotations = await templateAnnotationsRes.json();
  }

  return { page, templateAnnotations };
}

// SSR
export async function getServerSideProps(context) {
  const page = await getPage(context);

  return {
    props: page,
  };
}

// SSG
// export async function getStaticProps(context) {
//   const page = await getPage(context);

//   return {
//     props: page,
//   };
// }

export default function Pathname(props) {
  const { page, templateAnnotations } = props;

  return <div>{page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}</div>;
}
