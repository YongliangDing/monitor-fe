export default function getOption() {
  return {
    title: {
      text: '',
      x: 'center',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [0, '45%'],
        center: ['50%', '58%'],
        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: null
      },
      {
        name: '访问来源',
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '58%'],
        data: null
      }
    ]
  }
}