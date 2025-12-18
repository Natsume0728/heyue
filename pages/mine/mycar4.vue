<template>
  <view class="container">

    <u-subsection :list="list" :current="3" @change="sectionChange"></u-subsection>


  </view>
</template>


<script setup>
  import {
    onShow,
    onHide,
    onReady
  } from '@dcloudio/uni-app'
  import {
    computed,
    ref
  } from "vue"


  import REQUEST from '@/request/index.js'
  const list = ref([{
      name: '审核中'
    },
    {
      name: '在售'
    },
    {
      name: '下架'
    },
    {
      name: '已售'
    }
  ])

  // 定义分段器变化回调函数
  const sectionChange = (index) => {
    console.log(index)
    uni.redirectTo({
      url: '/pages/mine/mycar' + (index + 1)
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    background-color: white;
  }
</style>