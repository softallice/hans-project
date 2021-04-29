<template>
  <div>
      <highcharts :options="chartOptions" />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
    name: 'ChartBp',
    components: {
        highcharts: Chart 
    },
    props: {
        bpProps: {
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
                    categories: this.bpProps.writeDate//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: '혈압 (mmHg)'
                    },
                    plotLines: [
                        {
                            value: 120,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: 'aaa'
                        },
                        {
                            value: 80,
                            color: 'blue',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: 'aaa'
                        }
                    ],
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [
                    {
                        name: '수축기',
                        data: this.bpProps.maxBp //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '확장기',
                        data: this.bpProps.minBp //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }
                ],
                credits: {
                    enabled: false //워터마크 링크 제거
                }
            }
        }
    }
}
</script>