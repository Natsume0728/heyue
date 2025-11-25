<template>
  <view>
    <view class="img-warp">

      <image src="/static/default-avatar.png" class="img"></image>
    </view>

    <view class="btn-warp">
      <button :disabled="false" class="btn" type="primary" open-type="getPhoneNumber"
        @getphonenumber="getphonenumber">一键登录</button>

      <!-- <button :disabled="false" class="btn" @click="login">一键登录</button> -->
    </view>

    <view class="info-box">
      <checkbox-group @change="check_change">
        <checkbox :value="true" style="transform:scale(0.7)" />

        我已阅读并同意
        <text class="link" @click="to_word">《用户协议》</text>
        和
        <text class="link" @click="to_word2">《隐私政策》</text>
      </checkbox-group>
      <view>未注册用户登录后将自动注册账户</view>
    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import REQUEST from '@/request/index.js'
  import {
    useDefaultStore
  } from '@/store/index.js'

  const DefaultStore = useDefaultStore()
  
  const login = async () => {
    await DefaultStore.login()
  }

  const checked = ref(false)


  const check_change = ({
    detail
  }) => {
    checked.value = !!detail.value.length
    console.log(detail, checked.value)
  }


  const to_word = () => {
    uni.navigateTo({
      url: '/pages/words/word'
    })
  }

  const to_word2 = () => {
    uni.navigateTo({
      url: '/pages/words/word2'
    })
  }

  const getphonenumber = async (v) => {
    try {
      if (!checked.value) {
        uni.showToast({
          title: '请先勾选协议',
          icon: 'none'
        })
        return
      }
      await DefaultStore.loginByPhone(v.detail.code)
      uni.navigateBack()
    } catch (error) {
      uni.showToast({
        title: '请重试',
        icon: 'none'
      })
    }

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
      // color: $uni-primary;
      background-color: $uni-primary;

      &::after {
        border: none;
      }
    }
  }

  .link {
    color: $uni-primary;
  }

  .info-box {
    padding: 32rpx;
    font-size: 28rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
  }
</style>