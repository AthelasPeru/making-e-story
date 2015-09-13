$(document).ready(function(){

	var game_data = {
		phases: [],
		image: ""
	};


	$(".thumbnail").on("click", function(){
		$(".thumbnail").removeClass("selected");
		$(this).addClass("selected");
		game_data.image = $(this).attr("src").split("/");
		console.log(game_data.image[game_data.image.length -1])
	});

	

	
	
	$("#addGeneralData").on("click", function(){


		var general_data = {
			name: $("#name").val(),
			description: $("#description").val(),
			image: game_data.image[game_data.image.length -1],
			n_scenes: $("#n_scenes").val(),
			time_unit: $("#time_unit").val(),
			tags: [
				$("#tag-1").val(),
				$("#tag-2").val(),
				$("#tag-3").val()
			]			 
		};
		
		game_data["general_data"] = general_data;


		
	});

	$("#addCharacterData").on("click", function(){
		var character_data = {
			age: $("#char_age").val()
		}

		game_data["character_data"] = character_data;
	});

	

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
		game_data.phases.push(phase);
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
				value: $("#resource_value").val()
			}
		}

		// agregamos acción a la última fase
		game_data.phases[game_data.phases.length -1].actions.push(action);
	});

	$("#complete").on("click", function(){
		uploadSkills();

		console.log(game_data);
		$.ajax({
			method: "POST",
			url: "/api/game",
			data: JSON.stringify(game_data),
			contentType: "application/json",
			complete: function(resp){
				console.log(resp);
			}
		});
	});

	var uploadSkills = function(){
		var actions = game_data.phases[game_data.phases.length -1].actions;
		var skills = actions.map(function(obj){
			var result = {};
			
			var skillName = obj.resource.name;
			var skillValue = 0;
			
			result[skillName] = skillValue;

			return result;
		});
		game_data.character_data.skills = skills;
		console.log("data Updated");
	}
});


