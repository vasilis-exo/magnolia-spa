import Default from './src/pages/Default';
import Contact from './src/pages/Contact';
import Header from './src/components/Header';
import Image from './src/components/Image';
import Paragraph from './src/components/Paragraph';
import List from './src/components/List';
import Item from './src/components/Item';

const config = {
  templates: {
    'vue-demo:pages/Default': Default,
    'vue-demo:pages/Contact': Contact,
    'vue-demo:components/Header': Header,
    'vue-demo:components/Image': Image,
    'vue-demo:components/Paragraph': Paragraph,
    'vue-demo:components/List': List,
    'vue-demo:components/Item': Item
  }
};

export default config;
