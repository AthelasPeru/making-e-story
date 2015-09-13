
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

	//Helper Function that calls showRoom with the info from the Click Handler
	var reloadPhase = function(data, phaseNumber){
		// Imprimimos el HTML de la fase (principalmente el texto)
		phaseDestination.innerHTML = phaseTemplate({ phase: data.phases[phaseNumber] });
		
		//Luego tenemos que imprimir sus acciones
		actionsDestination.innerHTML = actionTemplate({ phase: data.phases[phaseNumber] });
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
		var reqList = data.phases[phaseNumber].failure
		var characterSkills = characterData.skills

		//Iteramos por la lista a ver si se han cumplido

		
	}

	//Simple handler for clicks that calls reload on relatedRoom
	var doAction = function(actionNumber, phaseNumber){
		var actionResourse = data.phases[phaseNumber].actions[actionNumber].resourse;
		
		//Se agregan sus recursos
		reloadCharacterData(actionResourse);
	
		
	}


	//We initiate the game
	reloadPhase(data, "0");

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

var oldData = '{"data": {"timeSteps": 1,"gameLength": 2,"gameName": "The Red Lucky Rihno","tags": ["tag1","tag2","tag3"]},"character_data": {"skills": {"love": 0,"gaming": 0,"info": 0},"age": 1234},"phases": [{"id": 0,"name": "phase0","text": "Esta es la primera etapa de tu vida. Eres un nerdo buscando que aprender.","success": {"req": {"something": 10,"somethingElse": 20}},"failure": [{"failure_0": {"req": {"love": 5,"gaming": 10},"message": "Esen te toco por la noche, lloraras hasta el fin de tus dias."}}],"actions": [{"name": "action0","duration": 10,"messages": ["Visitaste HN","Viste TED Talks","Obama te convenció"],"reward": {"name": "info","value": 1}},{"name": "action1","duration": 10,"messages": ["Te compras un PSP","Juegas"],"reward": {"name": "gaming","value": 1}},{"name": "action2","duration": 15,"messages": ["Ver a tu novia"],"reward": {"name": "love","value": 1}}]}]}';

window.oldData = JSON.parse(oldData);

