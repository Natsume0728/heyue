<template>
  <view class="container">

    <u-subsection :list="[
      { name: '审核中' },
      { name: '在售' },
      { name: '下架' },
      { name: '已售' }  
    ]" :current="0" @change="sectionChange"></u-subsection>

    <Card v-for="item in carList" :key="item.carId" :carInfo="item" :saleStatus="0"> </Card>
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
    // const {
    //   data,
    //   code
    // } = {
    //   "code": 0,
    //   "msg": "",
    //   "data": {
    //     "total": 21,
    //     "list": [{
    //       "carId": 9,
    //       "carBrandName": "奥迪A4L2018款 30周年年型 40 TFSI 进取型",
    //       "carTypeName": "轿车",
    //       "carPrice": 30.7,
    //       "salePrice": 11.0,
    //       "allSalePrice": 10.0,
    //       "carMileage": 11.0,
    //       "carColorName": "黑色",
    //       "carGearBoxName": "自动",
    //       "registerTime": 1506787200000,
    //       "carFuelTypeName": "汽油",
    //       "emissionStaName": "国V",
    //       "displacement": 2.0,
    //       "yearckTime": 1767196800000,
    //       "insureTime": 1767196800000,
    //       "transferTimes": 2,
    //       "carDescribe": "饿不都么就行民意信了看咯明星吗",
    //       "newStatus": true,
    //       "maiPic": "https://ylc-car-pic.oss-cn-wuhan-lr.aliyuncs.com/carPic/c0d3b0d0-935a-461c-9247-a36e4b7032b2.jpg",
    //       "cityName": null,
    //       "regionName": "江岸区",
    //       "carPics": null,
    //       "mobile": null,
    //       "isCollect": null,
    //       "carStatus": null
    //     }, ]
    //   }
    // }


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