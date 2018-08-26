//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slideList: [
      // 这里是相册页面展示的大图，推荐放多个效果不错
      '',
      '',
      '',
      ''
    ],
  },  
  onLoad: function () {
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (res) {
    app.shareHandle();
  }
})
