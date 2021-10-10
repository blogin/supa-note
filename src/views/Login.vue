<template>
  <div>
    <div class="form">
      <el-input
        placeholder="Please input"
        v-model="email"
        class="inp"
      ></el-input>
      <el-input
        placeholder="Please input password"
        v-model="pass"
        show-password
        class="inp"
      ></el-input>
      <div class="btn-group">
        <el-button :loading="btnLoading" @click="check()">LogIn</el-button>
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
.form {
  width: 300px;
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
}
.inp {
  margin: 5px 0;
}
</style>
