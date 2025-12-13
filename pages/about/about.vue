<template>
  <view>
    <button class="btn-coll" @click="to_word">
      <text> 《用户协议》 </text>
      <uni-icons type="right" size="24" color="#10458d"></uni-icons>
    </button>

    <button class="btn-coll" @click="to_word2">
      <text> 《隐私政策》 </text>
      <uni-icons type="right" size="24" color="#10458d"></uni-icons>
    </button>

    <button class="btn-coll">
      <text> 联系方式：13517261384 </text>
    </button>

    <button class="btn-coll">
      <text> 版本号：{{version}} </text>
    </button>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'


  const version = ref('0.0.1')
  const {
    miniProgram
  } = wx.getAccountInfoSync();
  console.log(miniProgram)
  version.value = miniProgram.version || miniProgram.envVersion
  
  
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
</script>

<style lang="scss" scoped>
  .btn-coll {
    color: #10458d;
    background-color: white;
    margin: 32rpx 64rpx;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    border-radius: 20rpx;

    &::after {
      border: none;
    }
  }
</style>