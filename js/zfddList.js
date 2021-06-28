/**
 * 支付订单列表
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
						elem: '#zfddInfo',
						url: URLIP +"zfddListAdmin",
						method: "post",
						height: 'full-118',
						contentType: 'application/json',
						where: {
							admin: ADMIN
						},
						parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							var axdata = res.para.zfdds;

							for (var i = 0; i < axdata.length; i++) {
								axdata[i].ddje = axdata[i].ddje / 100;
								axdata[i].yhqje = axdata[i].yhqje / 100;
								axdata[i].sjfkje = axdata[i].sjfkje / 100;
							}
							return {
								"code": res.status,
								"msg": res.msg,
								"count": res.para.pgInfo.total_num,
								"data": res.para.zfdds
							}
						},
						request: {
							pageName: 'pg', // 页码的参数名称，默认：page
						},
						cols: [
							[ //表头
								{ field: 'zfddid', title: '支付订单', minWidth: 215 },
								{ field: 'userid', title: '用户账号', minWidth: 130 },
								{ field: 'username', title: '用户名称', minWidth: 130 },
								{ field: 'scddid', title: '商品订单ID', minWidth: 110 },
								{ field: 'ddje', title: '订单金额(元)', minWidth: 115 },
								{ field: 'yhqje', title: '优惠券(元)', minWidth: 100 },
								{ field: 'sjfkje', title: '实际付款(元)', minWidth: 115 },
								{ field: 'zfztmc', title: '支付状态', minWidth: 100 , templet: '#zfztmcTpl'},
								{ field: 'ddtime', title: '创建时间', width: 175 },
								// { templet: '#ztdd', title: '操作', minWidth: 100, fixed: "right", align: "center" }
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
    }
});

function zfzt(data) {
    var zfztmc = data.zfztmc;
    if (zfztmc == '支付成功') {
        return "<spen style = 'color: #09f715;'>支付成功</spen>"
    } else {
        return "<spen style = 'color: red;'>未支付</spen>"
    }
}

Keypress();
MoveBack();