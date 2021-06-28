/**
 * 轮播图列表
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
            url: URLIP +"topAdListAdmin",
            method: 'post',
            data: JSON.stringify({
                admin: ADMIN
            }),
            success: function(res) {
				data = JSON.parse(res);
				
				if(data.status == 0){
					axdata = data.para;
					table.render({
						data: axdata,
						elem: '#topAdInfo',
						url: "",
						cols: [
							[ //表头
								{ field: 'pic_url', title: '轮播图URL', minWidth: 100, templet: function (d) {
									return '<div onclick="show_img(this)" ><img src="' + d.pic_url + '"width="50%" height="50%"></a></div>'; }
								},
								{ field: 'text', title: '名称', minWidth: 150 },
								{ field: 'herf', title: '网址', minWidth: 200 },
								// { field: 'px', title: '排序', width: 80, style: "color:red", edit: 'text'},
								{ field: 'ztid', title: '上下架开关', width: 100, templet: '#topAdZtUpdTpl', unresize: true, align: "center"},
								{ templet: '#topCz', title: '操作', width: 150, fixed: "right", align: "center" }
							]
						],
						limits: [50, 100, 150,200],
						limit: 50,
						page: true,
						done: function() {
							tableid = table.cache.topAdInfo;
						}
					});
				} else {
					layer.msg(data.msg, {time: 1000});
				}
            },
            error: function() {
                window.location.href = "404.html";
            }
        });
		
		//监听提现开关操作
		form.on('switch(ztidSwh)', function(obj){
			//根据索引table.cache里面的行数据
			var index = obj.othis.parents('tr').attr("data-index");
			var apid = tableid[index].apid;
			var ztidSwhKg = this.checked ? 0 : 1;
			
			$.ajax({
				url: URLIP + "topAdZtUpd",
				method: 'post',
				data: JSON.stringify({
					apid: apid,
					ztid: ztidSwhKg,
					admin: ADMIN
				}),
				success: function(res) {
					data = JSON.parse(res);
		
					 if(data.status == 0){
						if(ztidSwhKg == 0){
							layer.msg('已上架', {icon: 1, time: 500 });
						} else if(ztidSwhKg == 1){
							layer.msg('已下架', {icon: 1, time: 500 });
						}
					 } else {
					 	layer.msg(data.msg, { time: 1500 });
					}
				}
			});
		});
		
		//监听表格 编辑删除操作，
		table.on('tool(topAdID)', function(obj) {
			switch (obj.event) {//获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
				case 'topAdDelRevise':
					$.ajax({
						url: URLIP +"topAdDel",
						method: 'post',
						data: JSON.stringify({
							apid: obj.data.apid,
							admin: ADMIN
						}),
						success: function(res) {
							data = JSON.parse(res);
							//捉到所有被选中的，发异步进行删除
							if(data.status == 0){
								layer.msg('删除成功', {time: 500} ,function() {
									obj.del(); 
								});
							} else {
								layer.msg(data.msg);
							}
						},
						error: function() {
							window.location.href = "404.html";
						}
					});
				break;	
			};
		});
		//监听表格,编缉每行轮播图
		table.on('edit(topAdID)',function(obj){
			switch (obj.event) {
				case 'topAdEdit':
					$.ajax({
						url: URLIP +"topAdEdut",
						method: 'post',
						data: JSON.stringify({
							apid: obj.data.apid,
							pic_url:obj.data.pic_url,
							text:obj.data.text,
							href:obj.data.href,
							admin: ADMIN
						}),
						success: function(res) {
							data = JSON.parse(res);
							//捉到所有被选中的，发异步进行删除
							if(data.status == 0){
								layer.msg('编缉成功', {time: 500} ,function() {
									obj.del(); 
								});
							} else {
								layer.msg(data.msg);
							}
						},
						error: function() {
							window.location.href = "404.html";
						}
					});
				break;
			}
		})
		$("#addTopAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加轮播图',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['40%', '66%'],
			    content: './topAdAdd.html',
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