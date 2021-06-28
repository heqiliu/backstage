/**
 * 评论回复语列表
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
			url: URLIP + "focusAnsList",
			method: 'post',
			data: JSON.stringify({
				fid: GetQueryString("fid"),
				admin: ADMIN
			}),
			success: function(res) {
				data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para
					table.render({
						data: axdata,
						elem: '#focusAnsInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'txt', title: '内容说明', minWidth: 125 },
								{ templet: '#cz', title: '操作', width: 75, fixed: "right", align: "center" }
							]
						],
						limits: [20, 100],
						limit: 20,
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
		table.on('tool(focusAnsID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			
			if (layEvent === "focusAnsDel") {
				$.ajax({
					url: URLIP +"focusAnsDel",
					method: 'post',
					data: JSON.stringify({
						fsid: obj.data.fsid,
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
		
		$("#focusAnsAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加问答内容',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['600px', '260px'],
			    content: './focusAnsAdd.html',
				success: function(layero, index) { //把父页面的值传给子页面
					var iframeWindow = window[layero.find('iframe')[0]['name']];
					iframeWindow.jsonpCallback(GetQueryString("fid"));
				},
			    error: function() {
			        window.location.href = "404.html";
			    }
			});
		});
	}	
});

Keypress();
MoveBack();