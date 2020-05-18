<template>
  <nav v-if="pagenav">
    <router-link  v-for="item in pagenav" :key="item['@id']" v-bind:to="item['@name']">{{ item.title }}</router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      pagenav: [],
    };
  },

  async mounted() {
    const pagenavResponse = await fetch(process.env.VUE_APP_REST_PAGENAV + process.env.VUE_APP_SITE_BASENAME);
    const pagenav = await pagenavResponse.json();
    const newPagenav = [
      {
        '@id': pagenav['@id'],
        '@name': '/',
        title: pagenav.title,
      },
    ];

    this.pagenav = newPagenav.concat(pagenav['@nodes'].map((nodeName) => pagenav[nodeName]));
  },
};
</script>
