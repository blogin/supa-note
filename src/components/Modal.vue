<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
        class="modal-wrapper"
        @click="
          $event.target.className == 'modal-wrapper'
            ? setShowModal(false)
            : null
        "
      >
        <div class="modal-container" :style="{ background: newBgColor }">
          <div class="form">
            <input type="text" placeholder="Заголовок" v-model="title" />
            <div class="form-cont">
              <textarea
                name=""
                id=""
                cols="30"
                rows="15"
                placeholder="Заметка"
                v-model="text"
                v-if="checkboxed === false"
              ></textarea>
              <div v-if="checkboxed && inListView">
                <div class="checkbox" v-for="(l,i) in inListView" :key="i">
                  <input class="custom-checkbox" type="checkbox" :value="l.value" :id="l.value" v-model="checkedList">
                  <label :for="l.value">{{l.name}}</label>
                </div>
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
                        @click="newBgColor = c"
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
                    'el-icon-bottom-left': pinned,
                    'el-icon-top-right': !pinned,
                  }"
                  style="font-size:37px;"
                  @click="pinned = !pinned"
                  title="Закрепить"
                ></i>
                <i
                  :class="{
                    'el-icon-document': checkboxed,
                    'el-icon-tickets': !checkboxed,
                  }"
                  style="font-size:37px;"
                  @click="checkboxed = !checkboxed"
                  title="В виде списка"
                ></i>
                <i
                  :class="{
                    'el-icon-suitcase': !archived,
                    'el-icon-suitcase-1': archived,
                  }"
                  style="font-size:37px;"
                  @click="archived = !archived"
                  title="В Архив"
                ></i>
                <el-button @click="setShowModal(false)">Отмена</el-button>
                <el-button type="primary" @click="add()">Сохранить</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "modal",
  methods: {
    ...mapMutations(["setShowModal", "setListOfNotes"]),
    ...mapActions(["putListOfNotes"]),
    add() {
      this.setShowModal(false);
      this.listOfNotes.push({
        title: this.title,
        text: this.text,
        pin: this.pinned,
        checkbox: this.checkboxed,
        color: this.newBgColor,
        id: this.id,
        archive: this.archived,
        listView: this.checkboxed ? this.inListView : [],
        checkedList: this.checkedList      
      });
      this.putListOfNotes({ user: this.userId, list: this.listOfNotes, core:this.archived ? "add-arch" : "add" });
    },
  },
  watch:{
    checkboxed(){
      if(this.checkboxed){
        // Разбиваем текст на переносы. Удаляем дубликаты. Перебираем каждый элемент и добавляем в this.inListView объект
        this.text.split("\n").filter(Boolean).forEach((e,i) => {
          this.inListView.push({name: e, value: `${this.id}_${e}_${i}`, checked: false})
        })
      }
      console.log("this.inListView", this.inListView)
    }
  },
  computed: {
    ...mapGetters(["predefineColors", "listOfNotes", "userId"]),
  },
  data() {
    return {
      visible: false,
      title: "",
      text: "",
      newBgColor: "#fff",
      pinned: false,
      checkboxed: false,
      archived: false,
      checkedList: [],
      inListView: [],
      id: Math.random().toString(36).substr(2, 9)
    };
  },
};
</script>

<style scoped>
@import '../assets/checkbox.css';

.form-cont{
  text-align: left;
  /* border:1px solid red; */
  height: 290px;
  width: 100%;
}
.form-footer {
  width: 98%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
.form {
  display: grid;
  grid-template-rows: 10% 80% 10%;
  grid-gap: 10px;
}
.form input {
  border: none;
  border-bottom: 1px solid lightgrey;
  outline: none;
  padding: 3px;
  margin: 5px;
  background: transparent;
  height: 30px;
  font-size: 15px;
}
.form textarea {
  border: none;
  border-right: 1px solid lightgrey;
  outline: none;
  resize: none;
  margin: 5px;
  background: transparent;
  font-size: 15px;
  width: 98%;
}

.modal-mask {
  position: fixed;
  /* z-index: 9009; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  /* z-index: 9001; */
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.5s ease;
  background-color: #fff;
  display: inline-block;
  /* position: relative; */
  min-width: 700px;
  min-height: 420px;
  max-width: 90%;
  max-height: 95vh;
  overflow: auto;
  overflow-x: hidden;
}
/* Скрол для content*/
.modal-container::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}
.modal-container::-webkit-scrollbar {
  width: 3px;
  background-color: #f5f5f5;
}
.modal-container::-webkit-scrollbar-thumb {
  background-color: #b1afaf;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
