<template>
  <u-cell-group>
    <u-cell-item :title="city.name" v-for="city in citys" :key="city.name" :arrow="false"
      @click="to_back(city)"></u-cell-item>
  </u-cell-group>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onLoad,
    onPageScroll
  } from '@dcloudio/uni-app';
  import {
    computed,
    getCurrentInstance,
    ref
  } from 'vue'
  import {
    groupBy
  } from 'lodash'

  // 定义响应式数据
  const scrollTop = ref(0)
  // const indexList = ref([
  //   "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  //   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  // ])

  // 页面滚动事件处理
  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  const to_back = (city) => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        eventChannel.emit('from_child', city);
      }
    })
  }




  let eventChannel = null


  const citys = ref([])


  onLoad(() => {
    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      citys.value = data
    })
  })
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;

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