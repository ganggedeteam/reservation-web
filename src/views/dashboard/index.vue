<template>
  <div class="dashboard-container">
    <el-row style="margin-bottom: 80px">
      <el-col :span="12">
        <div id="hospitalStatus" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>
    <el-row>
      <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
    </el-row>
  </div>

</template>

<script type="text/javascript">
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let hospitalStatus = this.$echarts.init(document.getElementById('hospitalStatus'))
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        hospitalStatus.setOption({
          title : {
            text: '医院审核情况',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['已审核','待审核','未审核']
          },
          series : [
            {
              name: '医院数量',
              type: 'pie',
              radius : '70%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'已审核'},
                {value:310, name:'待审核'},
                {value:234, name:'未审核'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        // 绘制图表
        myChart.setOption({
           title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });
    }
  }
}
</script>

<style>
  .dashboard-container{
    /* padding: 32px; */
    background-color: #f0f2f5
  }
</style>
