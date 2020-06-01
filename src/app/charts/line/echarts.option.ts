export default function getOption() {
  return {
    title: {
      text: '',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: null
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      name: '',
      boundaryGap: false,
      data: null
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line',
        stack: '',
        name: '',
        data: null
      }
    ]
  };
}
