// pages/bless/index.js

const app = getApp();
var host = app.globalData.host;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      zanNum: 0,
      zanLog: []
    },
    bindgetuserinfo(e){
      console.log(e.detail.userInfo);
      if (e.detail.userInfo && wx.getStorageSync('openId')) {
        this.sendBless(e.detail.userInfo)
      } else {
        wx.showModal({
          title: '没有获取到您的信息',
          content: '请允许小程序获取您的个人信息',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    },
    sendBless(userInfo){
      let _this = this;
      let sendData = {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        openId: wx.getStorageSync('openId')
      }
      wx.request({
        url: host + '/bless/increase',
        method: 'POST',
        data: sendData,
        success(res) {
          console.log(res.data)
          if (res.data.code === '1') {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            let zanLog = _this.data.zanLog;
            zanLog.unshift(res.data.data);
            _this.setData({
              zanNum: _this.data.zanNum + 1,
              zanLog: zanLog
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail(err) {
          console.log(err)
        }
      })
    },
    getBless(){
      let _this = this;
      wx.request({
        url: host + '/bless/search',
        method: 'GET',
        success(res){
          console.log(res)
          _this.setData({
            zanNum: (res.data.data).length,
            zanLog: res.data.data
          })
        },
        fail(err){
          console.log(err)
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getBless()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
      let _this = this;
      wx.request({
        url: host + '/bless/search',
        method: 'GET',
        success(res) {
          console.log(res)
          _this.setData({
            zanNum: (res.data.data).length,
            zanLog: res.data.data
          },function(){
            wx.stopPullDownRefresh()
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
      app.shareHandle();
    }
})