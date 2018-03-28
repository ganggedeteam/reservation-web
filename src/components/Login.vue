<template>
  <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">后台用户登录</h3>
    <el-form-item prop="loginId">
      <el-input type="text" v-model="form.loginId" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="loginPwd">
      <el-input type="password" v-model="form.loginPwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="onSubmit" :loading="loading">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import BizService from '../services/biz-service.js'
var service = new BizService()
export default {
  data() {
    return {
      loading: false,
      form: {
        loginId: 'admin',
        loginPwd: '123456'
      },
      rules: {
        loginId: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          //{ validator: validaePass }
        ],
        loginPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate(valid => {
        if(valid){
          this.login();
        }
      });
    },
    login () {
      let params = this.form
      service.login(params,(isOk, data) => {
        if (isOk == true){
          if (data.status === true) {
            GBFL.Cache.set("user-token", data.data)
            this.$router.push("/")
          }
        } else{
          this.$message.error(data.message)
        }
      })
    }
  }
}
</script>
<style>
  body {
    background: #DFE9FB;
  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
<style scoped>
  /* html,body{
    margin: 0;
    padding: 0;
    position: relative;
  }
  .dialog{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
  }
  .loginPage{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -175px;
    width: 350px;
    min-height: 300px;
    padding: 30px 20px 20px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .loginPage p{
    color: red;
    text-align: left;
  } */
</style>