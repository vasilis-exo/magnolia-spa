<template>
  <Page v-if="page" v-bind:page="page" />
</template>

<script>
import Page from "vue-magnolia/Page";

const isInAuthor = window.self !== window.top && window.singlePageConfig;

export default {
  name: "PageWrapper",
  components: {
    Page
  },
  data: function() {
    return {
      page: isInAuthor ? window.singlePageConfig.content : undefined
    };
  },
  methods: {
    getPage() {
      if (isInAuthor) return;

      const path = window.location.pathname.replace("/magnoliaAuthor", "");

      fetch("http://localhost:8080/magnoliaAuthor/.rest/pages" + path)
        .then(res => res.json())
        .then(json => (this.page = json));
    }
  },
  mounted() {
    this.getPage();
  }
};
</script>