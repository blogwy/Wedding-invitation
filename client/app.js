// app.js
App({
    onLaunch: function () {
      if (wx.getStorageSync("openId")){
        console.log('openid已存在--' + wx.getStorageSync("openId"));
      }else{
        this.myLogin()
      }
    },
    myLogin(){
	  let _this = this;
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: _this.globalData.host + '/openid/get?js_code=' + res.code,
              method: 'GET',
              success(result) {
                console.log('openid获取成功--' + result.data.openid);
                if (result.data.openid) {
                  wx.setStorageSync("openId", result.data.openid)
                } else {
                  console.log('获取openid失败');
                  wx.showToast({
                    title: '获取openid失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
              fail(err) {
                console.log(err)
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    },
    shareHandle(){
      return {
        // 页面右上角分享配置项
        // 分享显示的标题
        title: '',
        // 分享显示的图片
        imageUrl: '',
        path: 'pages/index/index',
        success: function (res) {
          wx.showToast({
            title: '分享成功',
          })
        },
        fail: function (res) {
          // 转发失败
          wx.showToast({
            title: '分享取消',
          })
        }
      }
    },
    onHide: function () {
        wx.pauseBackgroundAudio();
    },
    onShow: function () {
        wx.playBackgroundAudio();
    },
    globalData: {
	  // 填写你的域名
      host: ''
    }
});

