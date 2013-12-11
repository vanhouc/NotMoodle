var CurrentUser;
function validateLogin() {
	if (checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value, true)) {
		$("#loginForm").slideUp("slow", function() {
			$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
		});
	}
	else {
		return false;
	}
}
function checkLogin(username, password, setCurrUser) {
	$.getJSON("Users.js", function(result) {
		for (x in result) {
			if (x === username && result[x].password === password) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				if (setCurrUser === true) {
					CurrentUser = result[x];
				}
				return true;
			}
		}
		console.log("So close yet so far ");
		return false;
	});
}
function pullUserData(username) {

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
