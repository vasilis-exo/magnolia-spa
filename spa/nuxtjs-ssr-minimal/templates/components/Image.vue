<template>
  <img class="Image" v-bind:src="src" alt="Etiam Purus" />
</template>

<script>
export default {
  name: "Image",
  props: ["image"],
  computed: {
    src() {
      return (
        process.env.MGNL_HOST +
        "/dam/" +
        this.image["@id"] +
        this.image["@path"]
      );
    },
  },
};
</script>
