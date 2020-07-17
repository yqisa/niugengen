// pages/gupiao.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['/images/banner.jpg', '/images/banner1.jpg', '/images/banner2.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgheights: '',
    qihuotype:'',
    type: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 2) {
      this.data.type = 2
      this.data.qihuotype = 4
      that.setData({
        type: 2
      })
    }
    this.caopanshoubtn();
  },
  stctype: function (e) {
    console.log(e.currentTarget.dataset.a)
    app.globalData.stctype = e.currentTarget.dataset.a
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
  caopanshoubtn: function () {
    var that = this;
    that.data.type = 1
    that.data.qihuotype = 3
    that.setData({
      type: 1
    })
    that.apilist()
  },
  jijinbtn: function () {
    var that = this;
    that.data.type = 2
    that.data.qihuotype = 4
    that.setData({
      type: 2
    })
    that.apilist()
  },
  apilist() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    if (that.data.type == 1) {
      var apilist = 2;
    }
    if (that.data.type == 2) {
      var apilist = 4;
    }
    var qbc = '';
    wx.request({
      url: 'https://cdmcxq.com/gp/index/Index/gplist',
      data: { 'um': 'la', 'k': qbc ? 'b' : 'a' },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        that.setData({
          data: res.data[apilist]
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  detail: function (e) {
    var e = e.currentTarget.dataset
    var that=this;
    // <navigator url="/ec-canvas/detail/index?id={{item[0]}}&name={{item[1]}}&shouyi={{item[4]}}&cangwei={{item[5]}}&benjin={{item[2]}}&zichan={{item[3]}}">  
    var PHPSESSID = wx.getStorageSync("PHPSESSID");
    if (PHPSESSID) {
      let shouyi = encodeURIComponent(e.shouyi)
      let cangwei = encodeURIComponent(e.cangwei)
      wx.navigateTo({
        url: '/ec-canvas/detail/index?id=' + e.id + '&name=' + e.name + '&shouyi=' + shouyi + '&cangwei=' + cangwei + '&benjin=' + e.benjin + '&zichan=' + e.zichan + '&chicangid=' + e.chicangid + '&type=' + that.data.qihuotype,
      })
    } else {
      wx.showModal({
        title: '跳转登录',
        content: '还未登录，请先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'login',
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
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