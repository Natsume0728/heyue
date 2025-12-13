<template>
  <view class="container">


<!--    <radio-group @change="select_proAndCity">
      <uni-group v-for="pro in proAndCityOptions" :key="pro.id" :title="pro.name" top="20">
        <view v-for="city in pro.children" :key="city.id">
          {{city.name}}
        </view>
      </uni-group>
    </radio-group> -->
    
    <u-index-list >
      <view v-for="(city, index) in proAndCityOptions" :key="index">
        <u-index-anchor :use-slot="true">
          <text class="anchor-text">{{city.name}}</text>
        </u-index-anchor>
        <view class="list-cell">
         {{city.name}}
        </view>
  
      </view>
    </u-index-list>
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

  const select_proAndCity = (evt) => {
    console.log(evt.detail)

    proAndCityOptions.value.forEach(el => {
      const children = el.children
      children.forEach(child => {
        if (child.id == evt.detail.value) {
          uni.navigateBack({
            delta: 1,
            success(res) {
              eventChannel.emit('from_chengshi', {
                item: child
              });
            }
          })
        }
      })

    })
  }


  const proAndCityOptions = ref([])
  const getProAndCity = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getProAndCity`,
    })
    proAndCityOptions.value = data
  }


  onLoad(() => {
    // 1. 获取当前组件实例
    const instance = getCurrentInstance();
    // 2. 从实例中获取事件通道
    eventChannel = instance.proxy.getOpenerEventChannel();
    console.log(eventChannel)
    getProAndCity()
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