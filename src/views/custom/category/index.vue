<template>
  <div class="container">
    <div class="category-content">
      <div v-for="category in categoryList" :key="category.id" class="base-category">
        <span class="parent-category" @click="getCategoryById(category.id)">{{ category.name }}</span>
        <span v-for="child in category.child" :key="child.id" class="child-category" @click="getCategoryById(child.id)">{{ child.name }}</span>
      </div>
    </div>

    <div class="product-list">

      <el-row>
        <el-card :body-style="{ padding: '0px'}" v-for="product in productList" :key="product.id">
          <div class="product-item" @click="toProductDetail(product.id)">
            <div class="product-img">
              <img :src="require('@/assets/goods/'+product.image)" class="product-image" alt="">
            </div>
            <div style="padding: 14px;">
              <span class="product-title">{{ product.title }}</span>
              <div class="bottom clearfix">
                <el-button link  style="color: #e55757">
                  <span>￥</span>
                  <span>{{ product.price }}</span>
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-row>

    </div>

  </div>
</template>

<script setup>
import {getCategoryList, getProductList} from "@/api/category"
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const categoryList = ref([])
const productList = ref([])

const initData = () => {
  categoryList.value = getCategoryList();
  let list = getProductList()
  list.forEach(item => {
    if (item.status === 10) {
      productList.value.push(item)
    }
  })
}

initData()

const getCategoryById = (id) => {
  router.push({path: "/category", query: {id: id}})
}

const toProductDetail = (id) => {
  router.push({path: "/product", query: {id: id}})
}

</script>

<style scoped>
.container {
  width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0 10px 0;
}

.category-content {
  margin: 20px 0;
  padding: 10px 20px;
  width: 1280px;
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;
}

.base-category {
  margin-top: 10px;
}

.parent-category {
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.child-category {
  margin-right: 10px;
  cursor: pointer;
}

.parent-category:hover, .child-category:hover {
  color: #f5baba;
}

.product-list {
  padding-left: 20px;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
}

.el-card {
  width: 400px;
  height: 150px;
  border: 1px solid black;
  margin: 0 20px 20px 0;
}

.product-list .product-item {
  width: 400px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
}

.product-img {
  width: 150px;
  height: 150px;
}

.product-img img {
  width: 150px;
  height: 150px;
}

.product-title {
  color: #666666;
}
</style>
