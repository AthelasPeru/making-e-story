
window.Game = function(data){
	
	var characterData = data.character_data;
	console.log(characterData);

	var phaseNumber = 0;

	var skillKeys = Object.keys(characterData.skills[0]);
	console.log(skillKeys);

	// Template Precompiling
	var phaseTemplateSource   = $("#phase_template").html(),
		phaseTemplate = Handlebars.compile(phaseTemplateSource),
		phaseDestination = document.getElementById("phase");

	var actionTemplateSource   = $("#action_template").html(),
		actionTemplate = Handlebars.compile(actionTemplateSource),
		actionsDestination = document.getElementById("actions");

	var characterTemplateSource   = $("#character_template").html(),
		characterTemplate = Handlebars.compile(characterTemplateSource),
		charactersDestination = document.getElementById("characters");

	var failureTemplateSource   = $("#failure_template").html(),
		failureTemplate = Handlebars.compile(failureTemplateSource),
		failureDestination = document.getElementById("failure");

	//Helper Function that calls showRoom with the info from the Click Handler
	var reloadPhase = function(data, failure){
		if(failure){

			//Clean everything
			phaseDestination.innerHTML = '';
			actionsDestination.innerHTML = '';

			// Imprimimos el HTML de la fase (principalmente el texto)
			failureDestination.innerHTML = failureTemplate({ failure: data.phases[phaseNumber].failure });

		}else{
			// Imprimimos el HTML de la fase (principalmente el texto)
			phaseDestination.innerHTML = phaseTemplate({ phase: data.phases[phaseNumber] });
			
			//Luego tenemos que imprimir sus acciones
			actionsDestination.innerHTML = actionTemplate({ phase: data.phases[phaseNumber] });
		}
	}

	var reloadCharacterData = function(resource){
		console.log("Resource: " + resource);
		console.log("reloadCharacterData Phase Number" + phaseNumber);
		//Iteramos por los nombres de los skills
		for (var i = 0; i < skillKeys.length; i++ ){
			
			//Cuando encontramos el skill al que queremos agregar el resource
			if( skillKeys[i] == resource.name){
				console.log("the skill you want to change :" + skillKeys[i]);
				//Actualizamos la data según el value del resource
				console.log("the past skill:" + characterData.skills[0][skillKeys[i]]);
				characterData.skills[0][skillKeys[i]] = characterData.skills[0][skillKeys[i]] + resource.value;
				console.log("the actual skill:" + characterData.skills[0][skillKeys[i]]);
				// Actualizamos el template de Character Data
				charactersDestination.innerHTML = characterTemplate({ characterSkills : characterData.skills[0] });
			}
		}
	}



	// Check Succsess
	var checkSuccess = function(nextPhaseNumber){
		//We are going to check this phase
		
	}

	// Check Failure
	var checkFailure = function(nextPhaseNumber){
		console.log("CheckFailure PhaseNumber: " + phaseNumber);
		//Lista de failures para esta fase
		var reqList = data.phases[phaseNumber].failure[0];
		var characterSkills = characterData.skills;
		var numOfErrors = 0;

		for (var i = 0; i < characterSkills.length; i++){
			if(characterSkills[i].key == reqList.name){
				if(characterSkills[i] >= reqList.value){
					reloadPhase(data, true);
				}
			}
		}
		
	}

	//Simple handler for clicks that calls reload on relatedRoom
	var doAction = function(actionNumber){
		var actionResource = data.phases[phaseNumber].actions[actionNumber].resource;
		
		//Se agregan sus recursos
		reloadCharacterData(actionResource);
	
		
	}


	//We initiate the game
	reloadPhase(data, false);

	// Initialize click handler for actions
	$(document).on('click', '.do-button', function(e){
		var actionNumber = $(e.target).data("action-number");
		console.log("OnClick PhaseNumber : " + phaseNumber);
		var nextPhaseNumber = phaseNumber + 1;

		//We update the character info
		doAction(actionNumber);

		checkFailure(nextPhaseNumber);

		checkSuccess(nextPhaseNumber);

	});

}
var gameID = window.location.href.split("/");

var oldData = $.ajax({
	method: "GET",
	url: "/api/game/"+gameID[gameID.length -1],
	contentType: "application/json",
	complete: function(resp){
		jsonParsed = JSON.parse(resp.responseText);
		console.log(jsonParsed);
		window.gameData = jsonParsed;
	}
});



