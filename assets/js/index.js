$(function () {
    // 调用用户基本信息
    getUserInfo();
    var layer = layui.layer;
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        //弹出消息框
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //1.要清空本地token
            localStorage.removeItem('token');
            // 2.重新跳转登录页
            location.href = '/login.html'
            // 这是关闭confirm弹出框
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // 调用渲染用户头像
            renderAvatar(res.data)
        },
        // 无论成功还是失败
        // complete: function (res) {
        //     //     // 在complate可以使用responseJSON拿到服务器相应会来的数据
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         //     // 强制跳转
        //         location.href = '/login.html'
        //     }
        //     //    
        // }

    })
}

function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text_avatar').html(first).show()
    }
}