$(document).ready(function () {

    $('#login_form').on('submit', function (e) {
	e.stopPropagation();
	e.preventDefault();
	$.ajax('login.php',
	       {type: 'GET',
		data: $('#login_form').serialize(),
		cache: false,
		success: function () {
		    alert('Login Successful'); },
		error: function () {
		    alert('Login Failed');}
	       });
    });

    $('#logout_form').on('submit', function (e) {
	e.stopPropagation();
	e.preventDefault();
	$.ajax('logout.php',
	       {type: 'GET',
		cache: false,
		successful: function () {
		    alert("Logged Out");
		}
	       });
    });

    $('#secret_form').on('submit', function (e) {
	e.stopPropagation();
	e.preventDefault();

	$.ajax('secret.php',
	       {type: 'GET',
		cache: false,
		success: function (data, status, jqxhr) {
		    alert(data);
		},
		error: function(jqxhr, status, error) {
		    alert("Couldn't get secret");
		}
	       });
    });
});
