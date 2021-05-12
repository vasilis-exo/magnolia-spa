<template>
  <img class="Image" v-bind:src="`${dam_raw}${image['@link']}`" alt="Etiam Purus" />
</template>

<script>
export default {
  name: "Image",
  props: ["image"],
  data() {
    return {
      dam_raw: process.env.VUE_APP_MGNL_DAM_RAW,
    }
  },
};
</script>