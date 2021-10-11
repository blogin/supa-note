<template>
  <div>
    <div class="pinned" v-if="arch.length">
      <p class="head">Архив</p>
      <masonry-wall :items="arch" :column-width="250" :gap="10">
        <template #default="{ item }">
          <div
            class="item"
            :style="{ background: item.color }"
            @click="edit(item.id)"
          >
            <!-- Удаление с прекращением всплытия (.stop ) -->
            <div class="close" @click.stop="del(item.id)" title="Удалить">
              X
            </div>
            <!--  -->
            <h1>{{ item.title }}</h1>
            <span v-if="!item.checkbox">{{ item.text }}</span>
            <div v-else>
              <div class="checkbox block" v-for="(l,i) in item.listView" :key="i" :class="{throuht:l.checked}" > 
                <input class="custom-checkbox" type="checkbox" :value="l.value" :id="l.value" v-model="item.checkedList" disabled>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  computed:{
    ...mapGetters(["listOfNotes", "userId"]),
    arch(){
      return this.listOfNotes.filter(e => e.archive)
    }
  },
  methods:{
    ...mapActions(["putListOfNotes"]),
    del(id) {
      this.$delete(
        this.listOfNotes,
        this.listOfNotes.findIndex((e) => e.id == id)
      );
      this.putListOfNotes({ user: this.userId, list: this.listOfNotes, core:"del" });
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    }
  }
};
</script>

<style scoped>
.throuht{
  text-decoration: line-through;
}
.block{
  display: table;
}
.pinned {
  border-bottom: 1px dashed lightgrey;
  text-align: left;
  padding-bottom: 20px;
}
.pinned p.head {
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