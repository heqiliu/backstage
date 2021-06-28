/**
 * 商品规格添加
 */
layui.use(['form', 'layedit', 'jquery'], function() {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit
		
	//下拉框币种
	$.ajax({
	    url: URLIP +"selectItem",
	    type: 'post',
	    dataType: "json",
	    data: JSON.stringify({
	        fl: "spfl",
	        admin: ADMIN
	    }),
	    success: function(res) {
	        $("select[name='spflid']").empty();
	        $.each(res.para, function(index, item) {
	            $("select[name='spflid']").append(new Option("", ""));
	            $("select[name='spflid']").append(new Option(item.v, item.k)); //往下拉菜单里添加元素
	        })
	        form.render(); //更新全部表单内容
	    }
	});	

    //监听提交
    form.on('submit(zdSpggAddSubmit)', function(res) {
		var spMc = res.field.spflid;
		
		if (spMc == "" || spMc == null || spMc == undefined) {
		    layer.msg("请选择分类名称");
		    return false;
		}
		
        $.ajax({
            url: URLIP +"zdSpggAdd",
            type: 'post',
            dataType: "json",
            data: JSON.stringify({
                spflid: spMc,
                ggmc: res.field.ggmc,
				ggxsmc: res.field.ggxsmc,
				bz: res.field.bz.replace(/\s*/g,""),
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

Keypress();
MoveBack();