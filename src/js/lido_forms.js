lido_environment.forms = {};

lido_environment.forms.start = {
	name: "start",
	type: "form",
	fields: [
        {
            type: "subarea",
            heading: "Letzte Bearbeitung durch: (Namenskürzel)",
            name: "editor",
            fields: [
                {
                    heading: undefined,
                    name: "editor",
                    type: "text",
					comment: 'Initialen der Bearbeiter_in'
                }, ]

        },
		{
			type: "subarea",
			heading: "Digitalisierungssignatur",
			name: "digitalisierungssignatur",
			fields: [
				{
					heading: undefined,
					name: "digitalisierungssignatur",
					type: "text",
					default_value: "TWS_",
					comment: 'Hier die Digitalisierungssignatur NEU vergeben. BEISPIELE: Wenn Einzelobjekt, dann wie folgt: TWS_OBJ000001, TWS_OBJ000002 usw. Wenn Konvolut, dann wie folgt: TWS_KON000001, TWS_KON000002 usw. ACHTUNG: Dieses Feld darf nur in Absprache mit der Projektleitung ausgefüllt werden, um auszuschließen, dass eine Signatur doppelt vergeben wird. ACHTUNG: bei Fotoalben: Wenn das Album UND die einzelnen Abbildungen erfasst werden, dann müssen die Abbildungen innerhalb des Albums eigene Objektsignaturen erhalten.'				
				},
				{
					heading: "Inventarnummer",
					name: "inventarnummer",
					type: "text",
					comment: 'Hier, sofern vorhanden, die Inventarnummer des Objekts eintragen, nicht die Signatur (BEISPIELE: INV.5032; INV.G10983; usw.).'
				}
			]
		},
		{
			type: "subarea",
			heading: undefined,
			name: "eintragsdokumentation",
			fields: [
				{
					heading: "Signatur",
					name: "objektsignatur",
					type: "text",
					comment: 'Hier, sofern vorhanden, die bestehende Signatur des Objekts eintragen (BEISPIELE: AU9821 bei Autografen, L342 bei Libretti usw.).'
				},
			
				{
					heading: "Art des Eintrags",
					name: "eintragsart",
					type: "open_vocabulary",
					vocabulary: ["Einzelobjekt", "Konvolut"],
					default_value: "Einzelobjekt",
					comment: 'FRAGE: Handelt es sich um EIN Objekt oder um eine OBJEKTSAMMLUNG? Einzelobjekte: Fotoalben, Modelle, Regiebücher usw.; konkrete Konvolute: Inszenierungsmappen, Archivmappen, Umschläge, Kisten, Boxen; abstrakte Konvolute: die Inszenierungsfotos zu einer Inszenierung, die Bühnenbildentwürfe zu einer Inszenierung usw. Achtung: Bei Konvoluten keine Abbildungen einfügen (nur bei Einzelobjekten)! ACHTUNG: Fotoalben sind Einzelobjekte, die Einzelobjekte enthalten!'
				},

				
				
			]
		},
		{
			type: "subarea",
			heading: "Objekt ist Teil von...",
			name: "related",
			fields: [
				{
					heading: "Signatur",
					name: "partof",
					type: "text",
					comment: 'Hier die Digitalisierungssignatur des übergeordneten Konvoluts/Objekts eintragen, falls das Objekt Teil einer Mappe, eines Nachlasses o.ä. ist.'
				},

				{
					heading: "Titel/Bezeichnung",
					name: "partof1",
					type: "text",
					comment: 'Hier den Titel des übergeordneten Konvoluts/Objekts eintragen, falls das Objekt Teil einer Mappe o.ä. ist, (BEISPIELE: NL Millowitsch, NL Guszalewicz usw.).'
				},
				{
					heading: "Art der Beziehung zwischen den Objekten",
					name: "partof2",
					type: "text",
					comment: 'FREITEXTFELD: Nur falls nötig, hier die Beziehung zwischen den Objekten kurz spezifizieren. ACHTUNG: Hier nur das eintragen, was nicht über die anderen Felder abgedeckt werden kann.'
				},

			]
		},
        {
            type: "subarea",
            heading: "Digitalisate online stellen?",
            name: "legal",
            fields: [
                {
                    heading: "Ja",
                    name: "rights",
                    type: "check",
                    comment: ""
                },

             /*   {
                    heading: "(Optional) Rechteinhaber",
                    name: "rightholder",
                    type: "text",
                    comment: 'Hier den Titel des übergeordneten Konvoluts/Objekts eintragen, falls das Objekt Teil einer Mappe o.ä. ist, (BEISPIELE: NL Millowitsch, NL Guszalewicz usw.).'
                },*/


            ]
        }

	],
};


