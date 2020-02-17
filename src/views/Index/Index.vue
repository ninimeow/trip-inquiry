<template>
  <div class="views">
    <img class="banner" src="/static/images/banner.png" alt="banner"/>
    <div class="input date">
      <span>出行日期</span>
      <input type="text" placeholder="选择日期"/>
    </div>
    <div class="input type">
      <span>出行交通</span>
      <input type="text" placeholder="输入车次/航班号/城市等；如CA3883"/>
    </div>
    <div class="btn">开始查询</div>
    <div class="info all">显示全部行程</div>
    <div class="info from">数据来源于无糖</div>
  </div>
</template>

<script>
export default {

}
</script>
<style>
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

.input span {
  padding-left: 0.12rem;
}

.input span::before {
  content: "";
  display: block;
  width: 0.06rem;
  height: 100%;
  border-radius: 3px;
  background: #417bf7;
}

.input input {
  margin-left: 0.25rem;
  outline: none;
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
}
</style>
