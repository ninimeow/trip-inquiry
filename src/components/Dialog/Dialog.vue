<template>
  <div class="dialog-wrapper">
    <div class="mask"></div>
    <div class="dialog">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div class="dialog-btn" @click="click">{{button}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    button: {
      type: String
    }
  },
  methods: {
    click () {
      this.$emit('conform')
    }
  }
}
</script>

<style>
.dialog-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333333;
  opacity: 0.5;
}
.dialog {
  position: absolute;
  width: 5.25rem;
  background: #fff;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 8px;
}
.dialog .title {
  font-size: 18px;
  font-weight: bolder;
  margin-top: 0.5rem;
}

.dialog .content {
  padding: 0.25rem 0.75rem;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  line-height: 20px;
}
.dialog .dialog-btn {
  margin: 0.25rem 0;
  font-size: 16px;
}
</style>
