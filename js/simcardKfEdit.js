/**
 * 电话卡卡费设置
 */
function jsonpCallback(data) {
	layui.use(['form', 'layedit', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit
			
		$("input[name='mobile']").val(data.mobile);
		$("input[name='kf']").val(data.kf);
		$("textarea[name='kfsm']").val(data.kfsm);
			
		//监听提交
		form.on('submit(simcardKfEditSubmit)', function(res) {
			$.ajax({
				url: URLIP +"simcardKfEdit",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					ggid: data.ggid,
					mobile: data.mobile,
					kf: res.field.kf * 100,
					kfsm: res.field.kfsm.replace(/\s*/g,""),
					admin: ADMIN
				}),
				success: function(res) {
					if(res.status == 0){
						layer.msg('设置成功', { icon: 1, time: 500}, function() {
							parent.location.reload(); //刷新父级页面
							var index = parent.layer.getFrameIndex(window.name); //获得frame索引
							parent.layer.close(index); //关闭当前frame
						});
					} else {
						layer.msg(res.msg, { time: 1500});
					}
				},
				error: function() {
					window.location.href = "404.html";
				}
			});
			return false; //防止刷新
		});
	});
}

Keypress();
MoveBack();