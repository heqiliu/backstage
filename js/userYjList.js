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
            url: URLIP +"userListAdmin",
            method: "post",
            contentType: 'application/json',
            where: {
                userid: '',
				username: '',
				admin: ADMIN
            },
            parseData: function(res) { //将原始数据解析成 table 组件所规定的数据
			var axdata = res.para.users;
			
			for (var i = 0; i < axdata.length; i++) {
			    axdata[i].xsyj = axdata[i].xsyj / 100;
				axdata[i].xsyj_td = axdata[i].xsyj_td / 100;
			}
                return {
                    "code": res.status,
                    "msg": res.msg,
                    "count": res.para.pgInfo.total_num,
                    "data": res.para.users
                }
            },
            request: {
                pageName: 'pg', // 页码的参数名称，默认：page
            },
            cols: [
                [ //表头
                    { field: 'userid', title: '用户账号', minWidth: 130},
                    { field: 'username', title: '昵称', minWidth: 120 },
					{ field: 'superid', title: '推荐会员', minWidth: 130 },
                    { field: 'user_flmc', title: '用户级别', minWidth: 100 },
					{ field: 'num', title: '直推人数', minWidth: 120 },
					{ field: 'num_td', title: '团队人数', minWidth: 120 },
					{ field: 'xsyj', title: '直推业绩', width: 120 },
					{ field: 'xsyj_td', title: '团队业绩', width: 120 }
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