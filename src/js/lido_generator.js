lido_environment.lido_generator = function (data) {
    "use strict";

    var xml = new XMLString();

    xml.reset();
    xml.setElementPrefix("lido");

    var parent = lido_environment;

    var digitalisat = lido_environment.workflow[0];
    var create_lido_term = function (term, entity, etype) {
        if (etype == "search") {
            xml.element("term", term, [["lido:addedSearchTerm", entity]]);
        }
        else if (etype == "lang") {
            xml.element("term", term, [["xml:lang", entity]]);
        }
        else if (etype == "encoding") {
            xml.element("term", term, [["lido:encodinganalog", entity]]);
        }
        else if (etype == "encoding_search") {
            xml.element("term", term, [["lido:addedSearchTerm", entity[0]], ["lido:encodinganalog", entity[1]]]);
        }
        else {
            xml.element("term", term);
        }
        ;
    }

    var write = function (data) {
        if (data == undefined) {
            return ""
        } else {
            return data.trim()
        }
        ;
    };
    var create_lido_aat = function (term) {
        console.log("in aat function", term);
        switch (term) {

            case 'Autograf: Album':
                return '300026691';
            case 'Autograf: Brief':
                return '300026879';
            case 'Autograf: Karte':
                return '300026816';
            case 'Autograf: Manuskript':
                return '300028569';
            case 'Autograf: Postkarte':
                return '300026816';
            case 'Figur: Büste':
                return '300047457';
            case 'Figur: Fingerpuppe':
                return '300222484';
            case 'Figur: Handpuppe':
                return '300211106';
            case 'Figur: Marionette':
                return '300211126';
            case 'Figur: Porzellanfigur':
                return '300310523';
            case 'Figur: Schattenspielfigur':
                return '300211230';
            case 'Figur: Skulptur':
                return '300047090';
            case 'Figur: Stockpuppe':
                return '300138750';
            case 'Film':
                return '300136900';
            case 'Fotografie: Allgemein':
                return '300138191';
            case 'Fotografie: Album':
                return '300026695';
            case 'Fotografie: Architektur (analog)':
                return '300046300';
            case 'Fotografie: Architektur (digital)':
                return '300215302';
            case 'Fotografie: Dia':
                return '300128371';
            case 'Fotografie: Film (analog)':
                return '300134997';
            case 'Fotografie: Film (digital)':
                return '300215302';
            case 'Fotografie: Inszenierung (analog)':
                return '300046300';
            case 'Fotografie: Inszenierung (digital)':
                return '300215302';
            case 'Fotografie: Negativ':
                return '300127173';
            case 'Fotografie: Person (analog)':
                return '300046300';
            case 'Fotografie: Person (digital)':
                return '300215302';
            case 'Gemälde':
                return '300033799';
            case 'Grafik: Bühnenbildentwurf':
                return '300015617';
            case 'Grafik: Kostümbildentwurf':
                return '300015617';
            case 'Grafik: Porträt':
                return '300033973';
            case 'Grafik: technische Zeichnung':
                return '300034789';
            case 'Grafik: Theaterbau':
                return '300015566';
            case 'Kostüm':
                return '300178802';
            case 'Maske: Lebendmaske':
                return '300047726';
            case 'Maske: Ritualmaske':
                return '300263916';
            case 'Maske: Theatermaske':
                return '300412124';
            case 'Maske: Totenmaske':
                return '300047724';
            case 'Modell: Bühnenbildmodell':
                return '300007122';
            case 'Modell: Theaterbaumodell':
                return '300007122';
            case 'Modell: Theatertechnik':
                return '300007122';
            case 'Musikalia: Libretti':
                return '300026424';
            case 'Musikalia: Noten':
                return '300026427';
            case 'Papiertheater':
                return '300263033';
            case 'Plakat: Film':
                return '300027221';
            case 'Plakat: Theater':
                return '300027221';
            case 'Publikation: Aufsatz':
                return '300048715';
            case 'Publikation: Broschüre':
                return '300248280';
            case 'Publikation: Buch':
                return '300028051';
            case 'Publikation: Programmheft':
                return '300027217';
            case 'Publikation: Regiebuch ':
                return '300026488';
            case 'Publikation: Zeitungsausschnitt':
                return '300026867';
            case 'Publikation: Theaterzettel':
                return '300027216';
            case 'Publikation: Zeitschrift':
                return '300026657';
            case 'Requisit':
                return '300263853';


            case 'Bild':
                return '300264387';
            case 'Figur':
                return '300047455';
            case 'Maske':
                return '300138758';
            case 'Modell':
                return '300047753';
            case 'Plastik':
                return '300047090';
            case 'Schrift':
                return '300263751';
            case 'Gemischtes Konvolut':
                return '';

            default:
                return '';

        }
    }

    var create_lido_entry = function (data) {

//Lido Head :Start
        xml.header();
        xml.open("lido", [
            ["xmlns:lido", "http://www.lido-schema.org"], ["xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance"],
            ["xsi:schemaLocation", "http://www.lido-schema.org http://www.lido-schema.org/schema/v1.0/lido-v1.0.xsd"]
        ]);



        if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("TWS")){
            xml.element("lidoRecID", write(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur), [["lido:source", "Theaterwissenschaftliche Sammlung, Universität zu Köln"], ["lido:type", "local"]]);
        }
        else if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("IFT")) {
            xml.element("lidoRecID", write(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur), [["lido:source", "Institut für Theaterwissenschaft, FU Berlin"], ["lido:type", "local"]]);
        }
        else {
            xml.element("lidoRecID", write(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur), [["lido:source", "Unbekannt"], ["lido:type", "local"]]);
        
        }
        xml.open("category");
        xml.element("conceptID", write(data.lido1.start_form.eintragsdokumentation.objektsignatur), [["lido:type", "AAT"]]);
        create_lido_term(data.lido1.start_form.eintragsdokumentation.eintragsart, "de", "lang");
        xml.close("category");

        xml.open("descriptiveMetadata", [["xml:lang", "de"]]);
