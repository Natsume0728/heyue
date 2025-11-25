import {
  defineStore
} from 'pinia'
import REQUEST from '@/request/index.js'

export const useDefaultStore = defineStore('default', {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    getUserName (state) {
      return state.userInfo?.name || '微信用户'
    },
    getUserId(state){
      return  state.userInfo?.userId
    }
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
    },

    async login() {
      const {
        code
      } = await wx.login()
      console.log(code)
      const res = await REQUEST.post({
        url: `/app-api/member/auth/social-login`,
        data: {
          "type": 34,
          code,
          "state": "9b2ffbc1-7425-4155-9894-9d5c08541d62"
        },
      })
      if (res.code === 0) {
        this.setUserInfo(res.data)
        wx.setStorageSync("accessToken", res.data.accessToken);
        wx.setStorageSync("openid", res.data.openid);
        wx.setStorageSync("refreshToken", res.data.refreshToken);
        wx.setStorageSync("userId", res.data.userId);
      }
    },

    async loginByPhone(phoneCode) {
      const {
        code
      } = await wx.login()
      console.log(code)
      const res = await REQUEST.post({
        url: `/app-api/member/auth/weixin-mini-app-login`,
        data: {
          "type": 34,
          phoneCode,
          "loginCode": code,
          "state": "9b2ffbc1-7425-4155-9894-9d5c08541d62",
        },
      })
      if (res.code === 0) {
        // accessToken: "6505c7068cef4a17bf4b1922d7e74d38"
        // expiresTime: 1763891650924
        // openid: "odR1-1_ZFJD7gX0q6iWxhR03XUXM"
        // refreshToken: "2d90efe51c85406da07e7f1f0228f626"
        // userId: 287
        this.setUserInfo(res.data)
        wx.setStorageSync("accessToken", res.data.accessToken);
        wx.setStorageSync("openid", res.data.openid);
        wx.setStorageSync("refreshToken", res.data.refreshToken);
        wx.setStorageSync("userId", res.data.userId);
      } else {
        throw new Error()
      }
    },
  },
})