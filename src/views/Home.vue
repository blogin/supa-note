<template>
  <div class="home">
    <div v-for="(n,i) in chunckNote.list" :key="i" class="note">
      <span>{{n.title}}</span>
      <hr>
      <span>{{n.text}}</span>
      <hr>
      <span>{{n.color}} </span>
      <span>{{n.pin}} </span>
      <span>{{n.checkbox}} </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  computed:{
    ...mapGetters(["userId"])
  },
  data(){
    return {
      chunckNote:{
        user: this.userId,
        list: [
          {
            title: "adasd",
            text: "asddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            pin: false,
            color: 'red',
            checkbox: false
          },
          {
            title: "123",
            text: "11111111111111111111111",
            pin: false,
            color: 'red',
            checkbox: false
          },
          {
            title: "ewq",
            text: "qweqweqweqweqwe",
            pin: false,
            color: 'red',
            checkbox: false
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.home{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
}
.note{
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  max-width: 200px;
  word-wrap: break-word;
  cursor: pointer;

}
</style>