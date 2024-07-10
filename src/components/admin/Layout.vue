<template>
  <div>
    <Header></Header>
    <Navbar></Navbar>
    <Main></Main>
  </div>
</template>

<script setup>
import Header from "./header"
import Navbar from "./navbar"
import Main from "./main"

</script>

<style scoped>
.header{
  position: absolute;
  height: 50px;
  background-color: #f5baba;
  top: 0;
  left: 0;
  right: 0;
}
.navbar{
  position: absolute;
  width: 248px;
  top: 50px;
  left: 0;
  bottom: 0;
  /*background-color: #858654;*/
  overflow-y: auto;
}
.main{
  position: absolute;
  top: 50px;
  left: 248px;
  right: 0;
  bottom: 0;
  /*background-color: #519f3c;*/
  border-left: 1px solid #999;
  overflow-y: auto;
  padding: 20px;
}
</style>