//objectClassificationWrap :Objektbeschreibung
        xml.open("objectClassificationWrap");
        xml.open("objectWorkTypeWrap");
        xml.open("objectWorkType");
        xml.element("conceptID", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektgattung), [["lido:type", "AAT"]]);
        var entity = new Array("yes", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektgattung));
        create_lido_term(data.lido2.beschreibung_form.objektzuordnung.objektgattung, entity, "encoding_search");
        xml.close("objectWorkType");
        xml.close("objectWorkTypeWrap");
        xml.open("classificationWrap");
        xml.open("classification", [["lido:type", "AAT"]]);
        xml.element("conceptID", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektart), [["lido:type", "AAT"]]);
        var entity = new Array("yes", create_lido_aat(data.lido2.beschreibung_form.objektzuordnung.objektart));
        create_lido_term(data.lido2.beschreibung_form.objektzuordnung.objektart, entity, "encoding_search");
        xml.close("classification");
        xml.close("classificationWrap");
        xml.close("objectClassificationWrap");
//objectIdentificationWrap :Objektbeschreibung
        xml.open("objectIdentificationWrap");
        xml.open("titleWrap");
        xml.open("titleSet");
        xml.element("appellationValue", write(data.lido2.beschreibung_form.objekt_identifikation.titel), [["lido:pref", "preferred"], ["xml:lang", "de"]]);
        xml.close("titleSet");
        xml.close("titleWrap");
        xml.open("repositoryWrap");
        xml.open("repositorySet", [["lido:type", "current"]]);
        xml.open("repositoryName");
        xml.open("legalBodyName");
        xml.element("appellationValue", write(data.lido2.beschreibung_form.objekt_identifikation.besitzende_institution));
        xml.close("legalBodyName");
        xml.close("repositoryName");
        xml.element("workID", write(data.lido1.start_form.digitalisierungssignatur.inventarnummer), [["lido:type", "inventory number"]]);
        xml.open("repositoryLocation");
        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido2.beschreibung_form.objekt_identifikation.standort_tws));
        xml.close("namePlaceSet");
        xml.close("repositoryLocation");

        xml.close("repositorySet");
        xml.close("repositoryWrap");
        xml.open("objectDescriptionWrap");
        xml.open("objectDescriptionSet");
        xml.element("descriptiveNoteValue", write(data.lido2.beschreibung_form.objekt_identifikation.objektbeschreibung));
        xml.close("objectDescriptionSet");
        xml.close("objectDescriptionWrap");
        /*
                    if (data.lido2.beschreibung_form.objekt_identifikation.depth == "") {
                    //nur Höhe x Breite
                    xml.open("objectMeasurementsWrap");
                        xml.open("objectMeasurementsSet");
                            xml.open("objectMeasurements");
                                xml.element("displayObjectMeasurements", "H: " + data.lido2.beschreibung_form.objekt_identifikation.height + " "+ data.lido2.beschreibung_form.objekt_identifikation.maßeinheit + ", B: " + data.lido2.beschreibung_form.objekt_identifikation.width + " "+ data.lido2.beschreibung_form.objekt_identifikation.maßeinheit) ;
                                xml.open("measurementsSet");
                                    xml.element("measurementUnit", data.lido2.beschreibung_form.objekt_identifikation.maßeinheit);
                                    xml.element("measurementType", "height");
                                    xml.element("measurementValue", data.lido2.beschreibung_form.objekt_identifikation.height);
                                xml.close("measurementsSet");
                                xml.open("measurementsSet");
                                    xml.element("measurementUnit", data.lido2.beschreibung_form.objekt_identifikation.maßeinheit);
                                    xml.element("measurementType", "width");
                                    xml.element("measurementValue", data.lido2.beschreibung_form.objekt_identifikation.width);
                                xml.close("measurementsSet");
                                ;

                            xml.close("objectMeasurements");
                        xml.close("objectMeasurementsSet");
                    xml.close("objectMeasurementsWrap");
                    } else {*/
        // Höhe x Breite x Tiefe
        xml.open("objectMeasurementsWrap");
        xml.open("objectMeasurementsSet");
        xml.element("displayObjectMeasurements", "H: " + write(data.lido2.beschreibung_form.objekt_identifikation.height) + " " + write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit) + ", B: " + write(data.lido2.beschreibung_form.objekt_identifikation.width) + " " + write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit) + ", T: " + write(data.lido2.beschreibung_form.objekt_identifikation.depth) + " " + write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit));
        xml.open("objectMeasurements");

        xml.open("measurementsSet");
        xml.element("measurementType", "height");
        xml.element("measurementUnit", write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit));

        xml.element("measurementValue", write(data.lido2.beschreibung_form.objekt_identifikation.height));
        xml.close("measurementsSet");
        xml.open("measurementsSet");
        xml.element("measurementType", "width");
        xml.element("measurementUnit", write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit));
        xml.element("measurementValue", write(data.lido2.beschreibung_form.objekt_identifikation.width));
        xml.close("measurementsSet");
        xml.open("measurementsSet");
        xml.element("measurementType", "depth");
        xml.element("measurementUnit", write(data.lido2.beschreibung_form.objekt_identifikation.maßeinheit));
        xml.element("measurementValue", write(data.lido2.beschreibung_form.objekt_identifikation.depth));
        xml.close("measurementsSet");

        xml.close("objectMeasurements");
        xml.close("objectMeasurementsSet");
        xml.close("objectMeasurementsWrap");
        /*};*/

        xml.close("objectIdentificationWrap");
