<template>
  <div class="dashboard-editor-container">

    <panel-group :panel-data="panelData"></panel-group>

    <el-row :gutter="32">

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :pie-data="pieData"></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData"></line-chart>
        </div>
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart :bar-data="barData"></bar-chart>      
    </el-row>
    
  </div>
</template>

<script>
import BizService from '../../../services/biz-service.js'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
var service = new BizService()

export default {
  name: 'dashboard-admin',
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: null,
      panelData: null,
      pieData: null,
      barData: null
    }
  },
  created(){
    this.initPage()
  },
  methods: {
    initPage() {
      service.getBaseInfo({},(isOk, data) => {
        if (isOk == true){
          this.panelData = data.data
        } else{
          this.$message({
            type: 'warning',
            message: '获取信息失败'
          })
        }
      })
      service.getHostpitalStatus({},(isOk, data) => {
        if (isOk == true){
          var obj = {}
          obj.wait = data.data[0].num
          obj.pass = data.data[1].num
          obj.reject = data.data[2].num
          this.pieData = obj
        } else{
          this.$message({
            type: 'warning',
            message: data.message
          })
        }
      })
      service.getReservationStatus({},(isOk, data) => {
        if (isOk == true){
          var info = data.data
          GBFL.Util.openDateFormat()
          var day = new Date()
          var dateArr = {}
          var dayArr = []
          var lineData = {
            total: [0,0,0,0,0,0,0],
            isadmission: [0,0,0,0,0,0,0],
            isnotadmission: [0,0,0,0,0,0,0],
            dayArr: []
          }
          var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
          for(var i = 6; i >= 0; i--){
            day = new Date(day.getTime() - 3600 * 24 * 1000)
            dateArr[day.format('yyyy-MM-dd')] = i
            dayArr[i] = weekday[day.getDay()]
          }
          lineData.dayArr = dayArr
          for(var i = 0; i < info.length; i++){
            if(info[i].isAdmission == '1'){
              lineData.isadmission[dateArr[info[i].admissionDate]] = info[i].num
            }else if(info[i].isAdmission == '0' || info[i].isAdmission == '2'){
              lineData.isnotadmission[dateArr[info[i].admissionDate]] += info[i].num
            }
          }
          for(var i = 0; i < 7; i++){
            lineData.total[i] = lineData.isadmission[i] + lineData.isnotadmission[i]
          }
          GBFL.Util.closeDateFormat()
          this.lineChartData = lineData
        } else{
          this.$message({
            type: 'warning',
            message: data.message
          })
        }
      })
      service.getHospitalAddr({},(isOk, data) => {
        if (isOk == true){
          var barData = {
            city: [],
            num: []
          }
          for(var i = 0; i < data.data.length; i++){
            barData.city.push(data.data[i].addressName)
            barData.num.push(data.data[i].num)
          }
          this.barData = barData
        } else{
          this.$message({
            type: 'warning',
            message: data.message
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 8px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
