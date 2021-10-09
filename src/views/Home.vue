<template>
  <div class="home">
    <note :noteList="listOfNotes" />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import note from "../components/Note.vue"
export default {
  name: 'Home',
  computed:{
    ...mapGetters(["listOfNotes"])
  },
  // methods:{
  //   ...mapActions(["getListOfNotes"])
  // },
  data(){
    return {
      chunckNote:{
        user: this.userId,
        list: [
          {
            title: "adasd",
            text: "asddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            pin: true,
            color: 'red',
            checkbox: false,
            id: "1"
          },
          {
            title: "123",
            text: "11111111111111111111111",
            pin: false,
            color: 'red',
            checkbox: false,
            id: "2"
          },
          {
            title: "ewq",
            text: "qweqweqweqweqwe",
            pin: false,
            color: 'red',
            checkbox: false,
            id: "3"
          }
        ]
      }
    }
  },
  components:{
    note
  },
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