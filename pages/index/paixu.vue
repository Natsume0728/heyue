<template>
  <view class="container">

    <u-divider color="#000000">排序</u-divider>

    <view class="VehicleTypes-warp">

      <button v-for="item in tags" :key="item.code" size="mini" class="btn" :class="{
        acitve: tag?.code == item.code
      }" @click="tag_click(item)">
        {{item.name}}
      </button>
    </view>

    <view style="" class="bottom-btns">
      <button @click="reset" class="reset_btn">
        重置
      </button>
      <button @click="confirm" class="confirm-btn">
        确定
      </button>
    </view>
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
  let eventChannel = null
  const tag_click = (item) => {
    tag.value = item
  }
  const reset = () => {
    tag.value = null
  }

  const confirm = () => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_paixu', {
          tag: tag.value
        });
      }
    })
  }
  const tags = ref([])
  const tag = ref(null)


  const getOrderCol = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getOrderCol`,
    })
    tags.value = data
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