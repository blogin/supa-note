<template>
  <div>
    <div class="form">
      <el-input placeholder="Please input" v-model="login" class="inp"></el-input>
      <el-input placeholder="Please input password" v-model="pass" show-password class="inp"></el-input>
      <div class="btn-group">
        <el-button :loading="true">LogIn</el-button>
        <el-button type="info">Register</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      login:"",
      pass:""
    }
  }
}
</script>

<style scoped>
.form{
  width: 300px;
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
}
.inp{
  margin: 5px 0;
}
</style>
