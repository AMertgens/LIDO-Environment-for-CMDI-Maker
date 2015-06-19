lido_environment.lido_generator = function(data){
	"use strict";

	var xml = new XMLString();

	xml.reset();
	xml.setElementPrefix("lido");
	
	var parent = lido_environment;

	var digitalisat = lido_environment.workflow[0];	

	var create_lido_term = function (term,entity,etype) {
		if (etype=="search") {
			xml.element("term", term , [["lido:addedSearchTerm",entity]]);
		}
		else if (etype=="lang") {
			xml.element("term", term , [["xml:lang",entity]]);
		}
		else if (etype=="encoding") {
			xml.element("term", term , [["lido:encodinganalog",entity]]);
		}
		else if (etype=="encoding_search") {
			xml.element("term", term , [["lido:addedSearchTerm",entity[0]],["lido:encodinganalog",entity[1]]]);
		}
		else {
			xml.element("term", term);
		};
	}

	var create_lido_aat = function (term) {
		switch(term) {
			case 'Bühnenmodell':
				return '300007122';
			case 'Brief':
				return '300026879';
			case 'Buch':
				return '300028051';
			case 'Büste':
				return '300047457';
			case 'Dia':
				return '300128371';
			case 'Film':
				return '300136900';
			case 'Filmfotografie':
				return '300134997';
			case 'Filmplakat':
				return '300027221';
			case 'Fotoalbum':
				return '300026695';
			case 'Fotonegativ':
				return '300127173';
			case 'Gemälde':
				return '300033799';
			case 'Handpuppe':
				return '300211106';
			case 'Handschrift':
				return '300028571';
			case 'Inszenierungsfotografie':
				return '300138191';
			case 'Libretti':
				return '300026424';
			case 'Marionette':
				return '300211126';
			case 'Noten':
				return '300026427';
			case 'Papiertheater':
				return '300263033';
			case 'Personenfotografie':
				return '300138191';
			case 'Porträtgrafik':
				return '300264849';
			case 'Porzellanfigur':
				return '300047090';
			case 'Postkarte':
				return '300026778';
			case 'Programmheft':
				return '300027217';
			case 'Rezension':
				return '300054688';
			case 'Schattenspielfigur':
				return '300211230';
			case 'Statue':
				return '300047600';
			case 'Stockpuppe':
				return '300226128';
			case 'Szenische Grafik':
				return '300264849';
			case 'Tanzfotografie':
				return '300138191';
			case 'Theaterbaufotografie':
				return '300138191';
			case 'Theaterbaugrafik':
				return '300264849';
			case 'Theatermaske':
				return '300138758';
			case 'Theaterplakat':
				return '300027221';
			case 'Theaterzettel':
				return '300027217';
			case 'Totenmaske':
				return '300047724';
			case 'Typoskript':
				return '300028577';
			case 'Zeitschrift':
				return '300215389';
			case 'Zeitungsausschnitt':
				return '300026867';
			case 'sonstige Fotografie':
				return '300138191';
			case 'sonstige Grafik':
				return '300264849';
			case 'sonstige Figur':
				return '300047090';
			case 'sonstige Maske':
				return '300138758';
			case 'sonstiges Modell':
				return '300047753';
			default:
				return '';
			
		}
	}

	var create_lido_entry = function (data) {
    
//Lido Head :Start
		xml.header();	
		xml.open("lido",[
			["xmlns:lido", "http://www.lido-schema.org"],
			["xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance"],
			["xsi:schemaLocation","http://www.lido-schema.org http://www.lido-schema.org/schema/v1.0/lido-v1.0.xsd"]
		]);
		xml.element("lidoRecID", data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur, [["lido:source","Theaterwissenschaftliche Sammlung, Universität zu Köln"], ["lido:type","local"]]);
		xml.open("category");
			xml.element("conceptID", data.lido1.start_form.eintragsdokumentation.objektsignatur,[["lido:type","AAT"]]);
			create_lido_term(data.lido1.start_form.eintragsdokumentation.eintragsart,"de","lang");
		xml.close("category");

	xml.open("descriptiveMetadata");
//objectClassificationWrap :Objektbeschreibung
		xml.open("objectClassificationWrap");
			xml.open("objectWorkTypeWrap");
				xml.open("objectWorkType");
					xml.element("conceptID", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektart) , [["lido:type","AAT"]]);
					var entity = new Array("yes", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektart));
					create_lido_term(data.lido2.beschreibung_form.objektzuordnung.objektgattung, entity ,"encoding_search");
				xml.close("objectWorkType");
			xml.close("objectWorkTypeWrap");
			xml.open("classificationWrap");
				xml.open("classification", [["lido:type","AAT:type"]]);
					xml.element("conceptID", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektart), [["lido:type","AAT:type"]]);
					xml.element("term", data.lido2.beschreibung_form.objektzuordnung.objektart, [["lido:addedSearchTerm","yes"]]);
				xml.close("classification");
			xml.close("classificationWrap");
		xml.close("objectClassificationWrap");
