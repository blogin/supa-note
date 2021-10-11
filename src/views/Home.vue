<template>
  <div>
    <div class="pinned" v-if="pinned.length">
      <p class="head">Закрепленные</p>
      <masonry-wall :items="pinned" :column-width="250" :gap="10">
        <template #default="{ item }">
          <div
            class="item"
            :style="{ background: item.color }"
            @click="edit(item.id)"
          >
            <!-- Удаление с прекращением всплытия (.stop ) -->
            <div class="close" @click.stop="del(item.id)">X</div>
            <!--  -->
            <h1>{{ item.title }}</h1>
            <span>{{ item.text }}</span>
          </div>
        </template>
      </masonry-wall>
    </div>
    <div class="others">
      <p class="head" v-if="pinned.length">Другие</p>
      <masonry-wall :items="others" :column-width="250" :gap="10">
        <template #default="{ item }">
          <div class="item" :style="{ background: item.color }">
            <!-- Удаление с прекращением всплытия (.stop ) -->
            <div class="close" @click.stop="del(item.id)">X</div>
            <!--  -->
            <h1>{{ item.title }}</h1>
            <span>{{ item.text }}</span>
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script>
// import VueMasonryWall from "vue-masonry-wall";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {},
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
    del(id) {
      console.log("del");
      this.$delete(
        this.listOfNotes,
        this.listOfNotes.findIndex((e) => e.id == id)
      );
    },
    edit(id) {
      console.log("edit");
      this.$router.push(`/edit/${id}`);
    },
  },
};
</script>
<style scoped>
.others {
  text-align: left;
}
.pinned {
  border-bottom: 1px dashed lightgrey;
  text-align: left;
  padding-bottom: 20px;
}
.pinned p.head,
.others p.head {
  color: #9c9c9c;
}
.pinned div.item {
  border: 1px dotted #5298d1c0;
}
.item {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  position: relative;
}
.close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 1px solid #914444;
  border-radius: 50%;
  width: 18px;
  text-align: center;
  padding: 1px;
  cursor: pointer;
  color: #914444;
}
</style>
