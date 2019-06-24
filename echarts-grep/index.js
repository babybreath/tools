// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var option = {
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {},
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: [],
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 100,
    },
    {
      start: 0,
      end: 100,
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [],
};

function generateOptions(text) {
  var xAxisArray = [];
  var dataArr = [];
  var tempArray = text.split(/\s|\:/);
  var tempArrayLength = tempArray.length;
  var dateIndex = -1;
  var substrStart = 0;
  var name = '';
  try {
    dateIndex = tempArray[0].search(/\d{2,4}[-|/]\d{2}[-|/]\d{2}/);
  } catch (e) {}
  if (dateIndex > -1) {
    substrStart = dateIndex;
    name = tempArray[0].substr(0, substrStart);
  } else {
    name = tempArray[0];
  }
  for (let i = 0; i < tempArrayLength; i += 2) {
    xAxisArray.push(tempArray[i].substr(substrStart));
    dataArr.push(tempArray[i + 1]);
  }

  option.legend.data.push(name);
  option.xAxis.data = xAxisArray;
  option.series = [
    {
      name: name,
      data: dataArr,
      type: 'line',
      areaStyle: {},
    },
  ];
  return option;
}

var input = document.querySelector('.input');
function inputEvent(e) {
  var sourceText = input.value;
  myChart.setOption(generateOptions(sourceText));
}

input.addEventListener('keyup', inputEvent, false);
