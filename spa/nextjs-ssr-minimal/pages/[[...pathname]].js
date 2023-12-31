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
import { getProps } from '../utils';

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


export async function getServerSideProps(context) {
  return await getProps(context.resolvedUrl);
}


export default function Pathname(props) {
  const { nodeName, page = {}, pagenav = {}, templateAnnotations = {}, magnoliaContext } = props;
  return (
    <div className={magnoliaContext.isMagnoliaEdit ? "disable-a-pointer-events" : ""}>
      {pagenav && <Navigation content={pagenav} nodeName={nodeName} currentLanguage={magnoliaContext.currentLanguage} />}
      {page && (
        <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />
      )}
    </div>
  );
}
