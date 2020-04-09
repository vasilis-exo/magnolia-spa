import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { RendererContextService } from '@magnolia/angular-editor';

import { environment } from '../environments/environment';
import { config } from '../magnolia.config.js';



@Component({
  templateUrl: './root.component.html',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private rendererContext: RendererContextService) {
    this.rendererContext.setComponentMapping(config.componentMapping);

    // refresh the content on navigation event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContent(event.url);
      }
    });
  }

  private inAuthor() {
    const ia = environment.inEditor;
    return ia;
}

  private getContent(url: string): void {
    // strip everything after '.html'
    url = url.replace(/\.html.*$/, '');
    this.http.get(`${environment.restUrlBase}${environment.rootPath}${url}`).subscribe(content => {
      
      if (!this.inAuthor()) {
        this.content = content;
      }else{
        // request the template definitions for given page
        this.http.get(environment.templateDefinitionBase + '/' + content['mgnl:template']).subscribe(definitions => {
          this.rendererContext.setTemplateDefinitions(definitions);
          this.content = content;
        });
      }
      
    });
  }
}
