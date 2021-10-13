import { EditablePage } from '@magnolia/react-editor';
import Basic from '../templates/pages/Basic';
import Contact from '../templates/pages/Contact';
import Headline from '../templates/components/Headline';
import Image from '../templates/components/Image';
import Paragraph from '../templates/components/Paragraph';
import Expander from '../templates/components/Expander';
import List from '../templates/components/List';
import Item from '../templates/components/Item';

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

export async function getServerSideProps(context) {
  let props = {};

  const pagePath = nodeName + context.resolvedUrl.replace(new RegExp('^' + nodeName), '');
  const pagesRes = await fetch(pagesApi + pagePath);

  props.page = await pagesRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (context.query.mgnlPreview) {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    props.templateAnnotations = await templateAnnotationsRes.json();
  }

  return {
    props,
  };
}

export default function Pathname(props) {
  const { page, templateAnnotations } = props;

  return <div>{page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}</div>;
}
