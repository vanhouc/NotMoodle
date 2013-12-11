var CurrentUser;
function validateLogin() {
	checkLogin(document.getElementById("loginName").value, document.getElementById("loginPass").value, true);
	if (CurrentUser != null) {
		$("#loginForm").slideUp("slow", function() {
			$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
		});
		return true;
	}
	else {
		return false;
	}
}
function checkLogin(username, password, setCurrUser) {
	$.getJSON("Users.js", function(result) {
		for (var x in result) {
			if (x === username && result[x].password === password) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				if (setCurrUser === true) {
					CurrentUser = result[x];
				}
			}
		}
		console.log("So close yet so far");
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
