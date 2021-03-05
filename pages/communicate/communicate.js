// pages/communicate/communicate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nameFlag:true,
        play:false,
        toast:false,
        ask_cont:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.login({
          success:function(res){
              console.log(res.code)
          }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 播放视频
    playName:function(){
        this.setData({
            play:true
        })
    },
    // 暂停视频
    pauseName:function(){
        this.setData({
            play:false
        })
    },
    // 定位带提问
    scrollName:function(){
        wx.pageScrollTo({
            selector:'.submit',
            duration: 300
          })
    },
    // 跳转列表
    otherName:function(){
        wx.navigateTo({
          url: '../index/index',
        })
    },
    // 取消弹框
    hideName:function(){
        this.setData({
            toast:false
        })
    },
     // 获取用户信息
    bindGetUserInfo:function(e){
        if(e.detail.errMsg=='getUserInfo:ok'){
            wx.login({
                complete: (res) => {
                if(res.code){
                    // this.getToken(res.code,e.detail.userInfo.avatarUrl,e.detail.userInfo.nickName)
                    this.setData({
                        toast:true
                    })
                }
                },
            })
        }
    },
    // 登录接口
    getToken:function(code,headimgurl,nickname){
        var that = this
        http.request(api.getAccessToken,'POST',{'code':code,'headimgurl':headimgurl,'nickname':nickname}).then((response)=>{
        if(response.data.ResultMessage == 100 ){
            wx.setStorageSync('token', response.data.ReturnValue.token)
            this.setData({
                nameFlag:false
            })
            wx.showToast({
                title: '登录成功',
            })
            setTimeout(function(){
                that.getToday()
            },1000)
        }
        }).catch(()=>{})
    },
    textName:function(e){
        this.setData({
            ask_cont:e.detail.value
        })
    },
    // 提交信息
    submitName:function(){
        if(this.data.ask_cont == ''){
            wx.showToast({
                icon:'none',
                title: '请输入内容',
            })
        }else{
            this.setData({
                toast:true,
                ask_cont:''
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})