/**
 * 添加手工任务
 */
layui.use(['form', 'layedit', 'upload', 'jquery'], function() {
    var form = layui.form,
        layer = layui.layer,
		upload = layui.upload,
        layedit = layui.layedit;
		
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
	
	upload.render({
		elem: '#img1URL',
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
					img1Add();
				}, 1000);
			});
		}
	});
	
	upload.render({
		elem: '#img2URL',
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
					img2Add();
				}, 1000);
			});
		}
	});
	
	upload.render({
		elem: '#img3URL',
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
					img3Add();
				}, 1000);
			});
		}
	});
	
		
    //监听提交
    form.on('submit(rwAddSubmit)', function(res) {
		var iconURL = $('#icon_url').val();
		var img1URL = $('#img1').val();
		var img2URL = $('#img2').val();
		var img3URL = $('#img3').val();
		
		if (iconURL == "") {
			layer.msg("请上传小图片");
			return false;
		 }
		 
		 if (img1URL == "") {
		 	layer.msg("请上传图片一");
		 	return false;
		  }
		 
        $.ajax({
            url: URLIP +"rwAdd",
            type: 'post',
            dataType: "json",
            data: JSON.stringify({
                rwmc: res.field.rwmc,
                price: res.field.price * 100,
                icon_url: iconURL,
                img1: img1URL,
                img2: img2URL,
                img3: img3URL,
                rwsm: res.field.rwsm.replace(/\s*/g,""),
                tjsm: res.field.tjsm.replace(/\s*/g,""),
                admin: ADMIN
            }),
            success: function(res) {
				if(res.status == 0){
					layer.msg('添加成功', { icon: 1, time: 500}, function() {
						parent.location.reload(); //刷新父级页面
						var index = parent.layer.getFrameIndex(window.name); //获得frame索引
						parent.layer.close(index); //关闭当前frame
					});
				} else {
					layer.msg(res.msg, { time: 1500});
				}
            },
            error: function() {
                window.location.href = "404.html";
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

function img1Add() {
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
			$('#img1').val(uploadimg);
		}
	}
}

function img2Add() {
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
			$('#img2').val(uploadimg);
		}
	}
}

function img3Add() {
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
			$('#img3').val(uploadimg);
		}
	}
}

Keypress();
MoveBack();