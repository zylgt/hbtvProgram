// pages/list/list.js
var http = require('../../utils/http.js');
var api = require('../../API/api.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focusIndex:0,
        focus:[],
        choose:false,
        list:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        http.request(api.getNav,'POST').then((response)=>{
            if(response.data.code == 1 ){  
                response.data.msg.unshift({'id':0,'text':'全部'})
                this.setData({
                    focus:response.data.msg
                })
            }
        }).catch(()=>{})
        this.getList('')
    },
    // 菜单选择
    focusChange:function(e){
        this.setData({
            choose:true,
            focusIndex:e.detail.value
        })
        let val = this.data.focus[e.detail.value].id
        if(val == 0){
            val= ''
        }
        this.getList(val)
    },
    // 获取列表
    getList:function(val){
        http.request(api.getTeachers,'POST',{'domain':val}).then((response)=>{
            if(response.data.code == 1 ){  
                this.setData({
                    list:response.data.msg
                })
            }
        }).catch(()=>{})
    },
    detailName:function(){
        wx.navigateTo({
          url: '../teachers/teachers',
        })
    }
})