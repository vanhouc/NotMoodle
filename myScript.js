function validateLogin() {
	if (checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value)) {
		return true;
	}
	else {
		return false;
	}
}
function checkLogin(username, password) {
	// var req = new XMLHttpRequest();
	// req.open("POST", "")
	// $.ajax({
	// 	url: "Users.json",
	// 	type: 'get',
	// 	datatype: 'jsonp',
	// 	success: function(result) {
	// 		console.log("SUCCESS!!!"+"\n"+result);
	// 		return true;
	// 	},
	// 	error: function(result) {
	// 		console.log("Failure!");
	// 		return false;
	// 	}
	// 	});
	$.getJSON("Users.js", function(result) {
		console.log(result);
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
