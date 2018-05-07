<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入就诊人姓名" prefix-icon="el-icon-search" v-model="patientName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="10">
          <el-radio-group v-model="filter.admissionPeriod" @change="initPage">
            <el-radio-button label="0">上午</el-radio-button>
            <el-radio-button label="1">下午</el-radio-button>
            <el-radio-button label="2">晚上</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column
        prop="reservationId"
        sortable
        label="预约ID"
        >
      </el-table-column>
      <el-table-column
        prop="patientName"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="isAdmission"
        label="就诊情况"
        width="110"
        :filters="[{ text: '待就诊', value: '0' }, { text: '已就诊', value: '1' }, { text: '未就诊', value: '2' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
          :type="formatTag(scope.row.isAdmission)"
          close-transition
          style="margin-left:15px">{{formatIsAdmission(scope.row.isAdmission)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220px">
        <template slot-scope="scope">
          <el-button :disabled="isAdmission(scope.row.isAdmission)" type="success" size="mini" @click="updateReservation(scope.row, '1')">已就诊</el-button>
          <el-button :disabled="isAdmission(scope.row.isAdmission)" type="danger" size="mini" @click="updateReservation(scope.row, '2')">未就诊</el-button>
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
      patientName: '',
      filter: {
        doctorId: '',
        admissionPeriod: "0",
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
      this.filter.doctorId = this.$store.getters.doctor.doctorId
      var params = {}
      params.patientName = this.patientName
      params.calendar = this.filter
      service.getReservationByDoctor(params, (isOk, data) => {
        if (isOk == true){
          this.tableData = data.data
          this.tableDataLength = data.total
        }else{
          this.tableData = []
          this.tableDataLength = 0
          this.$message({
            type: 'warning',
            message: '今天该时间段没有排班'
          })
        }
      })
    },
    filterTag (value, row) {
      return row.isAdmission === value
    },
    formatTag (val) {
      if (val === '0') return 'warning'
      else if (val === '1') return 'success'
      else return 'danger'
    },
    formatIsAdmission (val) {
      if (val === '0') return '待就诊'
      else if (val === '1') return '已就诊'
      else if (val === '2') return '未就诊'
    },
    isAdmission (val) {
      return val !== '0'
    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
    },
    updateReservation (row, value){
      var reservation = GBFL.Util.deepCopy(row)
      reservation.isAdmission = value
      service.updateReservation(reservation,(isOk, data) => {
        if (isOk == true){
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.initPage()
        } else{
          this.$message({
            type: 'warning',
            message: '更新失败'
          })
        }
      })
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
