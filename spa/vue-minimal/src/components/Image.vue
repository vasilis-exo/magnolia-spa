<template>
  <img class="Image" v-bind:src="`${state.dam_raw}${image['@link']}`" alt="Etiam Purus" />
</template>

<script setup>

import { defineProps, reactive } from 'vue';

defineProps({
  image: String
});

const state = reactive({
  dam_raw: process.env.VUE_APP_MGNL_DAM_RAW
});
</script>
