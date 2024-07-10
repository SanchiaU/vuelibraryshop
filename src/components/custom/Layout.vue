<template>
  <div>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "./header"
import Main from "./main"
import Footer from "./footer"


</script>

<style scoped>
.header {
  /*position: absolute;*/
  line-height: 50px;
  background-color: #19ab0e;
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  /*overflow-y: auto;*/
}

.main {
  top: 50px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}

.footer {
  line-height: 50px;
  background-color: #45b609;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>