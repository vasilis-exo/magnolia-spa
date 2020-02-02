import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { RendererContextService } from '@robsis/angular-renderer';

import { environment } from '../environments/environment';
import { config } from './magnolia.config.js';



@Component({
  templateUrl: './root.component.html',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private rendererContext: RendererContextService) {
    this.rendererContext.setComponentMapping(config);

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
