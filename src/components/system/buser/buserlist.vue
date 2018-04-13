<template>
  <div>
    <div class="top-bar">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入管理员名称" prefix-icon="el-icon-search" v-model="filter.userName" @keyup.enter.native="initPage">
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left:10px;" @click="initPage" plain>搜 索</el-button>
        </el-col>
        <el-col :span="2" :offset="13">
          <el-button style="float: right" type="primary" @click="openAddDialog">新 增</el-button>
        </el-col>
        <el-col :span="2">
          <el-button style="margin-left: 20px" type="danger" @click="deleteBuserList">删 除</el-button>
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
        prop="loginId"
        label="管理员ID"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="loginPwd"
        label="管理员密码"
        width="200px">
      </el-table-column>
      
      <el-table-column
        prop="userName"
        label="管理员名称"
        width="400px"
        >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="openUpdateDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteBuser(scope.row)">删除</el-button>
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
    <el-dialog title="新增管理用户 
    " :visible.sync="addDialog.visible" width="35%" :before-close="closeAddDialog">
      <el-form :model="addDialog.form" ref="addDialog.form" label-width="100px" :rules="rules">
        <el-form-item label="管理员ID" prop="loginId">
          <el-input v-model="addDialog.form.loginId"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="loginPwd">
          <el-input v-model="addDialog.form.loginPwd"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="userName">
          <el-input v-model="addDialog.form.userName"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleId">
          <el-select v-model="addDialog.form.roleId" label="管理员角色：" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        
<!--         <el-form-item label="说明" prop="remark">
          <el-input type="textarea" v-model="addDialog.form.remark"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('addDialog.form')">新增</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑管理用户" :visible.sync="updateDialog.visible" width="35%" :before-close="closeUpdateDialog">
      <el-form :model="updateDialog.form" ref="updateDialog.form" label-width="100px" :rules="rules">
        <el-form-item label="管理员ID" prop="loginId">
          <el-input v-model="updateDialog.form.loginId"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="loginPwd">
          <el-input v-model="updateDialog.form.loginPwd"></el-input>
        </el-form-item>
        <el-form-item label="管理员名称" prop="userName">
          <el-input v-model="updateDialog.form.userName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="说明" prop="remark">
          <el-input type="textarea" v-model="updateDialog.form.remark"></el-input>
        </el-form-item> -->
        <el-form-item label="角色名称" prop="roleId">
          <el-select v-model="updateDialog.form.roleId" label="管理员角色：" placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('updateDialog.form')">保存</el-button>
          <el-button @click="closeUpdateDialog">取消</el-button>
        </el-form-item>
      </el-form>
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
      filter: {
        userName: null,
        pageSize: 10,
        pageNo: 1
      },
      filterrole: {
        roleId: null,
        pageSize: 10,
        pageNo: 1
      },
      addDialog: {
        form: {},
        visible: false,
      },
      updateDialog: {
        form: {},
        visible: false,
      },
       options:[],
      // options: [{
      //     value: '选项1',
      //     label: '黄金糕'
      //   }, {
      //     value: '选项2',
      //     label: '双皮奶'
      //   }, {
      //     value: '选项3',
      //     label: '蚵仔煎'
      //   }, {
      //     value: '选项4',
      //     label: '龙须面'
      //   }, {
      //     value: '选项5',
      //     label: '北京烤鸭'
      //   }],

       //value:'',
      rules: {
        userName: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
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
      //console.log(params)
      service.getBuserList(params,(isOk, data) => {
        if (isOk == true){
          this.tableData = data.data
          this.tableDataLength = data.total
        } else{
          this.$message({
            type: 'warning',
            message: data.message
          })
        }
      })   
      // 获取角色表
    params = this.filterrole
    //console.log(this.options)
    this.options=[]
      service.getRoleList(params,(isOk, data) => {
      if (isOk == true){
          for(var item in data.data){
            this.options.push({
            value: data.data[item].roleId,
            label: data.data[item].roleName
          })
          }
           //console.log(this.options)
           } else{
           this.$message({
           type: 'warning',
           message: data.message
           })
          }
     })   
    },
    addBuser () {
      var params = this.addDialog.form
      service.addBuser(params,(isOk, data) => {
        if (isOk == true){
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.closeAddDialog()
          this.initPage()
        } else {
          this.$message({
            type: 'warning',
            message: '新增失败'
          })
        }
      })
    },
    updateBuser () {
      var params = this.updateDialog.form
      if (params == null || params.loginId == null) return
      service.updateBuser(params,(isOk, data) => {
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
    deleteBuser (row) {
    //  console.log(row)
      this.$confirm('删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row == null || row.loginId == null) return
        service.deleteBuser({loginId: row.loginId},(isOk, data) => {
          if (isOk == true){
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.initPage()
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
      })
    },
     deleteBuserList () {
      if(this.multipleSelection.length == 0){
        this.$message.error('至少选择一条数据!')
        return
      }
      this.$confirm('删除选中的分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = []
        for(var j = 0,len=this.multipleSelection.length; j < len; j++) {
          params.push({loginId: this.multipleSelection[j].loginId})
        }
        console.log(params)
        service.deleteBuserList(params,(isOk, data) => {
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
        if (valid) {
          if (form === 'addDialog.form') {
            this.addBuser()
          } else if (form === 'updateDialog.form') {
            this.updateBuser()
          }
        }
      })
    },
    openAddDialog () {
      this.addDialog.visible = true
    },
    closeAddDialog () {
      this.addDialog.visible = false
      // 重置表单
      this.$refs['addDialog.form'].resetFields()
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
        this.updateDialog.visible = false
        // 重置表单
        this.$refs['updateDialog.form'].resetFields()
      }).catch(() => {
      })
    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
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
</style>
