<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入用户姓名" prefix-icon="el-icon-search" v-model="filter.userName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border>
      <el-table-column
        prop="userPhone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
            {{ formatSex(scope.row.sex) }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="provinceName"
        label="省">
      </el-table-column>
      <el-table-column
        prop="cityName"
        label="市">
      </el-table-column>
      <el-table-column
        prop="countyName"
        label="区">
      </el-table-column>
      <el-table-column
        prop="detailAddr"
        label="详细地址">
      </el-table-column> -->
      <el-table-column
        prop="gmtCreate"
        label="注册时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="showDetail(scope.row)">详情</el-button>
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
import BizService from '../../services/biz-service.js'
var service = new BizService()
export default {
  data () {
    return {
      tableData: [],
      tableDataLength: null,
      filter: {
        userName: null,
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = this.filter
      service.getUserList(params,(isOk, data) => {
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
      GBFL.Cache.set("userPhone", row.userPhone)
      this.$router.push("/user/detail")
    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
    },
    formatSex (val) {
      if (val === '1') return '女'
      else if (val === '0') return '男'
      else return ''
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
