<template>
  <div id="app">
    <navBar v-if="showNavBar" />
    <router-view/>
    <modal v-if="showModal"></modal>
  </div>
</template>

<script>
import navBar from "./components/NavBar.vue"
import modal from "@/components/Modal.vue";
import { mapGetters } from 'vuex'

export default {
  components:{
    navBar,
    modal
  },
  computed:{
    ...mapGetters(["showNavBar","showModal"])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Скрол для content*/
#app::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
#app::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}
#app::-webkit-scrollbar-thumb {
  background-color: #b1afaf;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
