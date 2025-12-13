<script setup>
  import {
    useCarStore
  } from'@/store/car';

  import {
    onShow,
    onHide,
    onLaunch
  } from '@dcloudio/uni-app';
  const CarStore = useCarStore()

  onShow(() => {
    const accessToken = wx.getStorageSync("accessToken");
    const openid = wx.getStorageSync("openid");
    const refreshToken = wx.getStorageSync("refreshToken");
    const userId = wx.getStorageSync("userId");                         
    const memberStatus = wx.getStorageSync("memberStatus");                         
    
    CarStore.setUserInfo({
      accessToken,
      openid,
      refreshToken,
      userId,
      memberStatus,
    })
  })
</script>

<style lang="scss">
  @import "@/uni_modules/uview-pro/index.scss";
  /*每个页面公共css */
  @import '@/uni_modules/uni-scss/index.scss';
  @import '@/static/customicons.css';

  // 设置整个项目的背景色
  page {
    background-color: #f5f5f5;
  }
</style>