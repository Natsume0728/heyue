<template>


  <u-cell-group :title="title">
    <u-cell-item v-for="item in options" :key="item.id" :title="item.name" :arrow="false" @click="confirm(item)"></u-cell-item>
  </u-cell-group>




  <!-- </view> -->
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
    CAR_BRANDS
  } from '@/utils/constant.js'
  import {
    groupBy
  } from 'lodash'


  const confirm = (item) => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_child', item);
      }
    })
  }

  let eventChannel = null

  const options = ref([])
  const title = ref('')

  onLoad(() => {
    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      title.value = data.name
      getDistrict(data.id)
    })
  })

  const getDistrict = async (id) => {
    if (!id) return
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getDistrict?cityId=${id}`,
    })


    options.value = data
  }
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