//objectIdentificationWrap :Objektbeschreibung
		xml.open("objectIdentificationWrap");
			xml.open("titleWrap");
				xml.open("titleSet");
					xml.element("appellationValue", data.lido2.beschreibung_form.objekt_identifikation.titels, [["lido:pref","preferred"],["xml:lang","de"]]);
				xml.close("titleSet");
			xml.close("titleWrap");
			xml.open("repositoryWrap");
				xml.open("repositorySet", [["lido:type","current"]]);
					xml.open("repositoryName");
						xml.open("legalBodyName");
						xml.element("appellationValue", data.lido2.beschreibung_form.objekt_identifikation.besitzende_institution);
						xml.close("legalBodyName");
					xml.close("repositoryName");
					xml.open("repositoryLocation");
						xml.open("namePlaceSet");
						xml.element("appellationValue", data.lido2.beschreibung_form.objekt_identifikation.standort_tws);
						xml.close("namePlaceSet");
					xml.close("repositoryLocation");
					xml.element("workID", data.lido2.beschreibung_form.objekt_identifikation.inventarnummer,[["lido:type","inventory number"]]);
				xml.close("repositorySet");
			xml.close("repositoryWrap");
			xml.open("objectDescriptionWrap");
				xml.open("objectDescriptionSet");
					xml.element("descriptiveNoteValue", data.lido2.beschreibung_form.objekt_identifikation.objektbeschreibung);
				xml.close("objectDescriptionSet");
			xml.close("objectDescriptionWrap");
			xml.open("objectMeasurementsWrap");
				xml.open("objectMeasurementsSet");
					xml.open("objectMeasurements");
						xml.open("measurementsSet");						
							xml.element("measurementType", data.lido2.beschreibung_form.objekt_identifikation.maßtyp);
							xml.element("measurementUnit", data.lido2.beschreibung_form.objekt_identifikation.maßeinheit);
							xml.element("measurementValue", data.lido2.beschreibung_form.objekt_identifikation.maße);								
						xml.close("measurementsSet");
					xml.close("objectMeasurements");						
				xml.close("objectMeasurementsSet");
			xml.close("objectMeasurementsWrap");
		xml.close("objectIdentificationWrap");
//eventWrap :Herstellung
		xml.open("eventWrap");
			xml.open("eventSet");
				xml.element("displayEvent", data.lido3.herstellung_form.herstellungsbeschreibung);
				xml.open("event");
					xml.open("eventType");
						create_lido_term("Herstellung");
					xml.close("eventType");
					xml.open("eventActor");
					//Herstellung Actor
					forEach(data.lido3.persons.list, function(person) {
						xml.open("actorInRole");
							xml.open("actor", [["lido:type","person"]]);
								xml.element("actorID", person.pnd_id,[["lido:type","d-nb.info"],["lido:source","http://d-nb.info/gnd/" + person.pnd_id]]);
								xml.open("nameActorSet");
									xml.element("appellationValue", person.name,[["lido:pref","preferred"]]);
								xml.close("nameActorSet");
								xml.open("vitalDatesActor");
									xml.element("earliestDate", person.geburtsjahr);
									xml.element("latestDate", person.sterbejahr);
								xml.close("vitalDatesActor");
								xml.element("genderActor", person.geschlecht);
							xml.close("actor");
							xml.open("roleActor");
								create_lido_term(person.function);
							xml.close("roleActor");
						xml.close("actorInRole");
					});	
					xml.close("eventActor");
					xml.open("culture");
						create_lido_term(data.lido3.herstellung_form.culture);
					xml.close("culture");
					xml.open("eventDate");
						xml.open("date");
							xml.element("earliestDate", data.lido3.herstellung_form.earliest_date);
							xml.element("latestDate", data.lido3.herstellung_form.latest_date);
						xml.close("date");
					xml.close("eventDate");
				xml.close("event");
			xml.close("eventSet");
		xml.close("eventWrap");
