<template>
  <div class="Contact">
    <div class="box">
      <h1>Nulla vitae elit libero, a pharetra augue.</h1>
    </div>
    <Area v-if="main" v-bind:area="main" />
  </div>
</template>

<script>
import Area from "vue-magnolia/Area";

export default {
  name: "Contact",
  components: {
    Area
  },
  props: ["main"]
};
</script>

<style scoped>
.box {
  background: #eaf7f5;
  padding: 20px;
}
</style>