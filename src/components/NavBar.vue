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
      <el-menu-item index="Arch">
        <router-link to="/archive" class="dropdown-item outline"
          >Архив</router-link
        >
      </el-menu-item>
      <el-menu-item index="addNote" @click="setShowModal(true)"
        >Добавить заметку</el-menu-item
      >

      

      <!-- Поиск значений -->
      <el-menu-item index="search">
        <div @keyup.enter="setSearchFilter(search)">
          <el-input
            placeholder="Поиск..."
            v-model="search"
            class="inp-search"
          ></el-input>
          <i class="el-icon-search search-custom-icon" @click="searchTxt()"></i>
        </div>
      </el-menu-item>
      <!--  -->

      <!-- Фильтрация по цвету -->
      <el-menu-item index="colorFilter">
        Фильтр по цвету:
        <el-popover placement="top" width="175" v-model="visible">
          <p>Выберите цвет заметки</p>
          <div class="grid-color">
            <div v-for="(c, i) in predefineColors" :key="i">
              <div
                class="example-color"
                :style="{ backgroundColor: c }"
                @click="setColorFilter(c)"
                :class="{ bordered: i == 0 }"
              ></div>
            </div>
          </div>
          <p @click="setColorFilter(null)" class="cancel-color-filter">
            Отменить фильтрацию
          </p>
          <img
            src="../assets/c2.png"
            width="35"
            height="35"
            slot="reference"
            title="Цвет заметки"
            class="img-popover"
          />
        </el-popover>
      </el-menu-item>
      <!--  -->
      <el-menu-item index="sColor">
        <div
          class="selectedColor"
          :class="{ bordered: colorFilter == '#fff' }"
          :style="{ background: colorFilter }"
          v-if="colorFilter"
        ></div>
      </el-menu-item>
      <el-menu-item index="LogOut">Выйти</el-menu-item>
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
      search: "",
      visible: false,
    };
  },
  computed: {
    ...mapGetters(["predefineColors", "colorFilter"]),
  },
  methods: {
    ...mapMutations([
      "setUserId",
      "setShowModal",
      "setShowNavBar",
      "setListOfNotes",
      "setColorFilter",
      "setSearchFilter",
    ]),
    searchTxt() {
      this.setSearchFilter(this.search);
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
.t-color-f-design {
  margin-bottom: 10px;
}
.selectedColor {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin-top: 18px;
  margin-left: -30px;
}
.search-custom-icon {
  font-size: 28px !important;
  margin: 2px 5px !important;
  color: #b8b7b7 !important;
  transition: 0.4s;
}
.search-custom-icon:hover {
  color: #c7782f !important;
  transition: 0.4s;
}
.cancel-color-filter {
  cursor: pointer;
  transition: 0.4s;
}
.cancel-color-filter:hover {
  color: #cc4510;
  transition: 0.4s;
}
.example-color {
  width: 25px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
}
.bordered {
  border: 1px solid lightgrey;
  width: 23px !important;
  height: 23px !important;
}
.img-popover {
  margin-bottom: 5px;
}
.inp-search {
  margin-bottom: 5px;
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
