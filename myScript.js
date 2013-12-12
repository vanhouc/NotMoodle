var CurrentUser = null;
function SetupUserEnv(result) {
	'use strict';
	var i, x, a, assList = '', today = new Date(), classList = result;
	//To keep state correct
	$("#wrongLogin").hide();
	$("#loginForm").slideUp("slow", function() {
		$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
		for (i = 0; i < CurrentUser.courses.length; i += 1) {
			for (x = 0; x < classList.courses.length; x += 1) {
				if (CurrentUser.courses[i] === classList.courses[x].title) {
					for (a = 0; a < classList.courses[x].assignments.length; a += 1) {
						assList += "<div class=\"contentPosts\" id=" + classList.courses[x].assignments[a].title + ">" +
							"<p class=\"contentText\" id=\"contentClass\">Class: " + classList.courses[x].title + "</p>" +
							"<p class=\"contentText\" id=\"contentTitle\">Title: " + classList.courses[x].assignments[a].title + "</p>" +
							"<p class=\"contentText\" id=\"contentDate\">Due On: " + classList.courses[x].assignments[a].due + /*"	Remaining Time: " + ((today.getTime() - Date.getTime(classList.courses[x].assignments[a].due)) / (24*60*60*1000)).toString() +*/ "</p>" +
							"<p class=\"contentText\" id=\"contentBody\">" + classList.courses[x].assignments[a].content + "</p></div>";
					}
				}
			}
		}
		$("#mainSection").html(assList).slideDown("slow");
	});
}
function fetchContent() {
	$.getJSON("Classes.js", function(result) {
		SetupUserEnv(result);
	});
}
function loginResponse(result) {
	'use strict';
	var x, loginName = document.getElementById("loginName").value, passName = document.getElementById("loginPass").value;
		for (x = 0; x < result.users.length; x += 1) {
			if (result.users[x].username === loginName && result.users[x].password === passName) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				CurrentUser = result.users[x];
				console.log(CurrentUser);
				fetchContent();
			}
		}
	}
function loginFailed() {
	$("#wrongLogin").slideDown();
}
$(document).ready(function() {
	'use strict';
	$("#wrongLogin").hide();
	$('#login').mouseenter(function() {
		$(this).css('font-weight', 'bold');
	});
	$('#login').mouseleave(function() {
		$(this).css('font-weight', 'normal');
	});
	$('#loginForm').hide();
	$('#login').click(function() {
		if (CurrentUser === null) {
			$(this).hide();
			$('#loginForm').show();
		}
    else {
      var promptLogOut = confirm("Do you want to Log-Out?");
			if (promptLogOut) {
				CurrentUser = null;
				$("#mainSection").slideUp("slow").empty();
			}
		}
	});
	$('#loginSubmit').click(function() {
		$.getJSON("Users.js", function(result) {
			loginResponse(result);
		});
	});
});
