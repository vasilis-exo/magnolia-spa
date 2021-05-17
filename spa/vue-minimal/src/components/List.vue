<template>
  <ul class="List">
    <EditableArea
      v-if="items"
      v-bind:content="items"
      v-bind:parentTemplateId="metadata['mgnl:template']"
    />
  </ul>
</template>

<script>
import { EditableArea } from '@magnolia/vue-editor';

export default {
  name: "List",
  components: {
    EditableArea
  },
  props: ["items", "metadata"]
};
</script>
