var lido_environment = (function () {

    var my = {};

    my.name = "lido";
    my.id = "lido";
    my.title = "LIDO";
    my.version = "2.1.5";


    my.workflow = [];

    my.init = function () {

        return;

    };


    var xmlQueryText = function (xml, array) {

        var node = xmlQuery(xml, array);

        return node.textContent.trim();

    };


    var xmlQuery = function (xml, array) {

        var node = xml;

        for (var n = 0; n < array.length; n++) {

            node = node.getElementsByTagName(array[n])[0];
            //log(node);

        }

        return node;

    };



    my.getIdentifiersFromDB = function (callback) {
        getWithAJAX(
            "http://localhost:8080/exist/rest/apps/theater-history/modules/output.xq",
            function (http) {

                var xml = http.responseXML;
                console.log(xml);

                //log(xml);
                // TODO: var list = xmlQuery(xml, ["ID"])
                var list = xmlQuery(xml, ["ul"]);
                console.log(list.children);
                var identifiers = map(list.children, function (header) {

                    return xmlQueryText(header, []);

                });

                callback(identifiers);

            }
        );

    };


    my.showIdentifierSelect = function () {

        my.getIdentifiersFromDB(function (identifiers) {

            //log(identifiers);

            APP.GUI.showSelectFrame(identifiers, identifiers, my.loadDocumentFromDB, "LIDO Documents in Database", undefined);

        });


    };


    my.loadDocumentFromDB = function (identifier) {

        var url = "http://localhost:8080/exist/rest/apps/theater-history/data/" + identifier + ".xml";

        getWithAJAX(
            url,
            function (http) {

                var xml = http.responseXML;
                console.log("xml:")
                console.log(xml);

                //var lido = xmlQuery(xml, ["OAI-PMH", "GetRecord", "record", "metadata", "lido"]);
                var lido = xmlQuery(xml, ["lido:lido"]);
                console.log("lido:")
                console.log(lido);
                //log(lido);

                my.importLIDOXML(xml);
                //my.importLIDOXML(lido);

                log("XML imported!");

            }
        );

    };




    my.importLIDOXML = function (xml) {

        var recreate_lido_aat = function (term) {
            switch (term) {
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

        var x = xml.getElementsByTagName("lido:lido");
        console.log("import" + x);




//Objektidentifikation

            var resourcesid = x[0].getElementsByTagName("lido:resourceSet");
            var resourceslist = new Array;

            for (var i = 0; i < resourcesid.length; ++i) {
                resourceslist[i] = {
                    "id": i,
                    "lastModified": "",
                    "name": resourcesid[i].getElementsByTagName("lido:resourceID")[0].firstChild.nodeValue,
                    "link": resourcesid[i].getElementsByTagName("lido:resourceRepresentation")[0].getElementsByTagName("lido:linkResource")[0].firstChild.nodeValue,
                    "selected": false,
                    "size": "",
                    "status": "stable",
                    "type": resourcesid[i].getElementsByTagName("lido:resourceType")[0].getElementsByTagName("lido:term")[0].firstChild.nodeValue
                }
            }
            var objectIdentificationWrap = x[0].getElementsByTagName("lido:objectIdentificationWrap")[0];
            /*if (objectIdentificationWrap.getElementsByTagName("lido:repositorySet")[0].getElementsByTagName("lido:workID")[0].firstChild != null) {
                var inventarnummerCache = objectIdentificationWrap.getElementsByTagName("lido:repositorySet")[0].getElementsByTagName("lido:workID")[0].firstChild.nodeValue;

            }
            else {
                var inventarnummerCache = "";

            };*/
            /*if (x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:conceptID")[0].firstChild != null) {
                var objektsignatur = x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:conceptID")[0].firstChild.nodeValue;

            }
            else {
                var objektsignatur = "";

            };*/
            console.log("rights", x);
            if (x[0].getElementsByTagName("lido:relatedWork")[0]) {
                var objectidentification = {
                    "resources": {
                        "id_counter": 0,
                        "info": "ObjectList state",
                        "list": resourceslist,
                        "pointer": 0
                    },
                    "start_form": {
                        "editor": {
                            "editor": my.checkExistence(x[0].getElementsByTagName("lido:recordRights")[0].getElementsByTagName("lido:legalBodyName")[0].getElementsByTagName("lido:appellationValue")[0]),
                        },
                        "digitalisierungssignatur": {
                            "digitalisierungssignatur": my.checkExistence(x[0].getElementsByTagName("lido:lidoRecID")[0]),
                            "inventarnummer": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:repositorySet")[0].getElementsByTagName("lido:workID")[0]),
                        },
                        "eintragsdokumentation": {
                            "eintragsart": my.checkExistence(x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:term")[0]),
                            "objektsignatur": my.checkExistence(x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:conceptID")[0]),
                        },

                        "related": {
                            "partof": my.checkExistence(x[0].getElementsByTagName("lido:relatedWork")[0].getElementsByTagName("lido:objectID")[0]),
                            "partof1": my.checkExistence(x[0].getElementsByTagName("lido:relatedWork")[0].getElementsByTagName("lido:displayObject")[0]),
                            "partof2": my.checkExistence(x[0].getElementsByTagName("lido:relatedWork")[0].getElementsByTagName("lido:objectNote")[0]),
                        },
                        "legal": {
                            "rights": my.checkExistence(x[0].getElementsByTagName("lido:rightsWorkSet")[0].getElementsByTagName("lido:rightsType")[0].getElementsByTagName("lido:conceptID")[0]) == "true",
                        }

                    }
                }
            }
            else {
                var objectidentification = {
                    "resources": {
                        "id_counter": 0,
                        "info": "ObjectList state",
                        "list": resourceslist,
                        "pointer": 0
                    },
                    "start_form": {
                        "editor": {
                            "editor": my.checkExistence(x[0].getElementsByTagName("lido:recordRights")[0].getElementsByTagName("lido:legalBodyName")[0].getElementsByTagName("lido:appellationValue")[0]),
                        },
                        "digitalisierungssignatur": {
                            "digitalisierungssignatur": my.checkExistence(x[0].getElementsByTagName("lido:lidoRecID")[0]),
                            "inventarnummer": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:repositorySet")[0].getElementsByTagName("lido:workID")[0]),
                        },
                        "eintragsdokumentation": {
                            "eintragsart": my.checkExistence(x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:term")[0]),
                            "objektsignatur": my.checkExistence(x[0].getElementsByTagName("lido:category")[0].getElementsByTagName("lido:conceptID")[0]),
                        },


                    }
                }
            }

            log(objectidentification);


//Objektbeschreibung


            var objectClassificationWrap = x[0].getElementsByTagName("lido:objectClassificationWrap")[0];
            var objectMeasureWrap = x[0].getElementsByTagName("lido:objectMeasurementsWrap")[0];
            console.log(objectIdentificationWrap);
            console.log(objectMeasureWrap);
            /*var height = function() {
                var measurementsSetlist = objectIdentificationWrap.getElementsByTagName("lido:measurementsSet");
                var measurementslist = [];
                for (var i = 0; i < measurementsSetlist.length; ++i) {
                    measurementslist[i] = measurementsSetlist[1].getElementsByTagName("lido:measurementValue")[0].firstChild.nodeValue;
                }

            };*/
            var beschreibungxml = x[0].getElementsByTagName("lido:subjectSet")[0];
            var beschreibungactor = beschreibungxml.getElementsByTagName("lido:subjectActor");
            var beschreibungactorlist = new Array;


            for (var i = 0; i < beschreibungactor.length; ++i) {
                beschreibungactorlist[i] = {
                    "uuid": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:actorID")[1]),
                    "display_name": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "id": i,
                    "name": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "pnd_id": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:actorID")[0]),
                    "rolle": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[1]),
                    "comment": my.checkExistence(beschreibungactor[i].getElementsByTagName("lido:displayActor")[0]),
                }
            }
            var objektbeschreibung = {
                "beschreibung_form": {
                    "objekt_identifikation": {
                        "besitzende_institution": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:legalBodyName")[0].getElementsByTagName("lido:appellationValue")[0]),


                        "maßeinheit": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:measurementsSet")[0].getElementsByTagName("lido:measurementUnit")[0]),
                        "height": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:measurementsSet")[0].getElementsByTagName("lido:measurementValue")[0]),
                        "width": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:measurementsSet")[1].getElementsByTagName("lido:measurementValue")[0]),
                        "depth": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:measurementsSet")[2].getElementsByTagName("lido:measurementValue")[0]),
                        "objektbeschreibung": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:objectDescriptionSet")[0].getElementsByTagName("lido:descriptiveNoteValue")[0]),
                        "standort_tws": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:namePlaceSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                        "titel": my.checkExistence(objectIdentificationWrap.getElementsByTagName("lido:titleSet")[0].getElementsByTagName("lido:appellationValue")[0])
                    },
                    "objektzuordnung": {

                        "objektart": objectClassificationWrap.getElementsByTagName("lido:classification")[0].getElementsByTagName("lido:term")[0].firstChild.nodeValue,
                        "objektgattung": objectClassificationWrap.getElementsByTagName("lido:objectWorkType")[0].getElementsByTagName("lido:term")[0].firstChild.nodeValue,
                        "thematik": {
                            "thematik": my.checkExistence(x[0].getElementsByTagName("lido:displaySubject")[0])

                        },
                        "literatur": {
                            "literatur": my.checkExistence(x[0].getElementsByTagName("lido:displaySubject")[1])
                        }
                    }
                },
                "persons": {
                    "id_counter": beschreibungactor.length,
                    "info": "ObjectList state",
                    "list": beschreibungactorlist,
                    "pointer": beschreibungactor.length - 1,

                }

            };

            log(objektbeschreibung);
            //my.workflow[1].recall(objektbeschreibung);

//Herstellung

            var herstellungxml = x[0].getElementsByTagName("lido:eventSet")[0];
        var herstellungactor = herstellungxml.getElementsByTagName("lido:eventActor");
        var herstellungactorlist = new Array;


                console.log("actor herstellung");
                console.log(herstellungactor.length);


                for (var i = 0; i < herstellungactor.length; ++i) {
                    console.log("actor herstellung");
                    console.log(herstellungactor[i]);
                    if (herstellungactor[i].getElementsByTagName("lido:roleActor")[1]) {
                        herstellungactorlist[i] = {
                           "uuid": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:actorID")[1]),
                           "display_name": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                            "function1": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                            "function2": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:roleActor")[1].getElementsByTagName("lido:term")[0]),
                            "function3": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:roleActor")[2].getElementsByTagName("lido:term")[0]),
                            "function4": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:roleActor")[3].getElementsByTagName("lido:term")[0]),
                            "geburtsjahr": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                            "geschlecht": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:genderActor")[0]),
                            "id": i,
                            "name": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                            "pnd_id": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                            "sterbejahr": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                            "comment": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:displayActorInRole")[0]),
                        };
                    }
                    else {

                        herstellungactorlist[i] = {
                            "display_name": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                            "function1": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                            "geburtsjahr": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                            "geschlecht": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:genderActor")[0]),
                            "id": i,
                            "name": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                            "pnd_id": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                            "sterbejahr": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                            "comment": my.checkExistence(herstellungactor[i].getElementsByTagName("lido:displayActorInRole")[0]),
                        };

                    }
                    ;
                }
                ;



            var herstellung = {
                "herstellung_form": {
                    /*"uuid": my.checkExistence(herstellungxml.getElementsByTagName("lido:eventID")[0]),
                  */  "culture": my.checkExistence(herstellungxml.getElementsByTagName("lido:culture")[0].getElementsByTagName("lido:term")[0]),
                    "earliest_date": my.checkExistence(herstellungxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:earliestDate")[0]),
                    "herstellungsbeschreibung": my.checkExistence(herstellungxml.getElementsByTagName("lido:displayEvent")[0]),
                    "latest_date": my.checkExistence(herstellungxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:latestDate")[0]),
                    "ort": my.checkExistence(herstellungxml.getElementsByTagName("lido:eventPlace")[0].getElementsByTagName("lido:appellationValue")[0])
                },
                "persons": {
                    "id_counter": herstellungactor.length,
                    "info": "ObjectList state",
                    "list": herstellungactorlist,
                    "pointer": herstellungactor.length - 1,


                }
            };
            log(herstellung);
            //my.workflow[2].recall(herstellung);

// Inszenierung

            var inszenierungxml = x[0].getElementsByTagName("lido:eventSet")[1];

        var inszenierungactorlist = new Array;

                var inszenierungactor = inszenierungxml.getElementsByTagName("lido:eventActor");

                for (var i = 0; i < inszenierungactor.length; ++i) {
                    inszenierungactorlist[i] = {
                      "uuid": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:actorID")[1]),
                       "display_name": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                        "rolle": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                        "function1": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:roleActor")[1].getElementsByTagName("lido:term")[0]),
                        "function2": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:roleActor")[2].getElementsByTagName("lido:term")[0]),
                        "function3": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:roleActor")[3].getElementsByTagName("lido:term")[0]),
                        "function4": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:roleActor")[4].getElementsByTagName("lido:term")[0]),
                        "geburtsjahr": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                        "geschlecht": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:genderActor")[0]),
                        "id": i,
                        "name": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                        "pnd_id": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                        "sterbejahr": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                        "comment": my.checkExistence(inszenierungactor[i].getElementsByTagName("lido:displayActorInRole")[0]),
                    }
                }

            var inszenierung = {
                "inszenierung_form": {
                   "uuid": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventID")[0]),
                   "titel": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventName")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "alternatetitel": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventName")[0].getElementsByTagName("lido:appellationValue")[1]),
                    "culture": my.checkExistence(inszenierungxml.getElementsByTagName("lido:culture")[0].getElementsByTagName("lido:term")[0]),
                    "earliest_date": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:earliestDate")[0]),
                    "performancebeschreibung": my.checkExistence(inszenierungxml.getElementsByTagName("lido:displayEvent")[0]),
                    "premier_date": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:displayDate")[0]),
                    "premier_type": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventType")[0].getElementsByTagName("lido:term")[1]),
                    "latest_date": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:latestDate")[0]),
                    "ort_city": my.checkExistence(inszenierungxml.getElementsByTagName("lido:partOfPlace")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "ort_theater": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventPlace")[1].getElementsByTagName("lido:appellationValue")[0]),
                    "add_ort": my.checkExistence(inszenierungxml.getElementsByTagName("lido:eventPlace")[2].getElementsByTagName("lido:appellationValue")[0])
                },
                "persons": {
                    "id_counter": inszenierungactor.length,
                    "info": "ObjectList state",
                    "list": inszenierungactorlist,
                    "pointer": inszenierungactor.length - 1


                }
            };
            log(inszenierung);
            //my.workflow[3].recall(inszenierung);


            // events

            var eventxml = x[0].getElementsByTagName("lido:eventSet");
            var eventlist = new Array;
            /*var eventactor = x[0].getElementsByTagName("lido:eventSet")[3].getElementsByTagName("lido:actorInRole");
            var eventactorlist = new Array;
            var personlist = new Array;*/


            for (var i = 3; i < eventxml.length; ++i) {
                var counter = i - 3;
                var eventactor = eventxml[i].getElementsByTagName("lido:eventActor");
                var eventactorlist = new Array;
                console.log(eventactor[0]);
                if (eventactor.length > 0 && eventactor[0].getElementsByTagName("lido:nameActorSet")[0] != undefined) {
                    for (var j = 0; j < eventactor.length; ++j) {
                        if (eventactor[j].getElementsByTagName("lido:roleActor")[1]) {
                            eventactorlist[j] = {
                                "uuid": my.checkExistence(eventactor[j].getElementsByTagName("lido:actorID")[1]),
                               "display_name": my.checkExistence(eventactor[j].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),

                                "function1": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                                "function2": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[1].getElementsByTagName("lido:term")[0]),
                                "function3": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[2].getElementsByTagName("lido:term")[0]),
                                "function4": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[3].getElementsByTagName("lido:term")[0]),
                                "geburtsjahr": my.checkExistence(eventactor[j].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                                "geschlecht": my.checkExistence(eventactor[j].getElementsByTagName("lido:genderActor")[0]),
                                "id": j,
                                "name": my.checkExistence(eventactor[j].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                                "pnd_id": my.checkExistence(eventactor[j].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                                "sterbejahr": my.checkExistence(eventactor[j].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                                "comment": my.checkExistence(eventactor[j].getElementsByTagName("lido:displayActorInRole")[0]),
                            }
                        }
                        else {
                            for (var j = 0; j < eventactor.length; ++j) {
                                eventactorlist[j] = {
                                    "display_name": my.checkExistence(eventactor[j].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),

                                    "function1": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                                    /*"function2": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[1].getElementsByTagName("lido:term")[0]),
                                    "function3": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[2].getElementsByTagName("lido:term")[0]),
                                    "function4": my.checkExistence(eventactor[j].getElementsByTagName("lido:roleActor")[3].getElementsByTagName("lido:term")[0]),*/
                                    "geburtsjahr": my.checkExistence(eventactor[j].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                                    "geschlecht": my.checkExistence(eventactor[j].getElementsByTagName("lido:genderActor")[0]),
                                    "id": j,
                                    "name": my.checkExistence(eventactor[j].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                                    "pnd_id": my.checkExistence(eventactor[j].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                                    "sterbejahr": my.checkExistence(eventactor[j].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                                    "comment": my.checkExistence(eventactor[j].getElementsByTagName("lido:displayActorInRole")[0]),
                                }
                            }

                        }
                    }
                }
                console.log("eventactorlist");
                console.log(eventactorlist);
                console.log("Event: ID: ",eventxml[i].getElementsByTagName("lido:eventID")[0]);
                var eventtype = my.checkExistence(eventxml[i].getElementsByTagName("lido:eventType")[0].getElementsByTagName("lido:term")[0]);
                if (eventtype == "Performance") {eventtype = "Inszenierung/Performance"}
                eventlist[counter] = {
                    "uuid": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventID")[0]),
                    "eventtype": eventtype,
                    "titel": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventName")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "culture": my.checkExistence(eventxml[i].getElementsByTagName("lido:culture")[0].getElementsByTagName("lido:term")[0]),
                    "premier_date": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:displayDate")[0]),
                    "earliest_date": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:earliestDate")[0]),
                    "performancebeschreibung": my.checkExistence(eventxml[i].getElementsByTagName("lido:displayEvent")[0]),
                    "latest_date": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:latestDate")[0]),
                    "ort_city": my.checkExistence(eventxml[i].getElementsByTagName("lido:partOfPlace")[0].getElementsByTagName("lido:appellationValue")[0]),
                    "ort_theater": my.checkExistence(eventxml[i].getElementsByTagName("lido:eventPlace")[1].getElementsByTagName("lido:appellationValue")[0]),
                    "id": counter,
                    "personlist": {
                        "id_counter": eventactorlist.length,
                        "info": "ObjectList state",
                        "list": eventactorlist,
                        "pointer": eventactorlist.length - 1,


                    },
                };
                console.log("Event",eventlist)

            }


            var event = {
                /*	"persons": {
                        "id_counter": eventactor.length,
                        "info" : "ObjectList state",
                        "list" : eventactorlist,
                        "pointer" : 0


                    },*/
                "events": {
                    "id_counter": eventxml.length - 3,
                    "info": "ObjectList state",
                    "list": eventlist,
                    "pointer": eventxml.length - 4,


                },

            };
            console.log("helo");
            log("Events vor Erwerb",event);
            //my.workflow[4].recall(event);

// Erwerb

            var erwerbxml = x[0].getElementsByTagName("lido:eventSet")[2];
        var erwerbactor = erwerbxml.getElementsByTagName("lido:eventActor");
        var erwerbactorlist = new Array;


                console.log("ErwerbactorDebug");

                for (var i = 0; i < erwerbactor.length; ++i) {
                    erwerbactorlist[i] = {
                        "uuid": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:actorID")[1]),
                        "display_name": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                        "function": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:roleActor")[0].getElementsByTagName("lido:term")[0]),
                        "geburtsjahr": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:earliestDate")[0]),
                        "geschlecht": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:genderActor")[0]),
                        "id": i,
                        "name": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:nameActorSet")[0].getElementsByTagName("lido:appellationValue")[0]),
                        "pnd_id": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:actor")[0].getElementsByTagName("lido:actorID")[0]),
                        "sterbejahr": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:vitalDatesActor")[0].getElementsByTagName("lido:latestDate")[0]),
                        "comment": my.checkExistence(erwerbactor[i].getElementsByTagName("lido:displayActorInRole")[0]),
                    }
                }

            var erwerb = {
                "erwerb_form": {
                    "culture": my.checkExistence(erwerbxml.getElementsByTagName("lido:culture")[0].getElementsByTagName("lido:term")[0]),
                    "earliest_date": my.checkExistence(erwerbxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:earliestDate")[0]),
                    "provenienzbeschreibung": my.checkExistence(erwerbxml.getElementsByTagName("lido:displayEvent")[0]),
                    "latest_date": my.checkExistence(erwerbxml.getElementsByTagName("lido:eventDate")[0].getElementsByTagName("lido:latestDate")[0]),
                    "ort": my.checkExistence(erwerbxml.getElementsByTagName("lido:eventPlace")[0].getElementsByTagName("lido:appellationValue")[0])
                },
                "persons": {
                    "id_counter": erwerbactor.length,
                    "info": "ObjectList state",
                    "list": erwerbactorlist,
                    "pointer": erwerbactor.length - 1,


                }
            };
            log(erwerb);
            //my.workflow[5].recall(herstellung);
            //return objectidentification;
            var jsondata = {

                "type": "environment_state",
                "environment_id": "lido",
                "environment_version": "2.2.0",
                "environments": {
                    "lido": {
                        "lido1": objectidentification,
                        "lido2": objektbeschreibung,
                        "lido3": herstellung,
                        "lido4": inszenierung,
                        "lido5": event,
                        "lido6": erwerb,
                    }
                }

            };
            console.log("jsondata");
            console.log(jsondata);
            APP.save_and_recall.importProjectData(jsondata);
        };

        my.checkExistence = function (node) {

            if (typeof node != 'undefined') {
                if (node.firstChild != null) {
                    return node.firstChild.nodeValue;

                }

            }
            else {
                return "";


            };
          /*  if (node != null) {
                if (node.firstChild != null) {
                    return node.firstChild.nodeValue;

                }

            }
            else {
                return "";

            }
            ;*/
        };


        my.settings = function () {
            return [];
        };

        my.recall = function (settings) {

            return;

        };

        my.getSaveData = function () {

            return;

        };


        my.getProjectName = function () {

            return my.workflow[0].getSaveData().start_form.digitalisierungssignatur.digitalisierungssignatur;

        };


        my.reset = function () {

            my.workflow[0].reset();
            my.workflow[1].reset();
            my.workflow[2].reset();
            my.workflow[3].reset();
            my.workflow[4].reset();
            my.workflow[5].reset();

            return;

        };

        APP.environments.add(my);

        return my;
    })();