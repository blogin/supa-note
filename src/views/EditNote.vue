<template>
  <div>
    {{nPin}}
    <div class="item" :style="{ background: newColor }">
      <div class="close" @click="del(item.id)">X</div>
      <input type="text" v-model="nTitle" />
      <textarea
        name=""
        id=""
        cols="30"
        rows="15"
        placeholder="Заметка"
        v-model="nText"
        v-if="!nCheckbox"
      ></textarea>
      <div v-if="item.checkbox">
        <div class="checkbox" v-for="(l, i) in inListView" :key="i">
          <input
            class="custom-checkbox"
            type="checkbox"
            :value="`${l}_${i}`"
            :id="`${l}_${i}`"
            v-model="checkedList"
          />
          <label :for="`${l}_${i}`">{{ l }}</label>
        </div>
      </div>
      <div class="form-footer-cont">
        <div class="form-footer">
          <el-popover placement="top" width="175" v-model="visible">
            <p>Выберите цвет заметки</p>
            <div class="grid-color">
              <div v-for="(c, i) in predefineColors" :key="i">
                <div
                  class="example-color"
                  :style="{ backgroundColor: c }"
                  @click="newColor = c"
                  :class="{ bordered: i == 0 }"
                ></div>
              </div>
            </div>
            <img
              src="../assets/c2.png"
              width="35"
              height="35"
              slot="reference"
              title="Цвет заметки"
            />
          </el-popover>
          <i
            :class="{
              'el-icon-bottom-left': nPin,
              'el-icon-top-right': !nPin,
            }"
            style="font-size:37px;"
            @click="nPin = !nPin"
            title="Закрепить"
          ></i>
          <i
            :class="{
              'el-icon-document': nCheckbox,
              'el-icon-tickets': !nCheckbox,
            }"
            style="font-size:37px;"
            @click="nCheckbox = !nCheckbox"
            title="В виде списка"
          ></i>
          <el-button @click="cancel()">Отмена</el-button>
          <el-button type="primary" @click="add()">Сохранить</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      inListView: [],
      pinned: false,
      checkboxed: false,
      checkedList: [],
      newColor: null,
      visible: false,
      initState: null,
      nTitle: "",
      nText: "",
      nCheckbox: null,
      nPin: null,
    };
  },
  watch:{
    nCheckbox(){
      if(nCheckbox)
        this.inListView = nCheckbox.split("\n").filter(Boolean)
    }
  },
  computed: {
    ...mapGetters(["listOfNotes", "predefineColors", "initCopyListOfNotes"]),
    item() {
      
      let i = this.listOfNotes.filter((e) => e.id == this.id)[0];
      console.log(typeof i)
      this.initState = this.initCopyListOfNotes.filter((e) => e.id == this.id)[0];
      i.checkbox
        ? (this.inListView = i.text.split("\n").filter(Boolean))
        : null;
      this.nTitle = i.title
      this.nText = i.text
      this.newColor = i.color
      this.nPin = i.pin
      this.nCheckbox = i.checkbox
      return i;
    },
  },
  methods: {
    getNewPin(){
      debugger
      this.nPin = !this.item.pin
    },
    cancel(){
      this.item = this.initState
      this.$router.push("/home")
    }
  },
};
</script>

<style scoped>
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
.form-cont {
  text-align: left;
  /* border:1px solid red; */
  height: 290px;
  width: 100%;
}
.form-footer {
  width: 98%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
}
.bordered {
  border: 1px solid lightgrey;
  width: 23px !important;
  height: 23px !important;
}
.grid-color {
  max-width: 50px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
}
.example-color {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
}
.item {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  position: relative;
  width: 500px;
}
.item input {
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  padding: 3px;
  margin: 5px;
  background: transparent;
  height: 30px;
  font-size: 15px;
  width: 98%;
}

.item textarea {
  border: none;
  border-right: 1px solid lightgrey;
  outline: none;
  resize: none;
  margin: 5px;
  background: transparent;
  font-size: 15px;
  width: 98%;
}
</style>