//eventWrap :Herstellung
        xml.open("eventWrap");
        xml.open("eventSet");
        xml.element("displayEvent", write(data.lido3.herstellung_form.herstellungsbeschreibung));
        xml.open("event");
      /*  xml.element("eventID", write(data.lido3.herstellung_form.uuid), [["lido:type", "uuid"]]);*/
        xml.open("eventType");
        create_lido_term("Herstellung");
        xml.close("eventType");

        //Herstellung Actor
        forEach(data.lido3.persons.list, function (person) {
            xml.open("eventActor");
            xml.element("displayActorInRole", write(person.comment));
            xml.open("actorInRole");
            if (person.geschlecht == "kein Geschlecht") {
                xml.open("actor", [["lido:type", "Körperschaft"]])

            } else {
                xml.open("actor", [["lido:type", "Person"]]);

            }
            xml.element("actorID", write(person.pnd_id), [["lido:type", "d-nb.info"], ["lido:source", "http://d-nb.info/gnd/" + write(person.pnd_id)]]);
            xml.element("actorID", write(person.uuid), [["lido:type", "uuid"]]);
            xml.open("nameActorSet");
            xml.element("appellationValue", write(person.name), [["lido:pref", "preferred"]]);
            xml.close("nameActorSet");
            xml.open("vitalDatesActor");
            xml.element("earliestDate", write(person.geburtsjahr));
            xml.element("latestDate", write(person.sterbejahr));
            xml.close("vitalDatesActor");
            xml.element("genderActor", write(person.geschlecht));
            xml.close("actor");
            xml.open("roleActor");
            create_lido_term(write(person.function1));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function2));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function3));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function4));
            xml.close("roleActor");
            xml.close("actorInRole");
            xml.close("eventActor");
        });

        xml.open("culture");
        create_lido_term(write(data.lido3.herstellung_form.culture));
        xml.close("culture");
        xml.open("eventDate");
        xml.open("date");
        xml.element("earliestDate", write(data.lido3.herstellung_form.earliest_date));
        xml.element("latestDate", write(data.lido3.herstellung_form.latest_date));
        xml.close("date");
        xml.close("eventDate");
        xml.open("eventPlace");
        xml.open("place");

        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido3.herstellung_form.ort));
        xml.close("namePlaceSet");

        xml.close("place");
        xml.close("eventPlace");


        xml.close("event");
        xml.close("eventSet");

