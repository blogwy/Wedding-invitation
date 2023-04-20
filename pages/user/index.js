const defaultAvatarUrl = '/images/user.png'
const app = getApp()
const utils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    pass: false,
    canTap: false,
    from: '',
    openId: '',
    words: ''
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },

  onbindnicknamereview(e) {
    this.setData({
      pass: e.detail.pass
    })
  },

  onbindblur(e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  async submit() {
    // 检查头像是否上传
    if (this.data.avatarUrl.includes(defaultAvatarUrl)) {
      wx.showToast({
        title: '请上传头像',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '正在提交数据',
      mask: true
    })
    try {
      // 上传图片
      const { fileID } = await wx.cloud.uploadFile({ cloudPath: `${this.data.openId}_avatar.png`, filePath: this.data.avatarUrl })
      const userInfo = {
        avatarUrl: fileID,
        nickName: this.data.nickName,
        openId: this.data.openId
      }
      await app.globalData.db.collection('user').add({ data: userInfo })
      if (this.data.from === 'bless') {
        const bless = {
          nickName: this.data.nickName,
          avatarUrl: fileID,
          openId: this.data.openId
        }
        await app.globalData.db.collection('bless').add({ data: bless })
      }
      if (this.data.from === 'comment') {
        let comment = {
          nickName: this.data.nickName,
          avatarUrl: fileID,
          words: this.data.words,
          openId: this.data.openId,
          create_time: utils.formatTime()
        }
        await app.globalData.db.collection('comment').add({ data: comment })
      }
      wx.hideLoading()
      wx.showToast({
        title: this.data.from === 'bless' ? '谢谢你的祝福' : '谢谢你的留言',
        icon: 'success',
        duration: 2000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: this.data.from === 'bless' ? '/pages/bless/index' : '/pages/comment/index'
        })
      }, 2000)
    } catch (error) {
      console.log(error);
      wx.hideLoading()
      wx.showToast({
        title: '未知错误',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      from: options.from,
      openId: options.openid,
      words: options.words,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})