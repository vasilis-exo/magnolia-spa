<template>
  <EditablePage
    v-if="content"
    v-bind:content="content"
    v-bind:config="config"
    v-bind:templateAnnotations="templateAnnotations"
  />
</template>

<script>
import { EditablePage, EditorContextHelper } from "@magnolia/vue-editor";
import Basic from "../templates/pages/Basic.vue";
import Contact from "../templates/pages/Contact.vue";
import Headline from "../templates/components/Headline.vue";
import Image from "../templates/components/Image.vue";
import Paragraph from "../templates/components/Paragraph.vue";
import List from "../templates/components/List.vue";
import Item from "../templates/components/Item.vue";
import Expander from "../templates/components/Expander.vue";

const config = {
  componentMappings: {
    "nuxtjs-v3-ssr-minimal-lm:pages/basic": Basic,
    "nuxtjs-v3-ssr-minimal-lm:pages/contact": Contact,

    "spa-lm:components/headline": Headline,
    "spa-lm:components/image": Image,
    "spa-lm:components/paragraph": Paragraph,
    "spa-lm:components/list": List,
    "spa-lm:components/listItem": Item,
    "spa-lm:components/expander": Expander,
  },
};

function getCurrentLanguage(url, languages) {
  for (let i = 0; i < languages.length; i++) {
    const language = languages[i];

    if (url.indexOf("/" + language) > -1) return language;
  }

  return languages[0];
}

function setURLSearchParams(url, param) {
  return url + (url.indexOf("?") > -1 ? "&" : "?") + param;
}

export default {
  name: "IndexPage",
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
  async setup() {
    const runtimeConfig = useRuntimeConfig();
    const fullPath = useRoute().fullPath;

    // Load paths, see .env and nuxt.config.js files
    const nodeName = runtimeConfig.public.NUXT_APP_MGNL_SITE_PATH;
    const languages = runtimeConfig.public.NUXT_APP_MGNL_LANGUAGES.split(" ");
    const pagesApi = runtimeConfig.public.MGNL_API_PAGES;
    const templateAnnotationsApi = runtimeConfig.public.MGNL_API_TEMPLATES;

    const magnoliaContext = EditorContextHelper.getMagnoliaContext(fullPath, nodeName, languages);

    const { data: content } = await useAsyncData(fullPath, async () => {
      return $fetch(pagesApi + magnoliaContext.nodePath + magnoliaContext.search);
    });

    return { magnoliaContext, content, templateAnnotationsApi };
  },
  async mounted() {
    if (this.magnoliaContext.isMagnolia) {
      const templateAnnotationsRes = await fetch(
        this.templateAnnotationsApi + this.magnoliaContext.nodePath
      );
      this.templateAnnotations = await templateAnnotationsRes.json();
    }
  },
};
</script>
