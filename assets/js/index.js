
const layer = layui.layer;



$(function () {

    // 获取用户信息
    getUserInfo()
    // 退出功能
    $('#btnogout').click(function () {
        //eg1
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1.清空本地存储中的 token
            localStorage.removeItem('token')
            location.href = 'login.html'
            //    重新跳转到登录页面     
            // 3关闭询问框  
            layer.close(index);
        });
    })

})
function getUserInfo() {

    $.ajax({
        type: "GET",
        url: "/my/userinfo",

        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            layer.msg("获取用户信息成功！");
            rederAvatar(res.data)
        },
            // complete: function (res) {
            //     if (res.responseJSON.status = 1 && res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href = 'login.html'
            //     }
            // }
    });
}
// 渲染用户头像
function rederAvatar(user) {
    // nickname优先级更高 获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}