lido_environment.forms.objektbeschreibung = {
	name: "objektbeschreibung",
	type: "form",
	fields: [
		{
			type: "column",
			title: "Objektbeschreibung",
			name: "objekt_identifikation",
			fields: [
				{
					heading: "Titel",
					name: "titel",
					type: "text",
					comment: 'FREITEXTFELD: Hier den Titel des Objekts vergeben und eintragen. FRAGE: Was ist das? (BEISPIELE: Programmheft zur "Hamlet"-Inszenierung in Berlin 1954; Modell zur "Parsifal"-Inszenierung in Bayreuth 1882; chinesische Schattenspielfigur).'
				},
				{
					heading: "Objektbeschreibung",
					name: "objektbeschreibung",
					type: "textarea",
					comment: 'FREITEXTFELD: Hier das Objekt formal beschreiben. FRAGEN: Zustand? Beschriftungen? Beschädigungen? Gebrauchsspuren? Retuschen? usw. (BEISPIELE: Schattenspielfigur aus Leder mit transparenten Farbfeldern, leichte Beschädigung oben links ODER Schwarz-Weiß-Fotografie, Gelatinesilber, Beschriftung auf der Rückseite: "Gustaf Gründgens als Mephisto" ODER grafischer Entwurf, Tusche und Wasserfarben, Einstichlöcher in den Ecken).'
				},
				{
					heading: "Maßeinheit",
					name: "maßeinheit",
					type: "text",
					default_value: "cm"
				},
				{
					heading: "Maß-Höhe",
					name: "height",
					type: "text",
					comment: 'Höhe '
				},
				{
					heading: "Maß-Breite",
					name: "width",
					type: "text",
					comment: "Breite"
				},
					{
					heading: "Maß-Tiefe",
					name: "depth",
					type: "text",
					comment: 'Tiefe'
				},
				
				// {
				// 	heading: "Maßtyp",
				// 	name: "maßtyp",
				// 	type: "text",
				// 	default_value: "HxBxT"
				// }
				
				{
					heading: "Besitzende Institution",
					name: "besitzende_institution",
					type: "open_vocabulary",
					vocabulary: ["Theaterwissenschaftliche Sammlung, Universität zu Köln", "Institut für Theaterwissenschaft, FU Berlin"],
					default: "Theaterwissenschaftliche Sammlung, Universität zu Köln"
				},
				{
					heading: "Standort in der TWS",
					name: "standort_tws",
					type: "open_vocabulary",
					vocabulary: [
						"Autografensammlung", "Bibliothek Freihandbereich" , "Bibliothek Magazin", "Bibliothek Rara" , "Büsten, Statuetten, Totenmasken", "Figurentheater (Dachgeschoss)",  "Filmarchiv", "Fotoabteilung: Inszenierungen", "Fotoabteilung: Personen", "Fotoabteilung: Orte", "Fotoabteilung: Alben", "Fotoabteilung: Großformate", "Grafische Sammlung: szenische Grafik", 
						"Hänneschen-Sammlung", "Einzelnachlässe und Archiv", "Kriegstheaterarchiv", "Kritikenabteilung: Inszenierungen", "Kritikenabteilung: Personenkritiken", "Kritikenabteilung: Orte", "Libretti und Noten", "Masken (Untergeschoss)", "Plakate (Dachgeschoss)", "Porträtgrafik", "Programmheftabteilung (Erdgeschoss)", "Programmheftabteilung (1. Stock)", 
						"Schattenspielsammlung (Dachgeschoss)", "Stücktextsammlung", "Video/VHS-Sammlung", "Zeitschriften Magazin", "sonstiger Standort (bitte im Freitext beschreiben)"
					]
				}
			]
		},
		{
			type: "column",
			title: "Objekt-Zuordnung",
			name: "objektzuordnung",
			fields: [
				{
					heading: "Objektgattung",
					name: "objektgattung",
					type: "open_vocabulary",
					vocabulary: ['Bild','Figur','Maske','Modell','Plastik','Schrift','Gemischtes Konvolut', "sonstiges Objekt"]
				},
				{
					heading: "Objektart",
					name: "objektart",
					type: "open_vocabulary",
					// vocabulary: [
					// 	"Bühnenmodell", "Brief", "Buch", "Büste", "Dia", "Film", "Filmfotografie", "Filmplakat", "Fotoalbum", "Fotonegativ",
					// 	"Gemälde", "Handpuppe", "Handschrift", "Inszenierungsfotografie", "Libretti", "Marionette", "Noten", "Papiertheater",
					// 	"Personenfotografie", "Postkarte", "Porträtgrafik", "Porzellanfigur", "Programmheft", "Regiebuch", Rezension", "Schattenspielfigur",
					// 	"Statue", "Stockpuppe", "Szenische Grafik", "Tanzfotografie", "Theaterbaufotografie", "Theaterbaugrafik", "Theatermaske",
					// 	"Theaterplakat", "Theaterzettel", "Totenmaske", "Typoskript", "Zeitschrift", "Zeitungsausschnitt", "Sonstige Fotografie"
					// ]
					vocabulary: [
                        'Autograf: Album','Autograf: Brief','Autograf: Karte','Autograf: Manuskript','Autograf: Postkarte','Figur: Büste','Figur: Fingerpuppe','Figur: Handpuppe','Figur: Marionette','Figur: Porzellanfigur','Figur: Schattenspielfigur','Figur: Skulptur','Figur: Stockpuppe','Film','Fotografie: Allgemein','Fotografie: Album','Fotografie: Architektur (analog)','Fotografie: Architektur (digital)','Fotografie: Dia','Fotografie: Film (analog)','Fotografie: Film (digital)','Fotografie: Inszenierung (analog)','Fotografie: Inszenierung (digital)','Fotografie: Negativ','Fotografie: Person (analog)','Fotografie: Person (digital)','Gemälde','Grafik: Bühnenbildentwurf','Grafik: Kostümbildentwurf','Grafik: Porträt','Grafik: technische Zeichnung','Grafik: Theaterbau','Kostüm','Maske: Lebendmaske','Maske: Ritualmaske','Maske: Theatermaske','Maske: Totenmaske','Modell: Bühnenbildmodell','Modell: Theaterbaumodell','Modell: Theatertechnik','Musikalia: Libretti','Musikalia: Noten','Papiertheater','Plakat: Film','Plakat: Theater','Publikation: Aufsatz','Publikation: Broschüre','Publikation: Buch','Publikation: Programmheft','Publikation: Regiebuch ','Publikation: Zeitungsausschnitt','Publikation: Theaterzettel','Publikation: Zeitschrift','Requisit'
					]
				},
				{
					type: "subarea",
					heading: "Thematik / Bildinhalt",
					name: "thematik",
					fields: [
						{

							name: "thematik",
							type: "textarea",
							comment: 'FREITEXTFELD: Hier eine inhaltliche Bildbeschreibung eintragen und/oder Schlagworte vergeben. FRAGE: Worum geht es inhaltlich? Was ist zu sehen? Dargestellte Szene? ACHTUNG: Für abgebildete Personen oder Organisationen bitte neue Akteur_in hinzufügen.'
						}]
					},
					{
					type: "subarea",
					heading: "Literaturangaben",
					name: "literatur",
					fields: [
						{

							name: "literatur",
							type: "textarea",
							comment: 'FREITEXTFELD: Hier eine kurze Literaturangabe eintragen, falls das Objekt in der Literatur beschrieben oder abgedruckt worden ist: [Autor_in, Kurztitel (JAHR), ISBN-Nr.].'
						}
					]
				}
			]
		}
	]

};


