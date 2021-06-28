/**
 * 系统日志
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
        var axdata = {};

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
						elem: '#syslogInfo',
						url: URLIP +"syslogList",
					    method: "post",
					    contentType: 'application/json',
					    where: {
					        userid: '',
							keywords: '',
							admin: ADMIN
					    },
					    parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
							if(res.status == 0){
								var axdata = res.para.rdjls;
								
								for (var i = 0; i < axdata.length; i++) {
									axdata[i].log_time = axdata[i].log_time.replace(/.[0-9]*$/,'');
								}
								return {
									"code": res.status,
									"msg": res.msg,
									"count": res.para.pgInfo.total_num,
									"data": res.para.rdjls
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
					            { field: 'userid', title: '关联ID', width: 130 },
					            { field: 'keywords', title: '关键字', minWidth: 150 },
								{ field: 'remark', title: '内容', minWidth: 400 },
								{ field: 'log_time', title: '操作时间', width: 180 },
								{ field: 'admin', title: '操作者', width: 130 },
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
		form.on('submit(syslogSearch)', function(obj) {
		    var syslogData = obj.field;
		
		    table.reload('syslogInfo', {
		        where: {
					userid: syslogData.userid,
					keywords: syslogData.keywords,
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