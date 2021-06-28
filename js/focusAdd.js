/**
 * 评论回复语添加
 */
layui.use(['form', 'jquery', 'upload'], function() {
	var form = layui.form,
		upload = layui.upload;
	
	//监听提交
	form.on('submit(focusAddSubmit)', function(res) {
		$.ajax({
			url: URLIP +'focusAdd',
			type: 'post',
			dataType: 'json',
			data: JSON.stringify({
				title: res.field.title.replace(/[\r\n\s+]/g, ""),
				admin: ADMIN
			}),
			success: function(res) {
				if (res.status == 0) {
					layer.msg('添加成功', { icon: 1, time: 1000 }, function() {
						parent.location.reload() //刷新父级页面
						var index = parent.layer.getFrameIndex(window.name) //获得frame索引
						parent.layer.close(index) //关闭当前frame
					})
				} else {
					layer.msg(res.msg, { time: 1500 })
				}
			},
			error: function() {
				window.location.href = '404.html'
			}
		});
		return false //防止刷新
	});
});
