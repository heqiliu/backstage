/**
 * 商品分类列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
        var axdata = {};
		var tableid;

        $.ajax({
            url: URLIP +"spflListAdmin",
            method: 'post',
            data: JSON.stringify({
                groupid: GROUPID,
                userid: ADMIN,
            }),

            success: function(res) {
                data = JSON.parse(res);
                axdata = data.para
                table.render({
                    data: axdata,
                    elem: '#spflInfo',
                    url: "",
                    cols: [
                        [ //表头
                            { field: 'spflmc', title: '分类名称', width: 100},
							{ field: 'bz', title: '备注', width: 150, style: "color:black"},
                            { field: 'icon_url', title: '分类图片', width: 90, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.icon_url + ' width="50px" height="30px">' + '</div>'; } },
							{ field: 'px', title: '排序', width: 80, style: "color:red", edit: 'text'},
							
							{ templet: '#cz', title: '操作', Width: 200, fixed: "right", align: "left" }
                        ]
                    ],
                    limits: [20, 50, 100, 200],
                    limit: 20,
                    page: true,
					done: function() {
						tableid = table.cache.spflInfo;
					}
                });
            },
            error: function() {
                window.location.href = "404.html";
            }
        });
		
		form.on('checkbox(spflZtUpd)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var spflid = tableid[index].spflid;
		    var ztidSwhKg = this.checked ? 0 : 1;
		
		    $.ajax({
		        url: URLIP + "spflZtUpd",
		        method: 'post',
		        data: JSON.stringify({
		        	spflid: spflid,
		        	ztid: ztidSwhKg,
		        	userid: ADMIN
		        }),
		        success: function(res) {
				    data = JSON.parse(res);
				   
					if(data.status == 0){
						if(ztidSwhKg == 0){
							layer.msg('已上架', { icon: 1, time: 500 }, function() {
								location.reload();
							});
						} else if(ztidSwhKg == 1){
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
		
		//监听表格 switch 开关
		form.on('checkbox(spflSytjSet)', function(obj) {
		    var index = obj.othis.parents('tr').attr("data-index");
		    var spflid = tableid[index].spflid;
			var sytj = this.checked ? 1 : 0;
		
		    $.ajax({
		        url: URLIP +"spflSytjSet",
		        method: 'post',
		        data: JSON.stringify({
		            spflid: spflid,
		            sytj: sytj,
		            userid: ADMIN
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
		
		//监听table编辑价格修改
		table.on('edit(spflID)', function(obj) {
		    $.ajax({
		        url: URLIP +"spflPxSet",
		        method: 'post',
		        data: JSON.stringify({
		            spflid: obj.data.spflid,
		            px: obj.value,
		            userid: ADMIN
		        }),
		        dataType: 'json',
		        success: function() {
		            form.render(); //更新全部表单内容
		        	document.getElementById("confirmormButton").style.display="";
		        }
		    });
		});
		
		//表单元素确认顺序按钮
		$("#confirmormButton").on("click",function (){
			layer.msg("确认成功", {icon: 6, time: 1000}, function(){
				location.reload();
				document.getElementById("confirmormButton").style.display="none";
			});
		});
		
		table.on('tool(spflID)', function(obj) {
		    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
		    if (layEvent === "spflEdit") {
		        layer.open({
		            type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
		            title: '编辑商品分类',
		            shadeClose: true,
		            shade: 0.8,
		            maxmin: true, //开启最大化最小化按钮
		            area: ['600px', '250px'],
		            content: './spflEdit.html',
		            success: function(layero, index) { //把父页面的值传给子页面
		                var iframeWindow = window[layero.find('iframe')[0]['name']];
		                iframeWindow.jsonpCallback(obj.data);
		            }
		        });
		    }
		});
		
		$("#spfAdd").on("click", function () {
			layer.open({
			    type: 2, //layer提供了5种层类型。可传入的值有：0:（信息框，默认）,1:（页面层）,2:（iframe层）,3:（加载层）,4:（tips层）
			    title: '添加分类',
			    shadeClose: true,
			    shade: 0.8,
			    maxmin: true, //开启最大化最小化按钮
			    area: ['600px', '250px'],
			    content: './spflAdd.html',
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
        area: ['800px', '600px'], //宽高
        shadeClose: true, //开启遮罩关闭

        end: function(index, layero) {
            return false;
        },
        content: '<img src=' + $(t).attr('src') + ' width="800px" height="600px">'
    });
}

Keypress();
MoveBack();