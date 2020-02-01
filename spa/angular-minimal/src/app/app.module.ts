import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { MagnoliaModule } from '@robsis/angular-renderer';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './basic/basic.component';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { AboutComponent } from './about/about.component';
import { RootComponent } from './root.component';
import { NavigationComponent } from './navigation/navigation.component';

import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';


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
    TitleComponent,
    AboutComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
    HeaderComponent,
    ListComponent,
    ListItemComponent,
  ],
  entryComponents: [
    BasicComponent,
    HomeComponent,
    AboutComponent,
    TitleComponent,
    ComponentWithAreaComponent,
    NavigationComponent,
    
    HeaderComponent,
    ListComponent,
    ListItemComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
