<template>
  <li class="Item">{{ text }}</li>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  text: String
});
</script>
