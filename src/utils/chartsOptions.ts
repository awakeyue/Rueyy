export function getTempOption(data: Array<any>) {
  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map((item: any) => item.date)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '最高温度',
        type: 'line',
        data: data.map((item: any) => item.highTemp),
        label: {
          show: true
        }
      },
      {
        name: '最低温度',
        type: 'line',
        data: data.map((item: any) => item.lowTemp),
        label: {
          show: true
        }
      },
      // {
      //   name: '天气',
      //   type: 'line',
      //   data: data.map((item: any) => item.highTemp),
      //   itemStyle: {
      //     borderWidth: 0,
      //   },
      //   lineStyle: {
      //     width: 0
      //   },
      //   label: {
      //     show: true
      //   }
      // }
    ]
  }
}