/**
 * 商品级别价格列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
        var axdata = {};
		
		$("#DDID").text(decodeURI(GetQueryString("spmc")));

        $.ajax({
            url: URLIP +"spJgtzListAdmin",
            method: 'post',
            data: JSON.stringify({
				spid: GetQueryString("spid"),
                userid: ADMIN
            }),

            success: function(res) {
                data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para;
					for (var i = 0; i < axdata.length; i++) {
					    axdata[i].jgtz = axdata[i].jgtz / 100;
					}
					table.render({
						data: axdata,
						elem: '#spJgtzAdminInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'spid', title: '商品名称', minWidth: 180, templet: '#spidTpl'},
								{ field: 'user_flmc', title: '会员级别', minWidth: 160},
								{ field: 'jgtz', title: '价格调整(元)', minWidth: 160},
								{ field: 'bz', title: '备注', minWidth: 160},
								{ field: 'edit_time', title: '更新时间', width: 180},
								{ templet: '#cz', title: '操作', width: 135, fixed: "right", align: "left" }
							]
						]
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
		table.on('tool(spJgtzAdminID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			
			if(layEvent === "spJgtzEdit"){
				layer.open({
				    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
				    title: '编辑商品级别价格',
				    shadeClose: true,
				    shade: 0.8,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['560px', '420px'],
				    content: './spJgtzEdit.html?',
					success: function(layero, index) { //把父页面的值传给子页面
						var iframeWindow = window[layero.find('iframe')[0]['name']];
						iframeWindow.jsonpCallback(obj.data,decodeURI(GetQueryString("spmc")));
					},
				    error: function() {
				        window.location.href = "404.html";
				    }
				});
			} else if (layEvent === "spJgtzDel") {
				$.ajax({
					url: URLIP +"spJgtzDel",
					method: 'post',
					data: JSON.stringify({
						jgtzid: obj.data.jgtzid,
						userid: ADMIN
					}),
					success: function(res) {
						data = JSON.parse(res);
						
						if(data.status == 0){
							//捉到所有被选中的，发异步进行删除
							layer.msg('删除成功', {icon: 1, time: 1000}, function() {
								obj.del();
								location.reload();
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
    }
});

Keypress();
MoveBack();