//eventWrap :Inszenierung

        xml.open("eventSet");
        xml.element("displayEvent", write(data.lido4.inszenierung_form.performancebeschreibung));
        xml.open("event");
        xml.element("eventID", write(data.lido4.inszenierung_form.uuid), [["lido:type", "uuid"]]);
        xml.open("eventType");
        xml.element("term", "Performance", [["lido:label", "primary"]]);
        xml.element("term", write(data.lido4.inszenierung_form.premier_type), [["lido:label", "secondary"]]);
        xml.close("eventType");

        xml.open("eventName");
        xml.element("appellationValue", write(data.lido4.inszenierung_form.titel), [["lido:pref", "preferred"]]);
        xml.element("appellationValue", write(data.lido4.inszenierung_form.alternatetitel), [["lido:pref", "alternate"]]);
        xml.close("eventName");

        //Inszenierung Actor
        forEach(data.lido4.persons.list, function (person) {
            xml.open("eventActor");
            xml.element("displayActorInRole", write(person.comment));
            xml.open("actorInRole");

            if (person.geschlecht == "kein Geschlecht") {
                xml.open("actor", [["lido:type", "Körperschaft"]])

            } else {
                xml.open("actor", [["lido:type", "Person"]]);

            }

            xml.element("actorID", write(person.pnd_id), [["lido:type", "d-nb.info"], ["lido:source", "http://d-nb.info/gnd/" + write(person.pnd_id)]]);
            xml.element("actorID", write(person.uuid), [["lido:type", "uuid"]]);
            xml.open("nameActorSet");
            xml.element("appellationValue", write(person.name), [["lido:pref", "preferred"]]);
            xml.close("nameActorSet");
            xml.open("vitalDatesActor");
            xml.element("earliestDate", write(person.geburtsjahr));
            xml.element("latestDate", write(person.sterbejahr));
            xml.close("vitalDatesActor");
            xml.element("genderActor", write(person.geschlecht));
            xml.close("actor");
            xml.open("roleActor");
            create_lido_term(write(person.rolle));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function1));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function2));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function3));
            xml.close("roleActor");
            xml.open("roleActor");
            create_lido_term(write(person.function4));
            xml.close("roleActor");
            xml.close("actorInRole");
            xml.close("eventActor");
        });

        xml.open("culture");
        create_lido_term(write(data.lido4.inszenierung_form.culture));
        xml.close("culture");
        xml.open("eventDate");

        xml.element("displayDate", write(data.lido4.inszenierung_form.premier_date));
        xml.open("date");
        xml.element("earliestDate", write(data.lido4.inszenierung_form.earliest_date));
        xml.element("latestDate", write(data.lido4.inszenierung_form.latest_date));
        xml.close("date");
        xml.close("eventDate");
        xml.open("eventPlace");
        xml.open("place");
        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido4.inszenierung_form.ort_city) + " " + write(data.lido4.inszenierung_form.ort_theater));
        xml.close("namePlaceSet");
        xml.open("partOfPlace", [["lido:politicalEntity", "Stadt"]]);
        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido4.inszenierung_form.ort_city));
        xml.close("namePlaceSet");
        xml.close("partOfPlace");
        xml.close("place");
        xml.close("eventPlace");
        xml.open("eventPlace");
        xml.open("place");
        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido4.inszenierung_form.ort_theater));
        xml.close("namePlaceSet");
        xml.close("place");
        xml.close("eventPlace");
        xml.open("eventPlace");
        xml.open("place");
        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido4.inszenierung_form.add_ort));
        xml.close("namePlaceSet");
        xml.close("place");
        xml.close("eventPlace");

        xml.close("event");
        
        xml.close("eventSet");
        //eventWrap :Erwerb

        xml.open("eventSet");
        xml.element("displayEvent", write(data.lido6.erwerb_form.provenienzbeschreibung));
        xml.open("event");
        /*xml.element("eventID", write(data.lido6.erwerb_form.uuid), [["lido:type", "uuid"]]);*/
        xml.open("eventType");
        create_lido_term("Provenienz");
        xml.close("eventType");

        //Erwerb Actor
        forEach(data.lido6.persons.list, function (person) {

            xml.open("eventActor");
            xml.element("displayActorInRole", write(person.comment));
            xml.open("actorInRole");
            if (person.geschlecht == "kein Geschlecht") {
                xml.open("actor", [["lido:type", "Körperschaft"]])

            } else {
                xml.open("actor", [["lido:type", "Person"]]);

            }
            xml.element("actorID", write(person.pnd_id), [["lido:type", "d-nb.info"], ["lido:source", "http://d-nb.info/gnd/" + write(person.pnd_id)]]);
            xml.element("actorID", write(person.uuid), [["lido:type", "uuid"]]);
            xml.open("nameActorSet");
            xml.element("appellationValue", write(person.name), [["lido:pref", "preferred"]]);
            xml.close("nameActorSet");
            xml.open("vitalDatesActor");
            xml.element("earliestDate", write(person.geburtsjahr));
            xml.element("latestDate", write(person.sterbejahr));
            xml.close("vitalDatesActor");
            xml.element("genderActor", write(person.geschlecht));
            xml.close("actor");
            xml.open("roleActor");
            create_lido_term(write(person.function));
            xml.close("roleActor");
            xml.close("actorInRole");
            xml.close("eventActor");
        });

        xml.open("culture");
        create_lido_term(write(data.lido6.erwerb_form.culture));
        xml.close("culture");
        xml.open("eventDate");
        xml.open("date");
        xml.element("earliestDate", write(data.lido6.erwerb_form.earliest_date));
        xml.element("latestDate", write(data.lido6.erwerb_form.latest_date));
        xml.close("date");
        xml.close("eventDate");
        xml.open("eventPlace");
        xml.open("place");

        xml.open("namePlaceSet");
        xml.element("appellationValue", write(data.lido6.erwerb_form.ort));
        xml.close("namePlaceSet");

        xml.close("place");
        xml.close("eventPlace");

        xml.close("event");
        xml.close("eventSet");
