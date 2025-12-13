<template>
  <view class="container">

    <u-cell-group>
      <u-cell-item title="昵称" :arrow="false">
        <input type="nickname" v-model="nickname"
          style="text-align: center;font-size: 40rpx; font-weight: 600; color: #ffde03;"></input>
      </u-cell-item>
    </u-cell-group>


    <view class="btn-warp">
      <button @click="updateUserInfo" class="btn">保存</button>
    </view>

  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onShow,
    onHide,
    onReady
  } from '@dcloudio/uni-app'


  import {
    ref
  } from 'vue';

  const nickname = ref('有靓车用户')

  const form = ref({

  });



  onShow(() => {
    getUserInfo()
  })

  const userInfo = ref({})


  const getUserInfo = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/member/user/get`,
    })
    // avatar: "https://www.iocoder.cn/x.png"
    // brokerageEnabled: null
    // experience: 0
    // id: 1
    // level: null
    // mobile: "18507143257"
    // nickname: "Natsume Takashi"
    // point: 0
    // sex: 1
    userInfo.value = data
    nickname.value = data.nickname
    console.log(nickname.value)
    wx.setStorageSync('nickname', data.nickname)
    wx.setStorageSync('mobile', data.mobile)
  }

  const updateUserInfo = async () => {

    const {
      data,
      code
    } = await REQUEST.put({
      url: `/app-api/member/user/update`,
      data: {
        ...userInfo.value,
        nickname: nickname.value
      }
    })

    await getUserInfo()
    uni.showToast({
      title: '修改成功',
      icon: 'success'
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;
    min-height: 100vh;
    padding: 100rpx 64rpx 0;

    .btn-warp {
      padding: 100rpx;

      .btn {
        color: #000000;
        background-color: #ffde03;

        &::after {
          border: none;
        }
      }
    }
  }
</style>