lido_environment.forms.herstellung = {
	name: "herstellung",
	title: "Herstellung des Objekts",
	type: "form",
	fields: [
		/*{	heading: "UUID",
			name: "uuid",
			type: "text"
		},*/
		{
			heading: "Herstellungsbeschreibung",
			name: "herstellungsbeschreibung",
			type: "textarea",
			comment: 'FREITEXTFELD: Hier alle relevanten Informationen zur Herstellung und ihren Umständen eintragen, die nicht in den anderen Feldern erfasst werden können. FRAGE: Wurde beispielsweise die Fotografie im Fotostudio oder im Theater aufgenommen? Bestehen Informationen über den Kontext, aus dem das Objekt entstanden ist? Wurde es beispielsweise im Auftrag von XY hergestellt?'
		},
		{
			heading: "Ort",
			name: "ort",
			type: "text",
			comment: 'Hier den Namen der Stadt oder des Landes oder der Region eintragen (Ort der Herstellung); wenn Ort unbekannt, dann "unbekannt" eintragen.'
		},
		{
			heading: "Datum (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'Hier das Datum der Herstellung des Objekts eintragen. Format: TT.MM.JJJJ oder MM.JJJJ oder JJJJ. FRAGE: Wann wurde das Objekt hergestellt? Wenn Zeitpunkt/Zeitraum bekannt, dann das Datum in beide Felder (frühestes/spätestes) im Format TT.MM.JJJJ eintragen; wenn nur Monat und Jahr bekannt, dann in beide Felder MM.JJJJ; wenn nur Jahr bekannt, dann in beide Felder JJJJ; der Zeitraum der Herstellung kann auch geschätzt werden.'
		},
		{
			heading: "Datum (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'Siehe Hinweis zu: Datum (frühestes).'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'Hier den kulturellen Kontext der Herstellung eintragen. Dieses Feld vor allem ausfüllen, wenn die Stadt oder das Land nicht näher bekannt ist (BEISPIELE: Islamischer Raum, Rheinland, Alemannisch, Sowjetische Besatzungszone).'
		}
	]
};

