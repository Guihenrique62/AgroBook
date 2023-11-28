<!-- HTML -->
<template>
  <!-- <navBarLogado v-if="this.$router.currentRoute.value.path != '/entrar'"/> -->
  <router-view/>
</template>

<!-- JAVASCRIPT -->
<script>

// SYSTEM
import { defineComponent } from 'vue';

// COMPONENT
// import navBarLogado from './components/Nav/NavBarLogado.vue';

export default defineComponent({
  el: '#app',
  // components: {  navBarLogado },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Agrobook';
      }
    },
  },
  metaInfo() {
    return {
      title: `${this.userData.name} - Epiloge`,
      meta: [
        { name: 'description', content: 'Connect and follow ' + this.userData.name + ' on Epiloge - ' + this.userData.tagline },
        { property: 'og:title', content: this.userData.name + ' - Epiloge' },
        { property: 'og:site_name', content: 'Epiloge' },
        { property: 'og:description', content: 'Connect and follow ' + this.userData.name + ' on Epiloge - ' + this.userData.tagline },
        { property: 'og:type', content: 'profile' },
        { property: 'og:url', content: 'https://epiloge.com/@' + this.userData.username },
        { property: 'og:image', content: this.aws_url + '/users/' + this.userData.profileurl + '-main.jpg' }
      ]
    }
  },
  created() {
    document.title = 'Carregando'
    document.getElementsByTagName("html")[0].lang = 'pt-BR';
  },
  mounted() {
    document.title = 'Agrobook'
  }
});

</script>

<!-- CSS -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
