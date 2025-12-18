<template>


  <u-cell-group :title="pro.name" v-for="pro in options" :key="pro.id">
    <u-cell-item v-for="city in pro.children" :key="city.id" :title="city.name" @click="to_quyue2(city)"></u-cell-item>
  </u-cell-group>




  <!-- </view> -->
</template>

<script setup>
  import REQUEST from '@/request/index.js'
  import {
    onLoad,
  } from '@dcloudio/uni-app';


  import {
    computed,
    getCurrentInstance,
    ref
  } from 'vue'


  const to_quyue2 = (city) => {

    
    uni.navigateTo({
      url: `/pages/publish/quyu2`,
      events: {
        from_child: (data) => {
          console.log('收到来自区域的数据：', data);
    

          
          uni.navigateBack({
            delta: 1,
            success(res) {
              eventChannel.emit('from_child', {
                city,
                region:data
              });
            }
          })
          
        }
      },
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', city)
      },
      fail(err) {
        console.log(err, 222)
      }
    })
    
  }



  let eventChannel = null


  const options = ref([])



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

    options.value = allCity.filter(el => el?.children?.length)
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