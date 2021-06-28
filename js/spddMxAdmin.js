/**
 * 订单明细列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
			
		var ztmcOptions; //定义下拉框select 默认值
		Panging();

		$.ajax({
			 url: URLIP +"syscfgGet",
			method: 'post',
			data: JSON.stringify({
				cfgkey: "PgPerNum",
				admin: ADMIN
			}),
			success: function(resPage) {
				dataPage = JSON.parse(resPage);
				
				if(dataPage.status == 0){
					table.render({
						elem: '#ddmxAdminInfo',
						url: URLIP +"spddMxAdmin",
						method: "post",
						height: 'full-120',
						totalRow: true,
						contentType: 'application/json',
						where: {
							ddid: '',
							admin: ADMIN
						},
						parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							var axdata = res.prar.spddmxs;
							
							for (var i = 0; i < axdata.length; i++) {
								axdata[i].price = axdata[i].price / 100;
								axdata[i].je = axdata[i].je / 100;
							}
							if(res.status == 0){
								return {
									"code": res.status,
									"msg": res.msg,
									"count": res.prar.pgInfo.total_num,
									"data": res.prar.spddmxs
								}
							} else {
								layer.msg(res.msg, {time: 1000});
							}
						},
						request: {
							pageName: 'pg', // 页码的参数名称，默认：page
						},
						cols: [
							[ //表头
							   // { field: 'userid', title: '用户ID', minWidth: 130, totalRowText: '合计：'},
							   { field: 'spmc', title: '商品名称', minWidth: 180, fixed: 'left'},
							   { field: 'ddid', title: '订单ID', minWidth: 100},
							   { field: 'price', title: '商品金额(元)', minWidth: 115, style: "color:red", totalRow: true},
							   { field: 'num', title: '数量', minWidth: 90, style: "color:red", totalRow: true },
							   { field: 'je', title: '订单金额(元)', minWidth: 115, style: "color:red", totalRow: true},
							   { field: 'ggmx1mc', title: '规格名称明细一', minWidth: 130, templet: '#ggmx1mcTpl'},
							   { field: 'ggmx2mc', title: '规格名称明细二', minWidth: 130, templet: '#ggmx2mcTpl'},
							   { field: 'ggmx3mc', title: '规格名称明细三', minWidth: 130, templet: '#ggmx3mcTpl'},
							   { field: 'sjr', title: '姓名', minWidth: 90 },
							   { field: 'sjrdh', title: '手机号码', minWidth: 125 },
							   { field: 'xxdz', title: '收货地址', minWidth: 300 },
							   { field: 'ztmc', title: '状态', minWidth: 125, templet: '#ztmcTpl'},
							   { field: 'input_time', title: '创建时间', minWidth: 180 },
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

Keypress();
MoveBack();