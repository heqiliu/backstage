/**
 * 商品规格明细添加 
 */
function jsonpCallback(data,spmc) {
	layui.use(['form', 'layedit', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			layedit = layui.layedit;
			
		$('input[name="spmc"]').val(spmc);
		$('input[name="user_flmc"]').val(data.user_flmc);
		$('input[name="jgtz"]').val(data.jgtz);
		$('textarea[name="bz"]').val(data.bz);
		
		//监听提交
		form.on('submit(spJgtzEditSubmit)', function(res) {
			$.ajax({
				url: URLIP +"spJgtzEdit",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					jgtzid: data.jgtzid,
					jgtz: res.field.jgtz * 100,
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