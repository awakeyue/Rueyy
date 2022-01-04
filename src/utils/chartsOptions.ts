export function getTempOption(data: Array<any>) {
  const highTempArr = data.map((item: any) => item.highTemp)
  const maxVal = Math.max(...highTempArr.filter(val => !isNaN(val)))
  return {
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{b2}'
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
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '最高温度',
        type: 'line',
        data: highTempArr,
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
      {
        name: '天气',
        type: 'line',
        data: data.map((item: any) => ({ name: item.weather, value: maxVal + 10 })),
        symbolSize: 0,
        itemStyle: {
          borderWidth: 0,
        },
        lineStyle: {
          width: 0
        },
        label: {
          show: true,
          formatter: ({ data }: any) => {
            return data.name
          },
          borderRadius: 5,
          borderColor: '#f59e0b',
          color: '#f59e0b'
        }
      }
    ]
  }
}
