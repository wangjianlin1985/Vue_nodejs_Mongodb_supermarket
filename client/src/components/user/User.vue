<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div>
            <el-input placeholder="请输入姓名" clearable v-model="queryInfo.query" @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="180"></el-table-column>
        <!-- <el-table-column prop="password" label="密码" min-width="120"></el-table-column> -->
        <el-table-column prop="tel" label="联系方式" min-width="160"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.gender == 0">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStatusChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row._id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row._id)"></el-button>
            <el-tooltip class="item" effect="dark" content="角色分配" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRole(scope.row._id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[3, 5, 7]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
      <!-- 添加用户对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="50%"
        @close="addUserDialogClosed">
        <el-form :model="addUserForm" :rules="addUserRules" ref="addUserFormRef" label-width="60px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addUserForm.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="addUserForm.tel"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户对话框 -->
      <el-dialog
        title="编辑用户"
        :visible.sync="editUserDialogVisible"
        width="50%">
        <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRef" label-width="60px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserForm.email" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editUserForm.password" ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editUserForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="editUserForm.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="editUserForm.tel" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 展示分配权限的对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="setRoleDialogVisible"
        width="50%">
        <p>姓名：{{ setRoleForm.name }}</p>
        <p>角色：{{ setRoleForm.role }}</p>
        <el-form :model="roleForm">
            <el-form-item label="角色分配：">
              <el-select v-model="roleForm.role" placeholder="请选择角色">
                <el-option
                v-for="item in roleOptions" :key="item.id"
                :label="item.roleName"
                :value="item.roleName"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRole">确 定</el-button>
        </span>
      </el-dialog>


      <!--  -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 验证邮箱的校验规则
    let checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback()
      }
      callback(new Error('您输入的邮箱格式不正确，请检查后重新输入！'))
    }
    // 验证手机号的规则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[578]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        // 合法手机号
        return callback()
      }
      callback(new Error('手机号码的格式不正确'))
    }
    return {
      // 查询参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 总页数
      total: 0,
      // 用户列表
      userList: [],
      // 控制添加用户对话框的显示与隐藏
      addUserDialogVisible: false,
      // 添加用户表单
      addUserForm: {
        email: '',
        password: '',
        name: '',
        gender: 0,
        tel: ''
      },
      // 添加用户校验规则
      addUserRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码的长度为6-16个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur', },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制编辑对话框的显示与隐藏
      editUserDialogVisible: false,
      // 编辑用户表单
      editUserForm: {},
      // 编辑用户表单的校验规则
      editUserFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码的长度为6-16个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur', },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制分配权限对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 分配角色的表单
      setRoleForm: {},
      // 角色表单
      roleForm: {
        role: ''
      },
      // 角色选项
      roleOptions: []
    }
  },
  created() {
    this.getUserList()
    this.getRole()
  },
  methods: {
    // 获取用户列表
    getUserList() {
      this.$http.post('/api/queryuser', this.queryInfo).then(ret => {
        if (ret.data.err_code !== 0) {
          this.$message.error('获取用户列表失败')
        }
        this.userList = ret.data.data
        this.total = ret.data.total
      })
    },
    // 用户状态改变
    userStatusChanged(row){
      this.$http.put('api/modifyuser', row).then(ret => {
        if (ret.data.err_code !== 0) {
          return this.$message.error('更新用户状态失败！')
        }
        this.$message.success('更新用户状态成功！')
        this.getUserList()
      })
    },
    // 页面大小变化
    handleSizeChange(newPageSize) {
      this.queryInfo.pagesize = newPageSize
      this.getUserList()
    },
    // 当前页面数变化
    handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getUserList()
    },
    // 添加用户
    addUser() {
      this.$refs.addUserFormRef.validate(valid => {
        if (valid) {
          this.$http.post('api/createuser', {
            email: this.addUserForm.email,
            password: this.addUserForm.password,
            name: this.addUserForm.name,
            gender: this.addUserForm.gender,
            tel: this.addUserForm.tel
          }).then(ret => {
            if (ret.data.err_code === 1) {
              return  this.$message.warning('邮箱已存在，请换个邮箱再试！')
            } else if (ret.data.err_code === 500) {
              return this.$message.error('服务器正忙，请稍后重试！')
            } else {
              this.$message.success('添加用户成功！')
              this.getUserList()
            }
          })
          this.addUserDialogVisible = !this.addUserDialogVisible
        }
        return false
      })
    },
    // 关闭添加用户对话框
    addUserDialogClosed() {
      this.$refs.addUserFormRef.resetFields()
    },
    // 点击编辑按钮，展示编辑用户对话框
    showEditDialog(id) {
      this.$http.post('api/queryuserbyid', {id: id}).then(ret => {
        if (ret.data.err_code !== 0) {
          return this.$message.error('查询该用户失败！')
        }
        this.editUserForm = ret.data.data
        this.editUserDialogVisible = !this.editUserDialogVisible
      })
    },
    // 编辑用户
    editUser() {
      this.$refs.editUserFormRef.validate(valid => {
        if(valid) {
          this.$http.put('api/modifyuser',{
            _id: this.editUserForm._id,
            email: this.editUserForm.email,
            password: this.editUserForm.password,
            name: this.editUserForm.name,
            gender: this.editUserForm.gender,
            tel: this.editUserForm.tel,
            role: this.editUserForm.role,
            status: this.editUserForm.status
          }).then(ret => {
            if (ret.data.err_code !== 0) {
              return this.$message.error('修改用户信息失败！')
            }
            this.$message.success('修改用户信息成功！')
            this.getUserList()
            this.editUserDialogVisible = !this.editUserDialogVisible
          })
        }
        return false
      })
    },
    // 删除用户
    async deleteUser(id) {
      const confirmRet = await this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRet !== 'confirm') {
        return this.$message.info('已取消删除操作')
      }
      // 发起删除用户请求
      this.$http.post('api/deleteuser', {"_id": id}).then(ret => {
        if(ret.data.err_code !== 0) {
          return this.$message.error('删除该用户失败！')
        }
        this.$message.success('成功删除该用户！')
        this.getUserList()
      })
    },
    // 点击按钮,展示分配权限的对话框
    showSetRole(id) {
      this.$http.post('api/queryuserbyid', {id: id}).then(ret => {
        if (ret.data.err_code !== 0) {
          return this.$message.error('查询该用户失败！')
        }
        this.setRoleForm = ret.data.data
        this.setRoleDialogVisible = !this.setRoleDialogVisible       
      })
    },
    // 分配角色
    setRole() {
      this.$http.put('api/modifyuser', {
        _id: this.setRoleForm._id,
        email: this.setRoleForm.email,
        password: this.setRoleForm.password,
        name: this.setRoleForm.name,
        gender: this.setRoleForm.gender,
        tel: this.setRoleForm.tel,
        role: this.roleForm.role,
        status: this.setRoleForm.status
      }).then(ret => {
        if (ret.data.err_code !== 0) {
          return this.$message.error('修改用户信息失败！')
        }
        this.$message.success('修改用户信息成功！')
        this.getUserList()
        this.setRoleDialogVisible = !this.setRoleDialogVisible
      })
    },
    async getRole() {
      const {data: res} = await this.$http.get('http://127.0.0.1:8888/api/private/v1/roles')
      this.roleOptions = res.data
    }
  }
}
</script>