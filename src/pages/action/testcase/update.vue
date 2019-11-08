<template>
  <div>
    <save-action :is-add="false" :is-test-case="true" ref="saveAction"/>
  </div>
</template>

<script>
import SaveAction from '../components/SaveAction'

export default {
  components: {
    SaveAction
  },
  beforeRouteLeave(to, from, next) {
    next(false);
    let num = this.$refs.saveAction.change_number
    console.log(num)
    if (this.$refs.saveAction.confirmed) {
      next();
    } else {
      next(false);
      this.$confirm('您还未保存用例，确定需要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next();
      });
    }
  },
  created() {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
  }
}
</script>
