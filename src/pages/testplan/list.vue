<template>
  <div class="app-container">
    <el-button @click="$router.push('/testplan/add')" style="margin-bottom: 10px">添加测试任务</el-button>
    <el-table :data="testPlanList" border fit>
      <el-table-column label="测试计划" align="center" prop="name"></el-table-column>
      <el-table-column label="描述" align="center" prop="description"></el-table-column>
      <el-table-column label="通知人" align="center" prop="userEmails"></el-table-column>
      <el-table-column label="设备" align="center">
        <template scope="{ row }">
          <div v-for="deviceId in row.deviceIds" :key="deviceId">{{ deviceId }}</div>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center" prop="description">
        <template scope="{ row }">
          {{ row.enableSchedule === 1 ? '开启' : '关闭' }}
        </template>
      </el-table-column>
      <el-table-column label="cron表达式" align="center" prop="cronExpression"></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template scope="{ row }">
          {{ row.creatorNickName + ' ' + row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400">
        <template scope="{ row }">
          <el-button type="primary" size="mini" v-if="row.enableSchedule === 0"
                     @click.native="start(row.id)">启动
          </el-button>
          <el-button type="primary" size="mini" v-if="row.enableSchedule === 1"
                     @click.native="stop(row.id)">停止
          </el-button>
          <el-button type="success" @click="commitTestPlan(row.id)" size="mini">单次运行</el-button>
          <el-button type="primary"@click="updateTestPlan(row.id)" size="mini">编辑</el-button>
          <el-button type="danger" @click="deleteTestPlan(row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="queryTestPlanListForm.pageNum" :limit.sync="queryTestPlanListForm.pageSize" @pagination="fetchTestPlanList" />
    </div>
  </div>
</template>

<script>

  import {deleteTestPlan, getTestPlanList, startJob, stopJob} from '@/api/testPlan'
import { commitTestTask } from '@/api/testTask'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      testPlanList: [],
      total: 0,
      queryTestPlanListForm: {
        pageNum: 1,
        pageSize: 10,
        projectId: this.$store.state.project.id // 这里不能用computed里的projectId，会拿到undefined
      }
    }
  },
  methods: {
    fetchTestPlanList() {
      getTestPlanList(this.queryTestPlanListForm).then(response => {
        this.testPlanList = response.data.data
        this.total = response.data.total
      })
    },
    deleteTestPlan(id) {
      this.$confirm('删除该TestPlan？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTestPlan(id).then(response => {
          this.$notify.success(response.msg)
          this.fetchTestPlanList()
        })
      })
    },
    updateTestPlan(id) {
      this.$router.push('/testPlan/update/' + id)
    },
    commitTestPlan(id) {
      commitTestTask({ testPlanId: id }).then(response => {
        this.$notify.success(response.msg)
        this.$router.push('/testTask/list')
      })
    },
    start(id) {
      startJob(id).then(response => {
        this.$notify.success(response.msg)
        location.reload()
      })
    },
    stop(id) {
      stopJob(id).then(response => {
        this.$notify.success(response.msg)
        location.reload()
      })
    }
  },
  created() {
    this.fetchTestPlanList()
  }
}
</script>
