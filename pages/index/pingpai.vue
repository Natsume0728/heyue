<template>
  <view class="container">


    <uni-indexed-list  :options="brandOptions" :show-select="true" @click="brand_slecet" />
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
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_pingpai', {
          item: item
        });
      }
    })
  }
  const brandOptions = ref([])
  const getOrderCol = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getCarBrands`,
    })
    console.log(groupBy(data, 'firstletter'))
    const obj = groupBy(data, 'firstletter')
    const _list = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        _list.push({
          letter: key,
          data: element.map(el => el.name)
        })
      }
    }
    console.log(_list)
    brandOptions.value = _list
  }



  onLoad(() => {
    // 1. 获取当前组件实例
    const instance = getCurrentInstance();
    // 2. 从实例中获取事件通道
    eventChannel = instance.proxy.getOpenerEventChannel();
    console.log(eventChannel)
    getOrderCol()
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