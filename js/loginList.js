/**
 * 管理员登陆
 */
layui.use(['form'], function() {
    var form = layui.form,
        layer = layui.layer;

    // 登录过期的时候，跳出ifram框架
    if (top.location != self.location) top.location = self.location;

    // 进行登录操作
    form.on('submit(login)', function(data) {
        data = data.field;

        $.ajax({
			url: 'http://112.74.173.8:8082/zsh/adminLogin',
            type: 'post',
            dataType: "json",
            data: JSON.stringify({
                userid: data.username,
                pwd: data.password
            }),
            success: function(res) {
                if (res.status == 0) {
                    layer.msg(res.msg)
                    sessionStorage.setItem("userid", res.para.userid);
					sessionStorage.setItem("username", res.para.username);
                    sessionStorage.setItem("groupid", res.para.groupid);
                    window.location = './index.html'
                } else {
                    layer.msg("账号/密码输入错误，请重新输入");
                }
            }
        });
        return false;
    });
});

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {
    history.pushState(null, null, document.URL);
});