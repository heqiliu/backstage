/**
 * 商品规格明细添加 
 */
function jsonpCallback(data,spmc) {
	layui.use(['form', 'layedit', 'upload', 'jquery'], function() {
		var form = layui.form,
			layer = layui.layer,
			upload = layui.upload,
			layedit = layui.layedit;
		
		$('input[name="spmc"]').val(spmc);
		$('#url').val(data.url);
		$('textarea[name="bz"]').val(data.bz);
		
		upload.render({
			elem: '#URL',
			url: '',
			auto: false, //选择文件后不自动上传
			acceptMime: 'image/*',
			choose: function(obj) {
				//将每次选择的文件追加到文件队列
				var files = obj.pushFile();
			
				//预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
				obj.preview(function(index, file, result) {
					var filename = 'mnsc' + new Date().getTime()
					var imgbase = result.split(',')[1]
					imgStr = imgbase
					setTimeout(function() {
						qnToken();
						url();
					}, 1000)
				})
			}
		})
		
		//监听提交
		form.on('submit(spImgEditSubmit)', function(res) {
			var url = $('#url').val();
			
			if (url == "" || url == null) {
			    layer.msg("请输入/上传图片URL");
			    return false;
			}
			
			$.ajax({
				url: URLIP +"spImgEdit",
				type: 'post',
				dataType: "json",
				data: JSON.stringify({
					imgid: data.imgid,
					url: url,
					bz: res.field.bz.replace(/\s*/g,""),
					userid: ADMIN
				}),
				success: function(res) {
					if(res.status == 0){
						layer.msg('修改成功', { icon: 1, time: 500}, function() {
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
}

var qiniutoken = '';
var imgStr = '';
var uploadUrl = 'http://upload.qiniup.com/putb64/-1';
var urlHeader = 'http://zddimages.abillchen.top/';

function qnToken() {
	$.ajax({
		url: 'https://lskx.abillchen.top/xmtHyb/qiniuToken',
		type: 'get',
		dataType: 'json',
		async: false,
		success: function(data) {
			qiniutoken = data.para.upToken
		},
		error: function(e) {
			layer.msg(JSON.stringify(e))
		}
	})
}

function url() {
	var xhr = new XMLHttpRequest()
	xhr.open('POST', uploadUrl, true)
	//文本类型
	xhr.setRequestHeader('Content-Type', 'application/octet-stream')
	//七牛认证信息 注意空格
	xhr.setRequestHeader('Authorization', 'UpToken ' + qiniutoken)
	xhr.send(imgStr)
	//监听状态
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var result = xhr.responseText
			result = JSON.parse(result)
			uploadimg = urlHeader + result.hash
			$('#url').val(uploadimg)
		}
	}
}

Keypress();
MoveBack();