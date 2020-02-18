<template>
  <div class="views">
    <Dialog v-if="!showedDialog && showDialog" title="免责声明" content="本服务数据由无糖信息提供，数据准确性由其负责，相关内容仅供参考。" button="我知道了" @conform="closeDialog"></Dialog>
    <img class="banner" src="~@/assets/images/banner.png" alt="banner"/>
    <div class="input date">
      <div class="split"></div>
      <div class="title">出行日期</div>
      <input type="text" placeholder="选择日期" @click="showDate = true" :value="date" readonly/>
    </div>
    <div class="input type">
      <div class="split"></div>
      <div class="title">出行交通</div>
      <input type="text" placeholder="输入车次/航班号/城市等" v-model="type"/>
    </div>
    <div class="btn" @click="query">开始查询</div>
    <router-link class="info all" to="/results">显示全部查询结果</router-link>
    <div class="info from">数据来源于无糖</div>
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        title="出行日期"
        @confirm="confirmDate"
        @cancel="cancelDate"
      />
    </van-popup>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog/Dialog'
export default {
  data () {
    return {
      showDialog: true,
      showedDialog: window.showedDialog,
      showDate: false,
      date: '',
      type: '',
      currentDate: new Date(),
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2020, 11, 31)
    }
  },
  components: {
    Dialog
  },
  computed: {
  },
  mounted () {
    const type = sessionStorage.getItem('query.type')
    const date = sessionStorage.getItem('query.date')
    if (type) {
      this.type = type
    }
    if (date) {
      this.date = date
      const dateArray = date.split('-')
      this.currentDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    }
  },
  methods: {
    closeDialog () {
      this.showDialog = false
      window.showedDialog = true
    },
    query () {
      sessionStorage.setItem('query.type', this.type)
      sessionStorage.setItem('query.date', this.date)
      this.$router.push({name: 'results', query: {type: this.type, date: this.date}})
    },
    paddingLeft (value) {
      if (value < 10) {
        return `0${value}`
      } else {
        return value
      }
    },
    confirmDate (value) {
      if (!value) {
        return
      }
      this.date = `${value.getFullYear()}-${this.paddingLeft(value.getMonth() + 1)}-${this.paddingLeft(value.getDate())}`
      this.showDate = false
    },
    cancelDate () {
      this.showDate = false
    }
  }
}
</script>
<style scoped>
.views {
  height: 100%;
  background: rgb(244, 244, 244);
}
.banner {
  width: 100%;
}

.input {
  width: 7rem;
  height: 1.12rem;
  margin: 0 auto;
  background: #fff;
  border-radius: 5px;
  font-size: 16px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  padding: 0 0.42rem;
  box-sizing: border-box;
}
.input.date {
  margin-top: 0.22rem;
  margin-bottom: 0.18rem;
}

.input.type {
  margin-bottom: 0.44rem;
}

.input .title {
  padding-left: 0.12rem;
}

.input .split {
  content: "";
  display: block;
  width: 0.06rem;
  border-radius: 3px;
  background: #417bf7;
  height: 16px;
}

.input input {
  margin-left: 0.25rem;
  outline: none;
  border: none;
  flex: 1 0 auto;
}

input::-webkit-input-placeholder {
  color: #9d9d9d;
}

.btn {
  width: 7rem;
  height: 0.86rem;
  background: #417bf7;
  color: #fff;
  text-align: center;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.info {
  text-align: center;
  font-size: 16px;
  margin-top: 0.8rem;
  color: #b5b5b6;
}
.info.all {
  color: #417bf7;
  text-decoration: none;
  margin: 0.7rem auto 0;
  display: block;
  text-align: center;
}

/deep/ .van-picker button {
  color: #000;
}
</style>
