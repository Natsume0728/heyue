import deepMerge from '../utils/deepMerge.js'



// export const BASE_URL = 'http://101.200.0.56:48080'
export const BASE_URL = 'https://www.tqylc.xyz'

class Request {
  request(param = {}) {
    let header = param.header || {
      'content-type': "application/json"
    }

    const accessToken = wx.getStorageSync("accessToken");
    const refreshToken = wx.getStorageSync("refreshToken");

    header = deepMerge(header, {
      Authorization: `Bearer ${accessToken}`,
      'tenant-id': 1
    })


    // 返回promise
    return new Promise((resolve, reject) => {
      // 请求
      uni.request({
        url: BASE_URL + param.url,
        data: param.data || {},
        method: param.method || 'POST',
        header,
        complete: (res) => {
          if (res?.statusCode === 200) {
            if (res.data.code === 1001) {
              uni.showModal({
                title: '提示',
                content: '注册会员开放全部功能',
                success: ({
                  confirm,
                  cancel
                }) => {
                  if (confirm) {
                    uni.switchTab({
                      url: '/pages/mine/mine'
                    })
                  }
                }
              })
              reject()
            } else if (res.data.code === 401) {
              // removeUserInfo()
              uni.showModal({
                title: '提示',
                content: '注册登录后可使用完整功能',
                success: ({
                  confirm,
                  cancel
                }) => {
                  wx.removeStorageSync('accessToken')
                  wx.removeStorageSync('openid')
                  wx.removeStorageSync('refreshToken')
                  wx.removeStorageSync('userId')
                  wx.removeStorageSync('memberStatus')
                  if (confirm) {
                    uni.switchTab({
                      url: '/pages/mine/mine'
                    })
                  }
                }
              })
              reject()
            }
            resolve(res.data)
          } else if (res?.statusCode === 401) {
            const currentPage = getCurrentPages()
            if (currentPage?.[currentPage.length - 1]?.route !==
              "pages/index/index") {
              // 登录过期 跳转登录页
              uni.$u.toast("登录过期，请重新登录");
              wx.removeStorageSync("session_id");
              wx.removeStorageSync("openid");
              wx.removeStorageSync("userId");
              uni.reLaunch({
                url: '/pages/index/index'
              });
              reject(res?.data)
            }
          } else {
            reject(res?.data)
          }
        }
      })
    })
  }

  constructor() {
    this.get = ({
      url,
      data = {},
      header = {}
    }) => {
      return this.request({
        url,
        data,
        method: 'GET',
        header,
      })
    }

    this.post = ({
      url,
      data = {},
      header = {}
    }) => {
      return this.request({
        url,
        data,
        method: 'POST',
        header,
      })
    }

    this.put = ({
      url,
      data = {},
      header = {}
    }) => {
      return this.request({
        url,
        data,
        method: 'PUT',
        header,
      })
    }

    this.delete = ({
      url,
      data = {},
      header = {}
    }) => {
      return this.request({
        url,
        data,
        method: 'DELETE',
        header,
      })
    }
  }
}

const REQUEST = new Request()
export default REQUEST