<template>
  <ul class="List">
    <EditableArea
      v-if="items"
      v-bind:content="items"
      v-bind:parentTemplateId="metadata['mgnl:template']"
    />
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import { EditableArea } from '@magnolia/vue-editor';

defineProps({
  items: Object,
  metadata: Object
});
</script>
