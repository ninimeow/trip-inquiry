<template>
  <div class="filter-page">
    <div class="filter-bar">
      <span>出行时间</span>
      <span @click="showLayer">交通工具</span>
    </div>
    <div :class="['filter-layer', {'show': layerShow}]">
      <div class="title">
        <span>取消</span>
        <em>交通工具</em>
        <span>确认</span>
      </div>
      <ul class="filter-items">
        <li v-for="(item, i) in filters" :key="i">{{item}}</li>
      </ul>
    </div>
    <transition name="fade">
      <div class="mask" v-show="isMaskShow"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'results',
  data () {
    return {
      dataLists: [],
      isMaskShow: false,
      layerShow: false,
      filters: ['飞机', '火车', '地铁', '长途客车/大巴', '公交车', '出租车', '轮船', '其它公共场所']
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.$axios.get('https://2019ncov.nosugartech.com/data.json').then((res) => {
        // this.dataLists = res.data.data
        console.log(this.dataLists)
      }).catch((err) => {
        console.log(err)
      })
    },
    showLayer () {
      this.layerShow = true
      this.isMaskShow = true
    }
  }
}
</script>

<style scoped>
p{
  margin: 0;
  padding: 0.28rem;
}
.page{
  height: 100vh;
  overflow: hidden;
}
.filter-bar{
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  display: flex;
  background: #FFF;
  height: 0.8rem;
  border-top: 1px solid #999;
}

.filter-bar span{
  flex: 0 0 50%;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.8rem;
}
.mask{
  position: fixed;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.45);
}
.filter-layer{
  width: 100%;
  background: #fff;
  border-radius: 0.15rem 0.15rem 0 0;
  position: fixed;
  bottom: 0;
  z-index: 999;
  height: 0;
  transition: height 0.4s;
}
.show{
  height: 8.1rem;
  transition: height 0.4s;
}
.filter-layer .title{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-layer .title span{
  flex: 0 0 1.5rem;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.9rem;
}
.filter-layer .title em{
  font-size: 0.3rem;
  font-style: normal;
}
.filter-items{
  background: #f6f6f6;
}
.filter-items li{
  line-height: 0.9rem;
  font-size: 0.28rem;
  padding: 0 0.6rem;
  position: relative;
}
.filter-items li::after{
  width: 0.3rem;
  height: 0.3rem;
  border: 1px solid #999;
  border-radius: 0.05rem;
  content: '';
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
