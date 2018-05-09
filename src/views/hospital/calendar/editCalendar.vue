<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <el-row>
        <el-col>
      <div slot="header">
        <span>修改接诊表信息</span>
      </div>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form ref="calendar" :model="calendar" label-width="120px" :rules="rules">
              <el-form-item label="医生姓名" prop="doctorName">
                <el-row>
                <el-col :span="11">
                <el-input  v-model="calendar.doctorName" auto-complete="off"></el-input>
                </el-col>
                <el-col :span="2">
                <el-button style="margin-left:7px" @click="openDialog('doctor')">选择</el-button>
              </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="科室名称" prop="departmentName">
                <el-row>
                <el-col :span="11">  
                <el-input  v-model="calendar.departmentName" auto-complete="off"></el-input>
              </el-col>
                <el-col :span="2">
                 <el-button style="margin-left:7px" @click="openDialog('department')">选择</el-button>
                </el-col>
              </el-row>
              </el-form-item>
              <el-form-item label="预约日期" prop="admissionDate" >
              <el-date-picker
                auto-complete="off"
                v-model=calendar.admissionDate
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions1"
                value-format="yyyy-MM-dd">
               </el-date-picker>
              </el-form-item>
              <el-form-item label="时间段" prop="admissionPeriod">
                 <el-radio v-model="calendar.admissionPeriod" label="0" border >上午</el-radio>
                 <el-radio v-model="calendar.admissionPeriod" label="1" border >下午</el-radio>
                 <el-radio v-model="calendar.admissionPeriod" label="2" border >晚上</el-radio>
              </el-form-item>
              <el-form-item label="号源数量" prop="admissionNum">
                <el-input-number v-model="calendar.admissionNum" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" native-type="submit" @click.prevent="onSubmit">保存</el-button>
                <el-button native-type="submit" @click.prevent="cancel">返回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
       <div>
        <el-dialog
          title="选择医生"
          :visible.sync="selectDoctorDialog.visible"
          width="40%" height="50%"
          >
          <el-row>
          <div class="top-bar">
            <el-row>
              <el-col :span="18" >
              <el-input placeholder="请输入医生姓名" prefix-icon="el-icon-search" v-model="filter1.doctorName"  @keyup.enter.native="initDoctorPage">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button style="margin-left:10px;" @click="initDoctorPage" plain>搜 索</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
            <el-table :data="doctortableData" border tooltip-effect="dark" style="width: 100%"
             @selection-change="handleSelectionChangedoc">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="doctorName"
              label="医生姓名"
              >
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="所属科室"
              >
            </el-table-column>
        </el-table>
      </el-row>
      <el-row>
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="filter1.pageNo"
              :page-sizes="[5, 10]"
              :page-size="filter1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="doctortableDataLength"
              style="float:right">
            </el-pagination>  
              <el-button type="primary"@click="onSelect('doctor')">选择</el-button>
          </el-row>
