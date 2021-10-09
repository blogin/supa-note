<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="addNote" @click="setShowModal(true)"
        >Добавить заметку</el-menu-item
      >
      <el-menu-item index="2">
        <router-link to="/archive" class="dropdown-item">Архив</router-link>
      </el-menu-item>
      <el-menu-item index="LogOut">Выйти</el-menu-item>
    </el-menu>

    <!-- Форма добавления новой заметки -->
    <!-- <el-dialog
      title="Новая заметка"
      :visible.sync="dialogFormVisible"
      width="30%"
     
    >
      <el-form :model="form" class="form" :style="{backgroundColor: newBgColor}" >
        <input type="text" placeholder="Заголовок" v-model="title"  />
        <textarea
          name=""
          id=""
          cols="30"
          rows="17"
          placeholder="Заметка"
          v-model="text"
        ></textarea>
        <div class="params">
          <el-popover placement="top" width="175" v-model="visible">
            <p>Выберите цвет</p>
            <div class="grid-color">
              <div v-for="(c,i) in predefineColors" :key="i">
                <div class="example-color" :style="{ backgroundColor:c }" @click="changeBgColor(c)"></div>
              </div>
            </div>
            <img
              src="../assets/colors1.png"
              alt=""
              slot="reference"
              style="cursor:pointer;"
            />
          </el-popover>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Сохранить</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import firebase from "firebase";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      visible: false,
      dialogFormVisible: false,
      form: {
        title: "",
        text: "",
        pin: false,
        color: "red",
      },
      newBgColor: "#fff",
      formLabelWidth: "120px",
      predefineColors: [
        "#fff",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
      ],
    };
  },
  methods: {
    ...mapMutations(["setUserId", "setShowModal"]),
    changeBgColor(color){
      this.newBgColor = color
    },
    handleSelect(key) {
      if (key == "LogOut") {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: '<span style="font-size:17px;">Вы успешно вышли</span>',
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.setUserId(null);
            this.$router.push("/");
          })
          .catch((error) => {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: `<span style="font-size:17px;">${error.message}</span>`,
              type: "error",
              showClose: true,
              duration: 4000,
            });
            this.$router.push("/");
          });
      } else if (key == "addNote") {
      }
    },
  },
};
</script>

<style scoped>
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
}
.el-menu {
  margin-bottom: 20px;
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
}
.form textarea {
  border: none;
  border-right: 1px solid lightgrey;
  outline: none;
  resize: none;
}
</style>
