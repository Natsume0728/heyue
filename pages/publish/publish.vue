<template>
  <view class="container">
    <uni-card title="车辆图片">
      <uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @select="select" @progress="progress"
        @success="success" @fail="fail" />
    </uni-card>
    <uni-card title="车辆信息" sub-title="" extra="请认真填写核对车辆信息">
      <uni-forms :modelValue="formData">
        <uni-forms-item label="车架号" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入车架号" />
        </uni-forms-item>
        <uni-forms-item label="汽车品牌" name="carBrand">
          <uni-easyinput type="text" v-model="formData.carBrand" placeholder="请输入汽车品牌" />
        </uni-forms-item>
        <uni-forms-item label="车系" name="carSeries">
          <uni-easyinput type="text" v-model="formData.carSeries" placeholder="请输入车系" />
        </uni-forms-item>
        <uni-forms-item label="车型" name="carType">
          <uni-easyinput type="text" v-model="formData.carType" placeholder="请输入车型" />
        </uni-forms-item>

        <uni-forms-item label="价格" name="carPrice">
          <uni-easyinput type="text" v-model="formData.carPrice" placeholder="请输入价格">
            <template #right>
              <view style="padding-right: 16rpx;">万元 </view>
            </template>
          </uni-easyinput>
        </uni-forms-item>

        <uni-forms-item label="使用年限" name="carUserTime">
          <uni-easyinput type="text" v-model="formData.carUserTime" placeholder="请输入使用年限" />
        </uni-forms-item>

        <uni-forms-item label="过户次数" name="transferCount">
          <uni-easyinput type="text" v-model="formData.transferCount" placeholder="请输入过户次数" />
        </uni-forms-item>
        <uni-forms-item label="里程" name="carCarMileage">
          <uni-easyinput type="text" v-model="formData.carCarMileage" placeholder="请输入里程" />
        </uni-forms-item>
        <uni-forms-item label="汽车颜色" name="carColor">
          <uni-easyinput type="text" v-model="formData.carColor" placeholder="请输入汽车颜色" />
        </uni-forms-item>
        <uni-forms-item label="变速箱" name="carGearBox">
          <uni-easyinput type="text" v-model="formData.carGearBox" placeholder="请输入变速箱" />
        </uni-forms-item>
        <uni-forms-item label="排量" name="carDisplacement">
          <uni-easyinput type="text" v-model="formData.carDisplacement" placeholder="请输入排量" />
        </uni-forms-item>

        <uni-forms-item label="汽车生产日期" name="produceTime">
          <uni-datetime-picker type="datetime" v-model="formData.produceTime" />
        </uni-forms-item>
        <uni-forms-item label="配置" name="carConfiguration">
          <uni-easyinput type="text" v-model="formData.carConfiguration" placeholder="请输入配置" />
        </uni-forms-item>
        <uni-forms-item label="座位数" name="carSeat">
          <uni-easyinput type="text" v-model="formData.carSeat" placeholder="请输入座位数" />
        </uni-forms-item>
        <uni-forms-item label="燃料类型" name="carFuelType">
          <uni-easyinput type="text" v-model="formData.carFuelType" placeholder="请输入燃料类型" />
        </uni-forms-item>
        <uni-forms-item label="质保时间" name="carQualityTime">
          <uni-datetime-picker type="datetime" v-model="formData.carQualityTime" />
        </uni-forms-item>
        <uni-forms-item label="所属区域" name="carRegionId">
          <uni-easyinput type="text" v-model="formData.carRegionId" placeholder="请输入所属区域" />
        </uni-forms-item>
        <uni-forms-item label="前轮胎尺寸" name="carFrontTyre">
          <uni-easyinput type="text" v-model="formData.carFrontTyre" placeholder="请输入前轮胎尺寸" />
        </uni-forms-item>
        <uni-forms-item label="后轮胎尺寸" name="rearTyre">
          <uni-easyinput type="text" v-model="formData.rearTyre" placeholder="请输入后轮胎尺寸" />
        </uni-forms-item>
        <uni-forms-item label="其他描述" name="carDescribe">
          <uni-easyinput type="text" v-model="formData.carDescribe" placeholder="请输入其他描述" />
        </uni-forms-item>
        <!--        <uni-forms-item name="hobby" label="底价">
          <uni-easyinput type="text" v-model="formData.age" placeholder="请输入底价">
            <template #right>
              <view style="padding-right: 16rpx;">万元 </view>
            </template>
          </uni-easyinput>
        </uni-forms-item> -->
      </uni-forms>
    </uni-card>

    <view style="padding: 0 32rpx;">

      <button type="primary" @click="handlePublish" style="color:#ffffff;backgroundColor:#10458d;">
        发布
      </button>
    </view>
  </view>
