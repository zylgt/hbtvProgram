// 以下是业务服务器API地址
// 云平台部署时使用
var WxApiRoot = 'https://hbtv.10k.xyz/common10k';
//var WxApiRoot = 'http://wechat2.natapp1.cc/common10k'
// 云平台上线时使用
// var WxApiRoot = 'https://hbtv.10k.xyz/common10k'; 

module.exports = {
    getNav:WxApiRoot + '/teacher/api/getExistDomains',//获取Nav菜单
    getTeachers:WxApiRoot + '/teacher/api/getTeachers',//获取人员列表
    getTeacherDetails:WxApiRoot + '/teacher/api/getTeacherById',//获取教师详情
    getToken:WxApiRoot + '/user/api/getAccessToken',//获取token
    createQuestion:WxApiRoot + '/teacher/api/createQuestion',//创建问题

}