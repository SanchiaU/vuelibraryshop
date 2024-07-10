<template>
  <div class="container">
    <div class="cart-list">

      <div v-if="cartList.length < 1">
        <h1>购物车空空的，快去购物吧</h1>
      </div>

      <el-row v-if="cartList.length > 0">
        <el-col>
          <el-card :body-style="{ padding: '0px' }">
            <div class="cart-list-header">
              <span style="font-size: 22px">购物车(全部<span>{{ cartList.length }}</span>)</span>
              <el-checkbox v-model="allCheck" class="all-check" @change="changeAllCheck">全选</el-checkbox>
              <el-button type="warning" @click="removeMany">移除</el-button>
              <el-button type="danger" @click="buyMany">购买</el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :span="24" v-for="(product,index) in cartList.slice().reverse()" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <div class="cart-item">
              <el-checkbox v-model="product.selected" class="checkedBox" @change="singleSelect"></el-checkbox>
              <img :src="require('@/assets/goods/'+product.image)"
                   class="product-image" alt="">
              <div class="product-title">{{ product.title }}</div>

              <div class="product-item-quantity">
                <span class="product-quantity-title">数量：</span>
                <el-input-number v-model="product.quantity" size="small" :min="1" :max="product.stock"
                                 @change="quantityChange(product)"
                                 :step="1"></el-input-number>
              </div>

              <div class="product-item-size">
                <span class="product-quantity-title">尺码：</span>
                <span>{{ product.size }}</span>
              </div>

              <div class="product-item-price">
                <span class="product-price-title">单价：</span>
                <span class="product-price">￥{{ product.price }}</span>
              </div>

              <div class="product-item-price">
                <span class="product-price-title">总价：</span>
                <span class="product-price">￥{{ product.amount }}</span>
              </div>

              <el-button type="warning" @click="removeOne(product)">移除</el-button>
              <el-button type="danger" @click="buyOne(product.id)">购买</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script setup>
import {getList} from "@/api/cart"
import {ElMessage} from "element-plus";
import {ref} from "vue";

const allCheck = ref(false)
const cartList = ref([])

const initData = () => {
  cartList.value = getList()
}

initData()

const quantityChange = (product) => {
  product.amount = (product.quantity * product.price).toFixed(2)
}

const changeAllCheck = () => {
  if (allCheck.value) {
    cartList.value.forEach(item => {
      item.selected = true
    })
  } else {
    cartList.value.forEach(item => {
      item.selected = false
    })
  }
}

const singleSelect = () => {
  let checkCount = 0;
  cartList.value.forEach(item => {
    if (item.selected) {
      checkCount++
    }
  })
  if (checkCount === cartList.value.length) {
    allCheck.value = true
  } else {
    allCheck.value = false
  }
}

const removeOne = (product) => {
  let index = cartList.value.indexOf(product)
  cartList.value.splice(index, 1)

  ElMessage({
    message: "移出成功",
    type: "success",
    showClose: true,
    duration: 3000
  })
}

const removeMany = () => {
  let list = []
  cartList.value.forEach(item => {
    if (item.selected) {
      list.push(item)
    }
  })
  if (list.length === 0) {
    ElMessage({
      message: "请勾选需要移除的商品",
      type: "error",
      showClose: true,
      duration: 3000
    })
    return
  }

  for (let i = 0; i < list.length; i++) {
    let index = cartList.value.indexOf(list[i])
    cartList.value.splice(index, 1)
  }

  ElMessage({
    message: "移除成功",
    type: "success",
    showClose: true,
    duration: 3000
  })
}

const buyOne = (id) => {
  ElMessage({
    message: "买了" + id,
    type: "error",
    showClose: true,
    duration: 3000
  })
}

const buyMany = () => {

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
  width: 1280px;
  height: 300px;
  background-color: #e55757;
  border: 1px solid black;
}

.cart-list {
  padding-left: 10px;
}

.cart-list .el-card {
  border: 1px solid black;
  width: 1280px;
  margin-bottom: 10px;
}

.cart-list-header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 10px 20px;
}

.all-check {
  margin: 0 20px;
}

.cart-list .cart-item {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 90px;
  padding: 10px 20px;
}

.checkedBox {
  transform: scale(150%)
}

.cart-list .cart-item .el-checkbox {
  margin-right: 10px;
}

.cart-list .product-image {
  width: 60px;
  height: 60px;
}

.product-title {
  font-size: 14px;
  color: #666;
  width: 200px;
  margin: 0 20px;
}

.product-title:hover {
  cursor: pointer;
  color: #e55757;
}

.product-item-quantity {
  color: #999999;
  margin-right: 10px;
  width: 180px;
}

.product-item-size {
  color: #999999;
  user-select: none;
  width: 180px;
}

.product-item-price {
  width: 180px;
  margin-left: 10px;
}

.product-price-title {
  color: #999999;
  user-select: none;
}

.product-price {
  color: #e55757;
}
</style>