import Basic from './pages/Basic';
import Contact from './pages/Contact';
import Image from './components/Image';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import List from './components/List';
import Item from './components/Item';
import Expander from './components/Expander';
import TourList from "./components/TourList";

const config = {
  componentMappings: {
    // Pages
    'vue-minimal-lm:pages/basic': Basic,
    'vue-minimal-lm:pages/contact': Contact,

    // Components
    'spa-lm:components/headline': Headline,
    'spa-lm:components/image': Image,
    'spa-lm:components/paragraph': Paragraph,
    'spa-lm:components/list': List,
    'spa-lm:components/listItem': Item,
    'spa-lm:components/expander': Expander,
    'spa-lm:components/tourList': TourList
  }
};

export default config;
