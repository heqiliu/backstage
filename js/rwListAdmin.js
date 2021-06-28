/**
 * 商品图片列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
		
		var tableid;

		Panging();
		
		table.render({
			elem: '#rwAdminInfo',
			url: URLIP +"rwListAdmin",
			method: "post",
			contentType: 'application/json',
			where: {
				rwmc: '',
				admin: ADMIN
			},
			parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
				var axdata = res.para.rws;
				
				for (var i = 0; i < axdata.length; i++) {
					axdata[i].price = axdata[i].price / 100;
				}
				return {
					"code": res.status,
					"msg": res.msg,
					"count": res.para.pgInfo.total_num,
					"data": res.para.rws
				}
			},
			request: {
				pageName: 'pg', // 页码的参数名称，默认：page
			},
			cols: [
				[ //表头
					{ field: 'rwmc', title: '任务名称', minWidth: 180},
					{ field: 'rwsm', title: '任务说明', minWidth: 150 },
					{ field: 'price', title: '单价(元)', width: 100 },
					{ field: 'xjjf', title: '积分', width: 100 },
					{ field: 'gwjf', title: '购物积分', width: 100 },
					{ field: 'icon_url', title: '小图片', width: 80, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.icon_url + ' width="50px" height="30px">' + '</div>'; }},
					{ field: 'tjsm', title: '提交说明', minWidth: 180 },
					{ field: 'img1', title: '图片一', width: 100, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.img1 + ' width="50px" height="30px">' + '</div>'; }},
					{ field: 'img2', title: '图片二', width: 100, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.img2 + ' width="50px" height="30px">' + '</div>'; }},
					{ field: 'img3', title: '图片三', width: 100, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.img3 + ' width="50px" height="30px">' + '</div>'; }},
					{ field: 'rwztmc', title: '状态', width: 100 },
					{ field: 'userid', title: '录入人', width: 130},
					{ templet: '#cz', title: '操作', width: 350, fixed: "right", align: "center" }
				]
			],
			page: {
				limit: 20,
				layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
			},
			done: function() {
				tableid = table.cache.rwAdminInfo;
			}
		});
		
		form.on('checkbox(rwSwhtjUpd)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var rwid = tableid[index].rwid;
		    var swhtjSwhKg = this.checked ? 1 : 0;
		
		    $.ajax({
		        url: URLIP + "rwSwhtjUpd",
		        method: 'post',
		        data: JSON.stringify({
		        	rwid: rwid,
		        	swh_tj: swhtjSwhKg,
		        	admin: ADMIN
		        }),
		        success: function(res) {
				    data = JSON.parse(res);
				   
					if(data.status == 0){
						if(swhtjSwhKg == 1){
							layer.msg('打开推荐', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						} else if(swhtjSwhKg == 0){
							layer.msg('关闭推荐', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						}
					} else {
						layer.msg(data.msg, { time: 1500 });
				   }
		        }
		    });
		});
		
		form.on('checkbox(rwSwhkcfUpd)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var rwid = tableid[index].rwid;
		    var swhkcfSwhKg = this.checked ? 1 : 0;
		
		    $.ajax({
		        url: URLIP + "rwSwhkcfUpd",
		        method: 'post',
		        data: JSON.stringify({
		        	rwid: rwid,
		        	swh_kcf: swhkcfSwhKg,
		        	admin: ADMIN
		        }),
		        success: function(res) {
				    data = JSON.parse(res);
				   
					if(data.status == 0){
						if(swhkcfSwhKg == 1){
							layer.msg('打开重复', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						} else if(swhkcfSwhKg == 0){
							layer.msg('关闭重复', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						}
					} else {
						layer.msg(data.msg, { time: 1500 });
				   }
		        }
		    });
		});
			
		form.on('checkbox(rwztUpd)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var rwid = tableid[index].rwid;
		    var rwztidSwhKg = this.checked ? 4 : 6;
		
		    $.ajax({
		        url: URLIP + "rwztUpd",
		        method: 'post',
		        data: JSON.stringify({
		        	rwid: rwid,
		        	rwztid: rwztidSwhKg,
		        	admin: ADMIN
		        }),
		        success: function(res) {
				    data = JSON.parse(res);
				   
					if(data.status == 0){
						if(rwztidSwhKg == 4){
							layer.msg('已上架', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						} else if(rwztidSwhKg == 6){
							layer.msg('已下架', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						}
					} else {
						layer.msg(data.msg, { time: 1500 });
				   }
		        }
		    });
		});
		
		//监听表格 查看删除操作
		table.on('tool(rwAdminID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			
			if(layEvent === "rwXjjfGwjfEdit"){
				layer.open({
				    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
				    title: '设置积分和购物积分',
				    shadeClose: true,
				    shade: 0.8,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['460px', '266px'],
				    content: './rwjfEdit.html',
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
		
		$("#rwAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加手工任务',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['45%', '76%'],
			    content: './rwAdd.html',
			    error: function() {
			        window.location.href = "404.html";
			    }
			});
		});
    }
});

function show_img(t) {
    var t = $(t).find("img");
    //页面层
    layer.open({
        type: 1,
        //skin: 'layui-layer-rim', //加上边框
        area: ['60%', '85%'], //宽高
        shadeClose: true, //开启遮罩关闭
        end: function (index, layero) {
            return false;
        },
        content: '<div style="text-align:center"><img style="width: 100%;height: 40%" src="' + $(t).attr('src') + '" /></div>'
    });
}

Keypress();
MoveBack();