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
        <div class="modal-container" :style="{background: newBgColor}">
          <div class="form">
            <input type="text" placeholder="Заголовок" v-model="title" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="15"
              placeholder="Заметка"
              v-model="text"
            ></textarea>
            <div>
              <el-popover placement="top" width="175" v-model="visible">
                <p>Выберите цвет заметки</p>
                <div class="grid-color">
                  <div v-for="(c, i) in predefineColors" :key="i">
                    <div
                      class="example-color"
                      :style="{ backgroundColor: c }"
                      @click="newBgColor = c"
                      :class="{bordered: i == 0}"
                    ></div>
                  </div>
                </div>
                <img src="../assets/colors1.png" alt="" slot="reference" />
              </el-popover>
              <el-button @click="setShowModal(false)">Отмена</el-button>
              <el-button type="primary" @click="setShowModal(false)"
                >Сохранить</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "modal",
  methods: {
    ...mapMutations(["setShowModal"]),
  },
  computed: {
    ...mapGetters(["predefineColors"]),
  },
  data() {
    return {
      visible: false,
      title: "",
      text: "",
      newBgColor:"#fff",
    };
  },
};
</script>

<style scoped>
.bordered{
  border:1px solid lightgrey;
  width: 23px !important;
  height: 23px !important;
}
.grid-color{
  max-width: 50px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
}
.example-color{
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
