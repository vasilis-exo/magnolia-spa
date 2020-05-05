<template>
  <div id="app">
    <header>
      <Navigation>
    </header>
    <div class="container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <footer>
      Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
      <br />Copyright © 2019
    </footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  name: 'app',
  components: {
    Navigation,
  },
};
</script>

<style>
body {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #747474;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

nav a {
  display: inline-block;
  padding: 10px;
  text-decoration: none;
  color: #ababab;
}

nav a:hover {
  color: #00b39b;
}

img {
  max-width: 300px;
}

h1 {
  color: #00b39b;
  font-weight: 200;
}

ul {
  padding: 0;
  list-style: none;
}

footer {
  padding: 20px;
  border-top: 1px solid #eef2f2;
  font-size: 0.75rem;
  color: #ababab;
}
</style>
