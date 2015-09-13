
window.Game = function(oldData){
	var data = oldData
	var characterData = data.character_data;
	
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

	var reloadCharacterData = function(reward){

		var skills = characterData.skills;

		var skillKeys = Object.keys(skills);
		
		for (i = 0; i < skillKeys.length; i++ ){
			
			if( skillKeys[i] == reward.name){
				
				characterData.skills[skillKeys[i]] = characterData.skills[skillKeys[i]] + reward.value;

				// ACtualizar el template de Character Data
				charactersDestination.innerHTML = characterTemplate({ characterSkills : characterData.skills });
			}
		}
	}



	// Check Succsess
	var checkSuccess = function(gameData, prevPhase, nextPhase){
		//We are going to check this phase
	}

	// Check Failure
	var checkFailure = function(gameData, prevPhase, nextPhase){
		//We are going to check this phase
	}

	//Simple handler for clicks that calls reload on relatedRoom
	var doAction = function(actionNumber, phaseNumber){
		var actionReward = data.phases[phaseNumber].actions[actionNumber].reward;
		//Se agregan sus recursos
		reloadCharacterData(actionReward);
	
		//Se hace reload del juego
		
	}


	//We initiate the game
	reloadPhase(data, "0");

	// Initialize click handler for actions
	$(document).on('click', '.do-button', function(e){
		var actionNumber = $(e.target).data("action-number");
		var phaseNumber = $(e.target).data("phase-number");

		doAction(actionNumber, phaseNumber);
	});

}

var oldData = '{"data": {"timeSteps": 1,"gameLength": 2,"gameName": "The Red Lucky Rihno","tags": ["tag1","tag2","tag3"]},"character_data": {"skills": {"love": 0,"gaming": 0,"info": 0},"age": 1234},"phases": [{"id": 0,"name": "phase0","text": "Esta es la primera etapa de tu vida. Eres un nerdo buscando que aprender.","success": {"req": {"something": 10,"somethingElse": 20}},"failure": [{"failure_0": {"req": {"love": 5,"gaming": 10},"message": "Esen te toco por la noche, lloraras hasta el fin de tus dias."}}],"actions": [{"name": "action0","duration": 10,"messages": ["Visitaste HN","Viste TED Talks","Obama te convenció"],"reward": {"name": "info","value": 1}},{"name": "action1","duration": 10,"messages": ["Te compras un PSP","Juegas"],"reward": {"name": "gaming","value": 1}},{"name": "action2","duration": 15,"messages": ["Ver a tu novia"],"reward": {"name": "love","value": 1}}]}]}';

window.oldData = JSON.parse(oldData);

