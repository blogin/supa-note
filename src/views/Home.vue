
<template>
  <div>
    <vue-masonry-wall :items="listOfNotes" :options="{width: 300, padding: 5}" >
      <template v-slot:default="{item}">
        <div class="item">
          <h5>{{item.title}}</h5>
          <p>{{item.text}}</p>
        </div>
      </template>
    </vue-masonry-wall>
  </div>
</template>

<script>
  import VueMasonryWall from "vue-masonry-wall";
  import {mapGetters} from "vuex"

  export default {
    name: 'app',
    components: {VueMasonryWall},
    data() {
      return {
        items: [
          {title: 'Item 0', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', id:123},
          {title: 'Item 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
          {title: 'Item 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
          {title: 'Item 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
          {title: 'Item 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
          {title: 'Item 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        ]
      }
    },
    computed:{
      ...mapGetters(["listOfNotes"])
    },
    methods: {
      /**
       * I am mocking a API call that load 20 objects at a time.
       */
      // append() {
      //   for (let i = 0; i < 10; i++) {
      //     this.items.push({title: `Item ${this.items.length}`, content: 'Content'})
      //   }
      // }
    }
  }
</script>
<style scoped>
.item{
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
}
</style>