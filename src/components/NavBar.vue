<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/" class="dropdown-item">Добавить заметку</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/archive" class="dropdown-item">Архив</router-link>
      </el-menu-item>
      <el-menu-item index="LogOut">
        Выйти
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import firebase from "firebase"
import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      ...mapMutations(["setUserId"]),
      handleSelect(key, keyPath) {
        if(key == "LogOut"){
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.$message({
                  dangerouslyUseHTMLString: true,
                  message: '<span style="font-size:17px;">Вы успешно вышли</span>',
                  type: 'success',
                  showClose: true,
                  duration: 2000
                });
                this.setUserId(null)
                this.$router.push('/');
              })
              .catch(error => {
                  this.$message({
                    dangerouslyUseHTMLString: true,
                    message: `<span style="font-size:17px;">${error.message}</span>`,
                    type: 'error',
                    showClose: true,
                    duration: 4000
                  });
                  this.$router.push('/');
              });
        }
      }
    }
  }
</script>

<style scoped>
.el-menu {
  margin-bottom: 20px;
}
</style>
