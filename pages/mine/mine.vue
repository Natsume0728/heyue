<template>
  <view>
    <view class="img-warp">

      <image src="/static/default-avatar.png" class="img"></image>
    </view>

    <view class="btn-warp">
      <button v-if="userId">有靓车用户</button>
      <button v-else :disabled="false" class="btn" @click="to_login">点击登录</button>
    </view>

    <button class="btn-coll" type="primary" @click="to_coll"> 我的收藏</button>
  </view>
</template>


<script setup>
  import {
    onShow,
    onHide,
    onReady
  } from '@dcloudio/uni-app'
  import {
    computed,
    ref
  } from "vue"

  import {
    useDefaultStore
  } from '@/store/index.js'

  const DefaultStore = useDefaultStore()
  const userId = computed(() => DefaultStore.getUserId)
  console.log(userId)

  onShow(() => {
    // userId.value = DefaultStore.getUserId()
  })

  const to_login = () => {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }
  
  const to_coll =  () => {
    uni.navigateTo({
      url: '/pages/coll/coll'
    })
  }
</script>

<style lang="scss" scoped>
  .img-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 50%;
    width: 160rpx;
    height: 160rpx;
    margin: 100rpx auto 64rpx;

    .img {
      width: 100rpx;
      height: 100rpx;
    }
  }


  .btn-warp {
    padding: 16rpx 200rpx;

    .btn {
      background-color: white;
      border-radius: 100rpx;
      color: $uni-primary;

      &::after {
        border: none;
      }
    }
  }
  
  .btn-coll {
    margin: 64rpx 32rpx;
  }
</style>