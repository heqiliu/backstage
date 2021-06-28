/**
 * 快递单号添加
 */
function jsonpCallback(data) {
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form
		
		if(data.xjjf != 0){
			$('input[name="xjjf"]').val(data.xjjf);
		}
		
		if(data.gwjf != 0){
			$('input[name="gwjf"]').val(data.gwjf);
		}
		
        //监听提交
        form.on('submit(rwjfEditSubmit)', function(res) {
			$.ajax({
			    url: URLIP +"rwXjjfUpd",
			    type: 'post',
			    dataType: "json",
			    data: JSON.stringify({
			        rwid: data.rwid,
					xjjf: res.field.xjjf,
			        admin: ADMIN
			    }),
			    success: function() {}
			});
			
            $.ajax({
                url: URLIP +"rwGwjfUpd",
                type: 'post',
                dataType: "json",
                data: JSON.stringify({
                    rwid: data.rwid,
					gwjf: res.field.gwjf,
                    admin: ADMIN
                }),
                success: function() {
                    layer.msg('设置成功', {icon: 1, time: 1000 }, function() {
                        parent.location.reload(); //刷新父级页面
                        var index = parent.layer.getFrameIndex(window.name); //获得frame索引
                        parent.layer.close(index); //关闭当前frame
                    });
                }
            });
            return false; //防止刷新
        });
    });
}