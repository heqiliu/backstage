/**
 * 快递单号添加
 */
function jsonpCallback(mobile) {
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form

        //监听提交
        form.on('submit(simcardFHSubmit)', function(res) {
            var kdgs = res.field.kdgs;
			var kdkh = res.field.kdkh;
			var kdkhSH = kdgs + '/' + kdkh;
			
            $.ajax({
                url: URLIP +"simcardFH",
                type: 'post',
                dataType: "json",
                data: JSON.stringify({
                    mobile: mobile,
					kddh: kdkhSH,
                    admin: ADMIN
                }),
                success: function() {
                    layer.msg('添加成功', {icon: 1, time: 1000 }, function() {
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