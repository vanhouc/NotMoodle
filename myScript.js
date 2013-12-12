function stateManager(userProfile) {
	var CurrentUser;
}
stateManager.prototype.checkLogin = function (username, password) {
	'use strict';
	if (CurrentUser === null) {
	$.getJSON("Users.js", function(result) {
		var x;
		for (x in result) {
			if (x === username && result[x].password === password && result.hasOwnProperty(x)) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				CurrentUser = result[x];
			}
		}
		console.log("User not found or incorrect credentials");
	});
	if (CurrentUser !== null) return true;
	else return false;
	}
	console.log("This shouldn\'t be called while there is a CurrentUser");
	return false;
}
function validateLogin(aStateManager) {
	'use strict';
	if(aStateManager instanceof stateManager) {
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
		if (currStateManager.CurrentUser === null) {
			$(this).hide();
			$('#loginForm').show();
		}
		else {
			if (var promptLogOut = confirm("Do you want to Log-Out?")) {
				$("#mainSection").slideUp("slow").empty();
			}
		}
	});
	$('#loginSubmit').click(function() {
		if (currStateManager.checkLogin(
			document.getElementById("loginName").value, 
			document.getElementById("loginPass").value)) {
			$("#loginForm").slideUp("slow", function() {
				$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
			});
			$.getJSON("Classes.js", function() {
				var i, x, a, classList = responseTxt, assList, today = new Date();
				for (i = 0; i < currStateManager.getClasses().length; i+=1) {
					for (x = 0; x < classList.length; x+=1) {
						if (currStateManager.getClasses()[i] === classList[x].title) {
							for (a = 0, a < classList[x].assignments.length) {
								assList += "<div id=" + classList[x].assignments[a].title + ">" +
									"<p id=\"contentClass\">Class: " + classList[x].title + "</p>" +
									"<p id=\"contentTitle\">Title: " + classList[x].assignments[a].title + "</p>" +
									"<p id=\"contentDate\">Due On: " + classList[x].assignments[a].due + "	Remaining Time: " + ((today.getTime() - Date.getTime(classList[x].assignments[a].due)) / (24*60*60*1000)).toString() + "</p>" +
									"<p id=\"contentBody\">" + classList[x].assignments[a].content + "</p></div>";
							}
						}
					}
				}
				$("#mainSection").html(assList).slideDown("slow");
				if (statusTxt === "error") {
					console.log("Something has gone horribly wrong \n" + xhr.statusText);
				}
			});
		}
	});
});
