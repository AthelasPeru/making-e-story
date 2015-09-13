$(document).ready(function(){

	var submit = $("#submit").on("click", function(){

		var json_data = {
			"json_data": {
				name: $("#name").val(),
				description: $("#description").val(),
				image: "default.jpg"
			}
			 
		};
		// $.ajax({
		// 	method: "POST",
		// 	url: "/api/game",
		// 	data: JSON.stringify(json_data),
		// 	contentType: "application/json",
		// 	complete: function(resp){
		// 		console.log(resp);
		// 	}
		// });
	});
});