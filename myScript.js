var CurrentUser;
function checkLogin(username, password, setCurrUser) {
	'use strict';
	$.getJSON("Users.js", function(result) {
		var x;
		for (x in result) {
			if (x === username && result[x].password === password && result.hasOwnProperty(x)) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				if (setCurrUser === true) {
					CurrentUser = result[x];
				}
			}
		}
		console.log("So close yet so far");
	});
}
function validateLogin() {
	'use strict';
	checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value, true);
	if (CurrentUser !== null) {
		$("#loginForm").slideUp("slow", function() {
			$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
		});
		return true;
	}
	return false;
}
$(document).ready(function() {
	'use strict';
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
