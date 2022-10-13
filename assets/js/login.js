$(function () {
    console.log(123);
    // 点击按钮跳转
    $('#linkreg').click(function () {
        $('.reg-box').show();
        $('.login-box').hide()
    })
    // 点击按钮跳转 去登陆
    $('#linklogin').click(function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })
    // 获取layui中的弹层
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ], repwd: function (value) { //value：表单的值、item：表单的DOM对象
            //判断 value  和 注册 的值 输入密码中的值是否不一致
            let pwd = $('.reg-pwd').val()
            if (value != pwd) {
                return '两次密码不一致';
            }
        }

    });
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.reg-name').val(),
            password: $('.reg-pwd').val(),
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            console.log(res);
            if (res.status != 0) return layer.msg(res.message)
            layer.msg('注册成功 请登录');
            $('#linklogin').click()

        })

    })
    $('#name-box').on('submit', function (e) {
        e.preventDefault();

        data = {
            username: $('.ist').val(),
            password: $('.istt').val(),
        }
        $.post('http://www.liulongbin.top:3007/api/login', data, function (res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg('用户名或密码错误')
            }
            
            location.href='index.html';
        })
    })
})