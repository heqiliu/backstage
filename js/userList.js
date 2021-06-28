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
                    { field: 'pic_url', title: '头像', width: 80, templet: function(d) { return '<div onclick="show_img(this)">' + '<img src=' + d.pic_url + ' width="50px" height="30px">' + '</div>'; } },
                    { field: 'username', title: '昵称', minWidth: 120 },
					{ field: 'superid', title: '推荐会员', minWidth: 130 },
                    { field: 'user_flmc', title: '用户级别', minWidth: 100 },
					{ field: 'bz', title: '备注', minWidth: 150 },
					{ field: 'reg_time', title: '创建时间', width: 180 },
					{ field: 'lg_time', title: '登录时间', width: 180 }
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