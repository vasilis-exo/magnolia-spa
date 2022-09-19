import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpanderComponent } from './components/expander/expander.component';
import { HeadlineComponent } from './components/headline/headline.component';
import { ImageComponent } from './components/image/image.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { BasicComponent } from './pages/basic/basic.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RootComponent } from './root.component';

import { MagnoliaModule } from '@magnolia/angular-editor';
import { StateInterceptor } from './state.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,

    BasicComponent,
    ContactComponent,
    HeadlineComponent,
    ListComponent,
    ListItemComponent,
    ImageComponent,
    ParagraphComponent,
    ExpanderComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MagnoliaModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
