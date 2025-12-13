<template>
  <view class="container">

    <view class="header">

      <u-avatar size="200"
        src="https://ylc-car-pic.oss-cn-wuhan-lr.aliyuncs.com/carPic/3c74264a-2f96-4bb0-885f-3c0e43b5901a.jpg"></u-avatar>

      <view style="display: flex;flex-direction: column;justify-content: space-between;height: 200rpx;">
        <view style="font-size: 40rpx;">{{nickname}}</view>
        <view style="font-size: 34rpx;">{{mobile}}</view>
        <view v-if="memberStatus == 0">未注册会员</view>
        <view v-else-if="memberStatus == 1">平台会员</view>
        <view v-else-if="memberStatus == 2">管理员</view>
      </view>
    </view>

    <u-cell-group>
      <u-cell-item icon="rmb-circle-fill" title="成为会员" @click="handle_pay" v-if="memberStatus == 0"></u-cell-item>
      <!-- <u-cell-item icon="star-fill" title="有靓车会员" v-else-if="memberStatus == 1"></u-cell-item> -->
      <u-cell-item icon="heart-fill" title="我的收藏" @click="to_coll"></u-cell-item>
      <u-cell-item icon="setting-fill" title="个人信息" @click="to_account"></u-cell-item>
      <u-cell-item icon="error-circle-fill" title="关于我们" @click="to_about"></u-cell-item>
    </u-cell-group>



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
    useCarStore
  } from '@/store/car';
  import REQUEST from '@/request/index.js'

  const nickname = ref('有靓车用户')

  const CarStore = useCarStore()

  const handle_pay = async () => {
    if (memberStatus.value != 0) return
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/pay/order/create`,
      data: {
        "amount": 1,
        "openid": wx.getStorageSync("openid"),
        "description": "xxxxx"
      }
    })

    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success: async (res) => {
        // uni.navigateBack();
        uni.showToast({
          title: '支付成功'
        })

        await REQUEST.post({
          url: `/app-api/pay/order/notify`,
          data: {}
        })

      },
      fail: (res) => {
        uni.showToast({
          title: '支付出错，请重试！'
        })
      },
    });
  }
  const userId = ref(null)
  const memberStatus = ref(0)
  const mobile = ref('')
  onShow(() => {
    const _userId = wx.getStorageSync('userId')
    const _memberStatus = wx.getStorageSync('memberStatus')
    const _mobile = wx.getStorageSync('mobile')

    if (!_userId) {
      CarStore.setUserInfo({})
      uni.reLaunch({
        url:'/pages/login/login'
      })
    } else {
      memberStatus.value = _memberStatus
      userId.value = _userId
      nickname.value = wx.getStorageSync('nickname') || '有靓车用户'
      mobile.value = wx.getStorageSync('mobile') || ''
    }
    console.log(userId.value, 'userId')
  })

  const to_login = () => {
    uni.navigateTo({
      url: '/pages/login/login'
    })
  }

  const to_coll = () => {
    uni.navigateTo({
      url: '/pages/coll/coll'
    })
  }

  const to_about = () => {
    uni.navigateTo({
      url: `/pages/about/about`
    })
  }
  const to_account = () => {
    uni.navigateTo({
      url: `/pages/account/account`
    })
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    background-color: white;
    padding-top: 100rpx;

    .header {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 600;
      gap: 16px;
      padding-left: 64rpx;
      padding-bottom: 120rpx;
      color: #ffde03;
    }
  }

  .img-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 50%;
    width: 160rpx;
    height: 160rpx;
    margin: 0 auto 64rpx;

    .img {
      width: 100rpx;
      height: 100rpx;
    }
  }


  .btn-warp {
    padding: 16rpx 200rpx;
    margin-bottom: 120rpx;

    .btn {
      background-color: #ffde03;
      border-radius: 100rpx;

      &::after {
        border: none;
      }
    }

    .plain-btn {
      font-weight: 600;
      background-color: transparent;

      &::after {
        border: none;
      }
    }
  }


  .nickname-warp {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 120rpx;
    font-size: 40rpx;
    font-weight: 600;
    color: #ffde03;

  }

  .btn-coll {
    color: #000000;
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