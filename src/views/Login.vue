<template>
<div class="wrapper">
  <div style="margin: 100px auto;background-color: #fff; width: 350px ;height: 300px;padding: 20px;border-radius: 10px">
    <div style="margin: 20px 0;text-align: center;font-size: 24px"><b>登录</b></div>
    <el-form :model="user" :rules="rules" ref="userForm"><!---显示错误信息--->
      <el-form-item prop="username">
        <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
      <el-input  size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
      </el-form-item>



      <el-form-item style="margin: 10px 0;text-align: right">
        <el-button type="primary" size="small" autocomplete="off" @click="login()">登录</el-button>
        <el-button type="warning" size="small" autocomplete="off" @click="$router.push('/register')">注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</div>
</template>

<script>
import {setRoutes} from "@/router";

export default {
  name: "Login",
  data(){
    return {
      user: {},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    login(){
      this.$refs["userForm"].validate ((valid) => {
        if (valid) {
          this.request.post("/user/login",this.user).then(res=>{
            if(res.code==='200'){
              localStorage.setItem("user",JSON.stringify(res.data))//存储用户信息
              localStorage.setItem("menus",JSON.stringify(res.data.menus))//存储用户信息

              setRoutes()
              this.$router.push("/")
              this.$message.success("登录成功")
            }else{
              this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      });


    },

  }
}
</script>

<style>
.wrapper{
  height: 100vh;
  background-image: linear-gradient(to bottom right,#FC466B,#3F5EFB);
  overflow: hidden;
}
</style>