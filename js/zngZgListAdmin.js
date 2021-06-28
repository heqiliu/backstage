/**
 * 用户列表
 */
layui.use(['form', 'table'], function() {
    if (ADMIN == undefined || ADMIN == null || ADMIN == '') {
        Href();
    } else {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;

        Panging();

        table.render({
            elem: '#userInfo',
            url: URLIP +"zngZgListAdmin",
            method: "post",
            contentType: 'application/json',
            where: {
                userid: '',
				admin: ADMIN
            },
            parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
			
			
                return {
                    "code": res.status,
                    "msg": res.msg,
                    "count": res.para.pgInfo.total_num,
                    "data": res.para.datas
                }
            },
            request: {
                pageName: 'pg', // 页码的参数名称，默认：page
            },
            cols: [
                [ //表头
                    { field: 'zng_zg_id', title: '流水号', minWidth: 80},
                    { field: 'mdmc', title: '门店', minWidth: 100 },
					{ field: 'zngmc', title: '智能柜', minWidth: 100 },
					{ field: 'userid', title: '用户ID', minWidth: 100 },
					{ field: 'username', title: '用户名', minWidth: 100 },
					{ field: 'buy_time', title: '认购时间', minWidth: 100 },
					{ field: 'fy_qsrq', title: '分润起始', minWidth: 100 },
					{ field: 'fy_zzrq', title: '分润终止', minWidth: 100 },
					{ field: 'ljfy', title: '累计', width: 100 }
                ]
            ],
            page: {
                limit: 20,
                layout: ['prev', 'page', 'next', 'skip', 'count'], //自定义分页布局
            }
        });

        //监听查询
        form.on('submit(search)', function(obj) {
            var userData = obj.field;

            table.reload('userInfo', {
                where: {
                    userid: userData.userid,
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

//图片放大
function show_img(t) {
    var t = $(t).find("img");
    //页面层
    layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        area: ['400px', '400px'], //宽高
        shadeClose: true, //开启遮罩关闭
        end: function(index, layero) {
            return false;
        },
        content: '<img src=' + $(t).attr('src') + ' width="400px" height="400px">'
    });
}

Keypress();
MoveBack();