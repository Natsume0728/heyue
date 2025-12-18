<template>
  <view class="card" @click="to_detail">

    <image :src="carInfo.maiPic" class="img"></image>

    <view style="flex-grow:1">

      <view class="title"> {{carInfo.carBrandName || "-"}} </view>
      <view class="sub-title">
        <view>{{ timeFormate (carInfo.registerTime)  }}年上牌 </view>
        <view>{{carInfo.carMileage || '-'}}万公里</view>
        <view> {{carInfo.regionName}} </view>
      </view>
      <view class="bottom-title">
        <view class="right"> {{carInfo.salePrice || '*' }}万</view>
        <u-tag v-if="carInfo.allSalePrice" text="可批" type="warning" shape="circle" mode="dark" size="mini" />
        <u-tag v-if="carInfo.newStatus" text="新上" type="warning" shape="circle" mode="dark" size="mini" />
      </view>
    </view>
  </view>
</template>
<!-- newStatus
allSalePrice -->
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
        return dayjs(v).format('YYYY')
        // return dayjs(v).format('YYYY/MM/DD HH:mm:ss')
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
    // box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1), -5px -5px 15px rgba(0, 0, 0, 0.05);
    margin: 16rpx 0;
    padding: 16rpx;
    background: white;

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
      color: $uni-info;


    }

    .bottom-title {
      display: flex;
      gap: 8rpx;
      align-items: center;
      // justify-content: space-between;
      // color: $uni-info;
      // font-size: 24rpx;

      color: $uni-error;
      font-weight: 600;
      font-size: 28rpx;

    }

  }
</style>