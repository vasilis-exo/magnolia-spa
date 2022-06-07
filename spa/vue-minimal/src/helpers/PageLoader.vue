<template>
  <EditablePage
    v-if="content && templateAnnotations"
    v-bind:content="content"
    v-bind:config="config"
    v-bind:templateAnnotations="templateAnnotations"
  />
</template>

<script>
import { EditablePage, EditorContextHelper } from '@magnolia/vue-editor';
import { getLanguages, getCurrentLanguage, removeCurrentLanguage, removeExtension, getVersion } from './AppHelpers';
import config from '../magnolia.config';

const getPath = () => {
  const nodeName = process.env.VUE_APP_MGNL_SITE_PATH;
  let path = nodeName + window.location.pathname.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '');

  return path;
};

const getServerPathUrl = () => {
  return process.env.VUE_APP_MGNL_HOST + process.env.VUE_APP_MGNL_BASE_AUTHOR;
};

const getContentUrl = () => {
  const languages = getLanguages();
  const nodeName = process.env.VUE_APP_MGNL_SITE_PATH;
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

  return `${process.env.VUE_APP_MGNL_API_PAGES}${path}`;
};

export default {
  name: 'PageLoader',
  components: {
    EditablePage,
  },
  data() {
    return {
      content: null,
      templateAnnotations: {},
      config,
    };
  },
  methods: {
    async loadPageContent() {
      const contentUrl = getContentUrl();

      console.log('Get Content: ' + contentUrl);

      const contentResponse = await fetch(contentUrl);
      const content = await contentResponse.json();
      const templateId = content['mgnl:template'];
      if (!templateId) {
        return;
      }

      // Get Template Annotations

      const path = getPath();
      const templateEndpointUrl = getServerPathUrl() + process.env.VUE_APP_MGNL_API_TEMPLATES + removeExtension(path);

      console.log('Get Template Info: ' + templateEndpointUrl);

      if (window.location.search.includes('mgnlPreview')) {
        const templateResponse = await fetch(templateEndpointUrl);
        const templateAnnotations = await templateResponse.json();

        this.templateAnnotations = templateAnnotations;
      }

      this.content = content;
    },
  },
  mounted() {
    this.loadPageContent();
  },
};
</script>

<style></style>
