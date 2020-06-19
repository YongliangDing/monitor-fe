export default function getOption() {
  return {
    title: {
      text: '',
      subtext: '',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
          backgroundColor: '#fff',
          pixelRatio: 4
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: null
    },
    series: [
      {
        type: 'bar',
        data: null,
        barMaxWidth: '50%'
      }
    ],
    dataZoom: [
      {
        type: 'slider',
        orient: 'vertical',
        start: 0,
        end: 100,
        width: 12,
        minValueSpan: 5
      },
      {
        type: 'inside',
        orient: 'vertical',
        start: 0,
        end: 100
      }
    ],
  };
}
