var CurrentUser = null;
function loginResponse(result) {
	'use strict';
	var x, loginName = document.getElementById("loginName").value, passName = document.getElementById("loginPass").value;
		for (x = 0; x < result.length; x += 1) {
			if (result[x] === loginName && result[x].password === passName) {
				//This function sets the global CurrentUser to the selected person and probably should be its own function
				CurrentUser = result[x];
				console.log(CurrentUser);
			}
		}
	}
function SetupUserEnv() {
	'use strict';
	$("#loginForm").slideUp("slow", function() {
		$("#login").html("Hello " + CurrentUser.fName).fadeIn("slow");
		$.getJSON("Classes.js", function(results) {
		var i, x, a, assList, today = new Date(), classList = results;
		for (i = 0; i < CurrentUser.courses.length; i += 1) {
			for (x = 0; x < classList.length; x += 1) {
				if (CurrentUser.courses[i] === classList[x].title) {
					for (a = 0; a < classList[x].assignments.length; a += 1) {
						assList = "<div id=" + classList[x].assignments[a].title + ">" +
							"<p id=\"contentClass\">Class: " + classList[x].title + "</p>" +
							"<p id=\"contentTitle\">Title: " + classList[x].assignments[a].title + "</p>" +
							"<p id=\"contentDate\">Due On: " + classList[x].assignments[a].due + "	Remaining Time: " + ((today.getTime() - Date.getTime(classList[x].assignments[a].due)) / (24*60*60*1000)).toString() + "</p>" +
							"<p id=\"contentBody\">" + classList[x].assignments[a].content + "</p></div>";
					}
				}
			}
		}
		$("#mainSection").html(assList).slideDown("slow");
		});
	});
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
