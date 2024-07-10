<template>
  <div class="container">
    <div class="header">

      <div class="left">
        <a href="/">
          <img class="logo" src="@/assets/logo.png" alt="logo">
          <span class="mall-title">商城系统</span>
        </a>
      </div>

    </div>

    <el-form :model="form" ref="form" :rules="rules" label-width="80px" class="login-form">
      <h2 class="title">商城系统登录页面</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="toLogin('form')" type="primary" plain>登录</el-button>
        <el-button type="danger" @click="toReg" plain>注册</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  data() {

    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 6 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', onTrigger: 'blur'},
          {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
        ]
      }
    };
  },

  methods: {
    toLogin(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: "登录成功",
            showClose: true,
            type: "success",
            duration: 3000
          })
          this.$store.dispatch('Login',this.form)
          this.$router.push("/")
        } else {
          return false
        }
      })
    },
    toReg() {
      this.$router.push("/reg")
    }


  }
}
</script>

<style scoped>
.title {
  text-align: center;
  color: #444;
  margin-bottom: 20px;
}

.login-form {
  width: 450px;
  margin: 160px auto;
  background-color: #dadada;
  padding: 30px;
  border-radius: 20px;
}

.header {
  line-height: 50px;
  background-color: #f5baba;
  display: flex;
}

a {
  text-decoration: none;
  color: #333;
}

.logo {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  margin: 0 10px 0 40px;
}
</style>