<template>
  <view class="container">

    <swiper indicator-dots class="swiper">
      <swiper-item v-for="pic in carInfo.carPics" :key="pic">
        <image :src="pic" class="img" mode="aspectFit"></image>
      </swiper-item>
    </swiper>

    <view class="card">
      <view class="title">{{carInfo.carBrandName}} </view>
      <view class="price">{{carInfo.salePrice || '*' }}万
        <text style="text-decoration: line-through;font-size: 28rpx; color: #c9cac4;">{{carInfo.allSalePrice || '*' }}万
        </text>
      </view>
      <view class="time">
        <view class="left">
          <view class="uni-info"> 上牌时间: </view>
          <view>{{timeFormate(carInfo.registerTime)}}</view>
        </view>
        <!--        <view class="right">
          <view class="uni-info">年检到期时间:</view>
          <view>{{ timeFormate(carInfo.yearckTime)}}</view>
        </view> -->
      </view>

      <!--      <view class="time">
        <view class="left">
          <view class="uni-info"> 保险到期时间: </view>
          <view>{{timeFormate(carInfo.insureTime)}}</view>
        </view>
      </view> -->

      <view class="t-1"> 车源档案 </view>

      <uni-grid :column="3" :showBorder="true" :square="true">


        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.carTypeName}}</view>
            <view class="info">车型</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{timeFormate(carInfo.registerTime)}}</view>
            <view class="info">首次上牌</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.cityName}}</view>
            <view class="info">所在地</view>
          </view>
        </uni-grid-item>

        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.emissionStaName}}</view>
            <view class="info">排放标准</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.carMileage}}</view>
            <view class="info">表显里程(万)</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.displacement}}</view>
            <view class="info"> 排量</view>
          </view>
        </uni-grid-item>

        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.carGearBoxName}}</view>
            <view class="info">变速箱</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.carFuelTypeName}}</view>
            <view class="info">燃料类型</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.carColorName}}</view>
            <view class="info">车身颜色</view>
          </view>
        </uni-grid-item>


