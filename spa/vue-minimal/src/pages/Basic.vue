<template>
  <div class="Basic">
    <!-- <div class="hint">[Basic Page]</div> -->
    <h1>{{ title || metadata['@name'] }}</h1>

    <main>
      <!-- <div class="hint">[Main Area]</div> -->
      <EditableArea v-if="main" :content="main" />
    </main>

    <div class="Extras">
      <!-- <div class="hint">[Extras Area]</div> -->
      <EditableArea v-if="extras" :content="extras" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { EditableArea } from '@magnolia/vue-editor';

const props = defineProps({
  title: String,
  metadata: Object,
  main: Object,
  extras: Object
});

</script>
