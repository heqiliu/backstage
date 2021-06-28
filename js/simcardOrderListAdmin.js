/**
 * 电话卡订单列表
 */
layui.use(['form', 'table'], function() {
   if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
       Href();
   } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
		
		var tableid; //定义	
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
						elem: '#simcardOrderAdminInfo',
						url: URLIP +"simcardListAdmin",
						method: "post",
						height: 'full-160',
						contentType: 'application/json',
						where: {
							sztid: -1,
							mobile: '',
							admin: ADMIN
						},
						parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							var axdata = res.para.simcards;
							
							for (var i = 0; i < axdata.length; i++) {
								axdata[i].kf = axdata[i].kf / 100;
								axdata[i].sjfk = axdata[i].sjfk / 100;
							}
							if(res.status == 0){
								return {
									"code": res.status,
									"msg": res.msg,
									"count": res.para.pgInfo.total_num,
									"data": res.para.simcards
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
								{ field: 'mobile', title: '卡号码', minWidth: 130, fixed: 'left'},
								{ field: 'yysmc', title: '运营商', minWidth: 90, fixed: 'left'},
								{ field: 'userid', title: '用户账号', minWidth: 130},
								{ field: 'kf', title: '价格(元)', minWidth: 90},
								{ field: 'sjfk', title: '实际付款(元)', minWidth: 110},
								{ field: 'spgg1mc', title: '规格名称1', minWidth: 130},
								{ field: 'spgg2mc', title: '规格名称2', minWidth: 130},
								{ field: 'spgg3mc', title: '规格名称3', minWidth: 130},
								{ field: 'sjr', title: '姓名', minWidth: 90 },
								{ field: 'sjrdh', title: '手机号码', minWidth: 125 },
								{
									field: 'newadd',
									title: '收货地址',
									minWidth: 270,
									templet(t) {
										var newadd;
										newadd = t.sheng + t.shi + t.qu + t.xxdz;
										return newadd;
									}
								},
								{ field: 'kddh', title: '快递公司/单号', minWidth: 200 },
								{ field: 'sztmc', title: '状态', minWidth: 100},
								{ field: 'input_time', title: '创建时间', minWidth: 180 },
								{ field: 'kdsj', title: '快递时间', width: 175 },
								{templet: '#cz', title: '操作', width: 75, fixed: "right", align: "center" },
							]
						],
						page: {
							limit: Number(dataPage.para.cfgvalue),
							layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
						},
						done: function(res){
							$.each(res.data, function(index, item) {
								if(item.sztid == 0 || item.sztid == 2 || item.sztid == 8){//此处test为你的条件值
									$("[data-index=" + index +"]").css('display','none'); //关键代码
								}
							})
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
		form.on('submit(simcardOrderAdminSearch)', function(obj) {
		    var userData = obj.field;
			
		    table.reload('simcardOrderAdminInfo', {
		        where: {
		            mobile: userData.mobile,
					sztid: userData.sztid
		        },
		        page: {
		            curr: 1
		        }
		    });
		    return false;
		});
		
		//监听表格 查看删除操作
		table.on('tool(simcardOrderAdminID)', function(obj) {
		    if (obj.event === "simcardFHRevise") {
		        layer.open({
		            type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
		            title: '填写快递单号',
		            shadeClose: true,
		            shade: 0.8,
		            maxmin: true, //开启最大化最小化按钮
		            area: ['400px', '246px'],
		            content: './simcardFH.html',
		            success: function(layero, index) { //把父页面的值传给子页面
		                var iframeWindow = window[layero.find('iframe')[0]['name']];
		                iframeWindow.jsonpCallback(obj.data.mobile);
		            }
		        });
		    }
		});
    }
});

Keypress();
MoveBack();