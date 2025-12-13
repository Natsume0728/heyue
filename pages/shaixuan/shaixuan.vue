<template>
  <view class="container">


    <u-cell-group>
      <u-cell-item title="地区选择" :value="quyu_name || '不限'"  @click="to_quyu"></u-cell-item>
      <u-cell-item title="车型" :value="car_type_name || '不限'" @click="to_chexing"></u-cell-item>
      <u-cell-item title="品牌" :value="pingpai_name || '不限'" @click="to_pingpai"></u-cell-item>
      <u-cell-item title="排放"  :value="paifang_name || '不限'" @click="to_paifang"></u-cell-item>

      <u-cell-item title="年份" :value="nianfen_name || '不限'" @click="to_nianfen"></u-cell-item>
      
      <u-cell-item title="过户次数" :value="guohu_name || '不限'" @click="to_guohu"></u-cell-item>
      <u-cell-item title="燃油类型" :value="ranyou_name || '不限'" @click="to_ranyou"></u-cell-item>
      <u-cell-item title="颜色" :value="yanse_name || '不限'" @click="to_yanse"></u-cell-item>
      <u-cell-item title="变速箱" :value="biansuxiang_name || '不限'" @click="to_biansuxiang"></u-cell-item>
    </u-cell-group>

    <view style="" class="bottom-btns">
      <button @click="reset" class="reset_btn">
        重置
      </button>
      <button @click="confirm" class="confirm-btn">
        确定
      </button>
    </view>
  </view>
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onLoad
  } from '@dcloudio/uni-app';
  import {
    getCurrentInstance,
    ref
  } from 'vue'
  import {
    CarTypeEnum,
    CarGearBoxEnum,
    CarEmissionEnum,
    CarColorEnum,
    CarFuelTypeEnum,
    CarTransferTimesEnum,
    CarYearEnum,
    
  } from '@/utils/constant.js'


  const car_type = ref(0)
  const car_type_name = ref('')

  const to_chexing = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/chexing?car_type=${car_type.value}`,
      events: {
        from_child: (cartype) => {
          console.log('收到来自cartype页面B的数据1：', cartype);
          // const tar = CarTypeEnum.find(el => el.code === code)
          car_type.value = cartype.code
          car_type_name.value = cartype.name
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
          console.log('收到来自页面B的数据2：', data);
          // const tar = CarGearBoxEnum.find(el => el.code === code)
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


  const paifang_code = ref(0)
  const paifang_name = ref('')

  const to_paifang = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/paifang?code=${paifang_code.value}`,
      events: {
        from_child: (data) => {
          console.log('收到来自页面B的数据2：', data);
          // const tar = CarEmissionEnum.find(el => el.code === code)
          paifang_code.value = data.code
          // paifang_name.value = data.name
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
          // const tar = CarColorEnum.find(el => el.code === code)
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



  const guohu_code = ref(0)
  const guohu_name = ref('')

  const to_guohu = () => {
    uni.navigateTo({
      url: `/pages/shaixuan/guohu?code=${guohu_code.value}`,
      events: {
        from_child: (data) => {
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
  

  const pingpai_id = ref(0)
  const pingpai_name = ref('')

  const to_pingpai = () => {
    console.log("topingpai")
    uni.navigateTo({
      url: `/pages/shaixuan/pingpai`,
      events: {
        from_child: (data) => {
          console.log('收到来自品牌的数据：', data);
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
        console.log(err,222)
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
          const {city, region} = data
          city_id.value = city.id
          city_name.value = city.name
          quyu_id.value = region.id
          quyu_name.value = region.name
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'data from starter page'
        // })
      },
      fail(err) {
        console.log(err,222)
      }
    })
  }
  
  const reset = () => {
    vehicle_type.value = null
  }

  const confirm = () => {
    console.log('backkkkk')
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_shaixuan', {
          carType: car_type.value || undefined,
          carType_name: car_type_name.value || undefined,
          carGearBox: biansuxiang_code.value || undefined,
          carGearBox_name: biansuxiang_name.value || undefined,
          emissionSta: paifang_code.value || undefined,
          emissionSta_name: paifang_name.value || undefined,
          carColor: yanse_code.value || undefined,
          carColor_name: yanse_name.value || undefined,
          carFuelType: ranyou_code.value || undefined,
          carFuelType_name: ranyou_name.value || undefined,
          carYear: nianfen_code.value || undefined,
          carYear_name: nianfen_name.value || undefined,
          carBrand: pingpai_id.value || undefined,
          carBrand_name: pingpai_name.value || undefined,
          regionId: quyu_id.value || undefined,
          regionId_name: quyu_name.value || undefined,
          city_id: city_id.value || undefined,
          city_name: city_name.value || undefined,
        });
      }
    })
  }


  let eventChannel = null
  onLoad(() => {
    // 1. 获取当前组件实例
    const instance = getCurrentInstance();
    // 2. 从实例中获取事件通道
    eventChannel = instance.proxy.getOpenerEventChannel();
  });
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;
    min-height: 100vh;

    .VehicleTypes-warp {
      padding: 32rpx;
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;

      .btn {
        margin: 0;

        &::after {
          border: none;
        }

        &.acitve {
          background-color: #ffde03 !important;
        }
      }
    }

    .bottom-btns {

      padding: 64rpx 32rpx 0;
      display: flex;
      justify-content: space-between;
      gap: 64rpx;

      .confirm-btn {
        width: 50%;
        color: #000000;
        background-color: #ffde03;

        &::after {
          border: none;
        }
      }


      .reset_btn {
        width: 50%;

        &::after {
          border: none;
        }

      }

    }


  }
</style>