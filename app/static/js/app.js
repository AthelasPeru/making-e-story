$(document).ready(function(){

	$("#addGeneralData").on("click", function(){

		var game_data = {
			name: $("#name").val(),
			description: $("#description").val(),
			image: "default.png",
			n_scenes: $("#n_scenes").val(),
			time_unit: $("#time_unit").val(),
			tags: [
				$("#tag-1").val(),
				$("#tag-2").val(),
				$("#tag-3").val()
			]			 
		};


		
	});

	$("#addCharacterData").on("click", function(){
		var character_data = {
			age: $("#char_age").val()
		}
	});
});


// $.ajax({
		// 	method: "POST",
		// 	url: "/api/game",
		// 	data: JSON.stringify(json_data),
		// 	contentType: "application/json",
		// 	complete: function(resp){
		// 		console.log(resp);
		// 	}
		// });