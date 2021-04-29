<template>
  <div>
      <highcharts :options="chartOptions" />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
    name: 'ChartExercise',
    components: {
        highcharts: Chart 
    },
    props: {
        exProps: {
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
                    categories: this.exProps.writeDate//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: '운동시간 (H)'
                    },
                    plotLines: [
                        {
                            value: 3,
                            color: 'red',
                            dashStyle: 'shortdash',
                            width: 2,
                            label: 'aaa'
                        },
                        {
                            value: 0.5,
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
                        name: '걷기',
                        data: this.exProps.walking //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '런닝',
                        data: this.exProps.running //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '라이딩',
                        data: this.exProps.riding //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '헬스',
                        data: this.exProps.gym //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '등산',
                        data: this.exProps.hiking //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '요가',
                        data: this.exProps.yoga //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    },
                    {
                        name: '기타',
                        data: this.exProps.etc //[7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
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