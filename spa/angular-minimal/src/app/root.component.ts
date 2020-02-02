import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './basic/basic.component';
import { ContactComponent } from './contact/contact.component';

import { RendererContextService } from '@robsis/angular-renderer';
import { TitleComponent } from './title/title.component';
import { ComponentWithAreaComponent } from './componentWithArea/componentWithArea.component';
import { AboutComponent } from './about/about.component';

import { HeaderComponent } from './header/header.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list/list.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { ImageComponent } from './image/image.component';
import { ExpanderComponent } from './expander/expander.component';

import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  template: '<app-navigation ></app-navigation><mgnl-page [content]="content"></mgnl-page>',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private rendererContext: RendererContextService) {
    this.rendererContext.setComponentMapping({
      'angular-minimal-lm:pages/basic': BasicComponent,
      'angular-minimal-lm:pages/contact': ContactComponent,
      'angular-magnolia-int:pages/home': HomeComponent,
      'angular-magnolia-int:pages/about': AboutComponent,

      'spa-lm:components/header': HeaderComponent,
      'spa-lm:components/list': ListComponent,
      'spa-lm:components/listItem': ListItemComponent,
      'spa-lm:components/paragraph': ParagraphComponent,
      'spa-lm:components/image': ImageComponent,
      'spa-lm:components/expander': ExpanderComponent,

      'angular-magnolia-int:components/title': TitleComponent,
      'angular-magnolia-int:components/componentWithArea': ComponentWithAreaComponent,
      'angular-magnolia-int:components/navigation': NavigationComponent,
    });

    // refresh the content on navigation event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContent(event.url);
      }
    });
  }

  private getContent(url: string): void {
    // strip everything after '.html'
    url = url.replace(/\.html.*$/, '');
    this.http.get(`${environment.restUrlBase}${environment.rootPath}${url}`).subscribe(content => {
      // request the template definitions for given page
      this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
        this.rendererContext.setTemplateDefinitions(definitions);
        this.content = content;
      });
    });
  }
}
