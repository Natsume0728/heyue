<template>
  <view class="container">
    <view v-if="list.length === 0" style="text-align: center;"> 暂无收藏 </view>
    <Card v-for="item in list" :key="item.carId" :carInfo="item"> </Card>
  </view>
</template>

<script setup>
  import {
    onShow,
    onLoad,
    onReachBottom
  } from '@dcloudio/uni-app'
  import {
    ref,
    computed
  } from 'vue'
  import REQUEST from '@/request/index.js'
  import {
    useDefaultStore
  } from '@/store/index.js'
  import Card from '@/components/Card.vue'

  const DefaultStore = useDefaultStore()
  const userId = computed(() => DefaultStore.getUserId)

  const pageNo = ref(1)
  const list = ref([])
  const total = ref(0)
  const canLoadmore = ref(true)

  onShow(() => {
    if (canLoadmore.value) {
      getCarColl()
    }
  })

  onReachBottom(() => {
    if (canLoadmore.value) {
      pageNo.value++
      getCarColl()
    }

  })

  const getCarColl = async () => {
    const {
      data,
      code
    } = await REQUEST.post({
      url: `/app-api/ylc/car/getCarColl`,
      data: {
        userId: userId.value,
        pageNo: pageNo.value,
        pageSize: 10,
      },
    })
    const {
      list: _list,
      total: _total
    } = data


    list.value = [...list.value, ..._list]
    total.value = _total
    if (list.value.length >= total.value) {
      canLoadmore.value = false
    }

  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    font-size: 14px;
    line-height: 24px;

  }
</style>