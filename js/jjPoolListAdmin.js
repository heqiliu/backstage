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
            url: URLIP +"jjPoolList",
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
						axdata[i].dqye = axdata[i].dqye/100;
					}
					table.render({
						data: axdata,
						elem: '#syscfgInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'poolmc', title: '资金池名称', minWidth: 130 },
								{ field: 'dqye', title: '当前余额', style: "color:red", edit: 'text', minWidth: 100 },
								{ field: 'bz', title: '说明', minWidth: 355 },
								{ field: 'edit_time', title: '最后变动时间', minWidth: 180 },
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


    }
});

Keypress();
MoveBack();