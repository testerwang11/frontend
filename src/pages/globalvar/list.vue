<template>
  <div class="app-container">
    <el-button @click="$router.push('/globalVar/add')" style="margin-bottom: 10px">添加全局变量</el-button>
    <!-- 列表 -->
    <div>
      <el-tabs type="card" v-model="selectedEnvName" @tab-click="onTabClick">
        <el-tab-pane v-for="env in envList" :key="env.id" :label="env.name"
                     :name="env.name"/>
      </el-tabs>
    </div>
    <div>
      <el-table :data="globalVarList" highlight-current-row border>
        <el-table-column label="所属环境" align="center" prop="envId">
          <template slot-scope="{ row }">
            {{row.envId|id2Name}}
          </template>
        </el-table-column>
        <el-table-column label="变量类型" align="center" prop="type" />
        <el-table-column label="变量名" align="center" prop="name" />
        <el-table-column label="变量值" align="center" prop="value" />
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{ row }">
            {{ row.creatorNickName + ' ' + row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" class="el-icon-edit" @click="updateGlobalVar(row)" />
            <el-button type="danger" class="el-icon-delete" @click="deleteGlobalVar(row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="queryForm.pageNum" :limit.sync="queryForm.pageSize" @pagination="fetchGlobalVarList" />
    </div>
  </div>

</template>

<script>
  import {getGlobalVarList, deleteGlobalVar, getNameById, queryEnvList} from '@/api/globalvar'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      selectedEnvName: '全部',
      envList: [],
      globalVarList: [],
      total: 0,
      queryForm: {
        projectId: this.$store.state.project.id,
        envId: 1,
        pageNum: 1,
        pageSize: 10
      },
      name: ''
    }
  },
  computed: {
    projectId() {
      return this.$store.state.project.id
    }
  },
  created() {
    this.fetchGlobalVarList()
    this.fetchEnvList()
  },
  methods: {
    onTabClick(tab) {
      const activedEnv = this.envList.filter(activedEnv => activedEnv.name === tab.label)[0]
      this.queryForm.envId = activedEnv.id
      this.$store.state.envId = activedEnv.id
      this.queryForm.pageNum = 1
      this.fetchGlobalVarList()
    },
    updateGlobalVar(globalVar) {
      this.$router.push({
        name: 'UpdateGlobalVar',
        params: globalVar
      })
    },
    deleteGlobalVar(globalVar) {
      this.$confirm('删除该变量？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGlobalVar(globalVar.id).then(resp => {
          this.$notify.success(resp.msg)
          this.fetchGlobalVarList()
        })
      })
    },
    fetchGlobalVarList() {
      getGlobalVarList(this.queryForm).then(resp => {
        this.globalVarList = resp.data.data
        this.total = resp.data.total
      })
    },
    async fetchEnvList() {
      const {data} = await queryEnvList()
      this.envList = this.envList.concat(data)
    },
    // getName(id) {
    //   getNameById(id).then(resp =>{
    //     this.name = resp.data
    //   })
    //   return this.name
    // }
  },
  filters: {
    id2Name(id) {
     switch (id) {
        case 1:
          return "生产"
        case 2:
          return "预生产"
        case 3:
          return "测试"
        case 4:
          return "开发"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
