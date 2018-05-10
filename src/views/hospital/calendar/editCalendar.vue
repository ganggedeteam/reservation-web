<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <div slot="header">
        <span>修改接诊表信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form ref="calendar" :model="calendar" label-width="120px" :rules="rules">
              <el-form-item label="医生姓名" prop="doctorName">
                <el-row>
                <el-col :span="11">
                <el-input  v-model="calendar.doctorName" auto-complete="off" disabled></el-input>
                </el-col>
                <el-col :span="2">
                <el-button style="margin-left:7px" @click="openDialog('doctor')">选择</el-button>
              </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="科室名称" prop="departmentName">
                <el-row>
                <el-col :span="11">  
                <el-input  v-model="calendar.departmentName" auto-complete="off" disabled></el-input>
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
                value-format="yyyy-MM-dd"
                :editable="false">
               </el-date-picker>
              </el-form-item>
              <el-form-item label="时间段" prop="admissionPeriod">
                 <el-radio v-model="calendar.admissionPeriod" label="0" border >上午</el-radio>
                 <el-radio v-model="calendar.admissionPeriod" label="1" border >下午</el-radio>
                 <el-radio v-model="calendar.admissionPeriod" label="2" border >晚上</el-radio>
              </el-form-item>
              <el-form-item label="号源数量" prop="admissionNum">
                <el-input-number v-model="calendar.admissionNum" controls-position="right" @change="handleChange" :min="tempNum" :max="100"></el-input-number>
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
            <el-col :span="20">
              <el-input placeholder="请输入医生姓名" prefix-icon="el-icon-search" v-model="filter1.doctorName"  @keyup.enter.native="initDoctorPage">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button style="float:right" @click="initDoctorPage" plain>搜 索</el-button>
            </el-col>
          </el-row>
          <el-row class="row-item">
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
          <span slot="footer" class="dialog-footer">
            <el-row>
              <el-col :span="4">
                <el-button  type="primary" style="float:left" size="small" @click="onSelect('doctor')">选择</el-button>
              </el-col>
              <el-col :span="20">
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
              </el-col>
            </el-row>
          </span>
        </el-dialog>
      </div>

      <div>
        <el-dialog
          title="选择科室"
          :visible.sync="selectDepartmentDialog.visible"
          width="40%" height="50%"
          >
          <el-row>
            <el-col :span="20" >
            <el-input placeholder="请输入科室名称" prefix-icon="el-icon-search" v-model="filter2.departmentName"  @keyup.enter.native="initDepartmentPage">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button style="margin-left:10px;float:right" @click="initDepartmentPage" plain>搜 索</el-button>
            </el-col>
          </el-row>
          <el-row class="row-item">
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
          <span slot="footer" class="dialog-footer">
            <el-row>
              <el-col :span="4">
                <el-button type="primary" size="small" style="float:left" @click="onSelect('department')">选择</el-button>
              </el-col>
              <el-col :span="20">
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
              </el-col>
            </el-row>
          </span>
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
      },
      tempNum:1,
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
            this.tempNum=this.calendar.admissionNum-this.calendar.remainingNum
            console.log(this.tempNum)
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
        if (this.method=='edit'){
          let rname=this.calendar.remainingNum
          this.calendar.remainingNum= rname+value-this.calendar.admissionNum
        };
        // console.log(value);
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
  .row-item{
    margin-top: 10px;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
</style>