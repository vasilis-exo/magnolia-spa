<template>
  <ul class="List">
    <Area v-if="items" v-bind:area="items" />
  </ul>
</template>

<script>
import Area from "vue-magnolia/Area";

export default {
  name: "List",
  components: {
    Area
  },
  props: ["items"]
};
</script>