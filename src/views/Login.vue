<template>
  <div class="form-cont">
    <div class="form">
      <el-input
        placeholder="Please input"
        v-model="email"
        class="inp"
      ></el-input>
      <!-- Обертка в div потому как у el-input нет возможности использовать @keyup.enter -->
      <div @keyup.enter="check()">
      <el-input
        placeholder="Please input password"
        v-model="pass"
        show-password
        class="inp"
      ></el-input></div>
      <div class="btn-group">
        <el-button :loading="btnLoading" @click="check()" >LogIn</el-button>
        <el-button type="info" @click="register()" :loading="btnLoadingReg">Register</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      email: "",
      pass: "",
    };
  },
  watch: {
    userId() {
      this.getListOfNotes(this.userId);
    },
  },
  computed: {
    ...mapGetters(["btnLoading", "userId", "btnLoadingReg"]),
  },
  methods: {
    ...mapActions(["logInCheck", "getListOfNotes", "RegisterUser"]),
    ...mapMutations(["setBtnLoading", "setBtnLoadingReg"]),
    check() {
      this.setBtnLoading(true)
      this.logInCheck({ email: this.email, pass: this.pass });
    },
    register() {
      this.setBtnLoadingReg(true)
      this.RegisterUser({ email: this.email, pass: this.pass });
    },
  },
};
</script>

<style scoped>
.form-cont{
  position: relative;
  
}
.form {
  width: 300px;
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,170%);
}
.inp {
  margin: 5px 0;
}
</style>
