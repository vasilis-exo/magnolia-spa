import { BasicComponent } from './pages/basic/basic.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ImageComponent } from './components/image/image.component';
import { ExpanderComponent } from './components/expander/expander.component';

export const config = {
    'angular-minimal-lm:pages/basic': BasicComponent,
    'angular-minimal-lm:pages/contact': ContactComponent,

    'spa-lm:components/header': HeaderComponent,
    'spa-lm:components/list': ListComponent,
    'spa-lm:components/listItem': ListItemComponent,
    'spa-lm:components/paragraph': ParagraphComponent,
    'spa-lm:components/image': ImageComponent,
    'spa-lm:components/expander': ExpanderComponent,
  };

