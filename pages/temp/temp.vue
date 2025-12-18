<template>
  <view>
   
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow
  } from '@dcloudio/uni-app'

  onLoad(() => {
    // uni.switchTab({
    //   url: '/pages/publish/publish'
    // })
  })
  onShow(()=>{
    uni.reLaunch({
      url:'/pages/publish/publish'
    })
  })
</script>

<style>

</style>