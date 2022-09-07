<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=` + item.goods_id" v-for="item in goods"
      :price="item.goods_price | toFixed" :title="item.goods_name" :thumb="item.goods_small_logo || defaultPic" />
  </view>
</template>

<script>
  import toast from '@/utils/toast.js'
  import {
    getGoodsList
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {
      async loadGoodsList(cbPullDown) {
        this.isLoading = true
        const {
          goods,
          total
        } = await getGoodsList(this.queryData)
        this.goods = [...this.goods, ...goods]
        this.total = total
        this.isLoading = false
        cbPullDown && cbPullDown()
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.loadGoodsList()
    },

    onPullDownRefresh() {
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goods = []
      this.total = 0

      this.loadGoodsList(() => {
        uni.stopPullDownRefresh()
      })
    },

    // 拉下触底
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('亲，没有更多数据了~')
      if (this.isLoading) return
      this.queryData.pagenum++
      this.loadGoodsList()
    }

  }
</script>

<style>

</style>
