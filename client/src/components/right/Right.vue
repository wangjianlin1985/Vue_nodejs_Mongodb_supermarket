<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddRoleDialog">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- 权限展开列 -->
        <el-table-column type="expand" label="权限详情" width="80">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightsById(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightsById(scope.row, item2.id)">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable @close="removeRightsById(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作"  width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditRoleDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoleById(scope.row.id)">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRolesDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="权限分配"
      :visible.sync="showSetRightsDialogVisible"
      width="50%"
      close="setRightDialoglogClosed">
      <!-- 权限分配树形控件 -->
      <el-tree
      :data="rightList"
      :props="treeProps"
      show-checkbox
      node-key="id"
      :default-checked-keys="defKeys"
      ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="50%"
      @close="addRoleDialogClosed">
      <el-form :model="roleForm" :rules="roleRules" ref="roleFormRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="roleForm.roleDesc" type="textarea" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色的对话框 -->
    <el-dialog
      title="修改角色"
      :visible.sync="eidtRoleDialogVisible"
      width="50%">
      <el-form :model="editRoleForm" :rules="editRoleRules" ref="editRoleFormRef" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc" type="textarea" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eidtRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditRoleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      // 控制分配权限对话框的显示与隐藏
      showSetRightsDialogVisible: false,
      // 权限树
      rightList: [],
      // 树形控件数据对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 树形控件默认选中数组,默认选中的Id节点
      defKeys: [],
      // 即将分配权限的角色id
      roleId: '',
      // 控制添加角色对话框的显示与隐藏
      addRoleDialogVisible: false,
      // 添加角色表单
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      // 添加角色表单验证
      roleRules: {
        roleName: [
          { required: true , message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      },
      // 控制修改角色对话框的显示与隐藏
      eidtRoleDialogVisible: false,
      // 修改角色表单
      editRoleForm: '',
      // 修改表单的验证规则
      editRoleRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 请求角色列表
    async getRoleList() {
      const { data: res } = await this.$http.get('http://127.0.0.1:8888/api/private/v1/roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.data
    },
    // 删除权限标签
    async removeRightsById(role, rightId) {
      const confirmResult = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消该删除操作')
      }
      const { data: res } = await this.$http.delete(`http://127.0.0.1:8888/api/private/v1/roles/${role.id}/rights/${rightId}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除权限失败！')
      }
      // this.getRoleList()
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRolesDialog(role) {
      const {data: res} = await this.$http.get('http://127.0.0.1:8888/api/private/v1/rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.roleId = role.id
      this.rightList = res.data
      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      this.showSetRightsDialogVisible = true
    },
    // 递归获取三级权限列表的id
    async getLeafKeys(node, arr) {
      // 如果当前节点不报航 children 属性，则说明是三级权限节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    // 关闭分配权限对话框时，清空defKeys，避免数据重复存储
    setRightDialoglogClosed() {
      this.defKeys = []
    },
    // 点击确定按钮，获取所有选中树形节点的id
    async allotRights() {
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const {data: res} = await this.$http.post(`http://127.0.0.1:8888/api/private/v1/roles/${this.roleId}/rights`,{
        rids: idStr
      })
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败！')
      }
      this.$message.success('分配权限成功！')
      this.getRoleList()
      this.showSetRightsDialogVisible = !this.showSetRightsDialogVisible
    },
    // 点击删除按钮，删除相应的角色
    async deleteRoleById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消该删除操作！')
      }
      const {data: res} = await this.$http.delete(`http://127.0.0.1:8888/api/private/v1/roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除角色失败！')
      }
      this.$message.success('您已成功删除该角色！')
      this.getRoleList()
    },
    // 点击添加角色按钮，展示添加角色的对话框
    showAddRoleDialog() {
      this.addRoleDialogVisible = !this.addRoleDialogVisible
    },
    // 关闭添加角色对话框
    addRoleDialogClosed() {
      this.$refs.roleFormRef.resetFields()
    },
    // 添加角色
    addRole() {
      this.$refs.roleFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.post('http://127.0.0.1:8888/api/private/v1/roles', this.roleForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加角色失败！')
          }
          this.$message.success('添加角色成功！')
          this.getRoleList()
          this.addRoleDialogVisible = !this.addRoleDialogVisible
        }
        return false
      })
    },
    // 点击编辑按钮，查询响应的角色,并修改角色信息
    async  showEditRoleDialog(id) {
      const {data: res} = await this.$http.get(`http://127.0.0.1:8888/api/private/v1/roles/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取该角色信息失败！')
      }
      this.editRoleForm = res.data
      this.eidtRoleDialogVisible = !this.eidtRoleDialogVisible
    },
    // 点击确定按钮，提交编辑角色表单
    submitEditRoleForm() {
      this.$refs.editRoleFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.put(`http://127.0.0.1:8888/api/private/v1/roles/${this.editRoleForm.roleId}`, this.editRoleForm)
          if (res.meta.status !== 200) {
            return this.$message.error('修改角色信息失败！')
          }
          this.$message.success('修改角色信息成功！')
          this.getRoleList()
          this.eidtRoleDialogVisible = !this.eidtRoleDialogVisible
        }
        return false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag{
  margin: 7px;
}
/* 权限详情 */
.bdtop{
  border-top: 1px #eee solid;
}
.bdbottom{
  border-bottom: 1px #eee solid;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>