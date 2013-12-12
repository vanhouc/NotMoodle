function stateManager(userProfile) {
	var CurrentUser;
}
loginManager.prototype.checkLogin = function (username, password) {
	'use strict';
	$.getJSON("Users.js", function(result) {
		var x;
		for (x in result) {
			if (x === username && result[x].password === password && result.hasOwnProperty(x)) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				CurrentUser = result[x];
			}
		}
		console.log("So close yet so far");
	});
}
function validateLogin(aStateManager) {
	'use strict';
	if(aStateManager instanceof stateManager) {
		checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value, true);
		if (CurrentUser !== null) {
			$("#loginForm").slideUp("slow", function() {
				$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
			});
			return true;
		}
		return false;
	}
	console.log(aStateManager + "Is not a valid stateManager");
	return false;
}
$(document).ready(function() {
	'use strict';
	var currStateManager = new stateManager();
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
	$('#loginSubmit').click(function() {
		validateLogin(currStateManager);
	});
});
