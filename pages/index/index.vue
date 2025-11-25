<template>
  <view class="container">
    <SearchBar @search="search" />

    <Card v-for="item in list" :key="item.carId" :carInfo="item"> </Card>

  </view>
</template>

<script>
  import Card from '@/components/Card.vue'
  import SearchBar from './SearchBar.vue'
  import REQUEST from '@/request/index.js'

  export default {
    components: {
      Card,
      SearchBar
    },

    data() {
      return {
        value: '',
        href: 'https://uniapp.dcloud.io/component/README?id=uniui',
        list: [],
        total: 0,
        pageNo: 1,
        canLoadmore: true,
      }
    },

    onLoad() {
      // this.getList() 
    },
    onShow() {
      if (this.canLoadmore) {
        this.getList()
      }
    },

    onReachBottom() {

      if (this.canLoadmore) {
        this.pageNo++
        this.getList()
      }

    },

    methods: {
      async getList() {
        const {
          data,
          code
        } = await REQUEST.post({
          url: `/app-api/ylc/car/page`,
          data: {
            pageNo: this.pageNo,
            pageSize: 10,

          },
        })
        const {
          list,
          total
        } = data

        this.list = [...this.list, ...list]
        this.total = total
        if (this.list.length >= this.total) {
          this.canLoadmore = false
        }
      },

      search(v) {
        console.log(v)
      }
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