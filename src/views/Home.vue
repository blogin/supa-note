<template>
  <div>
    <div class="pinned">
      <p class="head">Закрепленные</p>
      <vue-masonry-wall
        :items="pinned"
        :options="{ width: 300, padding: 5 }"
        v-if="listOfNotes"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </template>
      </vue-masonry-wall>
    </div>
    <div class="others">
      <p class="head">Другие</p>
      <vue-masonry-wall
        :items="others"
        :options="{ width: 300, padding: 5 }"
        v-if="listOfNotes"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.text }}</p>
          </div>
        </template>
      </vue-masonry-wall>
    </div>
  </div>
</template>

<script>
import VueMasonryWall from "vue-masonry-wall";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { VueMasonryWall },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["listOfNotes"]),
    pinned() {
      return this.listOfNotes.filter((e) => e.pin);
    },
    others() {
      return this.listOfNotes.filter((e) => !e.pin && !e.archive);
    },
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
  },
};
</script>
<style scoped>
.others{
  text-align: left;
}
.pinned{
  border-bottom: 1px dashed lightgrey;
  text-align: left;
}
.pinned p.head, .others p.head{
  color:#9c9c9c;
}
.pinned div.item{
  border:1px solid red;
}
.item {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
}
</style>
