// pages/map/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainInfo: {},
    markers: [],
    showLocation: true
  },
  markertap(e) {
    let _this = this;
    wx.openLocation({
      latitude: _this.data.mainInfo.latitude,
      longitude: _this.data.mainInfo.longitude,
      scale: 18,
      // 酒店名字和位置
      name: '',
      address: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取配置信息
    const mainInfo = await app.globalData.db.collection('invitation').limit(20).get()

    this.setData({
      mainInfo: mainInfo.data[0],
      markers: [
        {
          id: 1,
          // 酒店经纬度
          latitude: mainInfo.data[0].latitude,
          longitude: mainInfo.data[0].longitude,
          iconPath: "../../images/nav.png",
          width: 50,
          height: 50
        }
      ]
    })
    
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
      phoneNumber: this.data.mainInfo.boyPhone
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.girlPhone
    })
  }
})