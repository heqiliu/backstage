/**
 * 商品列表
 * 商品首页推荐开关
 * 商品删除
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;

        var tableid; //定义
        var spztmcOptions; //定义下拉框select 默认值
		Panging();

        table.render({
            elem: '#spInfo',
            url: URLIP +"spListAdmin",
            method: "post",
			height: 'full-160',
            contentType: 'application/json',
            where: {
                spmc: "",
                userid: ADMIN
            },
            parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
                var axdata = res.para.sps;

                for (var i = 0; i < axdata.length; i++) {
                    axdata[i].jylsj = axdata[i].jylsj / 100;
                }
                return {
                    "code": res.status,
                    "msg": res.msg,
                    "count": res.para.pgInfo.total_num,
                    "data": res.para.sps
                }
            },
            request: {
                pageName: 'pg', // 页码的参数名称，默认：page
            },
            cols: [
                [ //表头
                    { field: 'spmc', title: '商品名称', minWidth: 150, fixed: 'left'},
                    { field: 'spflmc', title: '类别名称', minWidth: 100 },
                    { field: 'icon_url', title: '图片', unresize: true, width: 80, align: "center", templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.icon_url + ' width="50px" height="30px">' + '</div>'; } },
					{ field: 'spgg1', title: '商品规格1', width: 100, templet: '#spgg1mcTpl'},
					{ field: 'spgg2', title: '商品规格2', width: 100, templet: '#spgg2mcTpl'},
					{ field: 'spgg3', title: '商品规格3', width: 100, templet: '#spgg3mcTpl'},
                    { field: 'jylsj', title: '零售价(元)', minWidth: 100, style: "color:red", edit: 'text'},
                    { field: 'kcsl', title: '库存(个)',  minWidth: 100 },
                    { field: 'yssl', title: '已售(个)', minWidth: 100 },
                    { field: 'spztmc', title: '状态', width: 100, unresize: true, templet: '#spztmcSelect' }, //是否禁用拖拽列宽（默认：false）
					{ field: 'spsm', title: '商品说明', minWidth: 150 },
                    { field: 'bz', title: '备注', minWidth: 150 },
                    { field: 'input_time', title: '创建时间', width: 180 },
                    { templet: '#cz', title: '操作', width: 325, fixed: "right", align: "left" }
                ]
            ],
            page: {
                limit: 20,
                layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
            },
            done: function() {
                tableid = table.cache.spInfo;
                // 渲染dictName列
                // 渲染之前组装select的option选项值 
                $("select[name='spztmc']").html(spztmcOptions);
                layui.each($("select[name='spztmc']"), function(index, item) {
                    var elem = $(item);
                    elem.val(elem.data('value'));
                    //下拉框select 和 table表  数据关联默认选中
                    $(item).children().each(function(i, spztmc) {
                        if (tableid[index].spztid == $(spztmc).val()) {
                            $(spztmc).attr("selected", "selected"); //默认选中
                        }
                    });
                });
                form.render();
            }
        });

        //监听查询
        form.on('submit(spSearch)', function(obj) {
            var spmcData = obj.field;

            table.reload('spInfo', {
                where: {
                    spmc: spmcData.spmc,
                    userid: ADMIN
                },
                page: {
                    curr: 1
                }
            });
            return false;
        });

        //监听table编辑价格修改
        table.on('edit(spID)', function(obj) {
            $.ajax({
                url: URLIP +"spPriceUpd",
                method: 'post',
                data: JSON.stringify({
                    spid: obj.data.spid,
                    jylsj: obj.value * 100,
                    admin: ADMIN
                }),
                dataType: 'json',
                success: function() {
					location.reload();
                }
            });
        });

        //监听表格 switch 开关
        form.on('checkbox(spSwhSytj)', function(obj) {
            var index = obj.othis.parents('tr').attr("data-index");
            var spid = tableid[index].spid;
            var sytj = this.checked ? 1 : 0;

            $.ajax({
                url: URLIP +"spSwhSytj",
                method: 'post',
                data: JSON.stringify({
                    spid: spid,
                    sytj: sytj,
                    admin: ADMIN
                }),
                success: function(res) {
                    data = JSON.parse(res);
                   
                	if(data.status == 0){
                		if(sytj == 1){
                			layer.msg('已推荐', { icon: 1, time: 500 }, function() {
                				location.reload();
                			});
                		} else if(sytj == 0){
                			layer.msg('已关闭推荐', { icon: 1, time: 500 }, function() {
                				location.reload();
                			});
                		}
                	} else {
                		layer.msg(data.msg, { time: 1500 });
                   }
                }
            });
        });

        //状态 下拉框select
        $.ajax({
            url: URLIP +"selectItem",
            type: 'post',
            async: false,
            dataType: "json",
            data: JSON.stringify({
                fl: "spzt",
                admin: ADMIN
            }),
            success: function(res) {
                $.each(res.para, function(index, item) {
                    spztmcOptions += '<option value = "' + item.k + '">' + item.v + '</option>\n';
                })
            }
        });

        //状态 下拉框select 修改
        form.on('select(spztmc)', function(obj) {
            var index = obj.othis.parents('tr').attr("data-index");
            var spid = tableid[index].spid;
            $.ajax({
               url: URLIP +"spztUpd",
                type: 'post',
                dataType: "json",
                data: JSON.stringify({
                    spid: spid,
                    spztid: obj.value,
                    admin: ADMIN
                }),
                success: function(res) {
                    layer.msg('修改成功', { icon: 1, time: 1000 }, function() {
						location.reload();
					});
                }
            });
        });

        //监听表格 查看删除操作
        table.on('tool(spID)', function(obj) {
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            
			if (layEvent === "spDelete") {
				$.ajax({
					url: URLIP +"spDel",
					method: 'post',
					data: JSON.stringify({
						spid: obj.data.spid,
						admin: ADMIN
					}),
					success: function(res) {
						data = JSON.parse(res);
						if (data.status == "0") {
							//捉到所有被选中的，发异步进行删除
							layer.msg('已删除!', { icon: 1, time: 1000 }, function() {
								window.location.reload(); //刷新
							});
						} else {
							layer.msg(data.msg, { time: 1500 });
						}
					}
				});
            }
        });
		
		$("#spAdd").on("click", function () {
			layer.open({
				type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
				title: '添加商品',
				shadeClose: true,
				shade: 0.8,
				maxmin: true, //开启最大化最小化按钮
				area: ['600px', '646px'],
				content: './spAdd.html',
				error: function() {
					window.location.href = "404.html";
				}
			});
		});
    }
});

//图片放大
function show_img(t) {
    var t = $(t).find("img");
    //页面层
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['600px', '600px'], //宽高
        shadeClose: true, //开启遮罩关闭

        end: function(index, layero) {
            return false;
        },
        content: '<img src=' + $(t).attr('src') + ' width="600px" height="600px">'
    });
}

Keypress();
MoveBack();