lido_environment.forms.actor_objektbeschreibung = {
	name: "actor",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		{
			name: "name",
			heading: "Name der abgebildeten Person (Name, Vorname) oder Organisation",
			type: "text",
			comment: 'Hier Name der abgebildeten Person oder Organisation eintragen. Schreibweise nach Möglichkeit der GND entnehmen. Bei Personen: erst Nachname, dann Vorname; Wenn nur Nachname bekannt, dann nur Nachname eintragen (kein Herr, Frau, Frl. etc.). Bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von).'
		},
	
		{
			name: "pnd_id",
			heading: "Akteur_in ID (GND-Nummer)",
			type: "text",
			comment: 'Hier die GND-Nummer eintragen, Recherche der ID über den oben angegebenen Link zur GND. Falls die Person oder Organisation nicht in der GND aufgeführt ist, Feld leer lassen.'
		},
		{
			name: "rolle",
			heading: "Name der gespielten Rolle (nur bei Darstellern)",
			type: "text",
			comment: "Nur auszufüllen bei Darsteller_innen. Wenn mehrere Rollen von ein und der_demselben Darsteller_in gespielt wurden, bitte die Rollenbezeichnungen mit Semikolon trennen."
		},
        {
            heading: "Weitere Informationen zur Person/Organisation",
            name: "comment",
            type: "textarea",
            comment: 'FREITEXTFELD: Besonderheiten und Informationen die nicht in den anderen Feldern erfasst werden können'
        },
		
	]
};
lido_environment.forms.actor_herstellung = {
	name: "actor",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		{
			name: "name",
			heading: "Name der Person (Name, Vorname) oder Organisation",
			type: "text",
			comment: 'Hier den Namen des Urhebers/der Urheber_in (Person oder Organisation) des vorliegenden OBJEKTS eintragen. FRAGE: Wer hat das Objekt in seiner vorliegenden Form hergestellt? ACHTUNG: Bei Briefen auch die Empfänger_innen als Akteur_innen aufnehmen. Bei Regiebüchern nicht die/den Dramatiker_in oder Autor_in des inszenierten Werks eintragen, sondern die/den Regisseur_in (als Urheber des vorliegenden Objekts). Schreibweise der Person oder Organisation nach Möglichkeit der GND entnehmen. Bei Personen: erst Nachname, dann Vorname; Wenn nur Nachname bekannt, dann nur Nachname eintragen (kein Herr, Frau, Frl. etc.). Bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von).'
		},
		{
			name: "function1",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: ["Auftraggeber_in", "Bildhauer_in", "Bühnenbildner_in","Drucker_in/Druckerei", "Empfänger_in", "Ersteller_in des Konvoluts", "Fotograf_in", "Fotostudio", "Grafiker_in", "Komponist_in", "Künstler_in", "Maler_in", "Theateratelier", "Verfasser_in"],
			default_value: "Bildhauer_in"
		},
		{
			name: "function2",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: ["Auftraggeber_in", "Bildhauer_in", "Bühnenbildner_in","Drucker_in/Druckerei", "Empfänger_in", "Ersteller_in des Konvoluts", "Fotograf_in", "Fotostudio", "Grafiker_in", "Komponist_in", "Künstler_in", "Maler_in", "Theateratelier", "Verfasser_in"],
			default_value: undefined
		},
		{
			name: "function3",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: ["Auftraggeber_in", "Bildhauer_in", "Bühnenbildner_in","Drucker_in/Druckerei", "Empfänger_in", "Ersteller_in des Konvoluts", "Fotograf_in", "Fotostudio", "Grafiker_in", "Komponist_in", "Künstler_in", "Maler_in", "Theateratelier", "Verfasser_in"],
			default_value: undefined
		},
		{
			name: "function4",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: ["Auftraggeber_in", "Bildhauer_in", "Bühnenbildner_in","Drucker_in/Druckerei", "Empfänger_in", "Ersteller_in des Konvoluts", "Fotograf_in", "Fotostudio", "Grafiker_in", "Komponist_in", "Künstler_in", "Maler_in", "Theateratelier", "Verfasser_in"],
			default_value: undefined
		},
		{
			name: "pnd_id",
			heading: "Akteur_in ID (GND-Nummer)",
			type: "text",
			comment: 'Hier die GND-Nummer der Person/Organisation eintragen. Recherche der ID über den oben angegebenen Link zur GND. Falls die Person/Organisation nicht in der GND aufgeführt ist, Feld leer lassen.'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsdatum",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; ACHTUNG: Dieses Feld muss nur ausgefüllt werden, wenn die GND unbekannt ist oder die Lebensdaten in der GND nicht korrekt sind. Das Feld auch leer lassen, wenn Akteur_in eine Organisation ist.'
		},
		{
			name: "sterbejahr",
			heading: "Sterbedatum",
			type: "text",
			comment: 'Siehe Hinweis zu: Geburtsdatum.'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["weiblich", "männlich", "anderes", "unbekannt", "kein Geschlecht"]
		},
        {
            heading: "Weitere Informationen",
            name: "comment",
            type: "textarea",
            comment: 'FREITEXTFELD'
        },
	]
};



