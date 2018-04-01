<template>
	<section class="allsection">
		<el-row>
      <el-col width="100%" class="user-detail-title">
          <div class="title-name" style="float:left"><span>医院详情</span></div>
          <el-button style="float:right;magin-top:5px" @click="goback"><i class="el-icon-arrow-left" aria-hidden="true"></i> 返回医院列表</el-button>
      </el-col>
    </el-row>
		<div>
			<el-card style="margin-top:12px" class="infocard">
				<div slot="header" class="detail-card-header">
					<span>基本信息</span>
				</div>
				<div>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">医院名称: </span>{{hospital.hospitalName}}</el-col>
						<el-col class="detailcell" :span="12"><span class="detailLabel">管理员: </span>{{hospital.managerName}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">医院级别: </span>{{formatGrade(hospital.hospitalGrade)}}</el-col>
						<el-col class="detailcell" :span="12"><span class="detailLabel">状态: </span>{{formatIsValid(hospital.isValid)}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="8"><span class="detailLabel">省: </span>{{hospital.provinceName}}</el-col>
						<el-col class="detailcell" :span="8"><span class="detailLabel">市: </span>{{hospital.cityName}}</el-col>
            <el-col class="detailcell" :span="8"><span class="detailLabel">区: </span>{{hospital.countyName}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell"><span class="detailLabel">详细地址: </span>{{hospital.detailAddr}}</el-col>
					</el-row>
          <el-row>
						<el-col class="detailcell"><span class="detailLabel">医院联系电话: </span>{{hospital.hospitalPhone}}</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card>
				<div slot="header" class="detail-card-header">
					<span>医院简介</span>
				</div>
        <div>
          <p>
            {{hospital.introduction}}
          </p>
        </div>
			</el-card>
		</div>
	</section>
</template>

<script>
	import Service from '../../../services/biz-service.js'
	let service = new Service();
	export default {
		data() {
			return {
				hospital: {}
			}
		},
		created() {
			this.initPage();
		},
		methods: {
			initPage() {
				var params = GBFL.Cache.get('hospital')
        console.log(params)
				service.getHospitalDetail(params,(isOk, data) => {
					if (isOk == true){
            console.log(data)
						this.hospital = data.data
					} else {
						this.$message({
							type: 'warning',
							message: data.message
						})
					}
				})
			},
      goback () {
        this.$router.push('/hospital/hospital/list')
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
      formatIsValid (val) {
        if (val === '0') return '未审核'
        else if (val === '1') return '已审核'
        else if (val === '2') return '已停用'
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