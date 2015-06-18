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

	var create_lido_entry = function (data) {
    
//Lido Head
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


//objectIdentificationWrap
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
						create_lido_term("Herstellung","de","lang");
					xml.close("eventType");
					xml.open("eventActor");
					data.lido3.
//Herstellung Actor
					forEach(data.lido3.person_form, function(person) {
					
						xml.open("actorInRole");
							xml.open("actor", [["lido:type","person"]]);
								xml.element("actorID", person.pnd_id,[["lido:type","d-nb.info"],["lido:source","http://d-nb.info/gnd/" + data.event.actor.pnd_id]]);
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
	
		xml.close("administrativeMetadata");	

	};

	console.log(data);
	create_lido_entry(data);
	
	
	return xml.getString();

};