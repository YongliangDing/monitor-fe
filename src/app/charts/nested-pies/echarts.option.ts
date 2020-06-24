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
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    toolbox: {
      feature: {
        dataView: {
          show: true,
          optionToContent: null,
          lang: null,
          contentToOption: null,
        },
        saveAsImage: {
          show: true,
          backgroundColor: '#fff',
          pixelRatio: 4,
        },
      },
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: [0, '35%'],
        center: ['50%', '58%'],
        label: {
          normal: {
            position: 'inner',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: null,
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '58%'],
        data: null,
      },
    ],
  };
}
