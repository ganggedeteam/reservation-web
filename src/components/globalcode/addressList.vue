<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入地址名称" prefix-icon="el-icon-search" v-model="filter.addressName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="2" :offset="13">
          <el-button style="float: right" icon="el-icon-edit" type="primary" @click="openAddDialog">新 增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 20px" icon="el-icon-delete" type="danger" @click="deleteAddressList">删 除</el-button>
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
        prop="id"
        label="编号"
        width="200px">
      </el-table-column>
      <el-table-column
        prop="addressName"
        label="地址名称">
      </el-table-column>
      <el-table-column
        label="地址级别">
        <template slot-scope="scope">
            {{ formatLevel(scope.row.level) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openUpdateDialog(scope.row)">编辑</el-button> |
          <el-button type="text" size="small" style="margin-left: 0" @click="deleteAddress(scope.row)">删除</el-button>
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
    <el-dialog title="新增地址编码" :visible.sync="addDialog.visible" width="35%" :before-close="closeAddDialog">
      <el-form :model="addDialog.form" ref="addDialog.form" label-width="120px" :rules="rules">
        <el-form-item label="地址编码" prop="addressId">
          <el-input v-model="addDialog.form.addressId"></el-input>
        </el-form-item>
        <el-form-item label="上级地址编码" prop="preId">
          <el-input v-model="addDialog.form.preId"></el-input>
        </el-form-item>
        <el-form-item label="地址名称" prop="addressName">
          <el-input v-model="addDialog.form.addressName"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="addDialog.form.level" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in addressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="cancel-button" @click="closeAddDialog">取消</el-button>
          <el-button class="save-button" type="primary" @click="onSubmit('addDialog.form')">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑地址编码" :visible.sync="updateDialog.visible" width="35%" :before-close="closeUpdateDialog">
      <el-form :model="updateDialog.form" ref="updateDialog.form" label-width="120px" :rules="rules">
        <el-form-item label="地址编码" prop="addressId">
          <el-input v-model="updateDialog.form.addressId"></el-input>
        </el-form-item>
        <el-form-item label="上级地址编码" prop="preId">
          <el-input v-model="updateDialog.form.preId"></el-input>
        </el-form-item>
        <el-form-item label="地址名称" prop="addressName">
          <el-input v-model="updateDialog.form.addressName"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-select v-model="updateDialog.form.level" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in addressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="cancel-button" @click="closeUpdateDialog">取消</el-button>
          <el-button class="save-button" type="primary" @click="onSubmit('updateDialog.form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      multipleSelection: [],
      filter: {
        addressName: null,
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
      service.getAddressList(params,(isOk, data) => {
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
    updateAddress () {
      var params = this.updateDialog.form
      if (params == null || params.id == null) return
      service.updateAddress(params,(isOk, data) => {
        if (isOk == true){
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.updateDialog.visible = false
          this.$refs['updateDialog.form'].resetFields()
          this.initPage()
        } else{
          this.$message({
            type: 'warning',
            message: '保存失败'
          })
        }
      })
    },
    deleteAddress (row) {
      this.$confirm('删除该地址编码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row == null || row.id == null) return
        service.deleteAddress({id: row.id},(isOk, data) => {
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
    deleteAddressList () {
      if(this.multipleSelection.length == 0){
        this.$message.error('至少选择一条数据!')
        return
      }
      this.$confirm('删除选中的地址编码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = []
        for(var j = 0,len=this.multipleSelection.length; j < len; j++) {
          params.push({id: this.multipleSelection[j].id})
        }
        console.log(params)
        service.deleteAddressList(params,(isOk, data) => {
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
    openAddDialog () {
      this.addDialog.visible = true
    },
    closeAddDialog () {
      this.addDialog.visible = false;
      // 重置表单
      this.$refs['addDialog.form'].resetFields();
    },
    openUpdateDialog (row) {
      this.updateDialog.visible = true
      this.updateDialog.form = GBFL.Util.deepCopy(row)
    },
    closeUpdateDialog () {
      this.$confirm('退出后编辑的数据将会丢失, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.updateDialog.visible = false;
        // 重置表单
        this.$refs['updateDialog.form'].resetFields();
      }).catch(() => {
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
    formatLevel (val) {
      if (val === '1') return '省/直辖市'
      else if (val === '2') return '市/区'
      else if (val === '3') return '区/县'
      else if (val === '4') return '街道/乡'
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
