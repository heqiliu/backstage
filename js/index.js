var admin = sessionStorage.getItem("userid");
var username = sessionStorage.getItem("username");

if (admin == undefined || admin == null || admin == '') {
        localStorage.clear(); //删除所有数据
        sessionStorage.clear(); //删除所有保存的数据
        window.parent.parent.location.href="../login.html";
} else {
	$("#userid").text(username);
	$('#exit').click(function() {
		var URL = "login.html";
		localStorage.clear(); //删除所有数据
		sessionStorage.clear(); //删除所有保存的数据
		window.location.replace(URL + window.location.search);
	});
}

document.onkeydown=function (e){
	var currKey=0,evt=e||window.event;
	currKey=evt.keyCode||evt.which||evt.charCode;
	if (currKey == 123) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
}

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function() {
	history.pushState(null, null, document.URL);
});