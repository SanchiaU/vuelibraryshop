<template>
  <div class="navbar">
    <el-col :span="12">
      <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical-demo">

        <el-menu-item index="/admin">
          <template #title>
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/admin/product/">
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品管理</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/admin/order/">
          <template #title>
            <el-icon><Notebook /></el-icon>
            <span>订单管理</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/admin/user/">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>用户管理</span>
          </template>
        </el-menu-item>


      </el-menu>
    </el-col>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.el-col{
  width: 248px;
  ul{
    width: 248px;
  }
}
.el-menu-item{
  border-bottom: 1px solid #999;
}
</style>