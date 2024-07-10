<template>
  <div class="container">

    <div class="header" v-if="product">

      <div class="left">
        <img v-if="product.image" :src="require('@/assets/goods/'+product.image)" alt="">
      </div>
      <div class="right">
        <div class="title">
          <h4>商品名</h4>
          <span>{{ product.title }}</span>
        </div>
        <div class="desc">
          <h4>商品描述</h4>
          <span>{{ product.desc }}</span>
        </div>
        <div class="size">
          <h4>商品款式</h4>
          <div class="size-list">

            <span v-for="(item,index) in product.sizeList" :key="index" class="size-list-item"
                  @click="sizeChange(index)"
                  :class="{active:index === currentId}">{{ item.title }}</span>
          </div>
        </div>
        <div class="price">
          <h4>商品价格</h4>
          <span style="color: #e55757">
            <span>￥</span>
            <span>{{ product.price }}</span>
          </span>
        </div>
        <div class="quantity">
          <el-input-number v-model="selectQuantity" :min="1" :max="999" :step="1"></el-input-number>
        </div>
        <div class="options">
          <el-button type="danger" plain @click="addToCart">添加到购物车</el-button>
          <el-button type="danger" plain>立即购买</el-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import {getProductList} from "@/api/product"
import {add} from "@/api/cart"
import {ref} from "vue";

import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const route = useRoute()

const productId = route.query["id"]

const product = ref({
  id: 1,
  title: "",
  stock: 1,
  desc: "",
  image: "",
  price: 1,
  sizeList: [],
  status: 1
})
const selectQuantity = ref(1)
const currentId = ref(0)
const list = ref([])
const selectSize = ref("")

const initData = () => {
  list.value = getProductList()
  list.value.forEach(item => {
    if (productId + "" === item.id + "") {
      product.value = item
    }
  })
}

initData()

const sizeChange = (index) => {
  currentId.value = index
  selectSize.value = product.value.sizeList[index].title
}

const addToCart = () => {
  let {title,price,image} = product.value
  let size = selectSize.value
  let quantity = selectQuantity.value
  let amount = quantity * price
  if (size === ''){
    size = product.value.sizeList[0].title
  }
  add({title,price,image,quantity,size,amount})
  ElMessage({
    message: "添加成功",
    type: "success",
    showClose: true,
    duration: 3000
  })
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  height: 640px;
  padding: 20px;
  border: 1px solid #999999;
  border-radius: 20px;
}

.header .left img {
  width: 600px;
  height: 600px;
}

.header .right {
  width: 600px;
  height: 600px;
  padding: 0 20px;
}

.header .right .title, .desc, .price, .size, .quantity, .options {
  margin-bottom: 20px;
}

.header .right h4 {
  margin-bottom: 10px;
}

.header .right .size-list {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
}

.size-list-item {
  border: 1px solid #999999;
  padding: 5px 8px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  user-select: none;
}

.active {
  background-color: red;
}
</style>