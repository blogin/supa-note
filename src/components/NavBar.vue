<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="Home">
        <router-link to="/home" class="dropdown-item outline"
          >Главная</router-link
        >
      </el-menu-item>
      <el-menu-item index="addNote" @click="setShowModal(true)"
        >Добавить заметку</el-menu-item
      >
      <el-menu-item index="Arch">
        <router-link to="/archive" class="dropdown-item outline"
          >Архив</router-link
        >
      </el-menu-item>
      <el-menu-item index="LogOut">Выйти</el-menu-item>
      <el-menu-item index="search">
        <div @keyup.enter="search()">
          <el-input
            placeholder="Поиск..."
            v-model="search"
            class="inp-search"
          ></el-input>
        </div>
      </el-menu-item>
    </el-menu>
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
      search:""
    };
  },
  methods: {
    ...mapMutations([
      "setUserId",
      "setShowModal",
      "setShowNavBar",
      "setListOfNotes",
    ]),
    changeBgColor(color) {
      debugger
      this.newBgColor = color;
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
            this.setListOfNotes([]);
            this.setUserId(null);
            this.setShowNavBar(false);
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
.inp-search{
  margin-bottom:5px;
  width: 250px;
}
.outline {
  text-decoration: none;
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
