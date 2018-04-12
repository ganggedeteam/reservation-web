<template>
	<section class="allsection">
		<el-row>
      <el-col width="100%" class="user-detail-title">
          <div class="title-name" style="float:left"><span>医生详情</span></div>
          <el-button style="float:right;magin-top:5px" @click="goback"><i class="el-icon-arrow-left" aria-hidden="true"></i> 返回医生列表</el-button>
      </el-col>
    </el-row>
		<div>
			<el-card style="margin-top:12px" class="infocard">
				<div slot="header" class="detail-card-header">
					<span>基本信息</span>
				</div>
				<div>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">医生姓名: </span>{{doctor.doctorName}}</el-col>
						<el-col class="detailcell" :span="6"><span class="detailLabel">性别: </span>{{formatSex(doctor.sex)}}</el-col>
            <el-col class="detailcell" :span="3"><span class="detailLabel">职称: </span>{{formatTitle(doctor.doctorTitle)}}</el-col>
						<el-col class="detailcell" :span="3"><span class="detailLabel">头像: </span>
							<div class="divcss5"><img :src="fileSystemUrl+doctor.doctorPhoto"></div>
						</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="12"><span class="detailLabel">所属医院: </span>{{doctor.hospitalName}}</el-col>
						<el-col class="detailcell" :span="12"><span class="detailLabel">所属科室: </span>{{doctor.typeName}}</el-col>
					</el-row>
					<el-row>
						<el-col class="detailcell" :span="24"><span class="detailLabel">擅长: </span>{{doctor.skill}}</el-col>
					</el-row>
				</div>
			</el-card>

			<el-card>
				<div slot="header" class="detail-card-header">
					<span>医生简介</span>
				</div>
        <div>
          <p>
            {{doctor.introduction}}
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
				doctor: {},
				fileSystemUrl : null
			}
		},
		created() {
			this.initPage();
		},
		methods: {
			initPage() {
				this.fileSystemUrl = service.fileSystemHost
        var params = GBFL.Cache.get('doctor')
				service.getDoctorDetail(params,(isOk, data) => {
					if (isOk == true){
						this.doctor = data.data
					} else {
						this.$message({
							type: 'warning',
							message: data.message
						})
					}
				})
			},
      goback () {
        this.$router.push('/hospital/doctor/list')
      },
      formatSex (val) {
        if (val === '0') return '男'
        else if (val === '1') return '女'
      },
      formatTitle (val) {
        if (val === '0') return '主任医师'
        else if (val === '1') return '副主任医师'
        else if (val === '2') return '主治医师'
        else if (val === '3') return '住院医师'
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
	.divcss5{ border:1px solid #000; width:300px; height:100px;overflow:hidden}   
	.divcss5 img{max-width:300px;_width:expression(this.width > 300 ? "300px" : this.width);}   
</style>