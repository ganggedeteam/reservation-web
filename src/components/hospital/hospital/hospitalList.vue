<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入医院名称" prefix-icon="el-icon-search" v-model="filter.hospitalName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <!-- <el-table-column
        type="selection"
        width="55">
      </el-table-column> -->
      <el-table-column
        prop="hospitalName"
        label="医院名称"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="managerName"
        label="管理员姓名">
      </el-table-column>
      <el-table-column
        label="医院级别">
        <template slot-scope="scope">
            {{ formatGrade(scope.row.hospitalGrade) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="isValid"
        label="状态"
        :filters="[{ text: '未审核', value: '0' }, { text: '已审核', value: '1' }, { text: '未通过', value: '2'}]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="100px">
      <template slot-scope="scope">
        <el-tag
          :type="formatTag(scope.row.isValid)"
          close-transition>{{formatIsValid(scope.row.isValid)}}</el-tag>
      </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-dropdown trigger="click" split-button type="primary" size="small">
            操作            
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="info" @click="showDetail(scope.row)">详情</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button size="mini" type="success" :disabled="getButtonStauts(scope.row.isValid, 'pass')" 
                  @click="updateHospitalStatus(scope.row, 'pass')">通过</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button size="mini" type="danger" :disabled="getButtonStauts(scope.row.isValid, 'refuse')" 
                  @click="updateHospitalStatus(scope.row, 'refuse')">拒绝</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      filter: {
        hospitalName: null,
        pageSize: 10,
        pageNo: 1
      },
      addDialog: {
        form: {
          preId: '0',
          level: null
        },
        visible: false,
      },
      updateDialog: {
        form: {},
        visible: false,
      },
      rules: {
        addressId: [
          { required: true, message: '请输入地址编码', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        preId: [
          { required: true, message: '请输入上级地址编码', trigger: 'blur' },
          { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
        ],
        addressName: [
          { required: true, message: '请输入地址名称', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入地址级别', trigger: 'blur' },
        ]
      },
      addressOptions: [
        {
          label: '省/直辖市',
          value: '1'
        },
        {
          label: '市/区',
          value: '2'
        },
        {
          label: '区/地级市/县',
          value: '3'
        },
        {
          label: '街道/乡/镇',
          value: '4'
        }
      ]
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = this.filter
      service.getHospitalList(params,(isOk, data) => {
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
    showDetail (val) {
      var params = {'hospitalId': val.hospitalId}
      GBFL.Cache.set('hospital', params)
      this.$router.push('/hospital/hospital/detail')
    },
    updateHospitalStatus (val, type) {
      var params = GBFL.Util.deepCopy(val)
      if(type === 'pass'){
        params.isValid = '1'
      }else if(type === 'refuse'){
        params.isValid = '2'
      }
      service.updateHospital(params,(isOk, data) => {
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

    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
    },
    formatGrade (val) {
      if (val === '0') return '三级特等'
      else if (val === '1') return '三级甲等'
      else if (val === '2') return '三级乙等'
      else if (val === '3') return '三级丙等'
      else if (val === '4') return '二级甲等'
      else if (val === '5') return '二级乙等'
      else if (val === '6') return '二级丙等'
      else if (val === '7') return '一级甲等'
      else if (val === '8') return '一级乙等'
      else if (val === '9') return '一级丙等'
    },
    filterTag (value, row) {
      return row.isValid === value
    },
    formatTag (val) {
      if (val === '0') return 'warning'
      else if (val === '1') return 'success'
      else return 'danger'
    },
    formatIsValid (val) {
      if (val === '0') return '未审核'
      else if (val === '1') return '已审核'
      else if (val === '2') return '未通过'
    },
    getButtonStauts (val, type) {
      if(type === 'pass'){
        return val !== '0'
      }
      if(type === 'refuse'){
        return val === '2'
      }
      return true
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
