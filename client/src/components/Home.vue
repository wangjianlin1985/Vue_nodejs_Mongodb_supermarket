<template>
  <div class="homecontainer">
   <el-container>
      <!-- 头部区域 -->
      <el-header>
        <el-row>
          <el-col :span="1" class="logoo"><img src="../assets/img/smile.svg" title="欢迎你"></el-col>
          <el-col :span="4" class="logoo">微笑生活超市后台管理系统</el-col>
          <el-col :span="2" :offset="17"><i class="logout el-icon-switch-button" title="退出" @click="logout"></i></el-col>
        </el-row>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="collapse ? '60px' : '200px'">
          <!-- 折叠区域 -->
          <div class="fold" @click="toggleCollapse" title="点击折叠侧边栏">|||</div>
          <!-- 侧边栏导航菜单 -->
          <el-menu
            :default-active="this.$route.fullPath"
            background-color="#002140"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            router
            :collapse="collapse"
            :collapse-transition="false">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-management"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/right">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>角色列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/power">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>权限列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="/good">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/cate">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>分类列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-shopping-cart-2"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/order">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>订单列表</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-data-analysis"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="/report">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>数据报表</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 主题内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 折叠面板
      collapse: false
    }
  },
  created() {

  },
  methods: {
    // 退出
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 侧边栏折叠效果
    toggleCollapse() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less" scoped>
.homecontainer{
  min-width: 1266px;
}
.homecontainer, .el-container, .el-aside, .el-main{
  height: 100%;
}
.el-header{
  padding: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
  background: #001529;
  .logoo{
    cursor: pointer;
    white-space: nowrap;
  }
  img{
    width: 32px;
    vertical-align: middle;
  }
  .logout{
    font-size: 24px;
    cursor: pointer;
  }
}
.el-aside{
  color: #fff;
  background: #002140;
  .fold{
    width: 100%;
    line-height: 26px;
    text-align: center;
    background-color: #005;
    cursor: pointer;
  }
  .el-menu{
    border-right: none;
  }
  i{
    color: #fff;
  }
}
</style>