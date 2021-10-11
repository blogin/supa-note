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
            <div class="close" @click.stop="del(item.id)" title="Удалить">X</div>
            <!--  -->
            <h1>{{ item.title }}</h1>
            <span v-if="!item.checkbox">{{ item.text }}</span>
            <div v-else>
              <div class="checkbox block" v-for="(l,i) in item.listView" :key="i" :class="{throuht:l.checked}" @click.stop> <!-- @click.stop - Костыль-заглушка, чтобы можно было ставить галочки и не переходить в режим редактирования-->
                <input class="custom-checkbox" type="checkbox" :value="l.value" :id="l.value" v-model="item.checkedList">
                <label :for="l.value">{{l.name}}</label>
              </div>
            </div>
          </div>
        </template>
      </masonry-wall>
    </div>
    <div class="others">
      <p class="head" v-if="others.length">Другие</p>
      <masonry-wall :items="others" :column-width="250" :gap="10">
        <template #default="{ item }">
          <div class="item" :style="{ background: item.color }" @click="edit(item.id)">
            <!-- Удаление с прекращением всплытия (.stop ) -->
            <div class="close" @click.stop="del(item.id)">X</div>
            <!--  -->
            <h1>{{ item.title }}</h1>
            <span v-if="!item.checkbox">{{ item.text }}</span>
            <div v-else>
              <div class="checkbox block" v-for="(l,i) in item.listView" :key="i" :class="{throuht:l.checked}" @click.stop> <!-- @click.stop - Костыль-заглушка, чтобы можно было ставить галочки и не переходить в режим редактирования-->
                <input class="custom-checkbox" type="checkbox" :value="l.value" :id="l.value" v-model="item.checkedList">
                <label :for="l.value">{{l.name}}</label>
              </div>
            </div>
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script>
// import VueMasonryWall from "vue-masonry-wall";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(["listOfNotes", "userId"]),
    pinned() {
      return this.listOfNotes.filter((e) => e.pin && !e.archive);
    },
    others() {
      return this.listOfNotes.filter((e) => !e.pin && !e.archive);
    },
  },
  methods: {
    ...mapActions(["putListOfNotes"]),
    del(id) {
      console.log("del");
      this.$delete(
        this.listOfNotes,
        this.listOfNotes.findIndex((e) => e.id == id)
      );
      this.putListOfNotes({ user: this.userId, list: this.listOfNotes, core:"del" });
    },
    edit(id) {
      console.log("edit");
      this.$router.push(`/edit/${id}`);
    },
    stop(){
      // Костыль - заглушка, чтобы возможно было ставить галочки и не переходить в режим редактирования
    }
  },
};
</script>
<style scoped>
.throuht{
  text-decoration: line-through;
}
.block{
  display: table;
}
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
