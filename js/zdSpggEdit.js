/**
 * 商品规格修改
 */
function jsonpCallback(data) {
	layui.use(['form', 'layedit', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit
			
		$("input[name='flmc']").val(data.flmc);
		$("input[name='ggmc']").val(data.ggmc);
		$("input[name='ggxsmc']").val(data.ggxsmc);
		$("textarea[name='bz']").val(data.bz);
			
		//监听提交
		form.on('submit(zdSpggEditSubmit)', function(res) {
			$.ajax({
				url: URLIP +"zdSpggEdit",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					ggid: data.ggid,
					spflid: data.spflid,
					ggmc: res.field.ggmc,
					ggxsmc: res.field.ggxsmc,
					bz: res.field.bz.replace(/\s*/g,""),
					userid: ADMIN
				}),
				success: function(res) {
					if(res.status == 0){
						layer.msg('修改成功', { icon: 1, time: 500}, function() {
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