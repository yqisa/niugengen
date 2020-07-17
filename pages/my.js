// pages/my.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var my = wx.getStorageSync("my");
    var phone = wx.getStorageSync("phone");
    if (my){
      this.setData({
        attr: my.avatarUrl,
        name: my.nickName,
        phone: phone,
      })
    }
  },
  stctype:function (e) {
    console.log(e.currentTarget.dataset.a)
    app.globalData.stctype = e.currentTarget.dataset.a
  },
  login: function (options) {
    wx.navigateTo({
      url: 'login',
    })
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