//eventWrap :Events
        for (var i = 0; i < data.lido5.events.list.length; ++i) {
            var event = data.lido5.events.list[i];
            xml.open("eventSet");
            xml.element("displayEvent", write(event.performancebeschreibung));
            xml.open("event");
            xml.element("eventID", write(event.uuid), [["lido:type", "uuid"]]);
            xml.open("eventType");
            if(event.eventtype == "Inszenierung/Performance") {
                create_lido_term(write("Performance"));
            } else {
            create_lido_term(write(event.eventtype));
            }
            xml.close("eventType");
            xml.open("eventName");
            xml.element("appellationValue", write(event.titel));
            xml.close("eventName");
            /*xml.open("eventName");
                xml.element("appellationValue", event.alternatetitel);
            xml.close("eventName");*/

            //Event Actor
            forEach(event.personlist.list, function (person) {
                xml.open("eventActor");

                xml.element("displayActorInRole", write(person.comment));
                xml.open("actorInRole");
                if (person.geschlecht == "kein Geschlecht") {
                    xml.open("actor", [["lido:type", "Körperschaft"]])

                } else {
                    xml.open("actor", [["lido:type", "Person"]]);

                }
                xml.element("actorID", write(person.pnd_id), [["lido:type", "d-nb.info"], ["lido:source", "http://d-nb.info/gnd/" + write(person.pnd_id)]]);
                xml.element("actorID", write(person.uuid), [["lido:type", "uuid"]]);
                xml.open("nameActorSet");
                xml.element("appellationValue", write(person.name), [["lido:pref", "preferred"]]);
                xml.close("nameActorSet");
                xml.open("vitalDatesActor");
                xml.element("earliestDate", write(person.geburtsjahr));
                xml.element("latestDate", write(person.sterbejahr));
                xml.close("vitalDatesActor");
                xml.element("genderActor", write(person.geschlecht));
                xml.close("actor");
                xml.open("roleActor");
                create_lido_term(write(person.function1));
                xml.close("roleActor");
                xml.open("roleActor");
                create_lido_term(write(person.function2));
                xml.close("roleActor");
                xml.open("roleActor");
                create_lido_term(write(person.function3));
                xml.close("roleActor");
                xml.open("roleActor");
                create_lido_term(write(person.function4));
                xml.close("roleActor");
                xml.close("actorInRole");
                xml.close("eventActor");
            });

            xml.open("culture");
            create_lido_term(write(event.culture));
            xml.close("culture");
            xml.open("eventDate");
            xml.element("displayDate", write(event.premier_date));
            xml.open("date");
            xml.element("earliestDate", write(event.earliest_date));
            xml.element("latestDate", write(event.latest_date));
            xml.close("date");
            xml.close("eventDate");
            xml.open("eventPlace");
            xml.open("place");
            xml.open("namePlaceSet");
            xml.element("appellationValue", write(event.ort_city) + " " + write(event.ort_theater));
            xml.close("namePlaceSet");
            xml.open("partOfPlace", [["lido:politicalEntity", "Stadt"]]);
            xml.open("namePlaceSet");
            xml.element("appellationValue", write(event.ort_city));
            xml.close("namePlaceSet");
            xml.close("partOfPlace");
            xml.close("place");
            xml.close("eventPlace");
            xml.open("eventPlace");
            xml.open("place");
            xml.open("namePlaceSet");
            xml.element("appellationValue", write(event.ort_theater));
            xml.close("namePlaceSet");
            xml.close("place");
            xml.close("eventPlace");

            xml.close("event");
            xml.close("eventSet");
        }
        ;

