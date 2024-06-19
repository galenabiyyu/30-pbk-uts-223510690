<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/todos">Todos</router-link></li>
        <li><router-link to="/posts">Posts</router-link></li>
        <li><router-link to="/albums">Albums</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #42b983;
  padding: 1em;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1em;
}

nav ul li {
  display: inline;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
