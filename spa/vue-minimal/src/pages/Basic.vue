<template>
  <div class="Basic">
    <h1>{{ title || metadata['@name'] }}</h1>
    <EditableArea v-if="main" v-bind:content="main" />
  </div>
</template>

<script>
import { EditableArea } from '../vue-editor';

export default {
  name: 'Basic',
  components: {
    EditableArea,
  },
  props: ['title', 'metadata', 'main'],
};
</script>