lido_environment.forms.inszenierung = {
	name: "inszenierung",
	title: "Inszenierung / Performance",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		{
			name: "titel",
			heading: "Inszenierungstitel der Vorlage",
			type: "text",
			comment: 'Hier den Titel der Inszenierung so eintragen, wie er in der Vorlage geschrieben steht. ACHTUNG: Artikel am Ende platzieren: Der, Die, Das / Ein, Einer (BEISPIELE: „Vetter aus Dingsda, Der“; „Wintermärchen, Ein“; „Räuber, Die“).'
		},
		{
			name: "alternatetitel",
			heading: "Einheitssachtitel",
			type: "text",
			comment: 'Hier den Titel der Inszenierung so eintragen, wie er in der GND als Einheitssachtitel des Werks angeführt ist. ACHTUNG: Artikel am Ende platzieren: Der, Die, Das / Ein, Einer (BEISPIELE: „Vetter aus Dingsda, Der“; „Wintermärchen, Ein“; „Räuber, Die“).'
		},
		{
			heading: "Inszenierungsbeschreibung",
			name: "performancebeschreibung",
			type: "textarea",
			comment: 'FREITEXTFELD: Hier alle relevanten Informationen zur Inszenierung und ihren Umständen eintragen, die nicht in den anderen Feldern erfasst werden können. FRAGEN: Gab es einen besonderen Anlass der Inszenierung? Hat die Inszenierung einen ‚Skandal‘ ausgelöst? Gibt es Bezugnahmen der Inszenierung auf das Zeitgeschehen, den gesellschaftspolitischen Kontext?'
		},

		{
			heading: "Ort (Stadt)",
			name: "ort_city",
			type: "text",
			comment: 'Hier den Ort (Städtenamen) der Premiere in dt. Sprache eintragen (ansonsten das Land); FRAGE: Wo hat die Premiere stattgefunden? wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann "unbekannt" eintragen.'
		},
		{
			heading: "Ort (Spielstätte)",
			name: "ort_theater",
			type: "text",
			comment: 'Hier die Spielstätte der Premiere eintragen. FRAGE: In welchem Theater/welcher Spielstätte hat die Inszenierung stattgefunden? ACHTUNG: Theaternamen können sich im Laufe der Zeit verändern. Spielstätte in der GND als Organisationen recherchieren (BEISPIELE: Schauspiel Köln: Depot 1; Bayerisches Staatsschauspiel: Residenztheater). Wenn unbekannt, dann "unbekannt" eintragen.'
		},
		{
			heading: "Premierendatum",
			name: "premier_date",
			type: "text",
			comment: 'Format: TT.MM.JJJJ oder MM.JJJJ oder JJJJ.'
		},
        {
            heading:"Art der Premiere",
            name:"premier_type",
            type:"open_vocabulary",
            vocabulary: ["Uraufführung(UA)", "Deutsche Erstaufführung(DEA)", "sonstiges"],
            default_value: undefined

        },
		{
			heading: "Datum (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; Frühestes/ spätestes Datum gibt den Zeitraum an, in dem die Inszenierung stattgefunden hat; frühestes Datum beginnt in der Regel mit der Premiere. Wenn unbekannt, bitte eine Einschätzung vornehmen.'
		},
		{
			heading: "Datum (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'Siehe Hinweis zu: Datum (frühestes).'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'FREITEXTFELD: Hier den kulturellen Kontext der Premiere eintragen. Dieses Feld vor allem ausfüllen, wenn Ort und Spielstätte nicht näher bekannt sind (BEISPIELE: Islamischer Raum, Rheinland, Alemannisch, Sowjetische Besatzungszone usw.).'
		},
		{
			heading: "(Weitere Orte)",
			name: "add_ort",
			type: "text",
			comment: 'FREITEXTFELD: Falls bekannt, hier weitere Spielorte der Inszenierung eintragen. ACHTUNG: Falls detaillierte Informationen zu Gastspielen o.ä. vorliegen, hierfür bitte ein neues Ereignis erstellen.'
		},
	]
};
lido_environment.forms.events = {
	name: "events",
	title: "Weitere Ereignisse",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "eventuuid",
			type: "text"
		},
		{
			name: "eventtype",
			heading: "Art des Ereignisses",
			type: "open_vocabulary",
			vocabulary: [
				"Aufführung", "Briefkontakt", "Festival", "Filmproduktion", "Gastspiel", "Inszenierung/Performance", "Probe", "Persönlicher Kontakt / Zusammenkunft"
			],
			default_value: "Aufführung"
				},
		{
			name: "titel",
			heading: "Titel des Ereignisses",
			type: "text",
			comment: 'FREITEXTFELD: Hier den Titel des Ereignisses selbst vergeben. Falls Inszenierungsbezug: Hier den Einheitssachtitel des Werks (GND) eintragen. ACHTUNG: Artikel am Ende platzieren: Der, Die, Das / Ein, Einer (BEISPIELE: „Vetter aus Dingsda, Der“; „Wintermärchen, Ein“; „Räuber, Die“).'
		},
		
		{
			heading: "Ereignis-Beschreibung",
			name: "performancebeschreibung",
			type: "textarea",
			comment: 'FREITEXTFELD: Hier alle relevanten Informationen zu dem Ereignis und seinen Umständen eintragen, die nicht durch die anderen Felder erfasst werden können.'
		},
		{
			heading: "Ort (Stadt)",
			name: "ort_city",
			type: "text",
			comment: 'Hier den Städtenamen in dt. Sprache eintragen (ansonsten das Land), wo das Ereignis stattgefunden hat. Wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann "unbekannt" eintragen.'
		},
		{
			heading: "Ort (Institution o.ä.)",
			name: "ort_theater",
			type: "text",
			comment: 'Hier die Spielstätte oder Institution eintragen, wo das Ereignis stattgefunden hat. FRAGE: In welchem Gebäude/in welcher Institution hat das Ereignis stattgefunden? ACHTUNG: Theaternamen können sich im Laufe der Zeit verändern. Institution in der GND als Organisationen recherchieren (BEISPIELE: Schauspiel Köln: Depot 1; Bayerisches Staatsschauspiel: Residenztheater). Wenn unbekannt, dann "unbekannt" eintragen.'
		},
		{
			heading: "Datum des Ereignisses",
			name: "premier_date",
			type: "text",
			comment: 'Format: TT.MM.JJJJ oder MM.JJJJ oder JJJJ.'
		},
		{
			heading: "Datum (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; Frühestes / spätestes Datum gibt den Zeitraum an, in dem die Inszenierung stattgefunden hat; frühestes Datum beginnt in der Regel mit der Premiere. Wenn unbekannt, bitte eine Einschätzung vornehmen.'
		},
		{
			heading: "Datum (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'Siehe Hinweis zu: Datum (frühestes).'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'FREITEXTFELD: Hier den kulturellen Kontext des Ereignisses eintragen. Dieses Feld vor allem ausfüllen, wenn Ort und Institution des Ereignisses nicht näher bekannt sind (BEISPIELE: Islamischer Raum, Rheinland, Alemannisch, Sowjetische Besatzungszone usw.).'
		},
		
		
	]
};


