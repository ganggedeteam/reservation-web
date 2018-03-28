<template>
	<section class="allsection">
		<el-row>
      <el-col width="100%" class="user-detail-title">
          <div class="title-name" style="float:left"><span>用户详情</span></div>
          <el-button style="float:right;magin-top:5px" @click="goback"><i class="el-icon-arrow-left" aria-hidden="true"></i> 返回http接口列表</el-button>
      </el-col>
    </el-row>
		<div>
			<el-card style="margin-top:12px" class="infocard">
				<div slot="header" class="detail-card-header">
					<span>基本信息</span>
				</div>
				<div>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">用户姓名: </span>{{user.userName}}</el-col>
						<el-col class="detailcell" :span="12"><span class="detailLabel">电话号码: </span>{{user.userPhone}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">性别: </span>{{user.sex}}</el-col>
						<el-col class="detailcell" :span="12"><span class="detailLabel">注册时间: </span>{{user.gmtCreate}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="8"><span class="detailLabel">省: </span>{{user.provinceName}}</el-col>
						<el-col class="detailcell" :span="8"><span class="detailLabel">市: </span>{{user.cityName}}</el-col>
            <el-col class="detailcell" :span="8"><span class="detailLabel">区: </span>{{user.countyName}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell"><span class="detailLabel">详细地址: </span>{{user.detailAddr}}</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card>
				
					<el-table :data="patient" border>
				      <el-table-column
				        prop="patientId"
				        label="就诊人Id ">
				      </el-table-column>
				      <el-table-column
				        prop="idCard"
				        label="证件号">
				      </el-table-column>
				       <el-table-column
				        label="关系">
				        <template slot-scope="scope">
				            {{ formatRelation(scope.row.relation) }}
				        </template>
				      </el-table-column>
				      <el-table-column
				        prop="gmtCreate"
				        label="创建时间">
				      </el-table-column>
				      <el-table-column
				        prop="gmtModified"
				        label="修改时间">
				      </el-table-column>
				      <!-- <el-table-column
				        label="操作"
				        width="100px">
				        <template slot-scope="scope">
				          <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
				        </template>
				      </el-table-column> -->
				    </el-table>
					<!-- 完成用户就诊人表格，可以查看就诊人详情，就诊人详情用dialog形式展示 -->
				
				
			</el-card>
		</div>
	</section>
</template>

<script>
	import Service from '../../services/biz-service.js'
	let service = new Service();
	export default {
		data() {
			return {
				user: {},
				patient:[]
			}
		},
		created() {
			this.initPage();
		},
		methods: {
			initPage() {
				var userPhone = GBFL.Cache.get("userPhone")
        		var params = {'userPhone': userPhone}
        		console.log(params)
        		service.getUserDetail(params,(isOk, data) => {
          if (isOk == true){
            this.user = data.data

             params =  {'userId': userPhone}
             service.getPatientList(params,(isOk, data) => {
		        if (isOk == true){
		          this.patient = data.data
		          this.tableDataLength = data.total
		        } else{
		          this.$message({
		            type: 'warning',
		            message: '获取列表失败'
		          })
		        }
		      })

          } else{
            this.$message({
              type: 'warning',
              message: data.message
            })
          }
        })
			},
    formatSex (val) {
      if (val === '1') return '女'
      else if (val === '0') return '男'
      else return ''
    },
    formatRelation (val) {
      if (val === '0') return '本人'
      else if (val === '1') return '父母'
      	else if (val === '2') return '妻子'
      		else if (val === '3') return '子女'
      			else if (val === '4') return '亲戚'
      				else if (val === '5') return '其他'
      else return ''
    }




		}
	}
</script>

<style>
	.infocard .el-card__body {
		padding: 0;
	}
	.allsection .el-card {
		margin-top: 12px;
	}
	.allsection .el-card .el-card__header {
      padding: 10px 20px;
      background-color: #EEF1F6;
      color: black;
      border-left: 3px solid #475669;
    }
    .user-detail-title .title-name {
      line-height: 50px;
      font-size: 20px;
    }
    .user-detail-title .el-button {
    	margin-top: 5px;
      margin-bottom: 10px;
    }
    .allsection .el-row .user-detail-title {
    	border-bottom: 1px solid #DDD;
    }
    .infocard .el-card__header div .el-button {
    	padding: 3px 10px;
		float: right;
    }
</style>
<style>
	.createDialog .el-form-item__content {
		line-height: 1.5;
		font-size: 10px;
	}
	.editDialog .el-form-item__content {
		line-height: 1.5;
		font-size: 10px;
	}
	.infocard{
	    box-shadow:none;
	}
	.el-dialog__footer {
	    padding: 15px 20px 15px;
	    text-align: right;
	    box-sizing: border-box;
	    border-top: 1px solid #BFCBD9;
	}
	.el-dialog__header {
	    padding: 20px 20px 20px;
	    /*border-bottom: 1px solid #BFCBD9;*/
	}
	.detailcell {
	    height: 50px;
	    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	    border-left: 1px solid rgba(0, 0, 0, 0.2);
	    line-height: 50px;
	    padding-left: 23px;
	    font-size: 12px;
	}
	.detailcell .detailLabel {
	    color:#8492A6;
	    margin-right: 10px;
	}
</style>