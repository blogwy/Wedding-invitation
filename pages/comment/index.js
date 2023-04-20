// pages/chat/index.js
const app = getApp();
const utils = require('../../utils/util')
Page({
    /**
     * 页面的初始数据
     */
    data: {
      chatNum: 0,
      words: '',
      chatList: [],
      limit: 9,
      skip: 0,
      count: 0,
      loading: false
    },
    async getComment () {
      const mainInfo = await app.globalData.db.collection('comment')
        .limit(this.data.limit)
        .skip(this.data.skip)
        .get()
      if (!mainInfo.data.length) {
        wx.showToast({
          title: '已经到底了',
          icon: 'none',
          duration: 2000
        })
      } else {
        let chatNum = mainInfo.data.length + this.data.chatNum
        let chatList = this.data.chatList.concat(mainInfo.data)
        this.setData({
          chatNum,
          chatList
        })
        const skip = mainInfo.data.length + this.data.skip
        if (this.data.limit === 9) {
          this.setData({
            limit: 10,
            count: mainInfo.data.length,
            skip: skip
          })
        } else {
          this.setData({
            limit: 9,
            count: mainInfo.data.length,
            skip: skip
          })
        }
      }
    },
    async sendComment (e) {
      this.setData({
        loading: true
      })
      try {
        const res = await wx.cloud.callFunction({ name: 'get_openId' })
        const user = await this.getUser(res.result.openid)
        if (!user) {
          wx.navigateTo({
            url: `/pages/user/index?from=comment&openid=${res.result.openid}&words=${this.data.words}`,
          })
          return
        }
        let sendData = {
          nickName: user.nickName,
          avatarUrl: user.avatarUrl,
          words: this.data.words,
          openId: res.result.openid,
          create_time: utils.formatTime()
        }
        await app.globalData.db.collection('comment').add({ data: sendData })
        this.setData({
          words: ''
        })
        await this.getComment()
      } catch (error) {
        wx.showToast({
          title: '未知错误',
          icon: 'none',
          duration: 2000
        })
      }
      this.setData({
        loading: false
      })
    },
    bindKeyInput (e) {
      this.setData({
        words: e.detail.value
      })
    },
    async getUser (openId) {
      const { data } = await app.globalData.db.collection('user').where({ openId }).get()
      if (data.length) {
        return {
          nickName: data[0].nickName,
          avatarUrl: data[0].avatarUrl
        }
      }
      return false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
      await this.getComment()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: async function () {},

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
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
      await this.getComment()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
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
})