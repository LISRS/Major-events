
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
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) return layer.msg("获取用户信息失败！");
            rederAvatar(res.data)
        },
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
        $('.layui-nav-img').show()
    } else {
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        console.log($('.layui-nav-img').hide());
    }
}