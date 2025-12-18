<template>

  <u-cell-group :title="item.name" v-for="item in list" :key="item.id" >
    <u-cell-item :title="child.name" v-for="child in item.children" :key="child.id" :arrow="false"
      @click="confirm(child)"></u-cell-item>
  </u-cell-group>
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


  const title = ref('')
  const list = ref([])

  const confirm = (item) => {
    console.log(item)
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_child', item);
      }
    })
  }

  let eventChannel = null


  onLoad(() => {
    const instance = getCurrentInstance()
    eventChannel = instance.proxy.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data, '取上一页面通过eventChannel传送到当前 品牌3')
      title.value = data.name
      list.value = data.children
    })
  })


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