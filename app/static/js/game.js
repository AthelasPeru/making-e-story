
window.Game = function(oldData){
	var data = oldData
	var characterData = data.character_data;
	var skillKeys = Object.keys(characterData.skills);
	
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
	var reloadPhase = function(data, phaseNumber, failure){
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

	var reloadCharacterData = function(resourse){
		
		//Iteramos por los nombres de los skills
		for (var i = 0; i < skillKeys.length; i++ ){
			
			//Cuando encontramos el skill al que queremos agregar el resourse
			if( skillKeys[i] == resourse.name){
				
				//Actualizamos la data según el value del resourse
				characterData.skills[skillKeys[i]] = characterData.skills[skillKeys[i]] + resourse.value;

				// Actualizamos el template de Character Data
				charactersDestination.innerHTML = characterTemplate({ characterSkills : characterData.skills });
			}
		}
	}



	// Check Succsess
	var checkSuccess = function(phaseNumber, nextPhaseNumber){
		//We are going to check this phase
		
	}

	// Check Failure
	var checkFailure = function(phaseNumber, nextPhaseNumber){
		
		//Lista de failures para esta fase
		var reqList = data.phases[phaseNumber].failure.req;
		var reqLength = reqList.length;
		var characterSkills = characterData.skills;
		var numOfErrors = 0;

		var result = reqList.map(function(obj){
			for (var i = 0; i < characterSkills.length; i++){
				if(characterSkills[i].key == obj.name){
					if(characterSkills[i] >= obj.value){
						numOfErrors++;
					}
				}
			}
		});
		if(numOfErrors >= reqLength){
			reloadPhase(data, phaseNumber, true);
		}
		//Iteramos por la lista a ver si se han cumplido

		
	}

	//Simple handler for clicks that calls reload on relatedRoom
	var doAction = function(actionNumber, phaseNumber){
		var actionResourse = data.phases[phaseNumber].actions[actionNumber].resourse;
		
		//Se agregan sus recursos
		reloadCharacterData(actionResourse);
	
		
	}


	//We initiate the game
	reloadPhase(data, "0", false);

	// Initialize click handler for actions
	$(document).on('click', '.do-button', function(e){
		var actionNumber = $(e.target).data("action-number");
		var phaseNumber = $(e.target).data("phase-number");
		var nextPhaseNumber = phaseNumber + 1;

		//We update the character info
		doAction(actionNumber, phaseNumber);

		checkFailure(phaseNumber, nextPhaseNumber);

		checkSuccess(phaseNumber, nextPhaseNumber);

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
	}
});

window.jsonParsed = jsonParsed;

