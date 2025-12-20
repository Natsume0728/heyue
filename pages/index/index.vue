<template>
  <view class="container">
    <!--    <view class="img-warp">
      <image src="https://ylc-car-pic.oss-cn-wuhan-lr.aliyuncs.com/carPic/1bc92854-a35b-4519-839f-baf06e717199.png"
        mode='widthFix' style="width:100%"></image>
      <view class="kouhao">
        <view>做最纯粹的</view>
        <view>车商交易平台</view>
      </view>
    </view> -->
    <!-- 只能有一个根元素 -->
    <view style="background-color: #f5f5f5; height: 200rpx;">
      <SearchBar @search="search">

        <template v-slot:city>
          <button size="mini" @click="to_quyu" class="text-btn" style=" padding: 0 24rpx ;">
            {{city_name}}<uni-icons type="down" size="12"></uni-icons>
          </button>
        </template>

      </SearchBar>

      <u-dropdown ref="uDropdownRef" @open="open" @close="close">
        <u-dropdown-item v-model="cheyuan" title="车源" :options="[
            {          label: '全部车源', value: 1        },
            {          label: '新上车源', value: 2      },
            {          label: '可批车源', value: 3        },
        
          ]" @change="paixu_change">
        </u-dropdown-item>

        <u-dropdown-item :title="quyu_name"></u-dropdown-item>
        <u-dropdown-item :title="pingpai_name"></u-dropdown-item>




        <u-dropdown-item v-model="paixu" title="排序" :options="[
        {          label: '默认排序', value: 1        },
        {          label: '价格最低', value: 2      },
        {          label: '价格最高', value: 3        },
        {          label: '表显里程最少', value: 4       },
        {          label: '上牌时间最新', value: 5       },
      ]" @change="change">
        </u-dropdown-item>

        <u-dropdown-item title="筛选">
        </u-dropdown-item>


      </u-dropdown>

    </view>


    <view style="margin:  0 32rpx;" :style="{
      height: `calc(${window_height}px - 200rpx)`
    }">
      <scroll-view scroll-y style="height: 100%;" @scrolltolower="scrolltolower">



        <Card v-for="item in carList" :key="item.carId" :carInfo="item"> </Card>

        <u-empty mode="data" v-if="carList.length === 0"></u-empty>
      </scroll-view>
    </view>


  </view>
</template>

