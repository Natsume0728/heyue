<template>
  <view class="card" @click="to_detail">

    <image src="./test.jpeg" class="img"></image>

    <view style="flex-grow:1">
      <up-text text="我用十年青春,赴你最后之约"></up-text>

      <view class="title"> {{carInfo.carBrand || "-"}} </view>
      <view class="sub-title">
        <view class="left">{{carInfo.produceTime}}年 / {{carInfo.carCarMileage}}万公里</view>
        <view class="right"> {{carInfo.carPrice || '*' }}万</view>
      </view>
      <view class="bottom-title">
        <view class="left">{{ timeFormate (carInfo.updateTime)  }} </view>
        <view class="right">{{carInfo.carRegionId}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import dayjs from 'dayjs'
  import REQUEST from '@/request/index.js'
  export default {
    props: {
      carInfo: {
        type: Object,
        default: () => {}
      },
    },
    filters: {

    },
    methods: {
      timeFormate(v) {
        return dayjs(v).format('YYYY/MM/DD HH:mm:ss')
      },

      async to_detail() {
        await REQUEST.get({
          url: `/app-api/ylc/car/getCar`,
          data: {
            carId: this.carInfo.carId,
          },
        })
        uni.navigateTo({
          url: `/pages/detail/detail?carId=${this.carInfo.carId}`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    display: flex;
    align-items: center;
    border-radius: 16rpx;
    overflow: hidden;
    // box-shadow: 0 5px 0 0 $uni-info;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(0, 0, 0, 0.05);
    margin: 16rpx 0;
    padding: 16rpx;

    .img {
      width: 240rpx;
      height: 160rpx;
      flex-shrink: 0;
      border-radius: 8rpx;
      margin-right: 16rpx;
    }

    .title {
      font-weight: 600;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .sub-title {
      width: 100%;
      display: flex;
      justify-content: space-between;

      font-size: 24rpx;

      .left {
        color: $uni-info;
      }

      .right {
        color: $uni-error;
        font-weight: 600;
        font-size: 28rpx;
      }
    }

    .bottom-title {
      display: flex;
      justify-content: space-between;
      color: $uni-info;
      font-size: 24rpx;

    }

  }
</style>