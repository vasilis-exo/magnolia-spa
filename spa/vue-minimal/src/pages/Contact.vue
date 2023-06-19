<template>
  <div class="Contact">
    <h2 class="hint">[Contact Page]</h2>
    <div class="box">
      <h1>{{ title || 'Nulla vitae elit libero, a pharetra augue.' }}</h1>
    </div>
    <EditableArea v-if="main" v-bind:content="main" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { EditableArea } from '@magnolia/vue-editor';

const props = defineProps({
  title: String,
  metadata: Object,
  main: Object
});
</script>

<style scoped>
.box {
  background: #eaf7f5;
  padding: 20px;
}
</style>
