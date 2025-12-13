<template>
  <view class="container">


    <radio-group @change="select_district">
      <uni-group v-for="item in DistrictOptions" :key="item.id">
        <radio :value="item.id" color="#FFCC33" style="transform:scale(0.7)" />
        {{item.name}}
      </uni-group>
    </radio-group>


  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onPageScroll,
    onLoad
  } from '@dcloudio/uni-app';
  import {
    getCurrentInstance,
    ref
  } from 'vue'
  import {
    groupBy
  } from 'lodash'
  let eventChannel = null




  const brand_slecet = ({
    item
  }) => {

  }

  const select_district = (evt) => {
    console.log(evt.detail)
    DistrictOptions.value.forEach(el => {
      if (el.id == evt.detail.value) {
        uni.navigateBack({
          delta: 1,
          success(res) {
            eventChannel.emit('from_quyu', {
              item: el
            });
          }
        })
      }
    })



  }


  const DistrictOptions = ref([])
  const getDistrict = async () => {
    if (!cityId.value) return
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getDistrict?cityId=${cityId.value}`,
    })
    DistrictOptions.value = data
  }

  const cityId = ref(null)
  onLoad(({
    city_id
  }) => {
    cityId.value = city_id
    // 1. 获取当前组件实例
    const instance = getCurrentInstance();
    // 2. 从实例中获取事件通道
    eventChannel = instance.proxy.getOpenerEventChannel();

    getDistrict()
  });
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;
    min-height: 100vh;

    .VehicleTypes-warp {
      padding: 32rpx;
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;

      .btn {
        margin: 0;

        &::after {
          border: none;
        }

        &.acitve {
          background-color: #ffde03 !important;
        }
      }
    }

    .bottom-btns {

      padding: 64rpx 32rpx 0;
      display: flex;
      justify-content: space-between;
      gap: 64rpx;

      .confirm-btn {
        width: 50%;
        color: #000000;
        background-color: #ffde03;

        &::after {
          border: none;
        }
      }


      .reset_btn {
        width: 50%;

        &::after {
          border: none;
        }

      }

    }


  }
</style>