<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <div slot="header">
        <span>医院信息</span>
      </div>
      <div class="user-form">
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
          <el-row>
            <el-col :span="10" :offset="6">
              <el-form-item label="医院名称" prop="hospitalName">
                <el-input v-model="form.hospitalName"></el-input>
              </el-form-item>
              <el-form-item label="医院级别" prop="hospitalGrade">
                <el-select v-model="form.hospitalGrade" placeholder="请选择级别" style="width: 100%">
                  <el-option
                    v-for="item in gradeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="医院地址">
                <el-cascader
                  :options="addressOptions"
                  @active-item-change="handleItemChange"
                  v-model="address"
                  style="width:100%"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="form.detailAddr"></el-input>
              </el-form-item>
              <el-form-item label="医院电话">
                <el-input v-model="form.hospitalPhone"></el-input>
              </el-form-item>
              <el-form-item label="医院简介">
                <el-input type="textarea" v-model="form.introduction"></el-input>
              </el-form-item>
              <el-form-item label="审核状态" v-if="type == 'edit'">
                <span>{{isValid}}</span>
              </el-form-item>
              <el-form-item>
                <el-button v-if="type == 'edit'" type="primary" native-type="submit" @click.prevent="onSubmit">保存</el-button>
                <el-button v-if="type == 'add'" type="primary" native-type="submit" @click.prevent="onSubmit">新增</el-button>
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
var service = new BizService()
export default {
  data () {
    return {
      type: '',
      form: {
        hospitalName: '',
        detailAddr: '',
        introduction: '',
        hospitalGrade: ''
      },
      hospital: null,
      isValid: null,
      rules: {
        hospitalName: [
          { required: true, message: '请输入医院名称', trigger: 'blur' },
          { min: 3, max: 12, message: '名称长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        hospitalGrade: [
          { required: true, message: '请选择医院等级', trigger: 'blur' }
        ]
      },
      gradeOptions: [{
          value: '0',
          label: '三级特等'
        }, {
          value: '1',
          label: '三级甲等'
        }, {
          value: '2',
          label: '三级乙等'
        }, {
          value: '3',
          label: '三级丙等'
        }, {
          value: '4',
          label: '二级甲等'
        }, {
          value: '5',
          label: '二级乙等'
        }, {
          value: '6',
          label: '二级丙等'
        },{
          value: '7',
          label: '一级甲等'
        }, {
          value: '8',
          label: '一级乙等'
        }, {
          value: '9',
          label: '一级丙等'
      }],
      addressOptions: [],
      childrenMap: {},
      address: []
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      // 初始化省的列表
      var params = {preId: 0}
      service.getAddressList(params, (isOk, data) => {
        if (isOk === true) {
          var province = []
          for(var i = 0; i < data.data.length; i++){
            var element = {
              label: data.data[i].addressName,
              value: data.data[i].addressId,
              children: []
            }
            province.push(element)
            this.childrenMap[data.data[i].addressId] = element
          }
          this.addressOptions = province

          // 判断用户是不是创建过医院
          var loginId = GBFL.Cache.get('user-token').loginId
          params = {hospitalManager: loginId}
          service.getHospitalDetail(params, (isOk, data) => {
            if (isOk === true) {
              var hospital = data.data
              this.type = 'edit'
              this.form = hospital
              this.isValid = this.formatIsValid(hospital.isValid)
              // 获取市/区的列表
              params = {preId: hospital.province}
              service.getAddressList(params, (isOk, data) => {
                if(isOk){
                  var city = []
                  for(var i = 0; i < data.data.length; i++){
                    var element = {
                      label: data.data[i].addressName,
                      value: data.data[i].addressId,
                      children: []
                    }
                    city.push(element)
                    this.childrenMap[hospital.province].children = city
                    this.childrenMap[data.data[i].addressId] = element
                  }

                  // 查询县/镇
                  params = {preId: hospital.city}
                  service.getAddressList(params, (isOk, data) => {
                    if(isOk){
                      var county = []
                      for(var i = 0; i < data.data.length; i++){
                        var element = {
                          label: data.data[i].addressName,
                          value: data.data[i].addressId
                        }
                        county.push(element)
                        this.childrenMap[hospital.city].children = county
                        this.address = [''+hospital.province, ''+hospital.city, ''+hospital.county]
                      }
                    }else{
                      this.$message({
                        message: data.message,
                        type: 'warning'
                      })
                    }
                  })
                }else{
                  this.$message({
                    message: data.message,
                    type: 'warning'
                  })
                }
              })
            } else {
              this.type = 'add'
            }
          })
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    onSubmit () {
      this.$refs['form'].validate(valid => {
        if(valid){
          if (this.type === 'add') {
            this.addHospital()
          }else if (this.type === 'edit') {
            this.updateHospital()
          }
        }
      });
    },
    addHospital () {
      var params = GBFL.Util.deepCopy(this.form)
      var loginId = GBFL.Cache.get('user-token').loginId
      params.province = this.address[0]
      params.city = this.address[1]
      params.county = this.address[2]
      params.hospitalManager = loginId
      service.addHospital(params, (isOk, data) => {
        if(isOk){
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          store.dispatch('SetHospitalInfo', this.$store.getters.loginId).then(() => {
            console.log('医院信息已登记')
          }).catch(() => {           
          })
          this.initPage()
        }else{
          this.$message.error('保存失败')
        }
      })
    },
    updateHospital () {
      var params = GBFL.Util.deepCopy(this.form)
      params.province = this.address[0]
      params.city = this.address[1]
      params.county = this.address[2]
      params.isValid = '0'
      service.updateHospital(params, (isOk, data) => {
        if(isOk){
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$store.dispatch('SetHospitalInfo', this.$store.getters.loginId).then(() => {
            console.log('医院信息已登记')
          }).catch(() => {           
          })
          this.initPage()
        }else{
          this.$message.error('更新失败')
        }
      })
    },
    goback () {
      this.$router.push('/')
    },
    handleItemChange(val) {
      setTimeout(_ => {
        var preId
        preId = val[val.length - 1]
        var params = {preId: preId}
        var parent = this.childrenMap[preId]
        if (parent.children !== null && parent.children.length === 0){
          service.getAddressList(params, (isOk, data) => {
            if (isOk === true) {
              var result = []
              for(var i = 0; i < data.data.length; i++){
                if(data.data[i].level === '3'){
                  result.push({
                    label: data.data[i].addressName,
                    value: data.data[i].addressId
                  })
                }else if(data.data[i].level === '2'){
                  var element = {
                    label: data.data[i].addressName,
                    value: data.data[i].addressId,
                    children: []
                  }
                  result.push(element)
                  this.childrenMap[data.data[i].addressId] = element
                }
              }
              parent.children = result
            } else {
              this.$message({
                message: data.message,
                type: 'warning'
              })
            }
          })
        }
      }, 300);
    },
    formatIsValid (val) {
      if (val === '0') return '未审核'
      else if (val === '1') return '已审核'
      else if (val === '2') return '未通过'
    }
  }
}
</script>
