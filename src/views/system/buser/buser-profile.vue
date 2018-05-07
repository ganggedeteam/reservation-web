<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <el-row>
        <el-col>
      <div slot="header">
        <span>修改医生信息</span>
      </div>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="8" :offset="6">
            <el-form ref="doctor" :model="doctor" label-width="120px" :rules="rules">
              <el-form-item label="医生姓名" prop="doctorName">
                <el-input  v-model="doctor.doctorName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                 <el-radio v-model="doctor.sex" label="0" border>男</el-radio>
                 <el-radio v-model="doctor.sex" label="1" border>女</el-radio>
              </el-form-item>
              <el-form-item label="职称" prop="doctorTitle">
                <el-select v-model="doctor.doctorTitle" placeholder="请选择职称">
                  <el-option
                    v-for="item in titles"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属科室" prop="typeId">
                <el-select v-model="doctor.typeId" placeholder="请选择所属科室">
                  <el-option
                    v-for="item in departmentTypes"
                    :key="item.departmentTypeId"
                    :label="item.departmentTypeName"
                    :value="item.departmentTypeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="擅长">
                <el-input  v-model="doctor.skill" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input  v-model="doctor.introduction" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" @click.prevent="onSubmit">保存</el-button>
                <el-button native-type="submit" @click.prevent="cancel">返回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="fileSystem + imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
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
      doctor: {
        sex: '0'
      },
      uploadUrl: null,
      fileSystem: null,
      imageUrl: null,
      rules: {
        doctorName: [
          { required: true, message: '请输入医生姓名', trigger: 'change' },
          { min: 2, max: 12, message: '姓名长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        doctorTitle: [
          { required: true, message: '请选择职称', trigger: 'change' }
        ],
        typeId: [
          { required: true, message: '请选择所属科室', trigger: 'change' }
        ]
      },
      titles: [
        {
          label: '主任医师',
          value: '0'
        },
        {
          label: '副主任医师',
          value: '1'
        },
        {
          label: '主治医师',
          value: '2'
        },
        {
          label: '住院医师',
          value: '3'
        }
      ],
      departmentTypes: []
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = {
        doctorId: this.$store.getters.doctor.doctorId
      }
      service.getDoctorDetail(params, (isOk, data) => {
        if (isOk === true) {
          this.doctor = data.data
          if (data.data.doctorPhoto != null){
            this.imageUrl = data.data.doctorPhoto
          }
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
      this.uploadUrl = service.fileUploadHost + service.method.upload
      this.fileSystem = service.fileSystemHost
      service.getDepartmentTypeAllList({}, (isOk, data) => {
        if (isOk === true) {
          this.departmentTypes = data.data
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    onSubmit () {
      this.$refs['doctor'].validate(valid => {
        if (valid) {
          this.doctor.doctorPhoto = this.imageUrl
          this.updateDoctor()
        }
      })
    },
    updateDoctor () {
      var params = this.doctor
      service.updateDoctor(params, (isOk, data) => {
        if (isOk === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.initPage()
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    cancel () {
      this.$confirm('退出后编辑的数据将会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goback()
      }).catch(() => {
      });
    },
    goback () {
      this.$router.push('/')
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style scope>
	.parameter-card .el-card__body {
		padding:0;
	}
	.formItem {
		width: 30%;
	}
	.textareaItem {
		width: 45%;
	}
	.dialogFormItem{
		width: 80%;
	}
	.step .el-form-item__content{
		line-height: 36px;
	}
	.step .el-table .cell{
		padding-left: 10px;
		padding-right: 10px;
	}
	.editdiv .el-card{
		margin-top: 30px;
	}
	.editdiv .el-card .el-card__header {
      padding: 15px 20px;
      background-color: #EEF1F6;
      color: black;
      border-left: 2px solid #475669;
    }
    .editdiv .el-card {
      box-shadow:none;
    }
    .paramsbox {
    	border-top: 1px solid #D1DBE5;
    	padding-top: 10px;
    	padding-bottom: 5px;
    	min-height: 75px;
    }
    .paramsbox .addparambtn{
    	color:#bfcbd9;
    	border: 0;
    }
    .paramsbox .addparambtn :hover{
    	color: #20A0FF;
    }
    .paramsbox div{
    	margin-bottom:5px
    }
    .paramsbox1 {
    	padding-bottom: 5px;
    	min-height: 75px;
    }
    .paramsbox1 .addparambtn{
    	color:#bfcbd9;
    	border: 0;
    }

    .paramsbox1 div{
    	margin-bottom:5px
    }
    .api-sec-name {
        float: left;
        line-height: 40px;
        margin-right: 30px;
    }
    .api-sec-name:before {
        content: '';
        border-left: 2px solid #88B7E0;
        margin-right: 10px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>