/**
 * 热点问答列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
        var axdata = {};
		
		$.ajax({
			url: URLIP+"focusListAll",
			method: 'post',
			data: JSON.stringify({
				userid: '',
				admin: ADMIN
			}),
			success: function(res) {
				data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para
					table.render({
						data: axdata,
						elem: '#focusAllInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'title', title: '内容说明', minWidth: 160 },
								{ templet: '#cz', title: '操作', width: 160, fixed: "right", align: "center" },
							]
						],
						limits: [50, 100, 150,200],
						limit: 50,
						page: true
					});
				} else {
					layer.msg(data.msg, {time: 1000});
				}
			},
			error: function() {
				window.location.href = "404.html";
			}
		});
		
		//监听表格 查看删除操作
		table.on('tool(focusAllID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			
			if (layEvent === "focusDel") {
				$.ajax({
					url: URLIP +"focusDel",
					method: 'post',
					data: JSON.stringify({
						fid: obj.data.fid,
						admin: ADMIN
					}),
					success: function(res) {
						data = JSON.parse(res);
						
						if(data.status == 0){
							//捉到所有被选中的，发异步进行删除
							layer.msg('删除成功', {icon: 1, time: 500}, function() {
								obj.del();
								layui.form.render();
							});
						} else {
							layer.msg(data.msg, {time: 1500});
						}
					},
					error: function() {
						window.location.href = "404.html";
					}
				});
		    }
		});
		
		$("#focusAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加热点问答',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['600px', '260px'],
			    content: './focusAdd.html',
			    error: function() {
			        window.location.href = "404.html";
			    }
			});
		});
	}	
});

Keypress();
MoveBack();