<template>
  <view class="container">
    <view class="img-warp">
      <image src="https://ylc-car-pic.oss-cn-wuhan-lr.aliyuncs.com/carPic/1bc92854-a35b-4519-839f-baf06e717199.png"
        mode='widthFix' style="width:100%"></image>
      <view class="kouhao">
        <view>做最纯粹的</view>
        <view>车商交易平台</view>
      </view>
    </view>

    <SearchBar @search="search">

      <template v-slot:city>
        <button size="mini" @click="to_shaixuan" class="text-btn" style="background-color: #ffde03; padding: 0 24rpx ;">
          {{cityName}}<uni-icons type="down" size="12"></uni-icons>
        </button>
      </template>

    </SearchBar>

    <!--    <view class="shaixuan">

      <button size="mini" class="text-btn" @click="to_shaixuan">
        {{districtName}} <uni-icons type="down" size="12"></uni-icons>
      </button>

      <button size="mini" @click="to_shaixuan" class="text-btn">
        {{brandName}} <uni-icons type="down" size="12"></uni-icons>
      </button>



      <button size="mini" class="text-btn" @click="to_paixu">
        排序 <uni-icons type="down" size="12"></uni-icons>
      </button>


      <button size="mini" class="text-btn" @click="to_shaixuan">
        筛选<uni-icons type="down" size="12"></uni-icons>
      </button>
    </view> -->

    <u-dropdown ref="uDropdownRef" @open="open" @close="close">
      <u-dropdown-item :title="districtName"></u-dropdown-item>
      <u-dropdown-item :title="brandName"></u-dropdown-item>

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


    <view style="margin:  0 32rpx;">

      <Card v-for="item in carList" :key="item.carId" :carInfo="item"> </Card>

      <u-empty mode="data" v-if="carList.length === 0"></u-empty>
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

  // 定义组件引用
  const uDropdownRef = ref(null)

  // 定义事件处理函数
  const open = (index) => {
    // 展开某个下来菜单时，先关闭原来的其他菜单的高亮
    // 同时内部会自动给当前展开项进行高亮
    if (index == 2) {

      uDropdownRef.value?.highlight()
    } else {
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
    reset_query()
    getList()
  }

  const to_shaixuan = () => {
    uni.navigateTo({
      url: '/pages/shaixuan/shaixuan',
      events: {
        from_shaixuan: (data) => {
          console.log('收到来自筛选页面B的数据：', data);
          if (data.city_id) {
            cityName.value = data.city_name
          }
          if (data.regionId) {
            districtName.value = data.regionId_name
          }
          if (data.carBrand) {
            brandName.value = data.carBrand_name
          }
          queryParams.value = {
            ...queryParams.value,
            ...data
          }
          reset_query()
          getList()
        }
      },
      success: (res) => {

      }
    })
  }


  let eventChannel = null


  const value1 = ref(1)
  // 定义选项数据
  const options1 = ref([{
      label: '默认排序',
      value: 1,
    },
    {
      label: '距离优先',
      value: 2,
    },
    {
      label: '价格优先',
      value: 3,
    }
  ])

  const reset_query = () => {
    queryParams.value.pageNo = 1
    total.value = 0
    carList.value = []
    canLoadmore.value = true
  }

  const to_chengshi = () => {
    uni.navigateTo({
      url: '/pages/index/chengshi',
      events: {
        from_chengshi: ({
          item
        }) => {
          console.log('收到来自页面B的数据：', item);
          queryParams.value.carRegionId = item.id
          cityName.value = item.name
          city_id.value = item.id
          reset_query()
          getList()
        }
      },
      success: (res) => {

      }
    })
  }

  const to_quyu = () => {
    if (cityName.value === '城市') {
      uni.showToast({
        title: '请先选择城市',
        icon: 'none'
      })
      return
    }


    uni.navigateTo({
      url: `/pages/index/quyu?city_id=${city_id.value}`,
      events: {
        from_quyu: ({
          item
        }) => {
          console.log('收到来自页面B的数据：', item);
          districtName.value = item.name
          queryParams.value.carRegionId = item.id
          reset_query()
          getList()
        }
      },
      success: (res) => {

      }
    })
  }


  const to_pingpai = () => {
    uni.navigateTo({
      url: '/pages/index/pingpai',
      events: {
        from_pingpai: ({
          item
        }) => {
          console.log('收到来自页面B的数据：', item);
          queryParams.value.carBrand = item.name
          brandName.value = item.name
          reset_query()
          getList()
        }
      },
      success: (res) => {

      }
    })
  }

  const to_paixu = () => {
    uni.navigateTo({
      url: '/pages/index/paixu',
      events: {
        from_paixu: ({
          tag
        }) => {
          console.log('收到来自页面B的数据：', tag);
          queryParams.value.orderCol = tag.code
          reset_query()
          getList()
        }
      },
      success: (res) => {

      }
    })
  }

  const brandName = ref('品牌')
  const cityName = ref('城市')
  const districtName = ref('区域')
  const city_id = ref(null)

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
    if (!value) return
    reset_query()
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/page`,
      data: {
        ...queryParams.value,
        searchCon: value
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

  onLoad(() => {
    console.log(333, )

    wx.getSetting({
      success(res) {
        console.log(111, res)
        if (!res.authSetting['scope.userFuzzyLocation']) {
          wx.authorize({
            scope: 'scope.userFuzzyLocation',
            success() {
              wx.getFuzzyLocation({
                type: 'wgs84',
                success(res) {
                  console.log(444, res)
                  const latitude = res.latitude
                  const longitude = res.longitude
                }
              })

            }
          })
        } else {
          console.log(666, res)
          wx.getFuzzyLocation({
            type: 'wgs84',
            success(res) {
              console.log(555, res)
              const latitude = res.latitude
              const longitude = res.longitude
            },
            fail(err) {
              console.log(err, 777)
            }
          })
        }
      },
      fail() {
        console.log(222)
      }
    })
  });

  onShow(() => {
    if (canLoadmore.value) {
      getList()
    }
  })

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
      background-color: #ffde03;
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