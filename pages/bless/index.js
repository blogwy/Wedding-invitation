// pages/bless/index.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
      zanNum: 0,
      zanLog: [],
      isBless: false,
      limit: 9,
      skip: 0,
      count: 0,
      loading: false
    },
    async sendBless () {
      console.log('sendBless');
      this.setData({
        loading: true
      })
      try {
        const res = await wx.cloud.callFunction({ name: 'get_openId' })
        console.log(res);
        const user = await this.getUser(res.result.openid)
        console.log(user);
        if (!user) {
          this.setData({
            loading: false
          })
          wx.navigateTo({
            url: `/pages/user/index?from=bless&openid=${res.result.openid}`,
          })
          return
        }
        const obj = {
          nickName: user.nickName,
          avatarUrl: user.avatarUrl,
          openId: res.result.openid
        }
        // 查询数据库
        const { data } = await app.globalData.db.collection('bless').where({ openId: res.result.openid }).get()
        if (!data.length) {
          // 没有祝福过
          await app.globalData.db.collection('bless').add({ data: obj })
          wx.showToast({
            title: '谢谢你的祝福',
            icon: 'none',
            duration: 2000
          })
          await this.getBless()
          this.setData({
            isBless: true
          })
        } else {
          this.setData({
            isBless: true
          })
          wx.showToast({
            title: '您已经祝福过了',
            icon: 'none',
            duration: 2000
          })
        }
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
    async getBless () {
      const mainInfo = await app.globalData.db.collection('bless')
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
        let zanNum = mainInfo.data.length + this.data.zanNum
        let zanLog = this.data.zanLog.concat(mainInfo.data)
        this.setData({
          zanNum: zanNum,
          zanLog: zanLog
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
    onLoad: async function (options) {
      await this.getBless()
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
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

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