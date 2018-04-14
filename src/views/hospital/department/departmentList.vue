<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入科室名称" prefix-icon="el-icon-search" v-model="filter.doctorName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="2" :offset="12">
          <el-button style="float: right" icon="el-icon-edit" type="primary" @click="openAddDialog">新 增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 20px" icon="el-icon-delete" type="danger" @click="deleteDepartmentList">删 除</el-button>
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
        prop="departmentName"
        label="科室名称">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="科室类型">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300px">
        <template slot-scope="scope">
          <el-button type="info" size="mini" @click="showDetail(scope.row)">查看排班</el-button>
          <el-button type="success" size="mini" @click="openUpdateDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteDepartment(scope.row)">删除</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="addDialog.visible"
      width="30%"
      center>
      <el-form :model="addDialog.form" ref="addDialog.form" label-width="100px" :rules="rules">
        <el-form-item label="科室名称" prop="departmentName">
          <el-input v-model="addDialog.form.departmentName" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item  label="科室分类" prop="typeId">
          <el-select v-model="addDialog.form.typeId" placeholder="请选择科室分类" style="width:80%;">
            <el-option
              v-for="item in types"
              :key="item.departmentTypeId"
              :label="item.departmentTypeName"
              :value="item.departmentTypeId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit('addDialog.form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="updateDialog.visible"
      width="30%"
      center>
      <el-form :model="updateDialog.form" ref="updateDialog.form" label-width="100px" :rules="rules">
        <el-form-item label="科室名称" prop="departmentName">
          <el-input v-model="updateDialog.form.departmentName" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item  label="科室分类" prop="typeId">
          <el-select v-model="updateDialog.form.typeId" placeholder="请选择科室分类" style="width:80%;">
            <el-option
              v-for="item in types"
              :key="item.departmentTypeId"
              :label="item.departmentTypeName"
              :value="item.departmentTypeId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateDialog">取 消</el-button>
        <el-button type="primary" @click="onSubmit('updateDialog.form')">确 定</el-button>
      </span>
    </el-dialog>
          
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
        pageSize: 10,
        pageNo: 1
      },
      addDialog: {
        form: {},
        visible: false,
      },
      updateDialog: {
        form: {
          departmentName: '',
          typeId: ''
        },
        visible: false,
      },
      types: [],
      rules: {
        departmentName: [
          { required: true, message: '请输入科室名称', trigger: 'change' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '请选择科室类型', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = this.filter
      service.getDepartmentPageList({params},(isOk, data) => {
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
      service.getDepartmentTypeAllList({params},(isOk, data) => {
        if (isOk == true){
          this.types = data.data
        } else{
          this.$message({
            type: 'warning',
            message: '获取列表失败'
          })
        }
      })
    },
    addDepartment () {
      this.addDialog.form.hospitalId = GBFL.Cache.get('hospital-token').hospitalId
      var params = this.addDialog.form
      service.addDepartment(params,(isOk, data) => {
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
            message: '删除失败'
          })
        }
      })
    },
    updateDepartment () {
      var params = this.updateDialog.form
      service.updateDepartment(params,(isOk, data) => {
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
            message: '删除失败'
          })
        }
      })
    },
    editDoctor (row) {
      this.$router.push({path :'/hospital/doctor/edit', query: { method: 'edit'}})
      GBFL.Cache.set('doctor', {doctorId: ''+row.doctorId})
    },
    deleteDepartment (row) {
      // 需要关联删除
      this.$confirm('删除该科室信息(预约、排班信息也将被删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row == null || row.departmentId == null) return
        service.deleteDepartment({departmentId: row.departmentId},(isOk, data) => {
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
    deleteDepartmentList () {
      if(this.multipleSelection.length == 0){
        this.$message.error('至少选择一条数据!')
        return
      }
      this.$confirm('删除选中的科室(警告:有排班预约的不能删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = []
        for(var j = 0,len=this.multipleSelection.length; j < len; j++) {
          params.push({departmentId: this.multipleSelection[j].departmentId})
        }
        if (params.length == 0){
          return
        }
        service.deleteDepartmentList(params,(isOk, data) => {
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
      console.log(this.$refs[form])
      this.$refs[form].validate(valid => {
        if(valid){
          if (form === 'addDialog.form') {
            this.addDepartment()
          }else if (form === 'updateDialog.form') {
            this.updateDepartment()
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
  .dialog-formitem {
    width: 80%;
  }
</style>
