<template>
  <div class="header">
    <div class="container">
      <div class="left">
        <a href="/">
          <img class="logo" src="@/assets/logo.png" width="30px" alt="logo">
          <span class="mall-title">商城系统</span>
        </a>
      </div>

      <div class="middle">
        <span class="nav-span" :class="{'active':$route.path === '/'}"><router-link class="nav-link"
                                                                                    to="/">商城首页</router-link></span>
      </div>

      <div class="right">
        <el-dropdown @command="handleCommand">
          <div class="el-dropdown-link nickname">
            <div style="line-height: 50px" v-if="!userinfo">
              昵称
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>

            <div style="line-height: 50px" v-if="userinfo">
              {{ userinfo.username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>

          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>


    <el-dialog title="修改密码" v-model="dialogFormVisible" width="500px">
      <el-form :model="pwdForm" :rules="updatePwdRules" ref="pwdForm" label-width="100px" style="width: 400px">
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="pwdForm.oldPass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="pwdForm.password" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pwdForm.checkPass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-form-item>
            <el-button @click="updatePwd('pwdForm')" type="primary">提交</el-button>
          </el-form-item>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import {logout} from "@/api/login";
import {ref,reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const store = useStore()
const router = useRouter()
const dialogFormVisible = ref(false)
const pwdForm = ref({
  oldPwd: '',
  password: '',
  confirmPwd: ''
})
const userinfo = ref({})

const initData = () => {
  userinfo.value = store.state.home.userinfo
}
initData()

const checkedPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== pwdForm.value.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
}

const updatePwdRules = reactive({
  oldPwd: [
    {required: true, message: '旧密码不能为空', onTrigger: 'blur'},
    {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '新密码不能为空', onTrigger: 'blur'},
    {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
  ],
  confirmPwd: [
    {required: true, validator: checkedPwd, onTrigger: "blur"},
  ]
})

const handleCommand = (command)=>{
  switch (command) {
    case 'updatePwd':
      // 打开修改密码窗口
      handlePwd()
      break;
    case 'logout':
      // 退出系统
      toLogout()
      break;
    default:
      break;
  }
}

const toLogout = () => {
  logout()
  router.push("/login")
  ElMessage({
    message: "已退出登录",
    type: "info",
    showClose: true,
  })
}

const resetForm = () => {
  pwdForm.value = {
    oldPwd: '',
    password: '',
    confirmPwd: ''
  }
}

const handlePwd = () => {
  dialogFormVisible.value = true
  resetForm()
}

const updatePwd = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #333;
}

.container {
  line-height: 48px;
}

.logo {
  vertical-align: middle;
  width: 30px;
  height: 30px;
  margin: 0 10px 0 40px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container .left {
  font-size: 18px;
}

.container .right {
  margin-right: 40px;
  cursor: pointer;
}

.el-dropdown {
  font-size: 18px;
  color: #333333;
}

.container .middle {
  display: flex;
  justify-content: left;
}

.nav-span {
  text-align: center;
  width: 150px;
}

.nav-link {
  display: inline-block;
  width: 100%;
}

.active {
  background-color: #c5c5c5;
}

.nav-span:hover {
  background-color: #c5c5c5;
}
</style>