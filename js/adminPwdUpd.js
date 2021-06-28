/**
 * 管理员重置密码
 */
layui.use(['form', 'layedit', 'jquery'], function() {
	if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
		Href();
	} else {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit
			
		$("input[name='userid']").val(ADMIN);
		
		//监听提交
		form.on('submit(adminPwdUpdSubmit)', function(res) {
			
			//验证两次密码是否一致
			if($("input[name='pwd']").val() != $("input[name='password']").val()){
				layer.msg('两次输入密码不一致!', {time: 1500});
			} else {
				$.ajax({
					url: URLIP +"adminPwdUpd",
					type: 'post',
					dataType: "json",
					data: JSON.stringify({
						userid: ADMIN,
						bz: res.field.bz.replace(/\s*/g,""),
						pwd: res.field.pwd.replace(/\s*/g,"")
					}),
					success: function(res) {
						if(res.status == 0){
							layer.alert('重置密码成功', function() {
								window.parent.parent.location.href="../login.html";
							});
						} else {
							layer.msg(res.msg, {time: 1500});
						}
					},
					error: function() {
						window.location.href = "404.html";
					}
				});
			}	
			return false; //防止刷新
		});
	}
});

Keypress();
MoveBack();