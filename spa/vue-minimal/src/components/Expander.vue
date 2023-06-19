<template>
  <div class="Expander">
    <div @click.prevent="toggle" class="expanderHeader" :class="state.isCollapsed ? 'closed' : 'open'">
      Expander
      <svg class="expanderIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </div>

    <div v-if="!state.isCollapsed">
      <EditableArea v-if="expanderItems" v-bind:content="expanderItems"
        v-bind:parentTemplateId="metadata['mgnl:template']" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive, onUpdated } from 'vue';
import { EditableArea, inEditorEdit } from '@magnolia/vue-editor';

defineProps({
  expanderItems: Object,
  metadata: Object
});


const state = reactive({
  isCollapsed: true
});


const toggle = () => {
  state.isCollapsed = !state.isCollapsed;
}


// updated hook
onUpdated(() => {
  if (inEditorEdit && window.parent.mgnlRefresh) {
    window.parent.mgnlRefresh();
  }
});

</script>
