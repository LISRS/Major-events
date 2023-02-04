$(function () {
    var form = layui.form
    $('tbody').on('click', '#btns', function () {

        layer.open({
            type: 1,
            content: $('#otwsss').html(), //这里content是一个普通的String
        });
        // 重新加载富文本
        initEditor()
        //    下拉重新渲染
        form.render();
        // 定义加载文章分类的方法
        function initCate() {
            $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('初始化文章分类失败！')
                    }
                    // 调用模板引擎，渲染分类的下拉菜单
                    var htmlStr = template('tpl-cate', res)
                    $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用 form.render() 方法
                    form.render()
                }
            })
        }
        initCate()
        // 1. 初始化图片裁剪器
        var $image = $('#image')
        // 2. 裁剪选项
        var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域
        $image.cropper(options)


        // 给上传按钮注册点击事件
        $('body').on('click', '#upload-file', function (e) {
            $('#coverFiles').click()
        })
        $('#coverFiles').on('change', function (e) {
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
        // 已发布未完成
        var art_state = '已发布'
        $('#btnSave2').on('click', function () {
            art_state = '草稿'
        })
        // 文章id
        var id = $(this).attr('data-id')
        fn()
        // 根据 Id 获取文章详情
        function fn() {
            $.ajax({
                method: 'GET',
                url: '/my/article/' + id,
                success: function (res) {


                    form.val('form-edits', res.data)
                }
            })
        }
        // 更新文章列表
        $('body').on('submit', '#form-li', function (e) {
            e.preventDefault()
            // 标题，所属分类 Id文章内容
            $(this).serialize()
            // 2. 基于 form 表单，快速创建一个 FormData 对象
            var fd = new FormData($(this)[0]) //通过 $(this)[0] 的方式将 jQuery 对象转换为原生的对象
            // 3. 将文章的发布状态，存到 fd 中
            fd.append('state', art_state)
            fd.append('Id',id)
            // 4. 将封面裁剪过后的图片，输出为一个文件对象
            $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function (blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    // 5. 将文件对象，存储到 fd 中
                    fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                    fns(fd)
                })
            function fns(fd) {
                $.ajax({
                    method: 'POST',
                    url: '/my/article/edit ',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {

                        if (res.status !== 0) {
                            return layer.msg('发布文章失败！')
                        }
                        layer.msg('更新文章成功！')
                        // 发布文章成功后，跳转到文章列表页面
                        location.href = '/article/art_list.html';
                    }
                })
            }
        })
    })

})