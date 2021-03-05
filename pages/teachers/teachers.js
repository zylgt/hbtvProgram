// pages/communicate/communicate.js
var http = require('../../utils/http.js');
var api = require('../../API/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nameFlag:true,
        play:false,
        toast:false,
        ask_cont:'',
        scrollView:'',
        play_img:false,
        posFlag:true,
        info:'',
        talk:[],
        htmlArr:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInfo(options.id)
         // 查看是否授权
        if(wx.getStorageSync('token')){
           this.setData({
            nameFlag:false
           })
        }else{
            this.setData({
                nameFlag:true
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.video = wx.createVideoContext('myVideo')
    },
    // 播放视频
    playName:function(){
        this.video.play()
        this.setData({
            play:true,
            play_img:false
        })
    },
    // 暂停视频
    pauseName:function(){
        this.setData({
            play:false
        })
    },
    // 全屏事件
    fullName:function(e){
        console.log(e)
        if(e.detail.fullScreen){
            this.setData({
                posFlag:false
            })
        }else{
            this.setData({
                posFlag:true
            })
        }
    },
    // 定位带提问
    scrollName:function(){
        // wx.pageScrollTo({
        //     selector:'.submit',
        //     duration: 300
        //   })
        this.setData({
            scrollView:'askView'
        })
    },
    // 跳转列表
    otherName:function(){
        wx.navigateTo({
          url: '../index/index?type=1',
        })
    },
    // 取消弹框
    hideName:function(){
        this.setData({
            toast:false
        })
    },
    // 获取老师详细信息
    getInfo:function(id){
        http.request(api.getTeacherDetails,'POST',{'id':id}).then((response)=>{
            if(response.data.code == 1 ){ 
                this.setData({
                    info:response.data.msg.teacher,
                    talk:response.data.msg.answers
                })
            }
        }).catch(()=>{})
    },
    // 获取用户信息
    bindGetUserInfo:function(e){
        if(e.detail.errMsg=='getUserInfo:ok'){
            wx.login({
                complete: (res) => {
                if(res.code){
                    this.getToken(res.code,e.detail.userInfo.avatarUrl,e.detail.userInfo.nickName)
                }
                },
            })
        }
    },
    // 登录接口
    getToken:function(code,headimgurl,nickname){
        var that = this
        http.request(api.getToken,'POST',{'code':code,'headimgurl':headimgurl,'nickname':nickname}).then((response)=>{
        if(response.data.code == 1 ){
            wx.setStorageSync('token', response.data.msg.token)
            this.setData({
                nameFlag:false
            })
              setTimeout(function(){
                that.submitName()
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
            if(wx.getStorageSync('token')){
                http.request(api.createQuestion,'POST',{'teacher_id':this.data.info.id,'question':this.data.ask_cont,}).then((response)=>{
                    if(response.data.code==1){
                        this.setData({
                            ask_cont:'',
                            toast:true
                        }) 
                    }else{
                        wx.showToast({
                            icon:'none',
                            title: '提交失败，请重新提交',
                        })
                    }
                }).catch(()=>{})
            }
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '我在长江云，两会帮你问',
            path: '/pages/teachers/teachers?id='+this.data.info.id,
            imageUrl:this.data.info.small_url
        }
    }
})