<!--       <div>
          <el-row>

            <el-button size="mini" @click="closeUpdateDialog">取消</el-button>
        </el-row>
      </div> -->
        </el-dialog>
      </div>

      <div>
        <el-dialog
          title="选择科室"
          :visible.sync="selectDepartmentDialog.visible"
          width="40%" height="50%"
          >
          <el-row>
          <div class="top-bar">
            <el-row>
              <el-col :span="18" >
              <el-input placeholder="请输入科室名称" prefix-icon="el-icon-search" v-model="filter2.departmentName"  @keyup.enter.native="initDepartmentPage">
                </el-input>
              </el-col>
              <el-col :span="2">
                <el-button style="margin-left:10px;" @click="initDepartmentPage" plain>搜 索</el-button>
              </el-col>
            </el-row>
          </div>
        </el-row>
        <el-row>
            <el-table :data="departmenttableData" border tooltip-effect="dark" style="width: 100%"
             @selection-change="handleSelectionChangedar">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="departmentName"
              label="科室名称"
              >
            </el-table-column>
        </el-table>
      </el-row>
      <el-row>
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="filter2.pageNo"
              :page-sizes="[5, 10]"
              :page-size="filter2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="departmenttableDataLength"
              style="float:right">
            </el-pagination>  
              <el-button type="primary"@click="onSelect('department')">选择</el-button>
          </el-row>
        </el-dialog>
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
      calendar: {
        admissionNum:1
      },
      doctor: {
      },
      method: '',
      rules: {
        doctorName: [
          { required: true, message: '请输入医生姓名', trigger: 'change' },
          { min: 2, max: 12, message: '姓名长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入科室名称', trigger: 'change' },
          { min: 2, max: 12, message: '名称长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        admissionDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        admissionPeriod: [
          { required: true, message: '请选择时段', trigger: 'change' }
        ],
        admissionNum: [
          { required: true, message: '请输入号源数量', trigger: 'change' },
          // { digits: true,range: [1, 100], message: '数量在1-100之间',trigger: 'blur' }
        ]
      },
      doctortableData:[],
      doctortableDataLength: null,

      departmenttableData:[],
      departmenttableDataLength: null,
      pickerOptions1: {
          disabledDate(time) {
            let beforeoneweek=(new Date()).getTime()+7 * 24 * 3600 * 1000;
            let afetertwoweeks=Date.now()+14 * 24 * 3600 * 1000;
            return time.getTime() > afetertwoweeks || time.getTime() < beforeoneweek;
          }
        },
      selectDoctorDialog:{
        visible: false
      },
      selectDepartmentDialog:{
        visible: false
      },

      multipleSelection1: [],
      multipleSelection2: [],
      filter1: {
        doctorName: null,
        departmentName: null,
        pageSize: 5,
        pageNo: 1,
      },
      filter2: {
        departmentName: null,
        hospitalId:null,
        pageSize: 5,
        pageNo: 1,
      },

    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var method = this.$route.query.method
      if (method === 'edit'){
        this.method = method
        var params = {
          admissionId: GBFL.Cache.get('calendar').admissionId
        }
        service.getCalendarDetail(params, (isOk, data) => {
          if (isOk === true) {
            this.calendar = data.data
          } else {
            this.$message({
              message: data.message,
              type: 'warning'
            })
          }
        })
      }else{
        this.method = 'add'
      }
    },
    onSubmit () {
      this.$refs['calendar'].validate(valid => {
        if (valid) {
          var hospitalManager = GBFL.Cache.get('user-token').loginId
          service.getHospitalDetail({hospitalManager: hospitalManager}, (isOk, data) => {
            if (isOk === true) {
              if (this.method === 'add') {
                this.calendar.hospitalId = data.data.hospitalId
                this.addCalendar()
              }else{
                this.updateCalendar()
              }
            } else {
              this.$message({
                message: '当前角色未创建医院',
                type: 'error'
              })
            }
          })
        }
      })
    },
    addCalendar () {
      // var date = this.calendar.admissionDate
      // this.calendar.admissionDate=date.getFullYear() + '-' + '0'+(date.getMonth() + 1) + '-' + date.getDate()
      var params = this.calendar
      console.log(params)
      service.addCalendar(params, (isOk, data) => {
        if (isOk === true) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
        this.goback();
      })
    },
    updateCalendar () {
      if (this.calendar.isValid== true){
        this.calendar.isValid=1
      }
      else if(this.calendar.isValid== false){
        this.calendar.isValid=0
      }
      var params = this.calendar
      service.updateCalendar(params, (isOk, data) => {
        if (isOk === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
        this.goback();
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
      this.$router.push('/hospital/calendar/')
    },
    handleChange(value) {
        console.log(value);
    },
    handleSizeChange1 (val) {
      this.filter1.pageSize = val
      this.initDoctorPage()
    },
    handleCurrentChange1 (val) {
      this.filter1.pageNo = val
      this.initDoctorPage()
    },
    handleSelectionChangedoc(val) {
      this.multipleSelection1 = val
    //  console.log(this.multipleSelection1.length)
    },
    handleSizeChange2 (val) {
      this.filter2.pageSize = val
      this.initDepartmentPage()
    },
    handleCurrentChange2 (val) {
      this.filter2.pageNo = val
      this.initDepartmentPage()
    },
    handleSelectionChangedar(val) {
      this.multipleSelection2 = val
    },
    initDoctorPage(){
        this.filter1.hospitalId=this.$store.getters.hospital
        var params = this.filter1
        service.getDoctorPageList(params, (isOk, data) => {
        if (isOk === true) {
          this.doctortableData = data.data
          this.doctortableDataLength=data.total
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },
    initDepartmentPage(){
        this.filter2.hospitalId=this.$store.getters.hospital
        var params = this.filter2
        service.getDepartmentPageList(params, (isOk, data) => {
        if (isOk === true) {
          this.departmenttableData = data.data
          this.departmenttableDataLength=data.total
        } else {
          this.$message({
            message: data.message,
            type: 'warning'
          })
        }
      })
    },

    openDialog (val) {
      if (val == 'doctor') {
        this.initDoctorPage()
        this.selectDoctorDialog.visible = true
      }
      else if (val == 'department'){
        this.initDepartmentPage()
        this.selectDepartmentDialog.visible = true
      }
    },
    onSelect(val){
      if(val == 'doctor'){
        if (this.multipleSelection1.length == 1){
          this.calendar.doctorId=this.multipleSelection1[0].doctorId
          this.calendar.doctorName=this.multipleSelection1[0].doctorName
          this.selectDoctorDialog.visible=false
        }else if(this.multipleSelection1.length == 0){
          this.$message.error('必须选择一条数据!')
          return
        }
        else{
          this.$message.error('只能选择一条数据!')
          return
        }
      }else if(val =='department'){
        if (this.multipleSelection2.length == 1){
          this.calendar.departmentId=this.multipleSelection2[0].departmentId
          this.calendar.departmentName=this.multipleSelection2[0].departmentName
          this.selectDepartmentDialog.visible=false
        }else if(this.multipleSelection2.length == 0){
          this.$message.error('必须选择一条数据!')
          return
        }
        else{
          this.$message.error('只能选择一条数据!')
          return
        }
    }
      
    },
   closeUpdateDialog () {
      this.$confirm('退出后编辑的数据将会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateDialog.visible = false
        // 重置表单
        this.$refs['updateDialog.form'].resetFields()
      }).catch(() => {
      })
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