$(function () {
    // 点击去注册账号到链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录到链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui中获取
    // 表单验证 自定义检验规则
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        // 自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 自定义了一个repwd的校验规则
        repwd: function (value) {
            var pwd = $('.reg-box [name = password]').val();
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //模拟人的点击行为
            $('#link_login').click();
        })
    })
    // 登录页面提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                localStorage.setItem('token', res.token);
                // 跳转到后台主页index.html
                location.href = '/index.html'
            }
        })
    })

})