//eventWrap :Erwerb
        /*
                    xml.open("eventSet");
                        xml.element("displayEvent", data.lido6.erwerb_form.provenienzbeschreibung);
                        xml.open("event");
                            xml.open("eventType");
                                create_lido_term("Provenienz");
                            xml.close("eventType");
                            xml.open("eventActor");
                            //Erwerb Actor
                            forEach(data.lido6.persons.list, function(person) {
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
                                create_lido_term(data.lido6.erwerb_form.culture);
                            xml.close("culture");
                            xml.open("eventDate");
                                xml.open("date");
                                    xml.element("earliestDate", data.lido6.erwerb_form.earliest_date);
                                    xml.element("latestDate", data.lido6.erwerb_form.latest_date);
                                xml.close("date");
                            xml.close("eventDate");
                        xml.close("event");
                    xml.close("eventSet");*/
        xml.close("eventWrap");
//objectRelationWrap :Objektbeschreibung
        xml.open("objectRelationWrap");
        xml.open("subjectWrap");
        xml.open("subjectSet");
        xml.element("displaySubject", write(data.lido2.beschreibung_form.objektzuordnung.thematik.thematik));
        xml.element("displaySubject", write(data.lido2.beschreibung_form.objektzuordnung.literatur.literatur));
        xml.open("subject");
        //Abgebildete Personen
        forEach(data.lido2.persons.list, function (person) {
            xml.open("subjectActor");
            /* Optional? displayActor*/
            xml.element("displayActor", write(person.comment));
            xml.open("actor", [["lido:type", "Person"]]);
            xml.element("actorID", write(person.pnd_id), [["lido:type", "d-nb.info"], ["lido:source", "http://d-nb.info/gnd/" + write(person.pnd_id)]]);
            xml.element("actorID", write(person.uuid), [["lido:type", "uuid"]]);
            xml.open("nameActorSet");
            xml.element("appellationValue", write(person.name), [["lido:label", "actor"]]);
            xml.element("appellationValue", write(person.rolle), [["lido:label", "role"]]);
            xml.close("nameActorSet");
            xml.close("actor");
            xml.close("subjectActor");
        });

        xml.close("subject");
        xml.close("subjectSet");
        xml.close("subjectWrap");
        xml.open("relatedWorksWrap");
        xml.open("relatedWorkSet");
        xml.open("relatedWork");
        xml.element("displayObject", write(data.lido1.start_form.related.partof1));
        xml.open("object");
        xml.element("objectID", write(data.lido1.start_form.related.partof), [["lido:type", "Signatur"]]);
        xml.element("objectNote", write(data.lido1.start_form.related.partof2));
        xml.close("object");
        xml.close("relatedWork");


        xml.close("relatedWorkSet");
        xml.close("relatedWorksWrap");
        xml.close("objectRelationWrap");

        xml.close("descriptiveMetadata");

