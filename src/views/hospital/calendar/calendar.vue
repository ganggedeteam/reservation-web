<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入医生姓名或科室名称" prefix-icon="el-icon-search" v-model="search" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="3">
          <template>
            <el-select v-model="keyword" placeholder="关键词" style="margin-left:10px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="2" :offset="9">
          <el-button style="float: right" icon="el-icon-edit" type="primary" @click="addCalendar">新 增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 20px" icon="el-icon-delete" type="danger" @click="deleteCalendarList">删 除</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="doctorName"
        label="医生姓名"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="科室名称"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="admissionDate"
        label="预约日期">
      </el-table-column>
      <el-table-column
        label="预约时段">
         <template slot-scope="scope">
            {{ formatPeriod(scope.row.admissionPeriod) }}
        </template>
      </el-table-column>
       <el-table-column
        prop="admissionNum"
        label="号源数量">
      </el-table-column>
      <el-table-column
        prop="remainingNum"
        label="剩余号数">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="editCalendar(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteCalendar(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filter.pageNo"
      :page-sizes="[5, 10, 15]"
      :page-size="filter.pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="tableDataLength"
      style="float:right">
    </el-pagination>
  </div>
</template>
<script>
import BizService from '../../../services/biz-service.js'
var service = new BizService()
export default {
  data () {
    return {
      tableData: [],
      tableDataLength: null,
      multipleSelection: [],
      filter: {
        doctorName: null,
        hospitalId: null,
        departmentName: null,
        pageSize: 10,
        pageNo: 1
      },
      keyword:null,
      search:null,
      options: [{
          value: 'doctorName',
          label: '医生姓名'
        }, {
          value: 'departmentName',
          label: '科室名称'
        }],
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      // console.log(this.search)
      // console.log(this.keyword)
      var hospitalId = this.$store.getters.hospital
      if(hospitalId == null)
        this.filter.hospitalId = ''
      else
        this.filter.hospitalId = hospitalId
      if(this.keyword == 'doctorName'){
        this.filter.doctorName=this.search
        this.filter.departmentName=null
      }
      else if (this.keyword == 'departmentName'){
        this.filter.departmentName=this.search
        this.filter.doctorName=null
      }
      var params = this.filter
      console.log(params)
      service.getCalendarPageList(params,(isOk, data) => {
        if (isOk == true){
          this.tableData = data.data
          this.tableDataLength = data.total
        } else{
          this.$message({
            type: 'warning',
            message: '获取列表失败'
          })
        }
      })
    },
    showDetail (row) {
      GBFL.Cache.set('doctor', row)
      this.$router.push('/hospital/doctor/detail')
    },
    addAddress () {
      var params = this.addDialog.form
      service.addAddress(params,(isOk, data) => {
        if (isOk == true){
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.closeAddDialog()
          this.initPage()
        } else{
          this.$message({
            type: 'warning',
            message: '新增失败'
          })
        }
      })
    },
    addCalendar (row) {
      if(this.$store.getters.hospital == null){
        this.$message({
          type: 'warning',
          message: '请先编辑接诊表信息'
        })
        return
      }
      this.$router.push({path :'/hospital/calendar/edit', query: { method: 'add'}})
    },
    editCalendar (row) {
      this.$router.push({path :'/hospital/calendar/edit', query: { method: 'edit'}})
      GBFL.Cache.set('calendar', {admissionId: ''+row.admissionId})
    },
    deleteCalendar (row) {
      this.$confirm('删除该接诊表信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row == null || row.admissionId == null) return
        service.deleteCalendar({admissionId: row.admissionId},(isOk, data) => {
          if (isOk == true){
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.initPage()
          } else{
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
      });
    },
    deleteCalendarList () {
      if(this.multipleSelection.length == 0){
        this.$message.error('至少选择一条数据!')
        return
      }
      this.$confirm('删除选中的预约表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = []
        for(var j = 0,len=this.multipleSelection.length; j < len; j++) {
          params.push({admissionId: this.multipleSelection[j].admissionId})
        }
        if (params.length == 0){
          return
        }
        service.deleteCalendarList(params,(isOk, data) => {
          if (isOk == true){
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.initPage()
          } else{
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
      });
    },
    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if(valid){
          if (form === 'addDialog.form') {
            this.addAddress()
          }else if (form === 'updateDialog.form') {
            this.updateAddress()
          }
        }
      });
    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    formatPeriod (val) {
      if (val === '0') return '上午'
      else if (val === '1') return '下午'
      else if (val === '2') return '晚上'
    }
  }
}
</script>
<style>
  .top-bar {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .top-bar .title {
    float: left;
    line-height: 40px;
    margin-right: 30px;
  }
  .top-bar .title :before {
    content: '';
    border-left: 2px solid #88B7E0;
    margin-right: 10px;
  }
</style>
