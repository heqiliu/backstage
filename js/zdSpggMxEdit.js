/**
 * 商品规格明细编辑
 */
function jsonpCallback(data) {
	layui.use(['form', 'layedit', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;
			
		$('input[name="mxmc"]').val(data.mxmc);
		$('input[name="jgtz"]').val(data.jgtz);
		
		//监听提交
		form.on('submit(zdSpggMxEditSubmit)', function(res) {
			var jgtz = res.field.jgtz *100;
			$.ajax({
				url: URLIP +"zdSpggMxEdit",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					mxid: data.mxid,
					mxmc: res.field.mxmc,
					jgtz: jgtz,
					userid: ADMIN
				}),
				success: function(res) {
					if(res.status == 0){
						layer.msg('修改成功', { icon: 1, time: 1000}, function() {
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