<script setup>
  import Card from '@/components/Card.vue'
  import SearchBar from './SearchBar.vue'
  import REQUEST from '@/request/index.js'

  import {
    onShow,
    onLoad,
    onReachBottom
  } from '@dcloudio/uni-app'
  import {
    ref,
    computed,
    getCurrentInstance
  } from 'vue'

  const paixu = ref(undefined)
  const cheyuan = ref(1)

  // 定义组件引用
  const uDropdownRef = ref(null)
  const regionId = ref(0)



  // 定义事件处理函数
  const open = (index) => {
    // 展开某个下来菜单时，先关闭原来的其他菜单的高亮
    // 同时内部会自动给当前展开项进行高亮
    if (index === 1) {
      uDropdownRef.value?.close()
      if (city_id.value == 100000) return
      to_quyu2()
    } else if (index === 2) {
      uDropdownRef.value?.close()
      to_pingpai()
    } else if (index == 0) {
      uDropdownRef.value?.highlight()
    } else if (index == 3) {
      uDropdownRef.value?.highlight()
    } else if (index == 4) {
      uDropdownRef.value?.close()
      to_shaixuan()
    }
  }

  const close = (index) => {
    // 关闭的时候，给当前项加上高亮
    // 当然，您也可以通过监听dropdown-item的@change事件进行处理

    uDropdownRef.value?.highlight(index)
  }


  const change = (value) => {
    // 更多的细节，如有需要请自行根据业务逻辑进行处理
    // uDropdownRef.value?.highlight(xxx)
    console.log(value)
    queryParams.value.orderCol = value
    queryParams.value.pageNo = 1
    total.value = 0
    carList.value = []
    canLoadmore.value = true
    getList()
  }
  const paixu_change = (value) => {
    // 更多的细节，如有需要请自行根据业务逻辑进行处理
    // uDropdownRef.value?.highlight(xxx)
    console.log(value)
    if (value == 1) {
      queryParams.value.newStatus = undefined
      queryParams.value.allSaleStatus = undefined
    } else if (value == 2) {
      queryParams.value.newStatus = true
      queryParams.value.allSaleStatus = undefined
    } else if (value == 3) {
      queryParams.value.newStatus = undefined
      queryParams.value.allSaleStatus = true
    }
    queryParams.value.pageNo = 1
    total.value = 0
    carList.value = []
    canLoadmore.value = true
    getList()
  }


  const to_shaixuan = () => {
    uni.navigateTo({
      url: '/pages/shaixuan/shaixuan',
      events: {
        from_shaixuan: (data) => {
          console.log('收到来自筛选页面B的数据：', data);
          if (!data) {
            queryParams.value = {
              pageSize: 10,
              pageNo: 1,
            }
            total.value = 0
            carList.value = []
            canLoadmore.value = true
            city_id.value = undefined
            city_name.value = '城市'
            quyu_id.value = undefined
            quyu_name.value = '区域'
            pingpai_id.value = undefined
            pingpai_name.value = '品牌'
            getList()
          } else {

            if (data.cityId) {
              city_name.value = data.city_name
              city_id.value = data.cityId
              quyu_id.value = null
              quyu_name.value = '区域'
            }
            if (data.carBrand) {
              pingpai_name.value = data.carBrand_name
            } else {
              pingpai_name.value = '品牌'
            }
            queryParams.value = {
              ...queryParams.value,
              ...data
            }
            reset_query()
            getList()
          }
        }
      },
      success: (res) => {

      }
    })
  }


  let eventChannel = null




  const reset_query = () => {
    queryParams.value.pageNo = 1
    total.value = 0
    carList.value = []
    canLoadmore.value = true
  }



  const city_name = ref('城市')
  const city_id = ref(null)
  const quyu_name = ref('区域')
  const quyu_id = ref(null)

  const to_quyu = () => {
    uDropdownRef.value?.close()
    console.log("toquyu")
    uni.navigateTo({
      url: `/pages/index/quyu`,
      events: {
        from_child: (data) => {
          console.log('收到来自省市的数据：', data);
          city_id.value = data.id
          city_name.value = data.name
          quyu_id.value = null
          quyu_name.value = '区域'
          queryParams.value.cityId = data.id
          queryParams.value.regionId = undefined
          queryParams.value.pageNo = 1
          total.value = 0
          carList.value = []
          canLoadmore.value = true
          getList()
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
      url: `/pages/index/quyu2`,
      events: {
        from_child: (data) => {
          console.log('收到来自quyu2页面B的数据2：', data);
          if (data == null) {
            quyu_id.value = undefined
            quyu_name.value = '区域'
            queryParams.value.regionId = undefined
          } else {
            quyu_id.value = data.id
            quyu_name.value = data.name
            queryParams.value.regionId = data.id
          }


          queryParams.value.pageNo = 1
          total.value = 0
          carList.value = []
          canLoadmore.value = true
          getList()
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


  const pingpai_id = ref(0)
  const pingpai_name = ref('品牌')
  const to_pingpai = () => {
    console.log("topingpai")
    uni.navigateTo({
      url: `/pages/index/pingpai`,
      events: {
        from_child: (data) => {
          console.log('收到来自品牌的数据：', data);
          pingpai_id.value = data.id
          pingpai_name.value = data.name
          queryParams.value.carBrand = data.id
          queryParams.value.pageNo = 1
          total.value = 0
          carList.value = []
          canLoadmore.value = true
          getList()
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






  const carList = ref([])
  const total = ref(0)
  const pageNo = ref(1)
  const canLoadmore = ref(true)

  const queryParams = ref({
    pageSize: 10,
    pageNo: 1,
    carBrand: undefined,
    carRegionId: undefined,
    carType: undefined,
  })

  const getList = async () => {
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/page`,
      data: queryParams.value,
    })
    const {
      list,
      total: _total
    } = data

    carList.value = [...carList.value, ...list]
    total.value = _total
    console.log(carList.value, total.value)
    if (carList.value.length >= total.value) {
      canLoadmore.value = false
    }
  }


  const search = async ({
    value
  }) => {
    // if (!value) return
    reset_query()
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/page`,
      data: {
        ...queryParams.value,
        searchCon: value || undefined
      },
    })
    const {
      list,
      total: _total
    } = data

    carList.value = list
    total.value = _total
    if (carList.value.length >= total.value) {
      canLoadmore.value = false
    }
  }

  const getCityInfoByLngLat = async (lng, lat) => {
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/getCityInfoByLngLat`,
      data: {
        lng,
        lat
      },
    })
    city_name.value = data.name
    city_id.value = data.id
    queryParams.value.cityId = data.id
    if (data.id) {
      reset_query()
      const res = await REQUEST.post({
        url: `/app-api/ylc/car/page`,
        data: {
          ...queryParams.value,
          cityId: city_id.value
        },
      })
      const {
        list,
        total: _total
      } = res.data

      carList.value = list
      total.value = _total
      if (carList.value.length >= total.value) {
        canLoadmore.value = false
      }
    }

  }

  const window_height = ref(500)

  onLoad(() => {
    try {
      const {
        windowHeight
      } = uni.getWindowInfo()
      window_height.value = windowHeight

      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userFuzzyLocation']) {
            wx.authorize({
              scope: 'scope.userFuzzyLocation',
              success() {
                wx.getFuzzyLocation({
                  type: 'wgs84',
                  success(res) {
                    const latitude = res.latitude
                    const longitude = res.longitude
                    getCityInfoByLngLat(longitude, latitude)
                  },
                  fail() {
                    throw new Error()
                  }
                })
              },
              fail() {
                throw new Error()
              }
            })
          } else {
            wx.getFuzzyLocation({
              type: 'wgs84',
              success(res) {
                // latitude 纬度，范围为 -90~90，负数表示南纬
                // longitude 经度，范围为 -180~180，负数表示西经
                const latitude = res.latitude
                const longitude = res.longitude
                getCityInfoByLngLat(longitude, latitude)
              },
              fail() {
                throw new Error()
              }
            })
          }
        },
        fail() {
          throw new Error()
        }
      })
    } catch (error) {
      console.log(error)
      if (canLoadmore.value) {
        getList()
      }
    }

  });

  // onShow(() => {
  //   if (canLoadmore.value) {
  //     getList()
  //   }
  // })

  const scrolltolower = () => {
    if (canLoadmore.value) {
      queryParams.value.pageNo++
      getList()
    }
  }

  onReachBottom(() => {
    if (canLoadmore.value) {
      queryParams.value.pageNo++
      getList()
    }
  })
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    // padding-top: 200rpx;
    min-height: 100vh;
    font-size: 14px;
    line-height: 24px;

    .img-warp {

      font-size: 40rpx;
      font-weight: 600;

      .kouhao {
        width: 100%;
        position: absolute;
        top: 10%;
        text-align: center;
        color: white;
      }
    }

    .text-btn {
      padding: 0;
      // background-color: #ffde03;
      padding: 0 24rpx;
      margin: 0;

      &::after {
        border: none;
      }
    }

    .shaixuan {
      display: flex;
      justify-content: space-between;
      margin: 0 32rpx;
    }
  }
</style>