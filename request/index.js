import deepMerge from '../utils/deepMerge.js'
export const BASE_URL = 'http://101.200.0.56:48080'

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
		const needLoading = param.needLoading || false

		//加载圈
		if (needLoading) {
			uni.showLoading({
				title: '加载中...'
			});
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: BASE_URL + param.url,
				data: param.data || {},
				method: param.method || 'POST',
				header,
				complete: (res) => {
					// debugger
					//隐藏加载
					if (needLoading) {
						uni.hideLoading();
					}
					if (res?.statusCode === 200) {
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
							wx.removeStorageSync("roleTypeCode");
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