</template>

<script>
  import REQUEST from '@/request/index.js'
  import {
    BASE_URL
  } from "@/request/index";

  export default {
    data() {
      return {
        imageValue: [],
        formData: {
          userId: wx.getStorageSync("userId"),
          pics: []
        },
        tempFilePaths: [],

      }
    },
    methods: {

      uploadFile(filePath) {
        return new Promise((resolve, reject) => {
          wx.uploadFile({
            url: `${BASE_URL}/app-api/ylc/car/uploadPic`,
            filePath: filePath,
            header: {
              Authorization: `Bearer ${ wx.getStorageSync("accessToken")}`,
              'tenant-id': 1
            },
            name: 'file',
            formData: {
              'user': 'test'
            },

            success({
              data
            }) {
              const uploadResult = JSON.parse(data);
              const fileUrl = uploadResult.data
              console.log(fileUrl)
              resolve(fileUrl);
              //do something
            },
            fail(res) {
              console.log(res)
              reject()
            },
          });
        });
      },

      // * @param {number} params.userId 用户id
      // * @param {string} params.carBrand 汽车品牌
      // * @param {string} params.carSeries 车系
      // * @param {string} params.carType 车型
      // * @param {object} params.carPrice 价格
      // * @param {number} params.carUserTime 使用年限
      // * @param {number} params.transferCount 过户次数
      // * @param {object} params.carCarMileage 里程
      // * @param {string} params.carColor 汽车颜色
      // * @param {string} params.carGearBox 变数箱
      // * @param {object} params.carDisplacement 排量
      // * @param {object} params.produceTime 汽车生产日期
      // * @param {string} params.carConfiguration 配置
      // * @param {number} params.carSeat 座位数
      // * @param {string} params.carFuelType 燃料类型
      // * @param {number} params.carQualityTime 质保时间
      // * @param {number} params.carRegionId 所属区域
      // * @param {string} params.carFrontTyre 前轮胎尺寸
      // * @param {string} params.rearTyre 后轮胎尺寸
      // * @param {string} params.carDescribe 其他描述
      // * @param {object} params.createTime 创建时间
      // * @param {object} params.updateTime 更新时间
      // * @param {array} params.pics 车辆图片地址
      async handlePublish() {
        try {
          for (var index = 0; index < this.tempFilePaths.length; index++) {
            const filePath = this.tempFilePaths[index]
            console.log(filePath)
            const url = await this.uploadFile(filePath)
            this.formData.pics.push(url)
          }
          const {
            code,
            data
          } = await REQUEST.post({
            url: `/app-api/ylc/car/publishCar`,
            data: {
              secCar: this.formData
            },
          })

          if (code === 0) {
            uni.showToast({
              title: '发布成功'
            })
            uni.switchTab({
              url: '/pages/index/index'
            })
          } else {
            throw new Error();
          }
        } catch (error) {
          uni.showToast({
            title: '请重试！'
          })
        }


      },
      // 获取上传状态
      select(e) {
        console.log('选择文件：', e.tempFilePaths)
        this.tempFilePaths = e.tempFilePaths

      },
      // 获取上传进度
      progress(e) {
        console.log('上传进度：', e)
      },

      // 上传成功
      success(e) {},

      // 上传失败
      fail(e) {
        console.log('上传失败：', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>