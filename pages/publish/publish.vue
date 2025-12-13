<template>
  <view class="container">
    <uni-card title="车辆图片">
      <uni-file-picker v-model="imageValue" ref='file_picker' fileMediatype="image" mode="grid" @select="select"
        @progress="progress" @success="success" @fail="fail" />
    </uni-card>
    <uni-card title="车辆信息" sub-title="" extra="请认真填写核对车辆信息">
      <u-form :model="formData" label-width="auto" label-align="right">
        <u-form-item label="行驶证" name="name">
          <view style="display: flex;">
            <u-input v-model="formData.carVIN" placeholder="请上传行驶证照片" />
            <u-icon name="scan" size="40" color="#a6b1bf" @click="getCarInfoByVinPic"></u-icon>
          </view>
        </u-form-item>

        <u-form-item label="汽车品牌" name="carBrand">
          <u-input v-model="pingpai_name" :clearable="false" placeholder="请选择汽车品牌" type="select" @click="to_pingpai" />
        </u-form-item>

        <!--        <u-form-item label="车系" name="carSeries">
          <u-input v-model="formData.carSeries" placeholder="请输入车系" />
        </u-form-item> -->
        <u-form-item label="车型" name="carType">
          <u-input v-model="car_type_name" :clearable="false" placeholder="请选择车型" type="select" @click="to_chexing" />
        </u-form-item>
        <u-form-item label="变速箱" name="carGearBox">
          <u-input v-model="biansuxiang_name" :clearable="false" placeholder="请选择变速箱" type="select"
            @click="to_biansuxiang" />
        </u-form-item>
        <u-form-item label="汽车颜色" name="carColor">
          <u-input v-model="yanse_name" :clearable="false" placeholder="请选择汽车颜色" type="select" @click="to_yanse" />
        </u-form-item>
        <u-form-item label="燃油类型" name="carColor">
          <u-input v-model="ranyou_name" :clearable="false" placeholder="请选择燃油类型" type="select" @click="to_ranyou" />
        </u-form-item>
        <u-form-item label="过户次数" name="carColor">
          <u-input v-model="guohu_name" :clearable="false" placeholder="请选择过户次数" type="select" @click="to_guohu" />
        </u-form-item>
        <u-form-item label="年份" name="carColor">
          <u-input v-model="nianfen_name" :clearable="false" placeholder="请选择年份" type="select" @click="to_nianfen" />
        </u-form-item>
        <u-form-item label="排放" name="carColor">
          <u-input v-model="paifang_name" :clearable="false" placeholder="请选择排放" type="select" @click="to_paifang" />
        </u-form-item>
        <u-form-item label="所属省市" name="carRegionId">
          <u-input v-model="city_name" :clearable="false" placeholder="请选择所属省市" type="select" @click="to_quyu" />
        </u-form-item>
        <u-form-item label="所属区域" name="carRegionId">
          <u-input v-model="quyu_name" :clearable="false" placeholder="请选择所属区域" type="select" @click="to_quyu" />
        </u-form-item>


        <u-form-item label="价格(万元)" name="carPrice">
          <u-input v-model="formData.carPrice" placeholder="请输入价格" type="number">

          </u-input>
        </u-form-item>

        <u-form-item label="使用年限" name="carUserTime">
          <u-input v-model="formData.carUserTime" placeholder="请输入使用年限" />
        </u-form-item>


        <u-form-item label="里程" name="carCarMileage">
          <u-input v-model="formData.carCarMileage" placeholder="请输入里程" />
        </u-form-item>


        <u-form-item label="排量" name="carDisplacement">
          <u-input v-model="formData.carDisplacement" placeholder="请输入排量" />
        </u-form-item>

        <u-form-item label="汽车生产日期" name="produceTime">
          <uni-datetime-picker type="datetime" v-model="formData.produceTime" />
        </u-form-item>
        <u-form-item label="配置" name="carConfiguration">
          <u-input v-model="formData.carConfiguration" placeholder="请输入配置" />
        </u-form-item>
        <u-form-item label="座位数" name="carSeat">
          <u-input v-model="formData.carSeat" placeholder="请输入座位数" />
        </u-form-item>

        <u-form-item label="质保时间" name="carQualityTime">
          <uni-datetime-picker type="datetime" v-model="formData.carQualityTime" />
        </u-form-item>
        <!--        <u-form-item label="所属区域" name="carRegionId">
          <u-input  v-model="formData.carRegionId" placeholder="请输入所属区域" />
        </u-form-item > -->

        <u-form-item label="前轮胎尺寸" name="carFrontTyre">
          <u-input v-model="formData.carFrontTyre" placeholder="请输入前轮胎尺寸" />
        </u-form-item>
        <u-form-item label="后轮胎尺寸" name="rearTyre">
          <u-input v-model="formData.rearTyre" placeholder="请输入后轮胎尺寸" />
        </u-form-item>
        <u-form-item label="其他描述" name="carDescribe">
          <u-input v-model="formData.carDescribe" placeholder="请输入其他描述" />
        </u-form-item>
        <!--        <u-form-item name="hobby" label="底价">
          <u-input  v-model="formData.age" placeholder="请输入底价">
            <template #right>
              <view style="padding-right: 16rpx;">万元 </view>
            </template>
          </u-input>
        </u-form-item > -->
      </u-form>
    </uni-card>

    <view style="padding: 0 32rpx;">

      <button @click="handlePublish" class="publish-btn">
        发布
      </button>
    </view>
  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    BASE_URL
  } from "@/request/index";
  import {
    ref
  } from 'vue';



  const getCarInfoByVinPic = () => {

    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      success: (chooseImageRes) => {
        const tempFile = chooseImageRes.tempFiles[0];
        console.log(tempFile)
        uni.showLoading({
          title: "正在识别...",
          mask: true
        });
        wx.uploadFile({
          url: `${BASE_URL}/app-api/ylc/car/getCarInfoByVinPic`,
          filePath: tempFile.tempFilePath,
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
            const carData = uploadResult.data
            console.log(carData)
            formData.value = {
              ...formData.value,
              ...carData
            }
            //do something
            uni.hideLoading()
          },
          fail(res) {
            console.log(res)
            uni.hideLoading()
          },
        });
      },
      fail: () => {
        // uni.hideLoading()
      }
    });
  }

  // const to_pingpai = () => {
  //   uni.navigateTo({
  //     url: '/pages/index/pingpai',
  //     events: {
  //       from_pingpai: ({
  //         item
  //       }) => {
  //         console.log('收到来自页面B的数据：', item);
  //         formData.value.carBrand = item.name
  //         // brandName.value = item.name
  //         // reset_query()
  //         // getList()
  //       }
  //     },
  //     success: (res) => {

  //     }
  //   })
  // }

  const pingpai_id = ref(0)
  const pingpai_name = ref('')

  const to_pingpai = () => {
    console.log("topingpai")
    uni.navigateTo({
      url: `/pages/shaixuan/pingpai`,
      events: {
        from_child: (data) => {
          console.log('收到来自品牌的数据：', data);
          formData.value.carBrand = data.id
          pingpai_id.value = data.id
          pingpai_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      },
      fail(err) {
        console.log(err, 222)
      }
    })
  }

  const car_type = ref(0)
  const car_type_name = ref('')

  const to_chexing = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/chexing?car_type=${car_type.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自cartype页面B的数据1', data);
          formData.value.carType = data.code
          // const tar = CarTypeEnum.find(el => el.code === code)
          car_type.value = data.code
          car_type_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }

  const guohu_code = ref(0)
  const guohu_name = ref('')

  const to_guohu = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/guohu?code=${guohu_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自guohu页面B的数据2：', data);
          formData.value.transferTimes = data.code
          guohu_code.value = data.code
          guohu_name.value = data.name

        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }

  const nianfen_code = ref(0)
  const nianfen_name = ref('')

  const to_nianfen = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/nianfen?code=${nianfen_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自页面B的数据2：', data);
          formData.value.carYear = data.code
          // const tar = CarYearEnum.find(el => el.code === code)
          nianfen_code.value = data.code
          nianfen_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }

  const biansuxiang_code = ref(0)
  const biansuxiang_name = ref('')

  const to_biansuxiang = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/biansuxiang?code=${biansuxiang_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自biansuxiang_页面B的数据2：', data);
          formData.value.carGearBox = data.code
          biansuxiang_code.value = data.code
          biansuxiang_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }



  const yanse_code = ref(0)
  const yanse_name = ref('')

  const to_yanse = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/yanse?code=${yanse_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自页面B的数据2：', data);
          formData.value.carColor = data.code
          yanse_code.value = data.code
          yanse_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }


  const ranyou_code = ref(0)
  const ranyou_name = ref('')

  const to_ranyou = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/ranyou?code=${ranyou_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自页面B的数据2：', data);
          // const tar = CarFuelTypeEnum.find(el => el.code === code)
          formData.value.carFuelType = data.code
          ranyou_code.value = data.code
          ranyou_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }

  const paifang_code = ref(0)
  const paifang_name = ref('')

  const to_paifang = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/paifang?code=${paifang_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自页面B的数据2：', data);
          // const tar = CarEmissionEnum.find(el => el.code === code)
          formData.value.emissionSta = data.code
          paifang_code.value = data.code
          paifang_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      }
    })
  }

  const city_id = ref(0)
  const city_name = ref('')
  const quyu_id = ref(0)
  const quyu_name = ref('')

  const to_quyu = () => {
    console.log("toquyu")
    uni.navigateTo({
      url: `/pages/shaixuan/quyu`,
      events: {
        from_child: (data) => {
          console.log('收到来自区域的数据：', data);
          const {
            city,
            region
          } = data
          city_id.value = city.id
          city_name.value = city.name
          quyu_id.value = region.id
          quyu_name.value = region.name
          formData.value.regionId = region.id
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      },
      fail(err) {
        console.log(err, 222)
      }
    })
  }

  // const to_chengshi = () => {
  //   uni.navigateTo({
  //     url: '/pages/index/chengshi',
  //     events: {
  //       from_chengshi: ({
  //         item
  //       }) => {
  //         console.log('收到来自页面B的数据：', item);
  //         formData.value.cityName = item.name
  //         formData.value.cityId = item.id

  //         // queryParams.value.carRegionId = item.id
  //         // cityName.value = item.name
  //         // city_id.value = item.id
  //         // reset_query()
  //         // getList()
  //       }
  //     },
  //     success: (res) => {

  //     }
  //   })
  // }

  // const to_quyu = () => {
  //   if (!formData.value.cityId) {

  //     return
  //   }


  //   uni.navigateTo({
  //     url: `/pages/index/quyu?city_id=${formData.value.cityId}`,
  //     events: {
  //       from_quyu: ({
  //         item
  //       }) => {
  //         console.log('收到来自页面B的数据：', item);
  //         formData.value.carRegionName = item.name
  //         formData.value.carRegionId = item.id
  //       }
  //     },
  //     success: (res) => {

  //     }
  //   })
  // }

  const imageValue = ref([])
  const formData = ref({
    userId: wx.getStorageSync("userId"),
    carPics: []
  })
  const tempFilePaths = ref([])

  const uploadFile = (filePath) => {
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
  }

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
  const handlePublish = async () => {
    try {
      for (let index = 0; index < tempFilePaths.value.length; index++) {
        const filePath = tempFilePaths.value[index]
        console.log(filePath)
        const url = await uploadFile(filePath)
        formData.value.carPics.push(url)
        if (index === 0) {
          formData.value.maiPic = url
        }
      }

      const {
        code,
        data
      } = await REQUEST.post({
        url: `/app-api/ylc/car/publishCar`,
        data: formData.value,
      })

      if (code === 0) {
        uni.showToast({
          title: '发布成功',
          icon: 'success'
        })
        formData.value = {
          userId: wx.getStorageSync("userId"),
          carPics: []
        }
        tempFilePaths.value = []
        file_picker.value?.clearFiles()
        // uni.switchTab({
        //   url: '/pages/index/index'
        // })
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error)
      uni.showToast({
        title: '请重试！'
      })
    }

  }

  const file_picker = ref()
  const select = (e) => {
    console.log('选择文件：', e.tempFilePaths)
    tempFilePaths.value = e.tempFilePaths
  }
  const progress = (e) => {
    console.log('上传进度：', e)
  }
  const success = (e) => {
    console.log('上传进度：', e)
  }
  const fail = (e) => {
    console.log('上传失败：', e)
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .publish-btn {
      color: #000000;
      background-color: #ffde03;

      &::after {
        border: none;
      }
    }
  }
</style>