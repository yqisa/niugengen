// pages/zc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '',
    password: '',
    dpassword: '',
    code:'',
    type:0,
    n:'',
    chtype: 0
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
  password: function (e) {
    console.log(e.detail.value)
    this.data.password = e.detail.value
  },
  code1:function (e) {
    console.log(e.detail.value)
    this.data.code = e.detail.value
  },
  n: function (e) {
    console.log(e.detail.value)
    this.data.n = e.detail.value
  },
  dpassword: function (e) {
    console.log(e.detail.value)
    this.data.dpassword = e.detail.value
  },
  type: function (e) {
    this.data.type = 1
    this.setData({
      chtype: 1
    })   
  },
  chtype: function (e) {
    this.data.type = 0
    console.log(this.data.type)
    this.setData({
      chtype: 0
    })   
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
  code:function(){
    var that = this;
    var tregard = /^(13|15|14|18|17|19)[0-9]{9,}$/;
    if (that.data.user && that.data.user.match(tregard)){
      wx.request({
        url: 'https://cdmcxq.com/gp/index/Index/code',
        data: { 'phone': that.data.user, },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          wx.showToast({
            title: '验证码发送成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入有效的手机号',
        icon: 'none',
        duration: 2000
      })
    }

  },

  bindGetUserInfo(e) {
    var that = this;
    if (that.data.code==''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.n == '') {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.password=='' || that.data.dpassword == '') {
      wx.showToast({
        title: '请输入正确的密码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.password != that.data.dpassword) {
      wx.showToast({
        title: '二次密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.type==0) {
      wx.showToast({
        title: '你还没勾选牛跟跟协议',
        icon: 'none',
        duration: 2000
      })
      return
    }      
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (r) {
              console.log(r.userInfo)
              wx.showLoading({
                title: '注册中...',
              })
              wx.request({
                url: 'https://cdmcxq.com/gp/index/Index/zc',
                data: { 'user': that.data.user, 'code': that.data.code, 'password': that.data.password, 'dpassword': that.data.dpassword, 'n': that.data.n, 'type': that.data.type},
                method: "POST",
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  console.log(res)
                  wx.hideLoading()
                  // var img = wx.getStorageSync("img");
                  if (res.data.type == 1) {
                    wx.setStorageSync("my", r.userInfo)
                    wx.setStorageSync("phone", that.data.user)
                    wx.setStorageSync("PHPSESSID", res.data.PHPSESSID)
                    wx.showToast({
                      title: '注册成功',
                      icon: 'success',
                      duration: 2000
                    })
                    wx.switchTab({
                      url: 'my',
                    })
                  } else {
                    wx.showToast({
                      title: '注册失败',
                      icon: 'none',
                      duration: 2000
                    });

                  }


                },
                fail:function(){
                  wx.hideLoading()
                  wx.showToast({
                    title: '网络错误',
                    icon: 'none',
                    duration: 2000
                  });
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