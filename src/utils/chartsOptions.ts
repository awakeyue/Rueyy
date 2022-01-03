export function getTempOption(data: Array<any>) {
  return {
    title: {
      text: '未来一周气温变化'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
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
        data: data.map((item: any) => item.highTemp)
      },
      {
        name: '最低温度',
        type: 'line',
        data: data.map((item: any) => item.lowTemp)
      }
    ]
  }
}