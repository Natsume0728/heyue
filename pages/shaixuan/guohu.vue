<template>
  <view class="container">


    <u-cell-group>
      <u-cell-item :title="item.name" v-for="item in CarTransferTimesEnum" :key="item.code" :arrow="false"
        @click="confirm(item)">

        <template #right-icon>

          <u-icon v-if="CODE == item.code" name="checkbox-mark" color="#ffde03"> </u-icon>

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
    CarTransferTimesEnum
  } from '@/utils/constant.js'



  const confirm = (item) => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_child',item);
      }
    })
  }

  let eventChannel = null

  const CODE = ref(0)

  onLoad((query) => {
    CODE.value = query.code
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