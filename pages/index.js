// pages/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['/images/banner.jpg', '/images/banner1.jpg', '/images/banner2.png'],
    background1: ['/images/banner.jpg', '/images/banner1.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgheights: '',
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  stctype: function (e) {
    console.log(e.currentTarget.dataset.a)
    app.globalData.stctype = e.currentTarget.dataset.a
  },
  imageLoad: function (e) {//获取图片真实宽度
    console.log(e)
    var imgwidth = e.detail.width

    var imgheight = e.detail.height
    //宽高比

    var ratio = imgwidth / imgheight;

    console.log(imgwidth, imgheight)

    //计算的高度值

    var viewHeight = wx.getSystemInfoSync().windowWidth / ratio;
    this.data.imgheights = viewHeight;
    this.setData({
      imgheights: viewHeight
    })    
  },
  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var gpif = wx.getStorageSync("type");
    this.setData({
      gpif: gpif
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})