<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <div slot="header">
        <span>修改密码</span>
      </div>
      <div class="user-form">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-row>
            <el-col :span="7" :offset="6">
              <el-form-item label="用户名称">
                {{user.name}}
              </el-form-item>
              <el-form-item label="当前密码" prop="password">
                <el-input  v-model="form.password" auto-complete="off" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input  v-model="form.newPassword" auto-complete="off" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="confirmNewPassword">
                <el-input  v-model="form.confirmNewPassword" auto-complete="off" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" @click.prevent="onSubmit">保存</el-button>
                <el-button native-type="submit" @click.prevent="goback">返回</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import BizService from '../../../services/biz-service.js'
var bizService = new BizService()
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        userId: null
      },
      user: null,
      rules: {
        password: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      this.user = this.$store.state.user
      this.form.userId = this.user.loginId
    },
    onSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          var postData = {
            'loginId': this.form.userId,
            'oldPwd': this.form.password,
            'newPwd': this.form.newPassword
          }
          bizService.changePwd(postData, (isOk, data) => {
            if (isOk === true) {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              })
              GBFL.Cache.set('user-token', data.data)
            } else {
              this.$message({
                message: data.message,
                type: 'warning'
              })
            }
            this.$refs['form'].resetFields()
          })
        }
      })
    },
    goback () {
      this.$router.push('/')
    }
  }
}
</script>
