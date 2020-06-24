export default function getOption() {
  return {
    title: {
      text: '',
      subtext: '',
      textStyle: {
        fontSize: 16,
      },
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '4%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
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
    xAxis: {
      type: 'category',
      data: null,
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '',
        type: 'bar',
        data: null,
        barMaxWidth: '50%',
      },
      {
        name: '',
        type: 'bar',
        data: null,
        barMaxWidth: '50%',
      },
    ],
    dataZoom: [
      {
        type: 'slider',
        orient: 'horizontal',
        start: 0,
        end: 100,
        height: 12,
        bottom: '1%',
        minValueSpan: 2,
      },
      {
        type: 'inside',
        orient: 'horizontal',
        start: 0,
        end: 100,
      },
    ],
  };
}
