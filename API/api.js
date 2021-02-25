// 以下是业务服务器API地址
// 云平台部署时使用
var WxApiRoot = 'https://hbtv.10k.xyz/common10k';
// var WxApiRoot = 'http://wechat2.natapp1.cc/mealOrdering'
// 云平台上线时使用
// var WxApiRoot = 'https://hbtv.10k.xyz/common10k'; 

module.exports = {
    getNav:WxApiRoot + '/common/getDomains',//获取Nav菜单
    getTeachers:WxApiRoot + '/common/getTeachers',//获取人员列表
}