<template>
  <div class="container">
    <div class="warp">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in warpList" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="product-list">

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

  </div>
</template>

<script setup>
import {getProductList, getWarpList} from "@/api/home"
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const warpList = ref([])
const productList = ref([])

const initData = () => {
  warpList.value = getWarpList();
  let list = getProductList()
  list.forEach(item => {
    if (item.status === 10) {
      productList.value.push(item)
    }
  })
}

initData()

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

.warp {
  margin: 20px 0;
}

/*warp  */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.product-list {
  padding-left: 10px;
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