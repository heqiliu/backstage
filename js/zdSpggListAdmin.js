/**
 * 商品规格列表
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
            url: URLIP +"zdSpggListAdmin",
            method: 'post',
            data: JSON.stringify({
                userid: ADMIN
            }),

            success: function(res) {
                data = JSON.parse(res);
                axdata = data.para
                table.render({
                    data: axdata,
                    elem: '#zdSpggAdminInfo',
                    url: "",
                    cols: [
                        [ //表头
                            { field: 'ggmc', title: '规格名称', minWidth: 130},
							{ field: 'ggxsmc', title: '规格名称(APP显示)', minWidth: 152},
                            { field: 'flmc', title: '分类名称', minWidth: 100},
							{ field: 'bz', title: '备注', minWidth: 100},
							{ field: 'input_time', title: '创建时间', width: 180},
							{ field: 'userid', title: '操作人', width: 130},
							{ templet: '#cz', title: '操作', width: 135, fixed: "right", align: "center" }
                        ]
                    ],
                    limits: [20, 50, 100, 200],
                    limit: 20,
                    page: true
                });
            },
            error: function() {
                window.location.href = "404.html";
            }
        });
		
		//监听表格 查看删除操作
		table.on('tool(zdSpggAdminID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
		    if (layEvent === "zdSpggEditReturn") {
		        layer.open({
		            type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
		            title: '修改商品规格',
		            shadeClose: true,
		            shade: 0.8,
		            maxmin: true, //开启最大化最小化按钮
		            area: ['500px', '420px'],
		            content: './zdSpggEdit.html',
		            success: function(layero, index) { //把父页面的值传给子页面
		                var iframeWindow = window[layero.find('iframe')[0]['name']];
		                iframeWindow.jsonpCallback(obj.data);
		            }
		        });
		    }
		});
		
		$("#zdSpggAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加规格',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['500px', '420px'],
			    content: './zdSpggAdd.html',
			    error: function() {
			        window.location.href = "404.html";
			    }
			});
		});
    }
});

Keypress();
MoveBack();