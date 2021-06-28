/**
 * 文本配置修改
 */
function jsonpCallback(data) {
    layui.use(['form'], function(res) {
        var $ = layui.jquery,
            form = layui.form

        $("input[name='bz']").val(data.bz);
        $("textarea[name='txt']").val(data.txt);

        //监听提交res
        form.on('submit(txtEditSubmit)', function(res) {
            var txtid = data.txtid;

            $.ajax({
                url: URLIP +"txtEdit",
                type: 'post',
                dataType: "json",
                data: JSON.stringify({
                    txtid: txtid,
                    txt: res.field.txt,
					admin: ADMIN
                }),
                success: function(data) {
					if(data.status == 0){
						layer.msg('修改成功', {icon: 1, time: 1000 }, function() {
							parent.location.reload(); //刷新父级页面
							var index = parent.layer.getFrameIndex(window.name); //获得frame索引
							parent.layer.close(index); //关闭当前frame
						});
					} else {
						layer.msg(data.msg, {time: 1000});
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