<template>
  <div class="filter-page">
    <div class="filter-bar">
      <span @click="byTime">出行时间<i :class="['icon-time',{'icon-time1': filterTime}]"></i></span>
      <span @click="showLayer">交通工具<i :class="['icon-filter',{'icon-filter1': hasFilter}]"></i></span>
    </div>
    <div :class="['filter-layer', {'show': layerShow}]">
      <div class="title">
        <span @click="cancel">取消</span>
        <em>交通工具</em>
        <span @click="confirm">确认</span>
      </div>
      <ul class="filter-items">
        <li :class="{'selected': selectNo === i}" v-for="(item, i) in filters" :key="i" @click="select(i)">{{item}}</li>
      </ul>
    </div>
    <transition name="fade">
      <div class="mask" v-show="isMaskShow" @click="cancel"></div>
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
      filters: ['全部', '飞机', '火车', '地铁', '长途客车/大巴', '公交车', '出租车', '轮船', '其它公共场所'],
      selectNo: 0,
      note: 0,
      filterTime: false,
      hasFilter: false
    }
  },
  methods: {
    showLayer () {
      this.layerShow = this.isMaskShow = true
    },
    cancel () {
      this.layerShow = this.isMaskShow = false
      this.selectNo = this.note
    },
    select (i) {
      this.selectNo = i
    },
    confirm () {
      this.layerShow = this.isMaskShow = false
      this.note = this.selectNo
      this.selectNo > 0 ? this.hasFilter = true : this.hasFilter = false
      this.$emit('select', this.selectNo)
    },
    byTime () {
      this.$emit('sortByTime')
      this.filterTime = !this.filterTime
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
  height: 0.9rem;
  border-top: 1px solid #ccc;
}
.filter-bar span{
  flex: 0 0 50%;
  text-align: center;
  font-size: 0.28rem;
  line-height: 0.9rem;
}
.mask{
  position: fixed;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.45);
  z-index: 10;
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
  height: 9rem;
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
.filter-items li.selected::after{
  border: 1px solid #497ae4;
  background: #497ae4;
}
.filter-items li.selected::before{
  border: 2px solid #fff;
  border-style: none solid solid none;
  width: 5px;
  height: 8px;
  position: absolute;
  content: '';
  right: 0.69rem;
  top: 50%;
  transform: translateY(-65%) rotate(45deg);
  z-index: 9;
}
.icon-time, .icon-filter{
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
  margin: 0 0 0 0.1rem;
  vertical-align: middle;
}
.icon-time{
  background: url('~@/assets/images/filter-time.png') no-repeat;
  background-size: 100% auto;
}
.icon-time1{
  background-position: 0 -0.4rem;
}
.icon-filter{
  background: url('~@/assets/images/filter-all.png') no-repeat 0 -0.4rem;
  background-size: 100% auto;
}
.icon-filter1{
  background-position: 0 0;
}
</style>
