<template>
  <div class="Default">
    <Area v-if="main" v-bind:area="main" />
  </div>
</template>

<script>
import Area from "vue-magnolia/Area";

export default {
  name: "Default",
  components: {
    Area
  },
  props: ["main"]
};
</script>