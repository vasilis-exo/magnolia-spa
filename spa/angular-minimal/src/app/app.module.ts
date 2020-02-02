import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@robsis/angular-renderer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './basic/basic.component';
import { ContactComponent } from './contact/contact.component';

import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { AboutComponent } from './about/about.component';
import { RootComponent } from './root.component';
import { NavigationComponent } from './navigation/navigation.component';

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ImageComponent } from './image/image.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ExpanderComponent } from './expander/expander.component';


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
    HomeComponent,
    BasicComponent,
    ContactComponent,


    TitleComponent,
    AboutComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
    
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
    ParagraphComponent,
    ExpanderComponent,
  ],
  entryComponents: [
    BasicComponent,
    ContactComponent,
    HomeComponent,
    AboutComponent,
    TitleComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
    
    HeaderComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
    ParagraphComponent,
    ExpanderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
