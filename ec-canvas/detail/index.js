import * as echarts from '../echarts';

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
    chicangid:'',
    type:'',
    name:'',
    data: [],
    options:[],
    list: [],
    h: [],
    m: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
    var that = this;
    var gpif = wx.getStorageSync("type");
    this.setData({
      gpif: gpif
    })

  },
  onLoad: function (options) {
    var that=this;
    options.shouyi = decodeURIComponent(options.shouyi)
    options.cangwei = decodeURIComponent(options.cangwei)
    console.log(options)
    wx.request({
      url: 'https://cdmcxq.com/gp/index/Index/gpUser',
      data: { 'name': options.name, 'type': options.type },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res)
        var h = [];
        var m = [];
        for (var j = 0; j < res.data.length; j++) {
          that.data.h.push(res.data[j].ymd)
          m.push(res.data[j].lilv)
        }
        for (var i = 0; i < m.length; i++) {
          var str = m[i].replace('%', '');
          console.log(str)
          that.data.m.push(parseFloat(str))
        }
        that.echartsComponnet = that.selectComponent('#mychart1');
        that.getData(); //获取数据
      }
    });
        this.setData({
          id: options.id,
          name: options.name,
          shouyi: options.shouyi,
          cangwei: options.cangwei,
          benjin: options.benjin,
          zichan: options.zichan,
        })
    this.data.options = options
    // id = 1 & name=% 25E5 % 2588 % 2598qiang & shouyi=9.91 % 2525 & cangwei=96.75 % 2525 & bnejin=400000 & zichan=439656.34 & chicangid=595
    this.data.chicangid = options.chicangid;
    this.data.type = options.type;
    this.data.name = options.name;
    this.chicang();

  },
  chicang:function(){
    var that=this;
    var PHPSESSID = wx.getStorageSync("PHPSESSID");
    wx.request({
      url: 'https://cdmcxq.com/gp/index/Index/chicang',
      data: { 'gid': that.data.chicangid, 'PHPSESSID': PHPSESSID },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        console.log(res)
        that.setData({
          data:res.data
        })
      }
    });

  },
  getData: function () {
    dataList = this.data.m;
    console.log(dataList)
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
    var that=this;
    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}\n收益率：{c}%'
      },
      legend: {
        data: ['收益率（%）'],
      },
      xAxis: {
        axisLabel: {
          interval: 0,
        },
        axisLabel: {
          show: true,
          // rotate: 45, //刻度旋转45度角
          textStyle: {
            fontSize: '10'
          }
        },
        boundaryGap: false,
        type: 'category',
        data: that.data.h
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [{
        name: '收益率（%）',
        data: dataList,
        type: 'line'
      }]
    }
    return option;
  },
})


