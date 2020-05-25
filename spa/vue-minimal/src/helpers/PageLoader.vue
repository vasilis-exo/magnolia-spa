<template>
  <EditablePage
    v-if="content"
    v-bind:content="content"
    v-bind:config="config"
    v-bind:templateDefinitions="templateDefinitions"
  />
</template>

<script>
import config from "../magnolia.config";
import { EditablePage, inEditorEdit } from "../vue-editor";
import {
  getLanguages,
  getCurrentLanguage,
  removeCurrentLanguage
} from "../helpers/AppHelpers";

const getContentUrl = () => {
  const languages = getLanguages();
  const nodeName = process.env.VUE_APP_SITE_BASENAME;
  const currentLanguage = getCurrentLanguage();
  let path =
    nodeName +
    window.location.pathname.replace(
      new RegExp("(.*" + nodeName + "|.html)", "g"),
      ""
    );

  if (currentLanguage !== languages[0]) {
    path = removeCurrentLanguage(path, currentLanguage);
    path += "?lang=" + currentLanguage;
  }

  return process.env.VUE_APP_REST_PAGES + path;
};

export default {
  name: "PageLoader",
  components: {
    EditablePage
  },
  data: function() {
    return {
      content: undefined,
      config,
      templateDefinitions: {}
    };
  },
  methods: {
    async loadPage() {
      const contentResponse = await fetch(getContentUrl());
      const content = await contentResponse.json();

      if (inEditorEdit) {
        const templateDefinitionsResponse = await fetch(
          process.env.VUE_APP_REST_TEMPLATE_DEFINITION +
            content["mgnl:template"]
        );
        const templateDefinitions = await templateDefinitionsResponse.json();

        this.templateDefinitions = templateDefinitions;
      }

      this.content = content;
    }
  },
  mounted() {
    this.loadPage();
  },
  updated() {
    if (inEditorEdit) window.parent.mgnlRefresh();
  }
};
</script>
