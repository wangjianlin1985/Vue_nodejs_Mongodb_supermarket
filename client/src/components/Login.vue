<template>
  <div class="loginContainer">
    <div class="login-box">
      <div class="login-content">
        <div class="logol">
          <h1><img src="../assets/img/smile.svg" alt="微笑生活超市" title="微笑生活超市"></h1>
          <h4>微笑生活超市</h4>
          <h5>请使用账号和密码登录系统</h5>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="loginFrom">
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" prefix-icon="iconfont el-icon-s-custom" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont el-icon-unlock" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="remPass">
             <el-checkbox v-model="rememberMe" @change="remPasss">记住密码</el-checkbox>
          </el-form-item>
        </el-form>
        <el-row :gutter="5">
          <el-col :span="6"><el-button class="reset" @click="resetForm">重置</el-button></el-col>
          <el-col :span="18"><el-button type="primary" @click="login">登录</el-button></el-col>
        </el-row>
        <div class="copyright">
          <div> <el-link type="primary" :underline="false"></el-link>
          <span><img src="../assets/img/github.svg" alt=""></span></div>
        </div>
        <div class="email">邮 箱: 254540457@qq.com</div>
      </div>
    </div>
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
    return {
      loginForm: {
        email: '254540457@qq.com',
        password: '123456'
      },
      loginFormTwo: {
        username: 'admin',
        password: '123456'
      }
      ,
      loginRules: {
        email: [
          { required: true, message: '请输入您的邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码的长度在6-16个字符之间', trigger: 'blur' }
        ]
      },
      // 记住密码
      rememberMe: false
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          this.$http.post('api/login', this.loginForm).then(ret => {
            if (ret.data.err_code === 0) {
              this.$message.success('登录成功')
              window.sessionStorage.setItem('login', 'ok')
              this.$router.push('/home')
            } else if(ret.data.err_code === 1) {
              this.$message.error('您输入的邮箱或密码不正确，请重新输入！')
            } else {
              this.$message.warning('服务器正忙，请稍后重试！')
            }
          })
          const { data: res } = await this.$http.post('http://127.0.0.1:8888/api/private/v1/login', this.loginFormTwo)
          if (res.meta.status !== 200) {
            return this.$message.error('登录失败')
          }
          window.sessionStorage.setItem('token', res.data.token)
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 记住密码
    remPasss(){
      // console.log(this.rememberMe); 
    }
  }
}
</script>

<style lang="less" scoped>
.loginContainer{
  position: relative;
  height: 100%;
  background: url('../assets/img/bg.jpg') no-repeat left/100%;
  .login-box{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    .login-content{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 350px;
      height: 500px;
      color: #fff;
      text-align: center;
      transform: translate(-50%, -50%);
      // border: 1px #f00 solid;
      h1{
        height: 32px;
        margin: 0;
      }
      h4{
        margin: 15px;
        font-size: 16px;
        font-weight: 400;
      }
      h5{
        margin: 0 0 45px 0;
        font-size: 14px;
        font-weight: 400;
      }
      .logol img{
        width: 32px;
        cursor: pointer;
      }
      .el-button{
        width: 100%;
      }
      .remPass{
        text-align: left;
        .el-checkbox{
          color: #fff;
        }
      }
      .copyright{
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        margin: 45px 0 15px 0;
        .el-link{
          font-size: 12px;
          margin: 0 3px;
        }
        img{
          vertical-align: middle;
        }
      }
      .email{
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>