//eventWrap :Inszenierung
		xml.open("eventWrap");
			xml.open("eventSet");
				xml.element("displayEvent", data.lido4.inszenierung_form.performancebeschreibung);
				xml.open("event");
					xml.open("eventType");
						create_lido_term("Performance");
					xml.close("eventType");
					xml.open("eventActor");
					//Herstellung Actor
					forEach(data.lido4.persons.list, function(person) {
						xml.open("actorInRole");
							xml.open("actor", [["lido:type","person"]]);
								xml.element("actorID", person.pnd_id,[["lido:type","d-nb.info"],["lido:source","http://d-nb.info/gnd/" + person.pnd_id]]);
								xml.open("nameActorSet");
									xml.element("appellationValue", person.name,[["lido:pref","preferred"]]);
								xml.close("nameActorSet");
								xml.open("vitalDatesActor");
									xml.element("earliestDate", person.geburtsjahr);
									xml.element("latestDate", person.sterbejahr);
								xml.close("vitalDatesActor");
								xml.element("genderActor", person.geschlecht);
							xml.close("actor");
							xml.open("roleActor");
								create_lido_term(person.function);
							xml.close("roleActor");
						xml.close("actorInRole");
					});	
					xml.close("eventActor");
					xml.open("culture");
						create_lido_term(data.lido4.inszenierung_form.culture);
					xml.close("culture");
					xml.open("eventDate");
						xml.open("date");
							xml.element("earliestDate", data.lido4.inszenierung_form.earliest_date);
							xml.element("latestDate", data.lido4.inszenierung_form.latest_date);
						xml.close("date");
					xml.close("eventDate");
				xml.close("event");
			xml.close("eventSet");
		xml.close("eventWrap");
//eventWrap :Erwerb
		xml.open("eventWrap");
			xml.open("eventSet");
				xml.element("displayEvent", data.lido5.erwerb_form.provenienzbeschreibung);
				xml.open("event");
					xml.open("eventType");
						create_lido_term("Provenienz");
					xml.close("eventType");
					xml.open("eventActor");
					//Herstellung Actor
					forEach(data.lido5.persons.list, function(person) {
						xml.open("actorInRole");
							xml.open("actor", [["lido:type","person"]]);
								xml.element("actorID", person.pnd_id,[["lido:type","d-nb.info"],["lido:source","http://d-nb.info/gnd/" + person.pnd_id]]);
								xml.open("nameActorSet");
									xml.element("appellationValue", person.name,[["lido:pref","preferred"]]);
								xml.close("nameActorSet");
								xml.open("vitalDatesActor");
									xml.element("earliestDate", person.geburtsjahr);
									xml.element("latestDate", person.sterbejahr);
								xml.close("vitalDatesActor");
								xml.element("genderActor", person.geschlecht);
							xml.close("actor");
							xml.open("roleActor");
								create_lido_term(person.function);
							xml.close("roleActor");
						xml.close("actorInRole");
					});	
					xml.close("eventActor");
					xml.open("culture");
						create_lido_term(data.lido5.erwerb_form.culture);
					xml.close("culture");
					xml.open("eventDate");
						xml.open("date");
							xml.element("earliestDate", data.lido5.erwerb_form.earliest_date);
							xml.element("latestDate", data.lido5.erwerb_form.latest_date);
						xml.close("date");
					xml.close("eventDate");
				xml.close("event");
			xml.close("eventSet");
		xml.close("eventWrap");
