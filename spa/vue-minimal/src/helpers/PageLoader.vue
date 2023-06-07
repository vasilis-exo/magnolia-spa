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
import { getLanguages } from './AppHelpers';
import config from '../magnolia.config';

const getServerPathUrl = () => {
  return process.env.VUE_APP_MGNL_HOST + process.env.VUE_APP_MGNL_BASE_AUTHOR;
};

export default {
  name: 'PageLoader',
  components: {
    EditablePage
  },
  data() {
    return {
      content: null,
      templateAnnotations: {},
      config
    };
  },
  methods: {
    async loadPageContent() {
      const languages = getLanguages();
      const nodeName = process.env.VUE_APP_MGNL_SITE_PATH;

      const magnoliaContext = EditorContextHelper.getMagnoliaContext(window.location.href, nodeName, languages);

      const contentUrl = `${process.env.VUE_APP_MGNL_API_PAGES}${magnoliaContext.nodePath}${magnoliaContext.search}`;
      console.log('Get Content: ' + contentUrl);

      const contentResponse = await fetch(contentUrl);
      const content = await contentResponse.json();
      const templateId = content['mgnl:template'];
      if (!templateId) {
        return;
      }

      // Get Template Annotations
      const templateEndpointUrl = getServerPathUrl() + process.env.VUE_APP_MGNL_API_TEMPLATES + magnoliaContext.nodePath;

      if (magnoliaContext.isMagnolia) {
        const templateResponse = await fetch(templateEndpointUrl);
        const templateAnnotations = await templateResponse.json();

        this.templateAnnotations = templateAnnotations;
      }

      this.content = content;
    }
  },
  mounted() {
    this.loadPageContent();
  }
};
</script>

<style></style>
