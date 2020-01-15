import Default from './src/pages/Default';
import Contact from './src/pages/Contact';
import Header from './src/components/Header';
import Image from './src/components/Image';
import Paragraph from './src/components/Paragraph';
import List from './src/components/List';
import Item from './src/components/Item';

const config = {
  templates: {
    'spa-lm:pages/Default': Default,
    'spa-lm:pages/Contact': Contact,
    'spa-lm:components/Header': Header,
    'spa-lm:components/Image': Image,
    'spa-lm:components/Paragraph': Paragraph,
    'spa-lm:components/List': List,
    'spa-lm:components/Item': Item
  }
};

export default config;
