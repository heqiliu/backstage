/**
 * 商品规格明细添加 
 */
function jsonpCallback(ggidMcId) {
	layui.use(['form', 'layedit', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;
			
		var jgtz;
		jgtz = $('input[name="jgtz"]').val(0);
		
		//监听提交
		form.on('submit(zdSpggMxAddSubmit)', function(res) {
			jgtz = res.field.jgtz *100;
			$.ajax({
				url: URLIP +"zdSpggMxAdd",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					ggid: ggidMcId,
					mxmc: res.field.mxmc,
					jgtz: jgtz,
					userid: ADMIN
				}),
				success: function(res) {
					if(res.status == 0){
						layer.msg('添加成功', { icon: 1, time: 500}, function() {
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