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
        var axdata = {};
		
		$("#DDID").text(decodeURI(GetQueryString("spmc")));

        $.ajax({
            url: URLIP +"spImgListAdmin",
            method: 'post',
            data: JSON.stringify({
				spid: GetQueryString("spid"),
                userid: ADMIN
            }),

            success: function(res) {
                data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para
					table.render({
						data: axdata,
						elem: '#spImgAdminInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'spid', title: '商品名称', minWidth: 180, templet: '#spidTpl'},
								{ field: 'lxmc', title: '图片名称', width: 100},
								{ field: 'url', title: '图片', width: 90, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.url + ' width="50px" height="30px">' + '</div>'; } },
								{ field: 'bz', title: '图片备注', minWidth: 160},
								{ field: 'edit_time', title: '更新时间', width: 180},
								{ templet: '#cz', title: '操作', width: 135, fixed: "right", align: "left" }
							]
						],
						limits: [20, 50],
						limit: 20,
						page: true,
					});
				} else {
					layer.msg(data.msg, {time: 1000});
				}
            },
            error: function() {
                window.location.href = "404.html";
            }
        });
		
		//监听表格 查看删除操作
		table.on('tool(spImgAdminID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			
			if(layEvent === "spImgEdit"){
				layer.open({
				    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
				    title: '编辑商品轮播图详情',
				    shadeClose: true,
				    shade: 0.8,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['700px', '360px'],
				    content: './spImgEdit.html',
					success: function(layero, index) { //把父页面的值传给子页面
						var iframeWindow = window[layero.find('iframe')[0]['name']];
						iframeWindow.jsonpCallback(obj.data,decodeURI(GetQueryString("spmc")));
					},
				    error: function() {
				        window.location.href = "404.html";
				    }
				});
			} else if (layEvent === "spImgDel") {
				$.ajax({
					url: URLIP +"spImgDel",
					method: 'post',
					data: JSON.stringify({
						imgid: obj.data.imgid,
						userid: ADMIN
					}),
					success: function(res) {
						data = JSON.parse(res);
						
						if(data.status == 0){
							//捉到所有被选中的，发异步进行删除
							layer.msg('删除成功', {icon: 1, time: 1000}, function() {
								obj.del();
								location.reload();
							});
						} else {
							layer.msg(data.msg, {time: 1500});
						}
					},
					error: function() {
						window.location.href = "404.html";
					}
				});
		    }
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