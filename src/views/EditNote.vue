<template>
  <div class="cont">    
    <div class="item" :style="{ background: newColor }">
      <div class="close" @click="del(id)">X</div>
      <input type="text" v-model="nTitle" />

      <!-- Если поле nCheckbox false, то показывать textbox, если true, то показывать список checkbox'ов -->
      <textarea
        name=""
        id=""
        cols="30"
        rows="30"
        placeholder="Заметка"
        v-model="nText"
        v-if="!nCheckbox"
      ></textarea>
       
      <div v-if="nCheckbox && inListView" class="checkebox-cont">
        <div class="checkbox" v-for="(l,i) in listView" :key="i">
          <input class="custom-checkbox" type="checkbox" :value="l.value" :id="l.value" v-model="checkedList">
          <label :for="l.value">{{l.name}}</label>
        </div>
      </div> 
      <!--  -->

      <!-- Параметры и кнопки -->
      <div class="form-footer-cont">
        <div class="form-footer">
          <!-- Выбор цвета -->
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
          <!-- Значек закрепления -->
          <i
            :class="{
              'el-icon-bottom-left': nPin,
              'el-icon-top-right': !nPin,
            }"
            style="font-size:37px;"
            @click="nPin = !nPin"
            title="Закрепить"
          ></i>
          <!-- Представить в виде списка -->
          <i
            :class="{
              'el-icon-document': nCheckbox,
              'el-icon-tickets': !nCheckbox,
            }"
            style="font-size:37px;"
            @click="nCheckbox = !nCheckbox"
            title="В виде списка"
          ></i>
          <!-- Перенести в архив -->
          <i
            :class="{
              'el-icon-suitcase': !nArchive,
              'el-icon-suitcase-1': nArchive,
            }"
            style="font-size:37px;"
            @click="nArchive = !nArchive"
            title="В Архив"
          ></i>
          <el-button @click="cancel()">Отмена</el-button>
          <el-button type="primary" @click="save()">Сохранить</el-button>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      nArchive: null,
      initItem: null,
      checkedList: [],
      listView: [],
      strNote: ""
    };
  },
  mounted(){
    // при переходе в режим редактирования заметки делаем копии значений, для последующего сохранения изменных данных
    // Думается мне что сейчас это реализовано г@нокодом и есть более изящное решение
    this.initItem = this.listOfNotes.filter((e) => e.id == this.id)[0];
    this.strNote = JSON.stringify(this.initItem)
    this.nTitle = this.initItem.title
    this.nText = this.initItem.text
    this.nCheckbox = this.initItem.checkbox
    this.listView = this.initItem.listView  
    this.nPin = this.initItem.pin 
    this.nArchive = this.initItem.archive   
    this.newColor = this.initItem.color   
    this.checkedList = this.initItem.checkedList ? this.initItem.checkedList : []      
  },
  watch:{
    nCheckbox(){
      debugger
      if(this.nCheckbox){ // Разбиваем текст на переносы. Удаляем дубликаты. Перебираем каждый элемент и добавляем в this.inListView объект
        this.listView = []
        this.nText.split("\n").filter(Boolean).forEach((e,i) => {
          this.listView.push({name: e, value: `${this.id}_${e}_${i}`, checked: false})
        })
      }
    }
  },
  computed: {
    ...mapGetters(["listOfNotes", "predefineColors", "userId"]),
  },
  methods: {
    ...mapActions(["putListOfNotes"]),
    cancel(){
      this.$router.go(-1) // Возврат на предыдущий роут
    },
    del(id){
      this.$delete(
        this.listOfNotes,
        this.listOfNotes.findIndex((e) => e.id == id)
      );
      this.$router.go(-1) // Возврат на предыдущий роут
    },
    save(){
      this.initItem.color = this.newColor       
      this.initItem.pin = this.nPin       
      this.initItem.title = this.nTitle       
      this.initItem.text = this.nText       
      this.initItem.checkbox = this.nCheckbox       
      this.initItem.archive = this.nArchive 
      this.initItem.checkedList = this.checkedList 
      this.initItem.listView = this.listView 
      this.putListOfNotes({ user: this.userId, list: this.listOfNotes, core:"save" });
      this.$router.go(-1) // Возврат на предыдущий роут
    }
  },
};
</script>

<style scoped>
.checkebox-cont{
  padding:20px 15px;
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
.form-cont {
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
.cont{
  position: relative;
}
.item {
  text-align: left;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,10%);
  width: 800px;
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
