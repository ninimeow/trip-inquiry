<template>
  <div class="page" ref="page">
    <van-loading class="loading" type="spinner" color="#1989fa" v-show="loading" size="24px" vertical>查询中...</van-loading>
    <div :class="{'white-bg': !showList}">
      <p class="times" v-show="updatedTime">数据更新截止时间：{{updatedTime}}</p>
      <div class="lists" v-if="showList">
        <div class="items" v-for="(item, i) in filterLists" :key="i">
          <span class="label">有确诊患者同行</span>
          <span :class="`icons icon-${item.t_type}`"></span>
          <dl v-if="item.t_type === 8">
            <dt>{{item.t_no}}</dt>
            <dd>{{item.t_date}}</dd>
          </dl>
          <dl v-else-if="item.t_type === 1 || item.t_type === 2">
            <dt><span>{{item.t_pos_start}}</span><em></em><span>{{item.t_pos_end}}</span></dt>
            <dd>{{setTime(item.t_start)}} 至  {{setTime(item.t_end)}}<br>{{item.t_no}}</dd>
          </dl>
          <dl v-else>
            <dt>{{item.t_no}}</dt>
            <dd>{{item.t_date}}</dd>
            <dd><span>始：</span>{{setPlace(item.t_pos_start)}} <br><span>终：</span>{{setPlace(item.t_pos_end)}}</dd>
          </dl>
          <p class="from">信息来源：{{item.who}}</p>
        </div>
      </div>
      <div class="no-result" v-else>
        <span></span>
        <p>目前尚未发现该行程的同程旅客中<br>有新冠肺炎确诊患者</p>
      </div>
    </div>
    <dl class="tips" v-if="!showList">
      <dt>特别提示：</dt>
      <dd>您只能查到经由权威媒体发布的行程，如未查询到行程信息并不代表一定没有与新型肺炎病毒感染者同程，如有症状请到指定发热门诊救治。</dd>
      <dd>数据错误或问题反馈：<br>nearpost@qq.com、gainover@qq.com</dd>
    </dl>
    <filter-bar @select="setFilter" @sortByTime="byTime"></filter-bar>
  </div>
</template>

<script>
import FilterBar from '@/components/FilterBar'

export default {
  name: 'results',
  data () {
    return {
      dataLists: [],
      filterLists: [],
      updatedTime: null,
      showList: true,
      loading: true
    }
  },
  props: {
    date: {type: String},
    type: {type: String}
  },
  components: {
    FilterBar
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      this.loading = true
      this.$axios.get('https://2019ncov.nosugartech.com/data.json').then((res) => {
        if (res.data.data.length) {
          var lastUpdate = 0
          res.data.data.forEach(item => {
            lastUpdate = Math.max(lastUpdate, new Date(item.updated_at).getTime())
          })
          this.updatedTime = this.formatDate(new Date(lastUpdate))
          let result = res.data.data
          if (this.date) {
            const date = this.date.trim()
            result = result.filter(item => item.t_date === date)
          }
          if (this.type) {
            const type = this.type.trim()
            result = result.filter(item => item.t_no.indexOf(type) > -1 || item.t_pos_start.indexOf(type) > -1 || item.t_pos_end.indexOf(type) > -1)
          }
          this.dataLists = this.filterLists = result
          if (!result.length) {
            this.showList = false
          }
        } else {
          this.showList = false
        }
      }).finally(() => {
        this.loading = false
      })
    },
    setTime (date) {
      date = date.replace('2020/', '')
      return date.replace('/', '-')
    },
    setFilter (data) {
      if (data > 0) {
        this.filterLists = this.dataLists.filter(item => item.t_type === data)
      } else {
        this.filterLists = this.dataLists
      }
      this.filterLists.length ? this.showList = true : this.showList = false
      this.$refs.page.scrollTop = 0
    },
    byTime () {
      this.filterLists.reverse()
      this.$refs.page.scrollTop = 0
    },
    formatDate (date) {
      let M = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let hh = date.getHours()
      let mm = date.getMinutes()
      return M + '-' + D + ' ' + hh + ':' + mm
    },
    setPlace (str) {
      return str.length ? str : '不详'
    }
  }
}
</script>

<style scoped>
.loading {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
p {
  margin: 0;
  padding: 0.28rem;
}
.page {
  height: 100vh;
  overflow-y: scroll;
  background: #f0f2f6;
  -webkit-overflow-scrolling: touch;
}
.white-bg {
  background: #fff;
}
.times {
  font-size: 0.28rem;
}
.lists {
  padding: 0.45rem 0.28rem;
}
.items {
  background: #fff;
  border-radius: 0.1rem;
  padding: 0.1rem 0.25rem 0;
  position: relative;
  margin: 0 0 0.45rem;
}
.items .from {
  color: #9d9d9d;
  font-size: 0.22rem;
  border-top: 1px dashed #9d9d9d;
  padding: 0.15rem 0 0.15rem 0.5rem;
  overflow: hidden;
}
.items dl {
  padding: 0.25rem 0 0.15rem 0.5rem;
  margin: 0;
  overflow: hidden;
}
.items dt {
  color: #0a1437;
  font-size: 0.32rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.items dt span {
  flex: 0 0 auto;
}
.items dt span:last-of-type {
  text-align: right;
}
.items dt em {
  width: 22px;
  height: 2.5px;
  background: url("~@/assets/images/arrow.png") no-repeat;
  background-size: 100% auto;
  display: inline-block;
  margin: 0 0.1rem;
}
.items dd {
  font-size: 0.26rem;
  margin: 0.1rem 0 0;
}
.label {
  position: absolute;
  z-index: 9;
  top: -0.25rem;
  left: -0.08rem;
  background: linear-gradient(to right, #4d87f9, #96c5fc);
  color: #fff;
  padding: 0 0.1rem;
  font-size: 0.24rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.08rem 0.08rem 0 0.08rem;
}
.icons {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.38rem;
}
.icon-1 {
  background: url("~@/assets/images/flight.png") no-repeat;
  background-size: 100% auto;
}
.icon-2 {
  background: url("~@/assets/images/train.png") no-repeat;
  background-size: 100% auto;
}
.icon-3 {
  background: url("~@/assets/images/subway.png") no-repeat;
  background-size: 100% auto;
}
.icon-4 {
  background: url("~@/assets/images/travel-bus.png") no-repeat;
  background-size: 100% auto;
}
.icon-5 {
  background: url("~@/assets/images/bus.png") no-repeat;
  background-size: 100% auto;
}
.icon-6 {
  background: url("~@/assets/images/taxi.png") no-repeat;
  background-size: 100% auto;
}
.icon-7 {
  background: url("~@/assets/images/ship.png") no-repeat;
  background-size: 100% auto;
}
.icon-8 {
  background: url("~@/assets/images/local.png") no-repeat;
  background-size: 100% auto;
}
.no-result {
  text-align: center;
  padding: 0.5rem 0;
}
.no-result span {
  width: 1.92rem;
  height: 1.72rem;
  display: block;
  margin: 0 auto 0.2rem;
  background: url("~@/assets/images/pic1.png") no-repeat;
  background-size: 100% auto;
}
.no-result p {
  font-size: 0.28rem;
  line-height: 0.46rem;
}
.tips {
  padding: 0.4rem;
}
.tips dt {
  font-size: 0.32rem;
  color: #0a1437;
}
.tips dd {
  color: #767575;
  font-size: 0.26rem;
  line-height: 0.38rem;
  margin: 0.15rem 0 0.2rem;
}
</style>
