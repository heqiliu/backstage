/**
 * 优惠劵列表
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
						elem: '#youHQtAdminInfo',
						url: URLIP +"youHQListAdmin",
						method: "post",
						contentType: 'application/json',
						where: {
							userid: '',
							admin: ADMIN
						},
						parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							var axdata = res.para.yhqs;
							
							for (var i = 0; i < axdata.length; i++) {
								axdata[i].je = axdata[i].je / 100;
							}
							return {
								"code": res.status,
								"msg": res.msg,
								"count": res.para.pgInfo.total_num,
								"data": res.para.yhqs
							}
						},
						request: {
							pageName: 'pg', // 页码的参数名称，默认：page
						},
						cols: [
							[ //表头
								{ field: 'userid', title: '购劵人', minWidth: 130},
								{ field: 'receiver', title: '受劵人', minWidth: 130},
								{ field: 'yhqmc', title: '名称', minWidth: 120 },
								{ field: 'spflmc', title: '类别', minWidth: 130 },
								{ field: 'je', title: '金额(元)', minWidth: 100 },
								{ field: 'ddje_min', title: '金额下限', minWidth: 150 },
								{ field: 'yxq', title: '有效时间', width: 115 },
								{ field: 'ffsj', title: '发放时间', width: 175 },
								{ field: 'sysj', title: '使用时间', width: 175 },
								{ field: 'bz', title: '备注', width: 180 }
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
			
        //监听查询
        form.on('submit(search)', function(obj) {
            var userData = obj.field;

            table.reload('youHQtAdminInfo', {
                where: {
                    userid: userData.userid,
                    admin: ADMIN
                },
                page: {
                    curr: 1
                }
            });
            return false;
        });
    }
});

Keypress();
MoveBack();