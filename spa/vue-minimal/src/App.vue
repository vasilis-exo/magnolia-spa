<template>
  <div id="app">
    <header>
      <Navigation />
    </header>
    <div class="container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <footer>
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
      <br />Copyright © 2020
    </footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  name: 'app',
  components: {
    Navigation
  }
};
</script>

<style>
@import "./App.css";
</style>
