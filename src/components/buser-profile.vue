<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <div slot="header">
        <span>个人信息</span>
      </div>
      <div class="user-form">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-row>
            <el-col :span="7" :offset="6">
              <el-form-item label="所属医院">
                {{user.userName}}
              </el-form-item>
              <el-form-item label="所属科室">
                {{user.userName}}
              </el-form-item>
              <el-form-item label="姓名">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-select></el-select>
              </el-form-item>
              <el-form-item label="擅长">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="医生简介">
                <el-input type="textarea"></el-input>
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
import BizService from '../services/biz-service.js'
var bizService = new BizService();
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
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
          { required: true, message: '请输入新密码', trigger: 'blur' }
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
      this.user = GBFL.Cache.get('user-token')
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
              });
              GBFL.Cache.set('user-token', data.data)
            } else {
              this.$message({
                message: data.message,
                type: 'warning'
              });
            }
            this.$refs['form'].resetFields();
          })
        }
      })
    },
    goback () {
      this.$router.push("/")
    }
  }
}
</script>
