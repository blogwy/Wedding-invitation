// pages/map/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainInfo: {
      // 新人的电话和名字
      he_tel: '',
      she_tel: '',
      she: '',
      he: ''
    },
    // 酒店经纬度
    lng: 0000,
    lat: 0000,
    markers: [
      {
        id: 1,
        // 酒店经纬度
        latitude: 0000,
        longitude: 0000,
        iconPath: "../../images/nav.png",
        width: 50,
        height: 50
      }
    ],
    showLocation: true
  },
  markertap(e) {
    let _this = this;
    wx.openLocation({
      latitude: _this.data.lat,
      longitude: _this.data.lng,
      scale: 18,
      // 酒店名字和位置
      name: '',
      address: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    app.shareHandle();
  },
  callhe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  }
})