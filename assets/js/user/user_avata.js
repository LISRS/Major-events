$(function () {
    var layer = layui.layer
    var $image = $('.image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片')
        }
        var file = e.target.files[0]
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', imgURL)
            .cropper(options)
    })
    fn()
    $('#btnUplaod').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                heightt: 100
            })
            .toDataURL('image/png')
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败')
                }
                layer.msg('更新头像成功')
                window.parent.getUserInfo()

            }
        })
    })
    function fn() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                if (res.data.user_pic) {
                    $('.image')
                        .cropper('destroy') // 销毁旧的裁剪区域  
                        .attr('src', decodeURI(res.data.user_pic)) // 重新设置图片路径  
                        .cropper(options)
                }

            },
        });

    }

})