<template>
  <div class="home">
    <div v-if="pinned">
      <div v-for="(p, i) in pinned" :key="i" class="note pinned">
        <span>{{ p.title }}</span>
        <hr />
        <span>{{ p.text }}</span>
        <hr />
        <span>{{ p.color }} </span>
        <span>{{ p.pin }} </span>
        <span>{{ p.checkbox }} </span>
      </div>
    </div>
    <div v-for="(n, i) in active" :key="i" class="note">
      <span>{{ n.title }}</span>
      <hr />
      <span>{{ n.text }}</span>
      <hr />
      <span>{{ n.color }} </span>
      <span>{{ n.pin }} </span>
      <span>{{ n.checkbox }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["noteList"],
  computed: {
    pinned() {
      return this.noteList.filter((e) => e.pin);
    },
    active(){
      return this.noteList.filter((e) => !e.pin);
    }
  },
};
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
}
.note {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  max-width: 200px;
  word-wrap: break-word;
  cursor: pointer;
}
.pinned{
  border: 1px solid red;
}
</style>
