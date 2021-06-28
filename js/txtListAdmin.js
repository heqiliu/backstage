/**
 * 文本配置
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;

		Panging();
		
		$.ajax({
		    url: URLIP +"syscfgGet",
		    method: 'post',
		    data: JSON.stringify({
				cfgkey: 'PgPerNum',
		        admin: ADMIN
		    }),
		    success: function(resPage) {
				dataPage = JSON.parse(resPage);
				
				if(dataPage.status == 0){
					table.render({
						elem: '#txtInfo',
						url: URLIP +"txtListAdmin",
					    method: "post",
					    contentType: 'application/json',
					    where: {
							userid: ADMIN
					    },
					    parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							if(res.status == 0){
								var axdata = res.para.txts;
								
								for (var i = 0; i < axdata.length; i++) {
									axdata[i].upd_time = axdata[i].upd_time.replace(/.[0-9]*$/,'');
								}
								return {
									"code": res.status,
									"msg": res.msg,
									"count": res.para.pgInfo.total_num,
									"data": res.para.txts
								}
							} else {
								layer.msg(res.msg, {time: 1500});
							}
					    },
					    request: {
					        pageName: 'pg', // 页码的参数名称，默认：page
					    },
					    cols: [
					        [ //表头
					            //{ type: 'checkbox', fixed: 'txtid', title: '选择' },
					            { field: 'bz', title: '名称', minWidth: 220 },
					            { field: 'txt', title: '说明', minWidth: 250 },
					            { field: 'upd_time', title: '操作时间', width: 180 },
					            { templet: '#cz', title: '操作', width: 80, fixed: "right", align: "left" }
					        ]
					    ],
					    page: {
					        limit: Number(dataPage.para.cfgvalue),
					        layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
					    }
					});
				} else {
					layer.msg(dataPage.msg, {time: 1000});
				}
		    },
		    error: function() {
		        window.location.href = "404.html";
		    }
		});
		
        //监听表格 编辑操作
        table.on('tool(txtID)', function(obj) {
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var txt = obj.data.bz;

            if (layEvent === "txtGetRevise") {
                layer.open({
                    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
                    title: txt + '修改',
                    shadeClose: true,
                    shade: 0.8,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['50%', '36%'],
                    content: './txtEdit.html',
                    success: function(layero, index) { //把父页面的值传给子页面
                        var iframeWindow = window[layero.find('iframe')[0]['name']];
                        iframeWindow.jsonpCallback(obj.data);
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