//administrativeMetadata :Infos
        xml.open("administrativeMetadata", [["xml:lang", "de"]]);
        xml.open("rightsWorkWrap");
        xml.open("rightsWorkSet");
        xml.open("rightsType");
        xml.element("conceptID", String(data.lido1.start_form.legal.rights), [["lido:type", String(data.lido1.start_form.legal.rights)]]);
        xml.close("rightsType");
        xml.close("rightsWorkSet");
        xml.close("rightsWorkWrap");
        xml.open("recordWrap");
        xml.element("recordID", write(data.lido1.start_form.eintragsdokumentation.objektsignatur), [["lido:type", "local"]]);
        xml.open("recordType");
        xml.element("term", write(data.lido1.start_form.eintragsdokumentation.eintragsart));
        xml.close("recordType");
        xml.open("recordSource");
        xml.open("legalBodyName");

        if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("TWS")){
            xml.element("appellationValue", "Theaterwissenschaftliche Sammlung, Universität zu Köln");        }
        else if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("IFT")) {
            xml.element("appellationValue", "Institut für Theaterwissenschaft, FU Berlin");        }
        else {
            xml.element("appellationValue", "Unbekannt");        
        }


        
        xml.close("legalBodyName");
        xml.close("recordSource");

        xml.open("recordRights");
        xml.open("rightsHolder");
        xml.open("legalBodyName");
        xml.element("appellationValue", write(data.lido1.start_form.editor.editor));
        xml.close("legalBodyName");
        xml.close("rightsHolder");
        xml.close("recordRights");

        xml.close("recordWrap");
//administrativeMetadata :Bilder
        xml.open("resourceWrap");

        forEach(data.lido1.resources.list, function (picture) {
            console.log(picture);
            xml.open("resourceSet");
            xml.element("resourceID", write(picture.name), [["lido:type", "local"]]);
            if(picture.type == "3D model") {
                xml.open("resourceRepresentation", [["lido:type", "3D preview"]]);
            } else {
                xml.open("resourceRepresentation");
            }

            xml.element("linkResource", write(picture.link));
            xml.close("resourceRepresentation");
            xml.open("resourceType");
            xml.element("term", write(picture.type));
            xml.close("resourceType");
            xml.open("resourceSource");
            xml.open("legalBodyName");
            if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("TWS")){
                xml.element("appellationValue", "Theaterwissenschaftliche Sammlung, Universität zu Köln");        }
            else if(data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur.startsWith("IFT")) {
                xml.element("appellationValue", "Institut für Theaterwissenschaft, FU Berlin");        }
            else {
                xml.element("appellationValue", "Unbekannt");        
            }
            
            xml.close("legalBodyName");
            xml.close("resourceSource");


            xml.close("resourceSet");

        });

        xml.close("resourceWrap");
        xml.close("administrativeMetadata");
        xml.close("lido");


    };

    console.log(data);
    create_lido_entry(data);


    return xml.getString();

};