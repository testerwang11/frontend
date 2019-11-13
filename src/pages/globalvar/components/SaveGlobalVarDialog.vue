<template>
  <el-dialog :title="title" :visible="true" :show-close="false">
    <el-form :data="globalVar" label-width="100px">
      <el-form-item label="变量类型" :rules="[{required: true}]">
        <el-input v-model.trim="globalVar.type" clearable style="width: 300px" :disabled="!isAdd" />
      </el-form-item>
      <el-form-item label="所属环境" :rules="[{required: true}]">
        <el-select v-model="globalVar.env" clearable filterable style="width: 200px" placeholder="选择所属环境">
          <el-option v-for="env in envList" :key="env.id" :label="env.name" :value="env.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="变量名" :rules="[{required: true}]">
        <el-input v-model.trim="globalVar.name" clearable style="width: 300px" :disabled="!isAdd" />
      </el-form-item>
      <el-form-item label="变量值" :rules="[{required: true}]">
        <el-input v-model.trim="globalVar.value" clearable style="width: 300px" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model.trim="globalVar.description" type="textarea" style="width: 300px" />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="saveGlobalVar">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>

  import {addGlobalVar, updateGlobalVar, queryEnvList} from '@/api/globalvar'

export default {
  props: {
    isAdd: Boolean
  },
  data() {
    return {
      title: this.isAdd ? '添加全局变量' : '更新全局变量',
      globalVar: {
        id: undefined,
        type: 'String',
        name: '',
        value: '',
        description: '',
        projectId: this.$store.state.project.id,
        envId: this.$store.state.envId
      },
      envList: null
    }
  },
  created() {
    if (!this.isAdd) {
      this.globalVar = this.$route.params
    }
    queryEnvList().then(response => {
      this.envList = response.data
    })
  },
  computed: {
    envId() {
      return this.$store.state.envId
    }
  },
  methods: {
    cancel() {
      this.$router.back()
    },
    goToGlobalVarListPage() {
      this.$router.push({
        path: '/globalVar/list'
      })
    },
    saveGlobalVar() {
      if (this.isAdd) {
        addGlobalVar(this.globalVar).then(response => {
          this.$notify.success(response.msg)
          this.goToGlobalVarListPage()
        })
      } else {
        updateGlobalVar(this.globalVar).then(response => {
          this.$notify.success(response.msg)
          this.goToGlobalVarListPage()
        })
      }
    },
  }
}
</script>
