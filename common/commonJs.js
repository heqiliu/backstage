/**
 * 定义公共js
 */
document.write('<script type="text/javascript" src="../assets/js/jquery.min.js" charset="utf-8"></script>');
document.write('<script type="text/javascript" src="../assets/lib/layui/layui.js" charset="utf-8"></script>');
document.write('<script type="text/javascript" src="../assets/js/xadmin.js" charset="utf-8"></script>');

/**
 * 定义公共变量
 */
// 测试
var URLIP = 'http://112.74.173.8:8082/zsh/';
// 生产 
//var URLIP = 'http://120.24.169.236:8081/zsh/';
var ADMIN = sessionStorage.getItem("userid");
var ADMINNAME = sessionStorage.getItem("username");
var GROUPID = sessionStorage.getItem("groupid");

/**
 * 
 */
function Href(){
	localStorage.clear(); //删除所有数据
	sessionStorage.clear(); //删除所有保存的数据
	window.parent.parent.location.href="../login.html";
}

/**
 * 分页页码，从0开始
 */
function Panging(){
	$.ajaxSetup({
	    beforeSend: function(xhr) {
	        var params = arguments[1].data;
	        var js = JSON.parse(params);
	
	        if (js.hasOwnProperty('pg')) {
	            js.pg = js.pg - 1; //修改分页参数
	            arguments[1].data = JSON.stringify(js);
	        }
	    }
	});
}

/**
 * 重置刷新
 */
function Refresh(){
	window.location.reload(); //刷新
}

/**
 * 获取路径后面带过来的参数
 */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null){
		//return unescape(r[2]);//会中文乱码
		return decodeURI((r[2]));//解决了中文乱码
	}
	return null;
}

/**
 * 时间格式化
 */
function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
        var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
        var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
        return Y+M+D+h+m+s;
    }

/**
 * 禁止键盘按键F12,鼠标可以右击
 */
function Keypress(){
	document.onkeydown=function (e){
		var currKey=0,evt=e||window.event;
		currKey=evt.keyCode||evt.which||evt.charCode;
		if (currKey == 123) {
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
	}
}

/**
 * 禁止单击前进后退方向键
 */
function MoveBack(){
	history.pushState(null, null, document.URL);
	window.addEventListener('popstate', function() {
	    history.pushState(null, null, document.URL);
	});
}