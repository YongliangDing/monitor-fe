export default function getOption() {
  return {
    title: {
      text: '',
      textStyle: {
        fontSize: 16
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: null
    },
    xAxis: {
      type: 'category',
      data: null,
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'PV',
        type: 'bar',
        data: null
      },
      {
        name: 'UV',
        type: 'bar',
        data: null
      },
    ]
  };
}
