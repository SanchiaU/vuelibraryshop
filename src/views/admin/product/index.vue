<template>
  <div class="container">
    <div class="admin-header">
      <div class="admin-nav">
        <el-tabs v-model="default_nav" @tab-click="changeTab">
          <el-tab-pane label="商品列表" name="30">商品列表</el-tab-pane>
          <el-tab-pane label="上架商品" name="10">下架商品</el-tab-pane>
          <el-tab-pane label="下架商品" name="20">上架商品</el-tab-pane>
        </el-tabs>
      </div>
      <div class="admin-options">
        <el-button @click="dialogFormVisible = true">添加商品</el-button>
      </div>
      <div class="admin-search">
        <el-form :inline="true" ref="search" :model="search" class="demo-form-inline">
          <el-form-item prop="productName">
            <el-input v-model="search.productName" placeholder="商品名" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="admin-content">

      <el-table
          :data="productList"
          border
          style="width: 100%">

        <el-table-column
            fixed
            prop="index"
            label="序号"
            width="50">
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="title"
            label="商品名"
            show-overflow-tooltip
            width="150">
        </el-table-column>

        <el-table-column
            prop="price"
            label="商品价格"
            width="120">
        </el-table-column>

        <el-table-column
            prop="image"
            label="商品图片"
            width="120">
          <template v-slot="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="require('@/assets/goods/'+scope.row.image)" style="width: 250px;height: 250px;" alt=""/>
              <template #reference>
                <img :src="require('@/assets/goods/'+scope.row.image)"
                     style="width: 50px;height: 50px;" alt=""/>
              </template>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
            prop="stock"
            label="商品库存"
            width="120">
        </el-table-column>

        <el-table-column
            prop="desc"
            label="描述"
            show-overflow-tooltip
            width="200">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template v-slot="scope">
            <el-button link size="small">查看</el-button>
            <el-button link size="small">编辑</el-button>
            <el-button v-if="scope.row.status === 20" link size="small" style="color: #e55757"
                       @click="upSeal(scope.$index)">上架
            </el-button>
            <el-button v-if="scope.row.status === 10" link size="small" @click="downSeal(scope.$index)">下架
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

    <!--  添加商品  -->
    <el-dialog title="收货地址" v-model="dialogFormVisible">
      <el-form :model="newProduct">

        <el-form-item label="商品名">
          <el-input type="text" minlength="1" maxlength="3" v-model="newProduct.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品价格">
          <el-input-number v-model="newProduct.price" :precision="2" :step="0.01" :min="0.01" :max="1000000000"
                           autocomplete="off"></el-input-number>
        </el-form-item>

        <el-form-item label="商品图片">
          <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              accept=".jpg,.png"
              :multiple="false"
              :limit="1">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="商品库存">
          <el-input-number v-model="newProduct.stock" :precision="0" :step="1" :min="1" :max="100000"
                           autocomplete="off"></el-input-number>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input type="textarea" minlength="1" maxlength="150" v-model="newProduct.desc"
                    autocomplete="off"></el-input>
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>

import {getProductList} from '@/api/product'
import {ref} from "vue";
import {ElMessage} from "element-plus";

const default_nav = ref("30")
const dialogFormVisible = ref(false)
const dialogImageUrl = ref("")
const newProduct = ref({
  title: '',
  price: 0,
  stock: 0,
})

const search = ref({
  productName: ""
})
const productList = ref([])

const initData = () => {
  productList.value = getProductList()
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

const changeTab = (tab) => {
  initData()
  let tabName = tab.props.name
  if (tabName === "30") {
    return
  }
  let list = []
  for (let i = 0; i < productList.value.length; i++) {
    if (tabName === (productList.value[i].status + "")) {
      list.push(productList.value[i])
    }
  }
  productList.value = list
}

const upSeal = (index) => {
  productList.value[index].status = 10
}

const downSeal = (index) => {
  productList.value[index].status = 20
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

.admin-options {
  border: 1px solid #666666;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
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