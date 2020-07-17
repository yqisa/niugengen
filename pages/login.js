// pages/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   user:'',
   password:''
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

  },
  user: function (e) {
    console.log(e.detail.value)
    this.data.user = e.detail.value
  },
  password: function(e) {
    console.log(e.detail.value)
    this.data.password = e.detail.value
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync("my", res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (r) {
              console.log(r.userInfo)
              wx.showLoading({
                title: '登录中...',
              }) 
    wx.request({
      url: 'https://cdmcxq.com/gp/index/Index/login',
      data: { 'user': that.data.user, 'password': that.data.password },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        wx.hideLoading()
        // var img = wx.getStorageSync("img");
        if (res.data.type==1){
          wx.setStorageSync("my", r.userInfo)
          wx.setStorageSync("phone", that.data.user)
          wx.setStorageSync("PHPSESSID", res.data.PHPSESSID)
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: 'my',
          })
        } else {
          wx.showToast({
            title: '账号密码错误',
            icon: 'success',
            duration: 2000
          });
          
        }


      }
    })
            }
          })
        }
      }
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