<template>
  <p class="Paragraph" v-html="richText"></p>
</template>

<script>
export default {
  name: "Paragraph",
  props: ["richText"]
};
</script>