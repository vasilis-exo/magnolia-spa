import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { BasicComponent } from './pages/basic/basic.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ImageComponent } from './components/image/image.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ExpanderComponent } from './components/expander/expander.component';

import { MagnoliaModule } from '@robsis/angular-renderer';

import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    MagnoliaModule,
  ],
  declarations: [
    AppComponent,
    RootComponent,
    
    BasicComponent,
    ContactComponent,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
    ParagraphComponent,
    ExpanderComponent,
    NavigationComponent,
  ],
  entryComponents: [
    BasicComponent,
    ContactComponent,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
    ParagraphComponent,
    ExpanderComponent,
    NavigationComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
