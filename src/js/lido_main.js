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
			"object_id": xmlQueryText(xml, ["lidoRecID"]),
			"concept_id": xmlQueryText(xml, ["category", "conceptID"]),
			"legal_body": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "repositoryName", "legalBodyName", "appellationValue"]),
			"type": xmlQueryText(xml, ["category", "term"]),
			"classification": xmlQueryText(xml, ["category", "conceptID"]),
			"rights": {
				"type": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsType", "term"]),
				"earliest_date": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "earliestDate"]),
				"latest_date": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "latestDate"]),
				"legal_body": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsHolder", "legalBodyName", "appellationValue"])
			},
			"record": {
				"id": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordID"]),
				"type": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordType", "term"]),
				"source": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordSource", "legalBodyName", "appellationValue"])
			},
			"resource": {
				"id": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceID"]),
				"link": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation", "linkResource"]),
				"representation_type": xmlQuery(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation"]).getAttribute("lido:type"),
				"type": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceType", "term"]),
				"source": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceSource", "legalBodyName", "appellationValue"])
			}
		}
		
		my.workflow[0].recall(start);
		
		
		var object_identification = {
			"title": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "titleWrap", "titleSet", "appellationValue"]),
			"legal_body": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "repositoryName", "legalBodyName", "appellationValue"]),
			"inventory_number": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "repositoryWrap", "repositorySet", "workID"]),
			"descriptive_note": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectDescriptionWrap", "objectDescriptionSet", "descriptiveNoteValue"]),
			"display_object_measurements": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementValue"]),
			"measurements_unit": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementUnit"]),
			"measurements_type": xmlQueryText(xml, ["descriptiveMetadata", "objectIdentificationWrap", "objectMeasurementsWrap", "objectMeasurementsSet", "objectMeasurements", "measurementsSet", "measurementType"]),
		};
		
		my.workflow[1].recall(object_identification);
		
		
		var event = {
			"title": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "displayEvent"]),
			"type": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventType", "term"]),
			"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "earliestDate"]),
			"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventDate", "latestDate"]),
			"culture": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "culture", "term"]),
			"actor": {
				"name": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "nameActorSet", "appellationValue"]),
				"actor_id": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "actorID"]),
				"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "earliestDate"]),
				"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "vitalDatesActor", "latestDate"]),
				"role": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "roleActor", "term"]),
				"gender": xmlQueryText(xml, ["descriptiveMetadata", "eventWrap", "eventSet", "event", "eventActor", "actorInRole", "actor", "genderActor"]),
			}
		};
		
		
		my.workflow[2].recall(event);
		
		
		var object_relation = {
			"display_subject": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "displaySubject"]),
			"subject_concept": "",
			"subject_date": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectDate", "displayDate"]),
			"subject_place": "",
			"event": {
				"title": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "displayEvent"]),
				"type": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventType", "term"]),
				"earliest_date": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventDate", "earliestDate"]),
				"latest_date": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventDate", "latestDate"]),
				"culture": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "culture", "term"]),
				"actor": {
					"name": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventActor", "actorInRole", "actor", "nameActorSet", "appellationValue"]),
					"actor_id": "",
					"earliest_date": "YYYY",
					"latest_date": "YYYY",
					"role": xmlQueryText(xml, ["descriptiveMetadata", "objectRelationWrap", "subjectWrap", "subjectSet", "subject", "subjectEvent", "event", "eventActor", "actorInRole", "roleActor"]),
					"gender": "male"
				}
			}
		};
		
		my.workflow[3].recall(object_relation);
		
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
	
		return;
	
	};
	
	APP.environments.add(my);
	
	return my;
	
})();