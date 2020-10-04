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
    bindgetuserinfo (e) {
      console.log(e.detail.userInfo);
      this.loading = true
      wx.cloud.callFunction({
        // 云函数名称
        name: 'get_openId'
      })
        .then(async res => {
          console.log(res.result)
          const obj = {
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            openId: res.result.openid
          }
          // 查询数据库
          const status = await app.globalData.db.collection('bless').where({ openId: res.result.openid }).get()
          if (!status.data.length) {
            // 没有祝福过
            app.globalData.db.collection('bless').add({
              data: obj
            })
              .then(async res => {
                console.log(res);
                wx.showToast({
                  title: '谢谢你的祝福',
                  icon: 'none',
                  duration: 2000
                })
                await this.getBless()
                this.loading = false
              })
              .catch(err => {
                console.log(err);
                this.loading = false    
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
            this.loading = false          
          }
        })
        .catch(err => {
          console.log(err);
          this.loading = false
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
      app.shareHandle();
    }
})