<template>
  <div class="views">
    <img class="banner" src="/static/images/banner.png" alt="banner"/>
    <div class="input date">
      <span>出行日期</span>
      <input type="text" placeholder="选择日期"/>
    </div>
    <div class="input type">
      <span>出行日期</span>
      <input type="text" placeholder="输入车次/航班号/城市等；如CA3883"/>
    </div>
    <div class="btn"></div>
    <div>显示全部行程</div>
    <div>数据来源于无糖</div>
  </div>
</template>

<script>
export default {

}
</script>
<style>
.banner {
  width: 100%;
}

.input {
  width: 70rem;
}
</style>
