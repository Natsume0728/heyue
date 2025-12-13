<template>
  <view class="container">


	<u-cell-group>
		<u-cell-item  title="地区选择" value="不限"></u-cell-item>
		<u-cell-item title="车型" value="不限"></u-cell-item>
		<u-cell-item title="品牌" value="不限"></u-cell-item>
		<u-cell-item title="排放" value="不限"></u-cell-item>
		<u-cell-item title="价格" value="不限"></u-cell-item>
		<u-cell-item title="年份" value="不限"></u-cell-item>
		<u-cell-item title="里程" value="不限"></u-cell-item>
		<u-cell-item title="颜色" value="不限"></u-cell-item>
		<u-cell-item title="变速箱" value="不限"></u-cell-item>
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
    onPageScroll,
    onLoad
  } from '@dcloudio/uni-app';
  import {
    getCurrentInstance,
    ref
  } from 'vue'

  const vehicle_type_click = (item) => {
    vehicle_type.value = item
  }
  const reset = () => {
    vehicle_type.value = null
  }

  const confirm = () => {
    uni.navigateBack({
      delta: 1,
      success(res) {
        // 4. 主动向 PageA 发送回复 (可选)
        eventChannel.emit('from_shaixuan', {
          vehicle_type: vehicle_type.value
        });
      }
    })
  }
  const VehicleTypes = ref([])
  const vehicle_type = ref(null)

  const getVehicleType = async () => {
    const {
      data,
      code
    } = await REQUEST.get({
      url: `/app-api/ylc/car/getVehicleType`,
    })

    VehicleTypes.value = data
  }

  let eventChannel = null
  onLoad(() => {
    // 1. 获取当前组件实例
    const instance = getCurrentInstance();
    // 2. 从实例中获取事件通道
    eventChannel = instance.proxy.getOpenerEventChannel();
    console.log(eventChannel)
    getVehicleType()
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