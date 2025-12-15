// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //从服务端获取的颜色列表
    colorList: [],
    //控制上拉刷新频率的节流阀
    isLoading: false
  },

  //获取服务端颜色数据，添加到本地颜色数据列表里
  getColors(){
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://applet-base-api-t.itheima.net/api/color',
      method: 'get',
      success: ({data: res}) => {
        console.log(res.data)
        this.setData({
          //...是展开运算符，用于将数组中的元素展开
          colorList: [...this.data.colorList, ...res.data, ...res.data]
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getColors()
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
    if(this.data.isLoading){
      return
    }
    this.getColors()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})