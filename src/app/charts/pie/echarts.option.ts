export default function getOption() {
  return {
    title: {
      text: '',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
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
    legend: {
      data: null,
      left: 'center',
      bottom: 'bottom'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: null
      }
    ]
  };
}
