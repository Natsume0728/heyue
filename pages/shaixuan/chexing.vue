<template>
  <view class="container">


    <u-cell-group>
      <u-cell-item :title="cartype.name" v-for="cartype in CarTypeEnum" :key="cartype.code" :arrow="false"
        @click="confirm(cartype)">

        <template #right-icon>
          
          <u-icon  v-if="car_type == cartype.code" name="checkbox-mark" color="#ffde03"> </u-icon>
          
        </template>
      </u-cell-item>

    </u-cell-group>


  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onLoad
  } from '@dcloudio/uni-app';
  import {
    getCurrentInstance,
    ref
  } from 'vue'

  import {
    CarTypeEnum
  } from '@/utils/constant.js'



  const confirm = (cartype) => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_child', cartype);
      }
    })
  }

  let eventChannel = null

  const car_type = ref(0)

  onLoad((query) => {
    car_type.value = query.car_type
    console.log(car_type.value, 222)
    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })

  })
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