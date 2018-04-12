<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入医生姓名" prefix-icon="el-icon-search" v-model="filter.doctorName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="2" :offset="12">
          <el-button style="float: right" icon="el-icon-edit" type="primary" @click="addDoctor">新 增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 20px" icon="el-icon-delete" type="danger" @click="deleteDoctorList">删 除</el-button>
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
        label="姓名"
        width="200px">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
            {{ formatSex(scope.row.sex) }}
        </template>
      </el-table-column>
      <el-table-column
        label="职称">
        <template slot-scope="scope">
            {{ formatTitle(scope.row.doctorTitle) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="所属科室">
      </el-table-column>
      <el-table-column
        label="操作"
        width="220px">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="showDetail(scope.row)">详情</el-button>
          <el-button type="success" size="mini" @click="editDoctor(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteDoctor(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="filter.pageNo"
      :page-sizes="[5, 10, 15]"
      :page-size="filter.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
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
        pageSize: 10,
        pageNo: 1
      },
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = this.filter
      service.getDoctorPageList(params,(isOk, data) => {
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
    addDoctor (row) {
      this.$router.push({path :'/hospital/doctor/edit', query: { method: 'add'}})
    },
    editDoctor (row) {
      this.$router.push({path :'/hospital/doctor/edit', query: { method: 'edit'}})
      GBFL.Cache.set('doctor', {doctorId: ''+row.doctorId})
    },
    deleteDoctor (row) {
      this.$confirm('删除该医生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row == null || row.doctorId == null) return
        service.deleteDoctor({doctorId: row.doctorId},(isOk, data) => {
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
    deleteDoctorList () {
      if(this.multipleSelection.length == 0){
        this.$message.error('至少选择一条数据!')
        return
      }
      this.$confirm('删除选中的医生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = []
        for(var j = 0,len=this.multipleSelection.length; j < len; j++) {
          params.push({doctorId: this.multipleSelection[j].doctorId})
        }
        if (params.length == 0){
          return
        }
        service.deleteDoctorList(params,(isOk, data) => {
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
    formatSex (val) {
      if (val === '0') return '男'
      else if (val === '1') return '女'
    },
    formatTitle (val) {
      if (val === '0') return '主任医师'
      else if (val === '1') return '副主任医师'
      else if (val === '2') return '主治医师'
      else if (val === '3') return '住院医师'
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
  .el-form-item {
    width: 90%;
  }
  .el-form-item .save-button{
    margin-top: 10px;
    float: right;
    margin-right: 20px;
  }
  .el-form-item .cancel-button{
    margin-top: 10px;
    float: right;
  }
</style>
