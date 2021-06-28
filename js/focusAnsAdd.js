/**
 * 评论回复语添加
 */
function jsonpCallback(fid) {
	layui.use(['form', 'layedit', 'jquery', 'upload', 'laydate'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload,
			laydate = layui.laydate;
		
		//监听提交
		form.on('submit(focusAnsAddSubmit)', function(res) {
			$.ajax({
				url: URLIP +'focusAnsAdd',
				type: 'post',
				dataType: 'json',
				data: JSON.stringify({
					fid: fid,
					txt: res.field.txt.replace(/[\r\n\s+]/g, ""),
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
}