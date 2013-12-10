$(document).ready(function() {
	$('#login').mouseenter(function() {
		$(this).css('font-weight', 'bold');
	});
	$('#login').mouseleave(function() {
		$(this).css('font-weight', 'normal');
	});
	$('#login').click(function() {
		$(this).hide().after(
			'<form id=\"loginform\" name=\"input\" onSubmit=\"checkLogin\" action=\"login.php\" method=\"post\">Username: <input id=\"loginname\" type=\"text\" name=\"user\"><br/>Password: <input id=\"inputpass\" type=\"password\" name=\"pass\"><br/><input type=\"submit\"></form>');
	});
});
function checkLogin() {
	
};