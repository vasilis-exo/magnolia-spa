<template>
  <nav v-if="pagenav">
    <router-link
      v-for="item in pagenav"
      :key="item['@id']"
      v-bind:to="item['@name']"
    >{{ item.title }}</router-link>
    <div class="languages">
      <span
        v-for="language in languages"
        :key="language"
        :data-active="currentLanguage === language"
        @click="(e)=>$router.push(clickLanguage(language))"
      >{{ language }}</span>
    </div>
  </nav>
</template>

<script>
import {
  getLanguages,
  getCurrentLanguage,
  changeLanguage
} from "../helpers/AppHelpers";

export default {
  name: "Navigation",
  data() {
    return {
      pagenav: [],
      languages: getLanguages(),
      currentLanguage: getCurrentLanguage()
    };
  },

  async mounted() {

    let url = process.env.VUE_APP_MGNL_API_NAV + process.env.VUE_APP_MGNL_SITE_PATH;

    console.log("Get Nav Con  : " + url)

    const pagenavResponse = await fetch(url
      
    );
    const pagenav = await pagenavResponse.json();
    const newPagenav = [
      {
        "@id": pagenav["@id"],
        "@name": "/",
        title: pagenav.title
      }
    ];

    this.pagenav = newPagenav.concat(
      pagenav["@nodes"].map(nodeName => pagenav[nodeName])
    );
  },

  methods: {
    clickLanguage: function(language) {
      return changeLanguage(language);
    }
  }
};
</script>
