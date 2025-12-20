<template>
  <view class="container">
    <uni-card title="车辆图片">
      <uni-file-picker v-model="imageValue" ref='file_picker' fileMediatype="image" mode="grid" @select="select"
        @progress="progress" @success="success" @fail="fail" />
    </uni-card>
    <uni-card title="车辆信息" sub-title="" extra="请认真填写核对车辆信息">
      <u-form :model="formData" label-width="185" label-align="left">
        <u-form-item label="VIN" name="name">
          <view style="display: flex;">
            <u-input v-model="formData.vinCode" :clearable="false" placeholder="上传行驶证照片自动识别" />
            <u-icon name="scan" size="40" color="#a6b1bf" @click="getCarInfoByVinPic"></u-icon>
          </view>
        </u-form-item>

        <u-form-item label="汽车品牌" name="carBrand">
          <u-input v-model="pingpai_name" :clearable="false" placeholder="请选择汽车品牌" type="select" @click="to_pingpai" />
        </u-form-item>


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
        <!--        <u-form-item label="过户次数" name="carColor">
          <u-input v-model="guohu_name" :clearable="false" placeholder="请选择过户次数" type="select" @click="to_guohu" />
        </u-form-item> -->
        <!--        <u-form-item label="年份" name="carColor">
          <u-input v-model="nianfen_name" :clearable="false" placeholder="请选择年份" type="select" @click="to_nianfen" />
        </u-form-item> -->
        <u-form-item label="排放" name="carColor">
          <u-input v-model="paifang_name" :clearable="false" placeholder="请选择排放" type="select" @click="to_paifang" />
        </u-form-item>
        <!--        <u-form-item label="所属省市" name="carRegionId">
          <u-input v-model="city_name" :clearable="false"
           placeholder="请选择所属省市" type="select" @click="to_quyu" />
        </u-form-item> -->
        <u-form-item label="所属区域" name="carRegionId">
          <u-input v-model="quyu_name" :clearable="false" placeholder="请选择所属区域" type="select" @click="to_quyu" />
        </u-form-item>

        <u-form-item label="表显里程" name="carUserTime">
          <u-input v-model="formData.carMileage" placeholder="请输入表显里程（万公里）" type="digit" />
        </u-form-item>
        <u-form-item label="零售价(万元)" name="carPrice">
          <u-input v-model="formData.salePrice" placeholder="请输入零售价格" type="digit">
          </u-input>
        </u-form-item>
        <u-form-item label="批发价(万元)" name="carPrice">
          <u-input v-model="formData.allSalePrice" placeholder="（选填）批发价格,不批发不填写" type="digit">
          </u-input>
        </u-form-item>
        <!--        <u-form-item label="指导价(万元)" name="carPrice">
          <u-input v-model="formData.carPrice" placeholder="请输入指导价格" type="digit">
          </u-input>
        </u-form-item> -->
        <u-form-item label="车辆上牌时间" name="produceTime">
          <uni-datetime-picker type="datetime" return-type="timestamp" v-model="formData.registerTime" />
        </u-form-item>
        <!--        <u-form-item label="年检到期时间" name="produceTime">
          <uni-datetime-picker type="datetime" return-type="timestamp" v-model="formData.yearckTime" />
        </u-form-item> -->
        <!--        <u-form-item label="保险到期时间	" name="produceTime">
          <uni-datetime-picker type="datetime" return-type="timestamp" v-model="formData.insureTime" />
        </u-form-item> -->
        <u-form-item label="其他描述" name="carDescribe">
          <u-input v-model="formData.carDescribe" count="300" height="200" type="textarea" placeholder="请输入其他描述" border
            maxlength="300" />
        </u-form-item>
      </u-form>
    </uni-card>

    <view style="padding: 0 32rpx;">
      <button @click="handlePublish" class="publish-btn"> 发布 </button>
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
            pingpai_name.value = carData.carBrandName || ''
            car_type_name.value = carData.carTypeName || ''
            biansuxiang_name.value = carData.carGearBoxName || ''
            ranyou_name.value = carData.carFuelTypeName || ''
            paifang_name.value = carData.emissionStaName || ''
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
        uni.hideLoading()
      }
    });
  }

  const pingpai_id = ref(0)
  const pingpai_name = ref('')
  const to_pingpai = () => {
    console.log("topingpai")
    uni.navigateTo({
      url: `/pages/publish/pingpai`,
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
      url: `/pages/publish/quyu`,
      events: {
        from_child: ({
          city,
          region
        }) => {
          console.log('收到来自区域的数据：', city, region);

          city_id.value = city.id
          city_name.value = city.name
          quyu_id.value = region.id
          quyu_name.value = `${city.name}-${region.name}`
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

  const to_quyu2 = () => {
    if (!city_id.value) return
    uni.navigateTo({
      url: `/pages/shaixuan/quyu2`,
      events: {
        from_child: (data) => {
          console.log('收到来自quyu2页面B的数据2：', data);
          quyu_id.value = data.id
          quyu_name.value = data.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          id: city_id.value,
          name: city_name.value,
        })
      }
    })
  }

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

  const handlePublish = async () => {
    try {
      uni.showLoading({
        mask: true,
        title: 'loading'
      })
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
        setTimeout(() => {
          formData.value = {
            userId: wx.getStorageSync("userId"),
            carPics: []
          }
          tempFilePaths.value = []
          file_picker.value?.clearFiles()
          uni.redirectTo({
            url: '/pages/temp/temp'
          })
        }, 1500)


      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error)
      uni.showToast({
        title: '请重试！'
      })
    } finally {
      uni.hideLoading()
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