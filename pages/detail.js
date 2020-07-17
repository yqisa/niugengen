// import * as echarts from '../ec-canvas/echarts';

var dataList = [];
var Chart = [];
Page({
	/**
   * 页面的初始数据
   */
  data: {
    ec1: {
      lazyLoad: false // 延迟加载
    },
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.echartsComponnet = this.selectComponent('#mychart1');
    this.getData(); //获取数据
  },
  getData: function () {
  
      dataList = [1, -2, 3, -4, 5];
  
    if (!Chart[0]) {
      this.init_echarts(1); 
    } else {
      this.setOption(1); 
    }
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption();
      return Chart;
    });
  },
  setOption: function () {
    Chart.clear();  
    Chart.setOption(this.getOption());  
  },
  getOption: function () {

    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}\n收益率：{c}%'
    },
      legend: {
        data:['收益率（%）'],
    },
      xAxis: {
        axisLabel: {  
          interval: 0,    
      }  ,
        boundaryGap:false,
        type: 'category',
        data: ['2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} %'
        }
      },
      series: [{
        name:'收益率（%）',
        data: dataList,
        type: 'line'
      }]
    }
    return option;
  },
})

 
