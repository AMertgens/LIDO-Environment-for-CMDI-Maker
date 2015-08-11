var lido_environment = (function(){

	var my = {};

	my.name = "lido";
	my.id = "lido";
	my.title = "LIDO";
	my.version = "0.5";
	
	
	my.workflow = [];
	
	my.init = function(){
	
		return;
	
	};
	
	
	var xmlQueryText = function(xml, array){
	
		var node = xmlQuery(xml, array);
		
		return node.textContent.trim();
		
	};
	
	
	var xmlQuery = function(xml, array){
	
		var node = xml;
	
		for (var n=0; n < array.length; n++){
			
			node = node.getElementsByTagName(array[n])[0];
			
		}
		
		return node;
		
	}
	
	
	my.getIdentifiersFromDB = function(callback){
	
		getWithAJAX(
			"http://dd-dariah.uni-koeln.de/exist/apps/wahn/oai-pmh.xql?verb=ListIdentifiers&metadataPrefix=lido",		
			function(http){
				
				var xml = http.responseXML;
				log(xml);
				
				var list = xmlQuery(xml, ["OAI-PMH", "ListIdentifiers"]);
				
				var identifiers = map(list.children, function(header){
				
					return xmlQueryText(header, ["identifier"]);
				
				});
				
				callback(identifiers);
			
			}
		);
	
	};
	
	
	my.showIdentifierSelect = function(){
	
		my.getIdentifiersFromDB(function(identifiers){
	
			log(identifiers);
			
			APP.GUI.showSelectFrame(identifiers, identifiers, my.loadDocumentFromDB, "LIDO Documents in Database", undefined);
		
		});
	
	
	};
	
	
	my.loadDocumentFromDB = function(identifier){
	
		var url = "http://dd-dariah.uni-koeln.de/exist/apps/wahn/oai-pmh.xql?verb=GetRecord&identifier=" + identifier + "&metadataPrefix=lido"
	
		getWithAJAX(
			url,		
			function(http){
				
				var xml = http.responseXML;
				log(xml);

				var lido = xmlQuery(xml, ["OAI-PMH", "GetRecord", "record", "metadata", "lido"]);
				
				log(lido);
				
				my.importLIDOXML(lido);
				
				log("XML imported!");
			
			}
		);	
	
	};
	
	
	my.importLIDOXML = function(xml){
		
		var start = {};

		//bei attributes mit prefix, bei tags ohne
		start = {
			"source": xmlQuery(xml, ["lidoRecID"]).getAttribute("lido:source"),
			"digitalisierungssignatur": xmlQueryText(xml, ["lidoRecID"]),
			"objektsignatur": xmlQueryText(xml, ["category", "conceptID"]),
			"legal_body": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "repositoryName", "legalBodyName", "appellationValue"]),
			"eintragsart": xmlQueryText(xml, ["category", "term"]),
			"resource": {
				"id": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceID"]),
				"link": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation", "linkResource"]),
				"representation_type": xmlQuery(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation"]).getAttribute("lido:type"),
				"type": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceType", "term"]),
				"source": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceSource", "legalBodyName", "appellationValue"])
			}
		}
		
		my.workflow[0].recall(start);
		
		
		var objektbeschreibung = {
			"title": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "titleWrap", "titleSet", "appellationValue"]),
			"objektbeschreibung": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectDescriptionWrap", "objectDescriptionSet", "descriptiveNoteValue"]),
			"maße": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementValue"]),
			"maßeinheit": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementUnit"]),
			"maßtyp": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementType"]),
			"inventarnummer": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "workID"]),
			"besitzende_institution": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "repositoryName", "legalBodyName", "appellationValue"]),
			"standort_tws": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "repositoryLocation", "namePlaceSet", "appellationValue"]),
			"objektgattung": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectWorkTypeWrap", "objectWorkType", "term"]),
			"objektart": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectWorkTypeWrap", "objectWorkType", "conceptID"]),
			"thematik": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "displaySubject"])
		};
		
		my.workflow[1].recall(objektbeschreibung);
		
		
		var herstellung = {
			"herstellungsbeschreibung": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "displayEvent"]),
			"type": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventType", "term"]),
			"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "earliestDate"]),
			"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "latestDate"]),
			"culture": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "culture", "term"]),
			"actor": {
				"name": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "nameActorSet", "appellationValue"]),
				"pnd_id": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "actorID"]),
				"geburtsjahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "earliestDate"]),
				"sterbejahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "latestDate"]),
				"function": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "roleActor", "term"]),
				"geschlecht": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "genderActor"]),
			}
		};
		
		my.workflow[2].recall(herstellung);
		
		
		var inszenierung = {
			"titel": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventName", "appellationValue"]),
			"performancebeschreibung": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "displayEvent"]),
			"type": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventType", "term"]),
			"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "earliestDate"]),
			"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "latestDate"]),
			"culture": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "culture", "term"]),
			"actor": {
				"name": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "nameActorSet", "appellationValue"]),
				"pnd_id": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "actorID"]),
				"geburtsjahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "earliestDate"]),
				"sterbejahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "latestDate"]),
				"function": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "roleActor", "term"]),
				"geschlecht": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "genderActor"]),
			}
		};
		
		my.workflow[3].recall(inszenierung);


		var erwerb = {
			"provenienzbeschreibung": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "displayEvent"]),
			"type": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventType", "term"]),
			"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "earliestDate"]),
			"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "latestDate"]),
			"culture": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "culture", "term"]),
			"actor": {
				"name": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "nameActorSet", "appellationValue"]),
				"pnd_id": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "actorID"]),
				"geburtsjahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "earliestDate"]),
				"sterbejahr": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "latestDate"]),
				"function": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "roleActor", "term"]),
				"geschlecht": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "genderActor"]),
			}
		};
		
		my.workflow[4].recall(erwerb);
		
		return start;
		
	};
	
	
	my.settings = function(){
		return [];
	};
	
	my.recall = function (settings){
		
		return;
	
	};
	
	my.getSaveData = function(){
	
		return;
	
	};
	
	
	my.getProjectName = function(){
		
		return my.workflow[0].getSaveData().start_form.digitalisierungssignatur.digitalisierungssignatur;
		
	};
	
	
	my.reset = function(){
		
		my.workflow[0].reset();
		my.workflow[1].reset();
		my.workflow[2].reset();
		my.workflow[3].reset();
		my.workflow[4].reset();
		
		return;
	
	};
	
	APP.environments.add(my);
	
	return my;
	
})();