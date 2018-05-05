<template>
  <div>
    <el-card style="margin-top:12px" class="box-card">
      <div slot="header">
        <span>接诊日历表</span>
      </div>
      <div>
        <el-table
          :data="tableData6"
          border
          style="width: 100%"
          >
          <el-table-column
            prop="id"
            label="时间段/日期"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column
            label="2018-05-05"
            align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="openDialog('doctor')">选择</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount1"
            label="2018-05-06"
            align="center">
          </el-table-column>
          <el-table-column
            prop="amount2"
            label="2018-05-07"
            align="center">
          </el-table-column>
          <el-table-column
            prop="amount3"
            label="2018-05-08"
            align="center">
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog
          title="提示"
          :visible.sync="selectDoctorDialog.visible"
          width="30%"
          >
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selectDoctorDialog: {
          visible: false
        },
        tableData6: [{
          id: '上午',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '下午',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '晚上',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }]
      };
    },
    methods: {
      openDialog (val) {
        if (val == 'doctor') {
          this.selectDoctorDialog.visible = true
        }
      }
    }
  };
</script>
