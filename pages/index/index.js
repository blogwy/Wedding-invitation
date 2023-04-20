// pages/invitation/index.js
const app = getApp()
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    mainInfo: {
      // 下面配置项依此为 首页背景图 新郎名字 新娘名字 公历时间 农历时间 酒店名字 酒店地址
      image: '',
      boy: '',
      girl: '',
      date: '',
      lunar: '',
      hotel: '',
      address: '',
      autoPlay: '',
      music: ''
    },
    musicStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 获取配置信息
    const mainInfo = await app.globalData.db.collection('invitation').limit(20).get()

    this.setData({
      mainInfo: mainInfo.data[0]
    })

    //创建动画
    var animation = wx.createAnimation({
      duration: 3600,
      timingFunction: "ease",
      delay: 600,
      transformOrigin: "50% 50%",
    })
    animation.scale(0.9).translate(0, 0).step();     //边旋转边放大

    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })

    // 播放背景音乐
    if (this.data.mainInfo.autoPlay) {
      wx.playBackgroundAudio({
        dataUrl: this.data.mainInfo.music,
        title: ''
      })
      this.setData({
        musicStatus: true
      })
    } else {
      this.setData({
        musicStatus: false
      })
    }
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
    return {
      title: '来吃喜糖',
      path: '/pages/index/index',
      imageUrl: ''
    }
  },
  onShareTimeline: function () {
    return {
      title: '来吃喜糖',
      imageUrl: ''
    }
  },
  play: function (event) {
    if (this.data.musicStatus) {
      wx.pauseBackgroundAudio();
      this.setData({
        musicStatus: false,
        title: ''
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.mainInfo.music,
        title: ''
      })
      this.setData({
        musicStatus: true
      })
    }
  }
})