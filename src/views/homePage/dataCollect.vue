<template>
  <div>
    <!--1.设置DOM容器-->
    <div id="Charts"
         ref="Echarts"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'

export default {
  name: 'summarizationData',
  data() {
    return {}
  },
  created() {
    setTimeout(() => {
      this.getChart()
    }, 500)
  },
  methods: {
    getChart() {
      // 3.定义图标对象myChart，初始化echarts实例
      let myChart = echarts.init(this.$refs.Echarts)

      // 4.添加配置项
      let options = {
        title: {
          //标题
          text: 'ECharts', //主标题文本
          left: 150,
          top: 10,
        },
        tooltip: {},
        xAxis: {
          //配置要在 X 轴显示的项:
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {}, //配置要在 Y 轴显示的项:
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [
              { value: '5', date: '2022-4-8' },
              { value: '8', date: '2023-4-8' },
              { value: '5', date: '2022-4-8' },
              { value: '8', date: '2023-4-8' },
            ],
          },
        ],
      }
      // 5.将配置给myChart
      myChart.setOption(options)
    },
  },
}
</script>
<style scoped>
#Charts {
  width: 500px;
  height: 500px;
  border: 1px solid #333;
}
</style>
