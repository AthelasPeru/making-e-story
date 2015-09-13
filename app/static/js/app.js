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

	var phases = [];

	$("#addPhase").on("click", function(){
		var phase = {
			name: $("#phase_name").val(),
			description: $("#phase_text").val(),
			success: {
				message: $("#success_text").val(),
				req:[
					{
					name: $("#succ_req_name").val(),
					value : $("#succ_req_val").val()
				}], 
			},
			failure:[
				{
					name: $("#fail_req_name").val(),
					value : $("#fail_req_val").val(),
					message: $("#fail_text").val()
				}
			],
			actions: []

		}

		// add phase to phases array
		phases.push(phase);
	});


	$("#addAction").on("click", function(){
		var action = {
			name: $("#action_name").val(),
			time_tick: $("#time_tick").val(),
			messages:[
				$("#action_msg_1").val(),
				$("#action_msg_2").val(),
				$("#action_msg_3").val()
			],
			resource:{
				name: $("#resource_name").val(),
				value: $("#resource_value")
			}
		}

		// agregamos acción a la última fase
		phases[phases.length -1].actions.push(action);
	});

	$("#complete").on("click", function(){
		var data = {
			general_data: general_data,
			character_data: character_data,
			phases: phases

		}
		console.log(data);
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