import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EditorContextService } from '@magnolia/angular-editor';

import { getLanguages, getCurrentLanguage, removeCurrentLanguage, getVersion } from 'src/app/helpers/AppHelpers';
import { environment } from '../environments/environment';
import { config } from '../magnolia.config.js';

@Component({
  templateUrl: './root.component.html',
})
export class RootComponent {
  @Input() content: any;

  constructor(private http: HttpClient, private router: Router, private editorContext: EditorContextService) {
    this.editorContext.setComponentMapping(config.componentMapping);

    // refresh the content on navigation event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getContent();
      }
    });
  }

  async getContent() {
    const languages = getLanguages();
    const nodeName = environment.rootPath;
    const currentLanguage = getCurrentLanguage();
    let path = nodeName + window.location.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '');

    if (currentLanguage !== languages[0]) {
      path = removeCurrentLanguage(path, currentLanguage);
      path += '?lang=' + currentLanguage;
    }

    const version = getVersion(window.location.href);

    if (version) {
      path += path.indexOf('?') > -1 ? '&version=' + version : '?version=' + version;
    }

    const contentRes = await fetch(`${environment.restUrlBase}${path}`);
    const content = await contentRes.json();

    if (await this.editorContext.inEditorAsync()) {
      const templateAnnotationsRes = await fetch(environment.templateAnnotationsBase + path);
      const templateAnnotations = await templateAnnotationsRes.json();

      this.editorContext.setTemplateAnnotations(templateAnnotations);
    }

    this.content = content;
  }
}
