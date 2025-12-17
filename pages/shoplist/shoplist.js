// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {},  //外部页面传进来的参数
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isLoading: false  //当前页面数据是否正在加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      param: options
    })
    this.getShopList()
  },

  /**
   * 以分页的形式按页码请求当前商家列表数据
   * @param {*} callback - 回调函数，下拉刷新触发查询时会传递该参数，用于在查询成功后关闭下拉刷新加载效果
   */
  getShopList(callback){
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://applet-base-api-t.itheima.net/categories/${this.data.param.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        console.log(res)
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0  //-0是为了字符串转数字
        })
      },
      complete: () => {
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        //若callback非空则执行该回调函数
        callback && callback()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.param.name,
    })
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
    this.setData({
      shopList: [],
      page: 1,
      total: 0
    })
    this.getShopList(() => {
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.page * this.data.pageSize >= this.data.total){
      return wx.showToast({
        title: '数据加载完毕',
        icon: 'none'
      })
    }
    if(this.data.isLoading){
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})