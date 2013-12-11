function validateLogin() {
	if (checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value)) {
		return true;
	}
	else {
		return false;
	}
}
function checkLogin(username, password) {
	$.getJSON("Users.js", function(result) {
		for (x in result) {
			if (x === username && result[x].password === password) {
				return true;
			}
		}
		console.log("So close yet so far " + result + result[x]);
		return false;
	});
}
$(document).ready(function() {
	$('#login').mouseenter(function() {
		$(this).css('font-weight', 'bold');
	});
	$('#login').mouseleave(function() {
		$(this).css('font-weight', 'normal');
	});
	$('#loginForm').hide();
	$('#login').click(function() {
		$(this).hide();
		$('#loginForm').show();
	});

});
