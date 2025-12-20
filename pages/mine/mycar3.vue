<template>
  <view class="container">

    <u-subsection :list="[
      { name: '审核中' },
      { name: '在售' },
      { name: '下架' },
      { name: '已售' }  
    ]" :current="3" @change="sectionChange"></u-subsection>

    <Card v-for="item in carList" :key="item.carId" :carInfo="item"> </Card>
  </view>
</template>


<script setup>
  import Card from './Card.vue'
  import {
    onShow,
    onHide,
    onReady,
    onReachBottom
  } from '@dcloudio/uni-app'
  import {
    computed,
    ref
  } from "vue"

  import REQUEST from '@/request/index.js'
  const carList = ref([])
  const total = ref(0)
  const pageSize = ref(10)
  const getMyCar = async () => {
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/getMyCar`,
      data: {
        "pageNo": 1,
        "pageSize": pageSize.value,
        "saleStatus": 3
      }
    })

    carList.value = data.list
    total.value = data.total || 0
  }

  onReachBottom(() => {
    if (carList.value.length >= total.value) return
    pageSize.value += 10
    getMyCar()
  })

  onShow(() => {
    getMyCar()
  })

  // 定义分段器变化回调函数
  const sectionChange = (index) => {
    console.log(index)
    uni.redirectTo({
      url: '/pages/mine/mycar' + index
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    // background-color: white;
    padding: 0 32rpx;
  }
</style>