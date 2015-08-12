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
			//log(node);
			
		}
		
		return node;
		
	}
	
	
	my.getIdentifiersFromDB = function(callback){
	
		getWithAJAX(
			"http://dd-dariah.uni-koeln.de/exist/apps/wahn/oai-pmh.xql?verb=ListIdentifiers&metadataPrefix=lido",		
			function(http){
				
				var xml = http.responseXML;
				//log(xml);
				
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
	
			//log(identifiers);
			
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
				
				//log(lido);
				
				my.importLIDOXML(xml);
				//my.importLIDOXML(lido);
				
				log("XML imported!");
			
			}
		);	
	
	};
	
	
	
	my.importLIDOXML = function(xml){

		var recreate_lido_aat = function (term) {
		switch(term) {	
			case '300007122':
				return 'Bühnenmodell';	
			case '300026879':
				return 'Brief';	
			case '300028051':
				return 'Buch';	
			case '300047457':
				return 'Büste';	
			case '300128371':
				return 'Dia';	
			case '300136900':
				return 'Film';	
			case '300134997':
				return 'Filmfotografie';	
			case '300027221':
				return 'Filmplakat';	
			case '300026695':
				return 'Fotoalbum';	
			case '300127173':
				return 'Fotonegativ';	
			case '300033799':
				return 'Gemälde';	
			case '300211106':
				return 'Handpuppe';	
			case '300028571':
				return 'Handschrift';	
			case '300138191':
				return 'Inszenierungsfotografie';	
			case '300026424':
				return 'Libretti';	
			case '300211126':
				return 'Marionette';	
			case '300026427':
				return 'Noten';	
			case '300263033':
				return 'Papiertheater';	
			case '300138191':
				return 'Personenfotografie';	
			case '300264849':
				return 'Porträtgrafik';	
			case '300047090':
				return 'Porzellanfigur';	
			case '300026778':
				return 'Postkarte';	
			case '300027217':
				return 'Programmheft';	
			case '300054688':
				return 'Rezension';	
			case '300211230':
				return 'Schattenspielfigur';	
			case '300047600':
				return 'Statue';	
			case '300226128':
				return 'Stockpuppe';	
			case '300264849':
				return 'Szenische Grafik';	
			case '300138191':
				return 'Tanzfotografie';	
			case '300138191':
				return 'Theaterbaufotografie';	
			case '300264849':
				return 'Theaterbaugrafik';	
			case '300138758':
				return 'Theatermaske';	
			case '300027221':
				return 'Theaterplakat';	
			case '300027217':
				return 'Theaterzettel';	
			case '300047724':
				return 'Totenmaske';	
			case '300028577':
				return 'Typoskript';	
			case '300215389':
				return 'Zeitschrift';	
			case '300026867':
				return 'Zeitungsausschnitt';	
			case '300138191':
				return 'sonstige Fotografie';	
			case '300264849':
				return 'sonstige Grafik';	
			case '300047090':
				return 'sonstige Figur';	
			case '300138758':
				return 'sonstige Maske';	
			case '300047753':
				return 'sonstiges Modell';
			default:
				return '';
			}
		}

		var x=xml.getElementsByTagName("lido");


//Objektidentifikation

		var resourcesid = x[0].getElementsByTagName("resourceSet");
		var resourceslist = new Array;

		for (var i = 0; i < resourcesid.length; ++i) {
		    resourceslist[i] = {
		    	"id": i,
				"lastModified": "",
				"name": resourcesid[i].getElementsByTagName("resourceRepresentation")[0].getElementsByTagName("linkResource")[0].firstChild.nodeValue,
				"selected": false,
				"size": "",
				"status": "stable",
				"type": resourcesid[i].getElementsByTagName("resourceType")[0].getElementsByTagName("term")[0].firstChild.nodeValue
		    }
		}

		var objectidentification = {
			"resources" : {
				"id_counter": 0,
				"info" : "ObjectList state",
				"list" : resourceslist,
				"pointer": 0
			},
			"start_form" : {
				"digitalisierungssignatur" : {
					"digitalisierungssignatur": x[0].getElementsByTagName("lidoRecID")[0].firstChild.nodeValue
				},
				"eintragsdokumentation" : {
					"eintragsart": x[0].getElementsByTagName("category")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
					"objektsignatur": x[0].getElementsByTagName("category")[0].getElementsByTagName("conceptID")[0].firstChild.nodeValue
				}
			}
		}

		log(objectidentification);
		my.workflow[0].recall(objectidentification);



//Objektbeschreibung
		
		var objectIdentificationWrap = x[0].getElementsByTagName("objectIdentificationWrap")[0];
		var objectClassificationWrap = x[0].getElementsByTagName("objectClassificationWrap")[0];

		var objektbeschreibung = {
			"beschreibung_form" : {
				"objekt_identifikation" : {
					"besitzende_institution": objectIdentificationWrap.getElementsByTagName("legalBodyName")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
					"inventarnummer": objectIdentificationWrap.getElementsByTagName("repositorySet")[0].getElementsByTagName("workID")[0].firstChild.nodeValue,
					"maße": objectIdentificationWrap.getElementsByTagName("measurementsSet")[0].getElementsByTagName("measurementValue")[0].firstChild.nodeValue,
					"maßeinheit": objectIdentificationWrap.getElementsByTagName("measurementsSet")[0].getElementsByTagName("measurementUnit")[0].firstChild.nodeValue,
					"maßtyp": objectIdentificationWrap.getElementsByTagName("measurementsSet")[0].getElementsByTagName("measurementType")[0].firstChild.nodeValue,
					"objektbeschreibung": objectIdentificationWrap.getElementsByTagName("objectDescriptionSet")[0].getElementsByTagName("descriptiveNoteValue")[0].firstChild.nodeValue,
					"standort_tws": objectIdentificationWrap.getElementsByTagName("namePlaceSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
					"titel": objectIdentificationWrap.getElementsByTagName("titleSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue
				},
				"objektzuordnung" : {
					"objektart": recreate_lido_aat(objectClassificationWrap.getElementsByTagName("objectWorkType")[0].getElementsByTagName("conceptID")[0].firstChild.nodeValue),
					"objektgattung": objectClassificationWrap.getElementsByTagName("objectWorkType")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
					"thematik" : {
						"thematik": x[0].getElementsByTagName("displaySubject")[0].firstChild.nodeValue
					}
				}
			}						
		};
		log(objektbeschreibung);
		my.workflow[1].recall(objektbeschreibung);

//Herstellung

		var herstellungxml = x[0].getElementsByTagName("eventWrap")[0];
		var herstellungactor = herstellungxml.getElementsByTagName("actorInRole");
		var herstellungactorlist = new Array;

		for (var i = 0; i < herstellungactor.length; ++i) {
		    herstellungactorlist[i] = {
		    	"display_name": herstellungactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
		    	"function": herstellungactor[i].getElementsByTagName("roleActor")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"geburtsjahr": herstellungactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
		    	"geschlecht": herstellungactor[i].getElementsByTagName("genderActor")[0].firstChild.nodeValue,
		    	"id": i,
				"name": herstellungactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
				"pnd_id": herstellungactor[i].getElementsByTagName("actor")[0].getElementsByTagName("actorID")[0].firstChild.nodeValue,
				"sterbejahr": herstellungactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue
		    }
		}

		var herstellung = {
			"herstellung_form" : {
				"culture": herstellungxml.getElementsByTagName("culture")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"earliest_date": herstellungxml.getElementsByTagName("eventDate")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
				"herstellungsbeschreibung": herstellungxml.getElementsByTagName("displayEvent")[0].firstChild.nodeValue,
				"latest_date": herstellungxml.getElementsByTagName("eventDate")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue,
				"ort": "Nicht in XML!"
			},
			"persons": {
				"id_counter": herstellungactor.length,
				"info" : "ObjectList state",
				"list" : herstellungactorlist,				
				"pointer" : 0

							
			}
		};
		log(herstellung);
		my.workflow[2].recall(herstellung);

// Inszenierung

		var inszenierungxml = x[0].getElementsByTagName("eventWrap")[1];
		var inszenierungactor = inszenierungxml.getElementsByTagName("actorInRole");
		var inszenierungactorlist = new Array;

		for (var i = 0; i < inszenierungactor.length; ++i) {
		    inszenierungactorlist[i] = {
		    	"display_name": inszenierungactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
		    	"function": inszenierungactor[i].getElementsByTagName("roleActor")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"geburtsjahr": inszenierungactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
		    	"geschlecht": inszenierungactor[i].getElementsByTagName("genderActor")[0].firstChild.nodeValue,
		    	"id": i,
				"name": inszenierungactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
				"pnd_id": inszenierungactor[i].getElementsByTagName("actor")[0].getElementsByTagName("actorID")[0].firstChild.nodeValue,
				"sterbejahr": inszenierungactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue
		    }
		}

		var inszenierung = {
			"inszenierung_form" : {
				"titel": x[0].getElementsByTagName("objectRelationWrap")[0].getElementsByTagName("eventName")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
				"culture": inszenierungxml.getElementsByTagName("culture")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"earliest_date": inszenierungxml.getElementsByTagName("eventDate")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
				"herstellungsbeschreibung": inszenierungxml.getElementsByTagName("displayEvent")[0].firstChild.nodeValue,
				"latest_date": inszenierungxml.getElementsByTagName("eventDate")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue,
				"ort": "Nicht in XML!"
			},
			"persons": {
				"id_counter": inszenierungactor.length,
				"info" : "ObjectList state",
				"list" : inszenierungactorlist,				
				"pointer" : 0

							
			}
		};
		log(inszenierung);
		my.workflow[3].recall(inszenierung);
		
// Erwerb

		var erwerbxml = x[0].getElementsByTagName("eventWrap")[2];
		var erwerbactor = erwerbxml.getElementsByTagName("actorInRole");
		var erwerbactorlist = new Array;

		for (var i = 0; i < erwerbactor.length; ++i) {
		    erwerbactorlist[i] = {
		    	"display_name": erwerbactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
		    	"function": erwerbactor[i].getElementsByTagName("roleActor")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"geburtsjahr": erwerbactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
		    	"geschlecht": erwerbactor[i].getElementsByTagName("genderActor")[0].firstChild.nodeValue,
		    	"id": i,
				"name": erwerbactor[i].getElementsByTagName("nameActorSet")[0].getElementsByTagName("appellationValue")[0].firstChild.nodeValue,
				"pnd_id": erwerbactor[i].getElementsByTagName("actor")[0].getElementsByTagName("actorID")[0].firstChild.nodeValue,
				"sterbejahr": erwerbactor[i].getElementsByTagName("vitalDatesActor")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue
		    }
		}

		var herstellung = {
			"erwerb_form" : {
				"culture": erwerbxml.getElementsByTagName("culture")[0].getElementsByTagName("term")[0].firstChild.nodeValue,
				"earliest_date": erwerbxml.getElementsByTagName("eventDate")[0].getElementsByTagName("earliestDate")[0].firstChild.nodeValue,
				"provenienzbeschreibung": erwerbxml.getElementsByTagName("displayEvent")[0].firstChild.nodeValue,
				"latest_date": erwerbxml.getElementsByTagName("eventDate")[0].getElementsByTagName("latestDate")[0].firstChild.nodeValue,
				"ort": "Nicht in XML!"
			},
			"persons": {
				"id_counter": erwerbactor.length,
				"info" : "ObjectList state",
				"list" : erwerbactorlist,				
				"pointer" : 0

							
			}
		};
		log(herstellung);
		my.workflow[4].recall(herstellung);
		return objectidentification;
		
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