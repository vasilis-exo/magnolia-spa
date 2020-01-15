<template>
  <img class="Image" v-bind:src="image['@link']" alt="Etiam Purus" />
</template>

<script>
export default {
  name: "Image",
  props: ["image"]
};
</script>