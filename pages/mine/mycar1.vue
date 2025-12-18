<template>
  <view class="container">

    <u-subsection :list="[{
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
  ]" :current="0" @change="sectionChange"></u-subsection>


  </view>
</template>


<script setup>
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
  const list = ref([])
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
        "saleStatus": 0
      }
    })

    list.value = data.list
    total.value = data.total || 0
  }

  onReachBottom(() => {
    if (list.value.length >= total.value) return
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