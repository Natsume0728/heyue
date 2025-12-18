<template>
  <!-- <view class="container"> -->


  <!--    <u-index-list :scrollTop="scrollTop">
     <view v-for="(item, index) in CAR_BRANDS" :key="index">
        <u-index-anchor :index="index"  :id="index" :text="item.name"/>
        <view class="list-cell">
          {{item.name}}
        </view>

      </view>
    </u-index-list> -->

  <uni-indexed-list :options="options" :showSelect="false" @click="bindClick">



  </uni-indexed-list>


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
    CAR_BRANDS
  } from '@/utils/constant.js'
  import {
    groupBy
  } from 'lodash'

  // const list2 = ref([{
  //   'letter': 'A',
  //   'data': [
  //     '阿克苏机场',
  //     '阿拉山口机场',
  //     '阿勒泰机场',
  //     '阿里昆莎机场',
  //     '安庆天柱山机场',
  //     '澳门国际机场'
  //   ]
  // }, ])



  const options = ref([])
  const obj = groupBy(CAR_BRANDS, 'firstletter')
  const _list = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      _list.push({
        letter: key,
        data: element
      })
    }
  }

  options.value = _list.sort((a, b) => a.letter.charCodeAt(0) - b.letter.charCodeAt(0))

  const bindClick = (e) => {
    console.log(e)
    if (!e.item?.children?.length) {
      uni.navigateBack({
        delta: 1,
        success(res) {
          eventChannel.emit('from_child', e.item);
        }
      })
    } else {

      uni.navigateTo({
        url: `/pages/publish/pingpai2`,
        events: {
          from_child: (data) => {
            console.log('收到来自页面B的数据2：', data);
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
          res.eventChannel.emit('acceptDataFromOpenerPage', e.item)
        }
      })
    }
  }



  let eventChannel = null


  onLoad(() => {

    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    // eventChannel.on('acceptDataFromOpenerPage', function(data) {
    //   console.log(data)
    // })
    // getCarBrands()
  })

  const getCarBrands = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getCarBrands`,
    })
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