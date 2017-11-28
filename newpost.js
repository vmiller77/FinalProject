$(document).ready(function () {

  $('#new_post').on('click',function (e) {
				   e.preventDefault();
				   $.ajax(url_base + "/postScript.php",
					  {type: "POST",
						  dataType: "json",
						  data: $(this).serialize(),
						  success: function(todo_json, status, jqXHR) {
						  var t = new Todo(todo_json);
						  $('#todo_list').append(t.makeCompactDiv());
					      },
						  error: function(jqXHR, status, error) {
						  alert(jqXHR.responseText);
					      }});
			       });

});