//objectRelationWrap :Objektbeschreibung
		xml.open("objectRelationWrap");
			xml.open("subjectWrap");
				xml.open("subjectSet");
					xml.element("displaySubject", data.lido2.beschreibung_form.objektzuordnung.thematik.thematik);
					xml.open("subject");
						xml.open("subjectDate");
							xml.element("displayDate", "Wo soll das eingegeben werden?");
						xml.close("subjectDate");
						xml.open("subjectEvent");
							xml.element("displayEvent", "Wo soll das eingegeben werden?");
							xml.open("event");
								xml.open("eventType");
									create_lido_term("Wo soll das eingegeben werden?");
								xml.close("eventType");
								xml.open("eventName");
									xml.element("appellationValue", "Wo soll das eingegeben werden?");
								xml.close("eventName");
								//Inszenierung Actor
								
									xml.open("eventActor"); 
										xml.element("displayActorInRole", "Wo soll das eingegeben werden?");
										xml.open("actorInRole");
											xml.open("actor");
												xml.open("nameActorSet");
													xml.element("appellationValue", "Wo soll das eingegeben werden?");
												xml.close("nameActorSet");
											xml.close("actor");
											xml.open("roleActor");
												create_lido_term("Wo soll das eingegeben werden?");
											xml.close("roleActor");
										xml.close("actorInRole");
									xml.close("eventActor");

								xml.open("culture");
									create_lido_term("Wo soll das eingegeben werden?");
								xml.close("culture");
								xml.open("eventDate");
									xml.open("date");
										xml.element("earliestDate", "Wo soll das eingegeben werden?");
										xml.element("latestDate", "Wo soll das eingegeben werden?");
									xml.close("date");									
								xml.close("eventDate");
							xml.close("event");
						xml.close("subjectEvent");
					xml.close("subject");
				xml.close("subjectSet");
			xml.close("subjectWrap");
		xml.close("objectRelationWrap");		
	xml.close("descriptiveMetadata");

//administrativeMetadata :Infos
			xml.open("administrativeMetadata", [["xml:lang", "de"]]);
			xml.open("rightsWorkWrap");
				xml.open("rightsWorkSet");
					xml.open("rightsType");
						xml.element("term", "Wo soll das eingegeben werden?");
					xml.close("rightsType");
					xml.open("rightsDate");
						xml.element("earliestDate", "Wo soll das eingegeben werden?");
						xml.element("latestDate", "Wo soll das eingegeben werden?");
					xml.close("rightsDate");
					xml.open("rightsHolder");
						xml.open("legalBodyName");
							xml.element("appellationValue", "Wo soll das eingegeben werden?");
						xml.close("legalBodyName");
					xml.close("rightsHolder");
				xml.close("rightsWorkSet");
			xml.close("rightsWorkWrap");				
			
			xml.open("recordWrap");
				xml.element("recordID", data.lido1.start_form.eintragsdokumentation.objektsignatur, [["lido:type", "local"]]);
				xml.open("recordType");
					xml.element("term", data.lido1.start_form.eintragsdokumentation.eintragsart);
				xml.close("recordType");
				xml.open("recordSource");
					xml.open("legalBodyName");
						xml.element("appellationValue", "Theaterwissenschaftliche Sammlung, Universität zu Köln");
					xml.close("legalBodyName");
				xml.close("recordSource");
			xml.close("recordWrap");
//administrativeMetadata :Bilder
			
			forEach(data.lido1.resources.list, function(picture) {
				xml.open("resourceWrap");
					xml.open("resourceSet");
						xml.element("resourceID", picture.name, [["lido:type", "local"]]);
						xml.open("resourceRepresentation");
							xml.element("linkResource", picture.name);
						xml.close("resourceRepresentation");
						xml.open("resourceType");
							xml.element("term", picture.type);
						xml.close("resourceType");
						xml.open("resourceSource");
							xml.open("legalBodyName");
								xml.element("appellationValue", "Theaterwissenschaftliche Sammlung, Universität zu Köln");
							xml.close("legalBodyName");
						xml.close("resourceSource");					
					xml.close("resourceSet");
				xml.close("resourceWrap");
			});

		xml.close("administrativeMetadata");	

	};

	console.log(data);
	create_lido_entry(data);
	
	
	return xml.getString();

};

