<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 顶部搜索区域 -->
      <el-row :gutter="20">
        <!-- 搜索列 -->
        <el-col :span="8">
          <el-input placeholder="请输入分类名称" v-model="queryInfo.query" class="input-with-select" clearable @clear="getCateList">
            <el-button slot="append" icon="el-icon-search" @click="getCateList"></el-button>
          </el-input>
        </el-col>
        <!-- 添加分类 -->
        <el-col :span="4">
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table :data="cateList" border stripe>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="cate_name" label="分类名称"></el-table-column>
        <el-table-column prop="cate_desc" label="分类描述"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditCateDialog(scope.row._id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteCateById(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加分类列表的对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed">
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addCateForm.cate_name" placeholder="请输入商品分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="cate_desc">
          <el-input type="textarea" v-model="addCateForm.cate_desc" placeholder="请输入商品分类描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改分类列表 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="editCateDialogVisible"
      width="50%">
      <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef" label-width="80px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="editCateForm.cate_name" placeholder="请输入商品分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="cate_desc">
          <el-input v-model="editCateForm.cate_desc" placeholder="请输入商品分类描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 控制添加分类列表对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类表单
      addCateForm: {
        cate_name: '',
        cate_desc: ''
      },
      // 添加分类表单预验证
      addCateFormRules: {
        cate_name: [
          { required: true, message: '商品分类名称不能为空', trigger: 'blur' }
        ],
        cate_desc: [
          { required: true, message: '商品分类描述不能为空', trigger: 'blur' }
        ]
      },
      // 控制修改商品分类对话框的显示与隐藏
      editCateDialogVisible: false,
      // 修改分类表单
      editCateForm: '',
      // 修改商品分类表单与验证
      editCateFormRules: {
        cate_name: [
          { required: true, message: '商品分类名称不能为空', trigger: 'blur' }
        ],
        cate_desc: [
          { required: true, message: '商品分类描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取分类列表
    async getCateList() {
      const {data: res} = await this.$http.post('api/querycate', this.queryInfo)
      if (res.err_code !== 0) {
        return this.$message.error('获取分类列表失败！')
      }
      this.cateList = res.data
    },
    // 点击添加按钮，展示添加分类的对话框
    showAddCateDialog() {
      this.addCateDialogVisible = true
    },
    // 添加商品分类
    addCate() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.post('api/addcate', this.addCateForm)
          if (res.err_code == 500) {
            return this.$message.error('添加商品分类失败！')
          } else if (res.err_code == 1) {
            return this.$message.warning('商品分类名称已存在！')
          }
          this.$message.success('添加商品分类成功！')
          this.getCateList()
          this.addCateDialogVisible = false
        }
        return false
      })
    },
    // 关闭添加商品分类对话框
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
    },
    // 删除商品分类
    async deleteCateById(id) {
      const confirmRet = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmRet !== 'confirm') {
        return this.$message.info('已取消该删除操作！')
      }
      const {data: res} = await this.$http.post('api/deletecate', {id: id})
      if (res.err_code !== 0) {
        return this.$message.error('删除商品分类失败！')
      }
      this.$message.success('删除商品分类成功！')
      this.getCateList()
    },
    // 展示修改商品分类对话框
    async showEditCateDialog(id) {
      const {data: res} = await this.$http.post('api/querycatebyid', {id: id})
      if (res.err_code !== 0) {
        return this.$message.error('服务器繁忙，请稍后重试！')
      }
      this.editCateForm = res.data
      this.editCateDialogVisible = true
    },
    // 提交修改分类表单
    editCate() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (valid) {
          const {data: res} = await this.$http.put('api/editcate', this.editCateForm)
          if (res.err_code !== 0) {
            return this.$message.error('修改商品分类失败！')
          }
          this.$message.success('修改商品分类成功！')
          this.getCateList()
          this.editCateDialogVisible = false
        }
        return false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>