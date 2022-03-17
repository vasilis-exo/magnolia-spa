<template>
  <EditablePage
    v-if="page && (context ? templateAnnotations : true)"
    v-bind:context="context"
    v-bind:content="page"
    v-bind:config="config"
    v-bind:templateAnnotations="templateAnnotations"
  />
</template>

<script>
import { EditablePage, getContext } from "@magnolia-services/vue2-editor";
import Basic from "../templates/pages/Basic.vue";
import Contact from "../templates/pages/Contact.vue";
import Headline from "../templates/components/Headline.vue";
import Image from "../templates/components/Image.vue";
import Paragraph from "../templates/components/Paragraph.vue";
import List from "../templates/components/List.vue";
import Item from "../templates/components/Item.vue";

const nodeName = "/nuxtjs-ssr-minimal";
const languages = ["en", "de"];
const config = {
  componentMappings: {
    "nuxtjs-ssr-minimal-lm:pages/basic": Basic,
    "nuxtjs-ssr-minimal-lm:pages/contact": Contact,

    "spa-lm:components/headline": Headline,
    "spa-lm:components/image": Image,
    "spa-lm:components/paragraph": Paragraph,
    "spa-lm:components/list": List,
    "spa-lm:components/listItem": Item,
  },
};

// Use different defaultBaseUrl to point to public instances
const defaultBaseUrl = process.env.MGNL_HOST;
const pagesApi = defaultBaseUrl + "/.rest/delivery/pages/v1";
const templateAnnotationsApi =
  defaultBaseUrl + "/.rest/template-annotations/v1";

function getCurrentLanguage(url) {
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
      context: null,
      page: null,
      templateAnnotations: null,
      config,
    };
  },
  async asyncData({ route, $http }) {
    const fullPath = route.fullPath;
    const currentLanguage = getCurrentLanguage(fullPath);
    const isDefaultLanguage = currentLanguage === languages[0];
    let pagePath = nodeName + fullPath.replace(new RegExp(".*" + nodeName), "");

    if (!isDefaultLanguage) {
      pagePath = pagePath.replace("/" + currentLanguage, "");
    }

    const page = await $http.$get(
      setURLSearchParams(pagesApi + pagePath, "lang=" + currentLanguage)
    );

    return { page, pagePath };
  },
  async mounted() {
    this.context = getContext(window.location.href);

    if (this.context) {
      const templateAnnotationsRes = await fetch(
        templateAnnotationsApi + this.pagePath
      );
      const templateAnnotations = await templateAnnotationsRes.json();

      this.templateAnnotations = templateAnnotations;
    }
  },
};
</script>
