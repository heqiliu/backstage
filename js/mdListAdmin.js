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
            url: URLIP +"mdListAdmin",
            method: "post",
            contentType: 'application/json',
            where: {
                mdmc: '',
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
                    { field: 'mdmc', title: '门店名称', minWidth: 200},
                    { field: 'mdztmc', title: '门店状态', minWidth: 100 },
					{ field: 'icon_url', title: 'ICON', minWidth: 100 },
                    { field: 'lon', title: '经度', minWidth: 100 },
					{ field: 'lat', title: '纬度', minWidth: 100 },
					{ field: 'input_time', title: '入驻时间', minWidth: 100 },
					{ field: 'mdsm', title: '门店说明', width: 320 }
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