export default function getOption() {
  return {
    title: {
      text: '',
      subtext: '',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        dataView: {
          show: true,
          optionToContent: null,
          lang: null,
          contentToOption: null,
        },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: {
          show: true,
          backgroundColor: '#fff',
          pixelRatio: 4,
        },
      },
    },
    legend: {
      data: null,
    },
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      name: '',
      boundaryGap: false,
      data: null,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        name: '',
        data: null,
        areaStyle: {},
      },
    ],
  };
}
