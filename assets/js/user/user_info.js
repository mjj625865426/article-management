$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
    initUserInfo();

    function initUserInfo() {
        // 获取个人基本信息--------------------------------------------------------
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息获取失败');
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 点击重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    //点击提交按钮修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })

})