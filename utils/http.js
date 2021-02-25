/**
 * 封封微信的的request
 */
function request(url, method = "GET", data = {}) {
    return new Promise(function(resolve, reject) {
      wx.getNetworkType({
        success (res) {
          if(res.networkType=='none'){
            wx.showModal({
              title: '提示',
              content: '请检查网络设置后重试',
              showCancel:false,
              success (res) {
              }
            })
          }else{
            wx.showLoading({
              title: '加载中...',
            })
            wx.request({
              url: url,
              data: data,
              method: method,
              header: {
                'Content-Type': 'application/json',
              },
              timeout:'80000',
              success: function(res) {
                wx.hideLoading()
                if (res.statusCode == 200) {
                //   if(res.data.ResultMessage!=100){
                //     wx.showToast({
                //       icon:'none',
                //       title: res.data.Description,
                //     })
                //   }
                  resolve(res)
                } else if (res.statusCode == 401){
                  wx.showToast({
                    icon:'none',
                    title: '请先登录',
                  })
                  reject(res.errMsg);
                } else {
                  reject(res.errMsg);
                }
        
              },
              fail: function(err) {
                wx.hideLoading()
                reject(err)
              }
            })
          }
        }
      })
      
    });
  }
  module.exports = {
    request
  }