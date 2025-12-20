<template>
  <u-cell-group title="热门城市">
    <view style="display: flex;gap: 24rpx; flex-wrap: wrap; padding: 16rpx; padding-left: 32rpx;">
      <u-tag text="全国" type="success" @click="to_back({ id: undefined, name: '全国' })" />
      <u-tag :text="city.name" type="success" v-for="city in HotCity" :key="city.id" @click="to_back(city)" />
    </view>
  </u-cell-group>



  <u-index-list :scrollTop="scrollTop">
    <view v-for="(item, index) in firstletters" :key="index">
      <u-index-anchor :index="item" />
      <u-cell-group>
        <u-cell-item :title="pro.name" v-for="pro in groupbyPro[item]" :key="pro.name" :arrow="false"
          @click="to_quyu22(pro)"></u-cell-item>
      </u-cell-group>

    </view>
  </u-index-list>


  <!-- </view> -->
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onLoad,
    onPageScroll
  } from '@dcloudio/uni-app';
  import {
    computed,
    getCurrentInstance,
    ref
  } from 'vue'
  import {
    groupBy
  } from 'lodash'

  // 定义响应式数据
  const scrollTop = ref(0)
  // const indexList = ref([
  //   "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  //   "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  // ])

  // 页面滚动事件处理
  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  const to_back = (city) => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        eventChannel.emit('from_child', city);
      }
    })
  }

  const to_quyu22 = (pro) => {
    uni.navigateTo({
      url: `/pages/index/quyu22`,
      events: {
        from_child: (data) => {
          console.log('收到来自quyu22页面B的数据：', data);
          uni.navigateBack({
            delta: 1,
            success(res) {
              eventChannel.emit('from_child', data);
            }
          })

        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', pro.children)
      }
    })
  }


  let eventChannel = null


  const options = ref([])
  const HotCity = ref([])
  const firstletters = ref([])
  const groupbyPro = ref({})



  onLoad(() => {
    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
    getProAndCity()
  })

  const getProAndCity = async () => {
    try {
      uni.showLoading({
        title: 'loading...',
        mask: true
      })
      const {
        data,
        code
      } = await REQUEST.get({
        url: `/app-api/ylc/car/getProAndCity`,
      })
      const {
        allCity,
        hotCity
      } = data
      // const citylist = []
      // for (let index = 0; index < allCity.length; index++) {
      //   let pro = allCity[index];
      //   if (pro.children?.length) {
      //     citylist.push(...pro.children)
      //   }
      // }
      // console.log(citylist)


      options.value = allCity.filter(el => el?.children?.length)
      groupbyPro.value = groupBy(options.value, 'firstletter')
      console.log(groupbyPro.value)

      firstletters.value = Object.keys(groupbyPro.value)
      console.log(groupbyPro.value, firstletters.value)
      HotCity.value = hotCity
      // options.value = allCity
    } finally {
      uni.hideLoading()
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;

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