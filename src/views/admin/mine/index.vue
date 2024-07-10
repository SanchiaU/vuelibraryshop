<template>
  <div class="container">
    <div class="mine-nav">
      <el-tabs v-model="default_nav">
        <el-tab-pane label="个人信息" name="10">个人信息</el-tab-pane>
      </el-tabs>
    </div>
    <div class="mine-content">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="账号" prop="username">
          <span style="user-select: none">廖宇浩</span>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-col :span="input_span">
            <el-input v-model="form.nickname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生日" required>
          <el-col :span="input_span">
            <el-form-item prop="birthday">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button plain type="warning">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const default_nav = ref("10")
const input_span = ref(20)
const form = ref({
  username: '',
  nickname: '',
  gender: '',
  birthday: ''
})

</script>

<style scoped>
.mine-nav {
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 680px;
}

.mine-content {
  margin-top: 20px;
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 680px;
}

.el-date-picker {
  cursor: pointer;
}
</style>