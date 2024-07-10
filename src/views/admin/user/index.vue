<template>
  <div class="container">
    <div class="admin-header">
      <div class="admin-nav">
        <el-tabs v-model="default_nav" @tab-click="changeTab">
          <el-tab-pane label="用户列表" name="50">用户列表</el-tab-pane>
          <el-tab-pane label="解封用户" name="20">解封用户</el-tab-pane>
        </el-tabs>
      </div>

      <div class="admin-search">
        <el-form :inline="true" ref="search" :model="search" class="demo-form-inline">

          <el-form-item prop="username">
            <el-input v-model="search.username" placeholder="用户账号" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>


    <div class="admin-content">

      <el-table
          :data="userList"
          border
          style="width: 100%">

        <el-table-column
            fixed
            prop="index"
            label="序号"
            width="80">
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="username"
            label="账号"
            show-overflow-tooltip
            width="200">
        </el-table-column>

        <el-table-column
            prop="nickname"
            label="昵称"
            width="150">
        </el-table-column>

        <el-table-column
            prop="avatar"
            label="头像"
            width="150">
          <template v-slot="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="require('@/assets/avatar/'+scope.row.avatar)" style="width: 250px;height: 250px"/>
              <template #reference>
                <img :src="require('@/assets/avatar/'+scope.row.avatar)" style="width: 50px;height: 50px;"/>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template v-slot="scope">
            <el-button link size="small">查看</el-button>
            <el-button v-if="scope.row.status === 10" link  style="color: #e55757" size="small"
                       @click="lockUser(scope.$index)">封禁
            </el-button>
            <el-button v-if="scope.row.status === 20" link  style="color: #ffb73d" size="small"
                       @click="unLockUser(scope.$index)">解封
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
      </el-pagination>

    </div>

  </div>
</template>

<script setup>

import {getUserList} from "@/api/user"
import {ref} from "vue";
import {ElMessage} from "element-plus";

const default_nav = ref("50")
const userList = ref([])
const search = ref({
  username: ""
})

const initData = () => {
  userList.value = getUserList()
}
initData()

const toSearch = () => {
  ElMessage({
    message: "后台无数据",
    showClose: true,
    duration: 3000,
    type: "error"
  })
}

const lockUser = (index) => {
  userList.value[index].status = 20
}

const unLockUser = (index) => {
  userList.value[index].status = 10
}

const changeTab = (tab) =>{
  initData()
  let tabName = tab.props.name
  if (tabName === "50") {
    return
  }
  let list = []
  userList.value.forEach(item => {
    if (tabName === (item.status + "")) {
      list.push(item)
    }
  })
  userList.value = list
}

</script>

<style scoped>
.admin-header {
  display: flex;
}

.admin-nav {
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  margin-right: 20px;
}

.admin-search {
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.admin-content {
  margin-top: 20px;
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 1580px;
}

.el-pagination {
  margin: 20px;
}
</style>