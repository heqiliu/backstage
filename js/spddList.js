/**
 * 商品订单列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
		
		var tableid; //定义
		var spZfddOptions; //定义下拉框select 默认值	
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
						elem: '#spddInfo',
						url: URLIP +"spddListAdmin",
						method: "post",
						height: 'full-156',
						contentType: 'application/json',
						where: {
							sjr: '',
							sjrdh: '',
							admin: ADMIN
						},
						parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							var axdata = res.para.spdds;

							for (var i = 0; i < axdata.length; i++) {
								axdata[i].ddje = axdata[i].ddje / 100;
								axdata[i].yhqje = axdata[i].yhqje / 100;
								axdata[i].sjfkje = axdata[i].sjfkje / 100;
							}
							return {
								"code": res.status,
								"msg": res.msg,
								"count": res.para.pgInfo.total_num,
								"data": res.para.spdds
							}
						},
						request: {
							pageName: 'pg', // 页码的参数名称，默认：page
						},
						cols: [
							[ //表头
								{ field: 'userid', title: '用户账号', minWidth: 130 },
								{ field: 'ddid', title: '商品订单ID', minWidth: 110 },
								{ field: 'ddje', title: '订单金额(元)', minWidth: 115 },
								{ field: 'yhqje', title: '优惠券(元)', minWidth: 100 },
								{ field: 'sjfkje', title: '实际付款(元)', minWidth: 115 },
								{ field: 'sjr', title: '姓名', minWidth: 100 },
								{ field: 'sjrdh', title: '手机号码', minWidth: 140 },
								// { field: 'sheng', title: '省' },
								// { field: 'shi', title: '市' },
								// { field: 'qu', title: '区' },
								// { field: 'xxdz', title: '详细地址' },
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
								{ field: 'ztmc', title: '状态', width: 90, templet: '#spZfddSelect' },
								{ field: 'input_time', title: '创建时间', width: 175 },
								{ field: 'kdsj', title: '快递时间', width: 175 },
								{ templet: '#spddCz', title: '操作', width: 75, fixed: "right", align: "left" }
							]
						],
						page: {
							limit: Number(dataPage.para.cfgvalue),
							layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
						},
						done: function() {
							tableid = table.cache.spddInfo;
							// 渲染dictName列
							// 渲染之前组装select的option选项值 
							$("select[name='spZfddZt']").html(spZfddOptions);
							layui.each($("select[name='spZfddZt']"), function(index, item) {
								var elem = $(item);
								elem.val(elem.data('value'));
								//下拉框select 和 table表  数据关联默认选中
								$(item).children().each(function(i, ztmc) {
									if (tableid[index].ddztid == $(ztmc).val()) {
										$(ztmc).attr("selected", "selected"); //默认选中
									}
								});
							});
							form.render();
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
			
		//状态 下拉框select
		$.ajax({
		    url: URLIP +"selectItem",
		    type: 'post',
		    async: false,
		    dataType: "json",
		    data: JSON.stringify({
		        fl: "ddzt",
		        admin: ADMIN
		    }),
		    success: function(res) {
		        $.each(res.para, function(index, item) {
		            spZfddOptions += '<option value = "' + item.k + '">' + item.v + '</option>\n';
		        })
		    }
		});
		
		//状态 下拉框select 修改
		form.on('select(spZfddZt)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var ddid = tableid[index].ddid;
			
		    $.ajax({
		        url: URLIP +"spddZtUpd",
		        type: 'post',
		        dataType: "json",
		        data: JSON.stringify({
		            ddid: ddid,
		            ddztid: obj.value,
		            admin: ADMIN
		        }),
		        success: function(res) {
		            layer.msg('修改成功', { icon: 1, time: 1000 });
		        }
		    });
		});
		
		//监听表格 查看删除操作
		table.on('tool(spddID)', function(obj) {
		    if (obj.event === "spddFhRevise") {
		        layer.open({
		            type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
		            title: '填写快递单号',
		            shadeClose: true,
		            shade: 0.8,
		            maxmin: true, //开启最大化最小化按钮
		            area: ['400px', '246px'],
		            content: './spddFh.html',
		            success: function(layero, index) { //把父页面的值传给子页面
		                var iframeWindow = window[layero.find('iframe')[0]['name']];
		                iframeWindow.jsonpCallback(obj.data.ddid);
		            }
		        });
		    }
		});

        //监听查询
        form.on('submit(search)', function(obj) {
            var spddData = obj.field;

            table.reload('spddInfo', {
                where: {
                    sjr: spddData.sjr,
                    sjrdh: spddData.sjrdh
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