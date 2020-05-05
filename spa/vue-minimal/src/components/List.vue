<template>
  <ul class="List">
    <EditableArea v-if="items" v-bind:content="items" v-bind:parentTemplateId="this['mgnl:template']">
  </ul>
</template>

<script>
import { EditableArea } from '../vue-editor';

export default {
  name: 'List',
  components: {
    EditableArea,
  },
  props: ['items', 'mgnl:template']
};
</script>
