<template>
  <div>
      <highcharts :options="chartOptions" />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
    name: 'ChartWeight',
    components: {
        highcharts: Chart 
    },
    props: {
        weightProps: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            chartOptions: {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '한달 기록'
                },
                // subtitle: {
                //     text: '한달 기록'
                // },
                xAxis: {
                    categories: this.weightProps.writeDate//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: '몸무게 (kg)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: this.weightProps.name,
                    data: this.weightProps.weight //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }],
                credits: {
                    enabled: false //워터마크 링크 제거
                }
            }
        }
    }
}
</script>