lido_environment.forms.actor_inszenierung = {
	name: "actor",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		{
			name: "name",
			heading: "Name der Person (Name, Vorname) oder Organisation",
			type: "text",
			comment: 'Hier den Namen der an der Inszenierung beteiligten Personen und Organisationen. FRAGE: Wer war beteiligt und in welcher Funktion? Schreibweise der Person oder Organisation nach Möglichkeit der GND entnehmen. Bei Personen: erst Nachname, dann Vorname; Wenn nur Nachname bekannt, dann nur Nachname eintragen (kein Herr, Frau, Frl. etc.). Bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von).'
		},
		{
			name: "rolle",
			heading: "Name der gespielten Rolle (nur bei Darsteller_innen)",
			type: "text",
			comment: "Nur auszufüllen bei Darsteller_innen. Wenn mehrere Rollen von ein und der_demselben Darsteller_in gespielt wurden, bitte die Rollenbezeichnungen mit Semikolon trennen.",
            default_value: ""
		},
		{
			name: "function1",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks","Bearbeitung", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Inspizient_in", "Intendant_in",
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: "Autor_in des inszenierten Werks"
		},
		{
			name: "function2",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks","Bearbeitung", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Inspizient_in", "Intendant_in",
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
		{
			name: "function3",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks","Bearbeitung", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Inspizient_in", "Intendant_in",
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
		{
			name: "function4",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks", "Bearbeitung", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Inspizient_in", "Intendant_in",
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
	
	
		{
			name: "pnd_id",
			heading: "Akteur_in ID (GND-Nummer)",
			type: "text",
			comment: 'Hier die GND-Nummer der Person/Organisation eintragen. Recherche der ID über den oben angegebenen Link zur GND. Falls die Person/Organisation nicht in der GND aufgeführt ist, Feld leer lassen.'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsdatum",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; ACHTUNG: Dieses Feld muss nur ausgefüllt werden, wenn die GND unbekannt ist oder die Lebensdaten in der GND nicht korrekt sind. Das Feld auch leer lassen, wenn Akteur_in eine Organisation ist.'
		},
		{
			name: "sterbejahr",
			heading: "Sterbedatum",
			type: "text",
			comment: 'Siehe Hinweis zu: Geburtsdatum.'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["weiblich", "männlich", "anderes", "unbekannt", "kein Geschlecht"]
		},
        {
            heading: "Weitere Informationen",
            name: "comment",
            type: "textarea",
            comment: 'FREITEXTFELD'
        },
	]
};

lido_environment.forms.actor_events = {
	name: "actor",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		/*{
			name: "event",
			heading: "Ereignis",
			type: "open_vocabulary",
			vocabulary: data.lido_5.filleventlist(),
		},*/
		{
			name: "name",
			heading: "Name der Person (Name, Vorname) oder Organisation",
			type: "text",
			comment: 'Hier den Namen der am Ereignis beteiligten Personen und Organisationen. FRAGE: Wer war beteiligt und in welcher Funktion? Schreibweise der Person oder Organisation nach Möglichkeit der GND entnehmen. Bei Personen: erst Nachname, dann Vorname; Wenn nur Nachname bekannt, dann nur Nachname eintragen (kein Herr, Frau, Frl. etc.). Bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von).'
		},
		{
			name: "function1",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Drehbuchautor_in des Films", "Inspizient_in", "Intendant_in", 
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: "Autor_in des inszenierten Werks"
		},
		{
			name: "function2",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Drehbuchautor_in des Films", "Inspizient_in", "Intendant_in", 
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
		{
			name: "function3",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Drehbuchautor_in des Films", "Inspizient_in", "Intendant_in", 
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
		{
			name: "function4",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Autor_in des inszenierten Werks", "Beleuchter_in", "Bühnenbildner_in der Inszenierung", "Choreograph_in des inszenierten Werks",
				"Darsteller_in der Inszenierung", "Dramaturg_in", "Drehbuchautor_in des Films", "Inspizient_in", "Intendant_in", 
				"Komponist_in der Bühnenmusik", "Komponist_in des inszenierten Werks", "Konzept", "Musikalische Leitung", "Kostümbildner_in der Inszenierung", "Produktion (Theater)", 
				"Produzent_in", "Regieassistent_in", "Regisseur_in des inszenierten Werks", "Souffleur_in", "Technische Leitung", "Theaterleiter_in", "Verlag", "Zuschauer_in" 
			],
			default_value: " "
		},
		{
			name: "pnd_id",
			heading: "Akteur_in ID (GND-Nummer)",
			type: "text",
			comment: 'Hier die GND-Nummer der Person/Organisation eintragen. Recherche der ID über den oben angegebenen Link zur GND. Falls die Person/Organisation nicht in der GND aufgeführt ist, Feld leer lassen.'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsdatum",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; ACHTUNG: Dieses Feld muss nur ausgefüllt werden, wenn die GND unbekannt ist oder die Lebensdaten in der GND nicht korrekt sind. Das Feld auch leer lassen, wenn Akteur_in eine Organisation ist.'
		},
		{
			name: "sterbejahr",
			heading: "Sterbedatum",
			type: "text",
			comment: 'Siehe Hinweis zu: Geburtsdatum.'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["weiblich", "männlich", "anderes", "unbekannt", "kein Geschlecht"]
		},
        {
            heading: "Weitere Informationen",
            name: "comment",
            type: "textarea",
            comment: 'FREITEXTFELD'
        },

	]
};



lido_environment.forms.erwerb = {
	name: "erwerb",
	title: "Provenienz / Erwerb",
	type: "form",
	fields: [
		{
			heading: "Provenienzbeschreibung",
			name: "provenienzbeschreibung",
			type: "textarea",
			comment: 'FREITEXTFELD: Hier eintragen, wie das Objekt in den Bestand der TWS gelangt ist. FRAGEN: Wie viel wurde beim Erwerb bezahlt? Was sind die Quellen für die hier angegebenen Informationen? BEISPIELE: Niessen kaufte das Gemälde 1925 in Berlin vom Antiquariat Müller für 60 Mk. (vgl. Rechnung im NL Niessen im Provenienzordner „M“); Max Martersteig stiftete diese Figurine 1925 dem Kölner Institut (vgl. Brief von Martersteig an Niessen, Signatur: AU4962; die vorliegende Kritik ist Teil der Sammlung Hagen, die in den 1920er Jahren geschlossen in den Bestand der TWS überging).'
		},
		{
			heading: "Ort des Erwerbs",
			name: "ort",
			type: "text",
			comment: 'Hier den Städtenamen in dt. Sprache eintragen (ansonsten das Land), wo das Objekt erworben wurde. Wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann "unbekannt" eintragen.'
		},

		{
			heading: "Datum (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; Frühestes / spätestes Datum gibt den Zeitraum an, in dem das Objekt in die TWS Eingang gefunden hat (Übergabe, Kauf, Schenkung o.ä.). Wenn unbekannt, bitte eine Einschätzung vornehmen und diese im Feld Provenienzbeschreibung vermerken.'
		},
		{
			heading: "Datum (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'Siehe Hinweis zu: Datum (frühestes).'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'FREITEXTFELD: Hier den kulturellen Kontext des Erwerbs eintragen. Dieses Feld vor allem ausfüllen, wenn der spezifische Ort des Erwerbs nicht näher bekannt sind (BEISPIELE: Islamischer Raum, Rheinland, Alemannisch, Sowjetische Besatzungszone usw.).'
		}
	]
};


lido_environment.forms.actor_erwerb = {
	name: "actor",
	type: "form",
	fields: [
		{	heading: "UUID",
			name: "uuid",
			type: "text"
		},
		{
			name: "name",
			heading: "Name der Person (Name, Vorname) oder Organisation",
			type: "text",
			comment: 'Hier den Namen der am Erwerb beteiligten Personen und Organisationen eintragen. FRAGE: Wer war Verkäufer_in, Stifter_in oder Nachlasser_in? Schreibweise der Person oder Organisation nach Möglichkeit der GND entnehmen. Bei Personen: erst Nachname, dann Vorname; Wenn nur Nachname bekannt, dann nur Nachname eintragen (kein Herr, Frau, Frl. etc.). Bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von).'
		},
		{
			name: "function",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"Käufer_in", "Nachlasser_in", "Stifter_in", "Verkäufer_in", "Vermittler_in", "Vorbesitzer_in"
			],
			default_value: "Käufer_in"
		},
		{
			name: "pnd_id",
			heading: "Akteur_in ID (GND-Nummer)",
			type: "text",
			comment: 'Hier die GND-Nummer der Person/Organisation eintragen. Recherche der ID über den oben angegebenen Link zur GND. Falls die Person/Organisation nicht in der GND aufgeführt ist, Feld leer lassen.'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsdatum",
			type: "text",
			comment: 'Format: TT.MM.JJJJ / MM.JJJJ / JJJJ; ACHTUNG: Dieses Feld muss nur ausgefüllt werden, wenn die GND unbekannt ist oder die Lebensdaten in der GND nicht korrekt sind. Das Feld auch leer lassen, wenn Akteur_in eine Organisation ist.'
		},
		{
			name: "sterbejahr",
			heading: "Sterbedatum",
			type: "text",
			comment: 'Siehe Hinweis zu: Geburtsdatum.'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["weiblich", "männlich", "anderes", "unbekannt", "kein Geschlecht"]
		},
        {
            heading: "Weitere Informationen",
            name: "comment",
            type: "textarea",
            comment: 'FREITEXTFELD'
        },
	]
};