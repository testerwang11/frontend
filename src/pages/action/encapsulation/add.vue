<template>
  <div>
    <save-action :is-add="true" :is-test-case="false" ref="saveAction"/>
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
    if (this.$refs.saveAction.saveActionFormChanged() || this.$refs.saveAction.saveConfirm) {
      next();
    } else {
      next(false);
      this.$confirm('数据有变动，您还未保存Action，确定需要退出吗?', '提示', {
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
    window.addEventListener('beforeunload', e => this.$refs.saveAction.beforeunloadHandler(e))
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.$refs.saveAction.beforeunloadHandler(e))
  }
}

</script>
