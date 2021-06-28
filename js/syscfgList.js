/**
 * 系统配置列表
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
            url: URLIP +"syscfgList",
            method: 'post',
            data: JSON.stringify({
                cfgkey: '',
                admin: ADMIN
            }),
            success: function(res) {
				data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para
					for (var i = 0; i < axdata.length; i++) {
						axdata[i].cfgdate = axdata[i].cfgdate.replace(/.[0-9]*$/,'');
					}
					table.render({
						data: axdata,
						elem: '#syscfgInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'cfgkey', title: '配置ID', minWidth: 130 },
								{ field: 'cfgvalue', title: '配置值', style: "color:red", edit: 'text', minWidth: 100 },
								{ field: 'remark', title: '说明', minWidth: 355 },
								{ field: 'cfgdate', title: '操作时间', minWidth: 180 },
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

        //监听table编辑价格修改
        table.on('edit(syscfgID)', function(obj) {
            var value = obj.value; //得到修改后的值

            $.ajax({
                url: URLIP +"syscfgEdit",
                method: 'post',
                data: JSON.stringify({
                    cfgid: obj.data.cfgid,
                    cfgvalue: obj.value,
                    admin: ADMIN
                }),
                dataType: 'json',
                success: function(data) {
					if(data.status == 0){
						form.render(); //更新全部表单内容
						window.location.reload(); //刷新
					} else {
						layer.msg(data.msg, {time: 1500});
					}
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