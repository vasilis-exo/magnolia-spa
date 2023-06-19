<template>
  <h2 class="Headline">{{ text }}</h2>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  text: String
});
</script>