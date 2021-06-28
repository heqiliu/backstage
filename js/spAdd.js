/**
 * 商品添加 
 */
layui.use(['form', 'layedit', 'upload', 'jquery'], function() {
    var form = layui.form,
        layer = layui.layer,
		upload = layui.upload,
        layedit = layui.layedit;

     //下拉框select 商品分类
	$.ajax({
		url: URLIP + "selectItem",
		type: 'post',
		dataType: "json",
		data: JSON.stringify({
			fl: "spfl",
			admin: ADMIN,
		}),
		success: function(res) {
			$("select[name='spflid']").empty();
			$.each(res.para, function(index, item) {
				$("select[name='spflid']").append(new Option("", ""));
				$("select[name='spflid']").append(new Option(item.v, item.k)); //往下拉菜单里添加元素
			})
			form.render(); //更新全部表单内容
		}
	});
	
	//下拉框select 商品分类
	$.ajax({
		url: URLIP + "selectItem",
		type: 'post',
		dataType: "json",
		data: JSON.stringify({
			fl: "spgg",
			admin: ADMIN
		}),
		success: function(res) {
			$("select[name='spgg1']").empty();
			$("select[name='spgg2']").empty();
			$("select[name='spgg3']").empty();
			$.each(res.para, function(index, item) {
				$("select[name='spgg1']").append(new Option("", ""));
				$("select[name='spgg2']").append(new Option("", ""));
				$("select[name='spgg3']").append(new Option("", ""));
				$("select[name='spgg1']").append(new Option(item.v, item.k)); //往下拉菜单里添加元素
				$("select[name='spgg2']").append(new Option(item.v, item.k)); //往下拉菜单里添加元素
				$("select[name='spgg3']").append(new Option(item.v, item.k)); //往下拉菜单里添加元素
			})
			form.render(); //更新全部表单内容
		}
	});
	
	upload.render({
		elem: '#iconURL',
		url: '',
		auto: false, //选择文件后不自动上传
		acceptMime: 'image/*',
		bindAction: '#testListAction', //指向一个按钮触发上传
		choose: function(obj){
			//将每次选择的文件追加到文件队列
			var files = obj.pushFile();
	
			//预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
			obj.preview(function(index, file, result){
				layui.$('#uploadDemoView').removeClass('layui-hide').find('img').attr('src', result);
				var filename = 'mnscNew' + (new Date()).getTime();
				var imgbase=result.split(',')[1];
				imgStr=imgbase;
				setTimeout(function() {
					qnToken();
					icon_urlAdd();
				}, 1000);
			});
		}
	});
	
    //监听提交
    form.on('submit(spAddSubmit)', function(res) {
		var iconURL = $('#icon_url').val();

        $.ajax({
            url: URLIP + "spAdd",
            type: 'post',
            dataType: "json",
            data: JSON.stringify({
                spmc: res.field.spmc,
                spflid: res.field.spflid,
				spgg1: res.field.spgg1,
				spgg2: res.field.spgg2,
				spgg3: res.field.spgg3,
                jylsj: res.field.jylsj * 100,
                kcsl: res.field.kcsl,
				spsm: res.field.spsm,
                bz: res.field.bz,
                icon_url: iconURL,
                userid: ADMIN
            }),
            success: function() {
                layer.msg('添加成功', {icon: 1, time: 1000}, function() {
                    parent.location.reload(); //刷新父级页面
                    var index = parent.layer.getFrameIndex(window.name); //获得frame索引
                    parent.layer.close(index); //关闭当前frame
                });
            }
        });
        return false; //防止刷新
    });
});

var uploadimg="";
var qiniutoken = '';
var imgStr = '';
var uploadUrl = "http://upload.qiniup.com/putb64/-1";
var urlHeader = "http://zddimages.abillchen.top/";

function qnToken() {
	$.ajax({
		url: 'https://lskx.abillchen.top/xmtHyb/qiniuToken',
		type: 'get',
		dataType: 'json',
		async: false,
		success: function(data) {
			qiniutoken = data.para.upToken;
			
		},
		error: function(e) {
			alert(JSON.stringify(e));
		}
	})
}
function icon_urlAdd() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", uploadUrl, true);
	//文本类型
	xhr.setRequestHeader("Content-Type", "application/octet-stream");
	//七牛认证信息 注意空格
	xhr.setRequestHeader("Authorization", "UpToken " + qiniutoken);
	xhr.send(imgStr);
	//监听状态
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var result = xhr.responseText;
			result = JSON.parse(result);
			uploadimg = urlHeader + result.hash;
			$('#icon_url').val(uploadimg);
		}
	}
}

Keypress();
MoveBack();