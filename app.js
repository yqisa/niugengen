App({
    onLaunch: function() {},
    onShow: function() {
        console.log(getCurrentPages());
    },
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    pageOnLoad: function(n) {
        var l = this;
        function i(e) {
            console.log(e);
            var o = !1, a = n.route || n.__route__ || null;
            for (var t in e.navs) e.navs[t].url === "/" + a ? o = e.navs[t].active = !0 : e.navs[t].active = !1;
            o && n.setData({
                _navbar: e
            });
        }
        console.log("----setPageNavbar----"), console.log(n);
        var c = {
            background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
            border_color: "rgba(0,0,0,.1)"
        }, e = l.globalData.navbar;
        console.log(e), e && i(e), e || l.util.request({
            url: "entry/wxapp/nav",
            success: function(t) {
                if (console.log(t), 0 == t.data.length) {
                    c.navs = [ {
                      logo: "/zh_vip/img/vip_0_t.png",
                      logo2: "/zh_vip/img/vip_0_f.png",
                      title: "首页",
                      title_color: "#88c99f",
                      title_color2: "#333333",
                      url: "/zh_vip/pages/index/index"
                    }, {
                        logo: "/zh_vip/img/vip_1_t.png",
                        logo2: "/zh_vip/img/vip_1_f.png",
                        title: "账单",
                        title_color: "#88c99f",
                        title_color2: "#333333",
                        url: "/zh_vip/pages/my/wdzd"
                      }, {
                        logo: "/zh_vip/img/vip_2_t.png",
                        logo2: "/zh_vip/img/vip_2_f.png",
                        title: "我的",
                        title_color: "#88c99f",
                        title_color2: "#333333",
                        url: "/zh_vip/pages/my/my"
                    } ], i(c), l.globalData.navbar = c;
                } else l.util.request({
                    url: "entry/wxapp/url",
                    cachetime: "0",
                    success: function(e) {
                        console.log(e.data);
                        var o = e.data;
                        for (var a in t.data) t.data[a].logo = o + t.data[a].logo, t.data[a].logo2 = o + t.data[a].logo2;
                        c.navs = t.data, i(c), l.globalData.navbar = c;
                    }
                });
            }
        });
    },
    getUserInfo: function(o) {
        var a = this;
        wx.login({
            success: function(e) {
                console.log(e.code), a.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log("openid信息", e.data), getApp().getOpenId = e.data.openid, getApp().getSK = e.data.session_key, 
                        a.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: e.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(e) {
                                console.log("用户信息", e), getApp().getuniacid = e.data.uniacid, wx.setStorageSync("UserData", e.data), 
                                o(e.data);
                            }
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    util: require("we7/resource/js/util.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null
    },
    siteInfo: require("siteinfo.js")
});