<!--        <uni-grid-item>
          <view class="item">
            <view>{{carInfo.transferTimes}}</view>
            <view class="info">过户次数</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{timeFormate(carInfo.yearckTime)}}</view>
            <view class="info">年检到期</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="item">
            <view>{{timeFormate(carInfo.insureTime)}}</view>
            <view class="info">保险到期</view>
          </view>
        </uni-grid-item> -->







      </uni-grid>
    </view>

    <view class="card">
      <view class="t-1"> 车况描述及说明</view>
      <view>
        {{carInfo.carDescribe}}
      </view>
    </view>

    <view class="card">
      <view class="t-1"> 车辆实拍</view>
      <image v-for="pic in carInfo.carPics" :key="pic" :src="pic" mode="aspectFit"></image>
    </view>

    <u-fab :gap="{ left: 16, right: 16, top: 16, bottom: 100 }" :draggable="true" v-if="!carInfo.isCollect">
      <template #trigger>
        <view class="btn-coll" @click="collCar" style=" background-color: #ffde03;
         border-radius: 50%;
         width: 100rpx;
         height: 100rpx;    
         text-align: center;  font-weight: 600;
         line-height: 100rpx;">
          收藏
        </view>
      </template>
    </u-fab>


    <u-fab :gap="{ left: 16, right: 16, top: 16, bottom: 100 }" :draggable="true" position="left-bottom"
      v-if="memberStatus == 2">
      <template #trigger>
        <view class="btn-coll" @click="updateCar" style=" background-color: #ffde03;
         border-radius: 50%;
         width: 100rpx;
         height: 100rpx;    
         text-align: center;  font-weight: 600;
         line-height: 100rpx;">
          {{carStatus === 1?'下架': '上架'}}
        </view>
      </template>
    </u-fab>


    <!--    <view class="bottom-container">

      <button class="btn-status" @click="updateCar" v-if="memberStatus === 2">
        {{carStatus === 1?'下架': '上架'}}
      </button>

   
    </view> -->

  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import dayjs from 'dayjs'
  import {
    useCarStore
  } from '@/store/car';
  import {
    ref,
    computed
  } from 'vue';
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'


  const onTrigger = () => {

    uni.showToast({
      title: '触发',
      icon: 'none'
    })
  }

  const CarStore = useCarStore()
  const userId = computed(() => CarStore.getUserId)

  const carStatus = computed(() => carInfo.value?.carStatus)
  const colled = ref(false)
  const carId = ref('')
  const carInfo = ref({})


  onLoad((query) => {
    carId.value = query.carId
  })

  const memberStatus = ref(0)


  onShow(() => {
    const _userId = wx.getStorageSync('userId')
    const _memberStatus = wx.getStorageSync('memberStatus')
    if (!_userId) {
      CarStore.setUserInfo({})
    } else {
      memberStatus.value = _memberStatus
      get_detail()
    }


  })

  const timeFormate = (v) => {
    return dayjs(v).format('YYYY/MM/DD')
  }

  const get_detail = async () => {
    try {
      const {
        data,
        code,
        msg
      } = await REQUEST.get({
        url: `/app-api/ylc/car/getCar`,
        data: {
          carId: carId.value,
        },
      })
      if (code == 0) {
        carInfo.value = data
      } else {
        throw new Error()
      }
    } catch (error) {
      carInfo.value = {}
      uni.showToast({
        title: '系统异常',
        icon: 'error'
      })
    }

  }


  const collCar = async () => {
    try {
      const {
        data,
        code
      } = await REQUEST.post({
        url: `/app-api/ylc/car/collCar`,
        data: {
          userId: userId.value,
          carId: carId.value,
          operate: 1
        },
      })
      if (code === 0) {
        colled.value = true
        uni.showToast({
          title: '收藏成功',
          icon: 'success'
        })
        get_detail()
      } else {
        throw new Error()
      }
    } catch (error) {
      uni.showToast({
        title: '出错了！',
        icon: 'none'
      })
    }


  }
  const updateCar = async () => {
    try {
      console.log(carStatus.value)
      // 1-上架；2-下架
      const {
        data,
        code
      } = await REQUEST.post({
        url: `/app-api/ylc/car/updateCar`,
        data: {
          // userId: userId.value,
          carId: carId.value,
          carStatus: carStatus.value === 2 ? 1 : 2
        },
      })
      if (code === 0) {
        colled.value = true
        uni.showToast({
          title: '操作成功',
          icon: 'success'
        })
        get_detail()
      } else {
        throw new Error()
      }
    } catch (error) {
      uni.showToast({
        title: '出错了！',
        icon: 'none'
      })
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    // padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
    // padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .swiper {
    width: 100%;
    height: 400rpx;

    .img {
      width: 100%;
    }

  }

  .t-1 {
    font-size: 32rpx;
    font-weight: 600;
    padding: 32rpx 0 16rpx;
  }

  .card {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
      -5px -5px 15px rgba(0, 0, 0, 0.05);
    padding: 32rpx;
    margin: 32rpx;
    border-radius: 16rpx;

    .title {
      font-weight: 600;
    }

    .price {
      color: $uni-error;
      font-weight: 600;
      font-size: 40rpx;
      padding: 16rpx 0;
    }

    .time {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;

      .left,
      .right {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
      }
    }

    .item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 16rpx;
      font-weight: 600;
      font-size: 28rpx;

      .info {
        color: $uni-info;
        font-weight: 400;
      }
    }
  }

  // .bottom-container {
  //   position: fixed;
  //   z-index: 99;
  //   bottom: 0;
  //   background-color: white;
  //   width: 100%;
  //   height: 120rpx;
  //   padding-bottom: constant(safe-area-inset-bottom);
  //   /*兼容 IOS<11.2*/
  //   padding-bottom: env(safe-area-inset-bottom);
  //   /*兼容 IOS>11.2*/
  //   padding-right: 32rpx;

  //   display: flex;
  //   justify-content: space-between;


  //   .btn-status,
  //   .btn-coll {
  //     width: 180rpx;
  //     height: 80rpx;
  //     line-height: 80rpx;
  //     margin: 0;
  //     margin-top: 16rpx;
  //     border-radius: 40rpx;
  //     background-color: #ffde03 !important;
  //     color: #000000;
  //   }


  //   .btn-status {
  //     margin-left: 32rpx;
  //   }

  //   .btn-coll {
  //     background-color: #ffde03 !important;
  //     border-radius: 50%;
  //     width: 100rpx;
  //     height: 100rpx;
  //     text-align: center;
  //     line-height: 100rpx;
  //   }

  // }
</style>