<template>
  <p class="Paragraph" v-html="richText"></p>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  richText: String
});
</script>
