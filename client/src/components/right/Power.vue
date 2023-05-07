<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <!-- <el-card>
      <el-table :data="powerList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="pw_name" label="权限名称"></el-table-column>
        <el-table-column prop="pw_level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pw_level === 0">一级</el-tag>
            <el-tag v-else-if="scope.row.pw_level === 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card> -->
    <el-card>
      <el-table :data="rightList" border stripe>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      powerList: [],
      rightList: []
    }
  },
  created() {
    // this.getPowerList()
    this.getRightList()

  },
  methods: {
    // async getPowerList() {
    //   const { data: res } = await this.$http.get('api/querypower')
    //   if (res.err_code !== 0) {
    //     return this.$message.error('获取权限列表失败！')
    //   }
    //   this.powerList = res.data
    // },
    async getRightList() {
      const { data: res } = await this.$http.get('http://127.0.0.1:8888/api/private/v1/rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.rightList = res.data
    }
  }
}
</script>

<style lang="less" scoped>

</style>