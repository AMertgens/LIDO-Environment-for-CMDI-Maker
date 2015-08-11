lido_environment.forms = {};

lido_environment.forms.start = {
	name: "start",
	type: "form",
	fields: [
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
					comment: 'DIESER EINTRAG DARF NUR IN ABSPRACHE MIT NORA PROBST VORGENOMMEN WERDEN; diese Signatur ist angelehnt an den Dateinamen des Digitalisats; WICHTIG: diese Signatur beginnt immer zuerst mit den drei Buchstaben “TWS”, dann kommt ein Unterstrich “_” und dann eine Buchstabenkombination, die die Abteilung innerhalb der TWS bezeichnet (BEISPIELE: TWS_FIN00327; TWS_FGL00542: TWS_G0148902)'
				}
			]
		},
		{
			type: "subarea",
			heading: "Eintragsdokumentation",
			name: "eintragsdokumentation",
			fields: [
				{
					heading: "Eintragsart",
					name: "eintragsart",
					type: "open_vocabulary",
					vocabulary: ["Einzelobjekt", "Konvolut"],
					comment: 'Handelt es sich um EIN Objekt oder ein OBJEKTSAMMLUNG? Wenn möglich, sollten die Objekte als Einzelobjekte erschlossen werden (BEISPIELE für Einzelobjekt: eine Maske, ein Bühnenbildentwurf, eine Fotografie; BEISPIELE für ein Konvolut: ein Fotoalbum mit mehreren Fotos oder eine Nachlass-Box mit mehreren Einzelobjekten)'
				},
				{
					heading: "Objektsignatur",
					name: "objektsignatur",
					type: "text",
					comment: 'Hier bitte die bereits bestehende Signatur des Objekts eintragen (BEISPIELE: z.B. AU9821 bei Autografen; z.B. G32906 bei Bühnenbildentwürfen; z.B. L342 bei Libretti u.s.w.)'
				}
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
					comment: 'Titel des Objekts (BEISPIELE: Schattenspielfigur Hacivat des Karagöz; Parsifal, Modell; Radiozauberer, Der); wenn Inszenierungsbezug, dann hier den vollständigen deutschen Titel eintragen (auch bei Opern den deutschen Titel nehmen, nicht den italienischen); keine Kurztitel verwenden; ggf. sollte man den Titel online nochmal recherchieren; die Artikel am Ende platzieren: Der, Die, Das / Ein, Einer (BEISPIELE: „Vetter aus Dingsda, Der“; „Wintermärchen, Ein“; „Räuber, Die“)'
				},
				{
					heading: "Objektbeschreibung",
					name: "objektbeschreibung",
					type: "textarea",
					comment: 'FREITEXTFELD; keine inhaltlichen Angaben, sondern Beschreibung des Objekts, d.h. des Materials, des Erhaltungszustands, Beschreibung von etwaig vorhandenen Inschriften; es geht nicht so sehr um den Bildinhalt, sondern um die formale Beschreibung des Objektzustands (BEISPIELE: alt-ägyptische Schattenspielfigur aus Leder mit transparenten Farbfeldern, leichte Beschädigung oben links ODER Schwarz-Weiß-Fotografie einer Faust-Inszenierung, Gelatinesilber, Beschriftung auf der Rückseite: Gustaf Gründgens als Mephisto, Willi Quadflieg als Faust ODER grafischer Entwurf, Tusche und Wasserfarben, Einstichlöcher in den Ecken)'
				},
				{
					heading: "Maße",
					name: "maße",
					type: "text",
					comment: 'Höhe x Breite x Tiefe; Eingabe ohne Leerzeichen (BEISPIELE: 24x18; 105x47x39; 9,5x7,5)'
				},
				{
					heading: "Maßeinheit",
					name: "maßeinheit",
					type: "text",
					default_value: "cm"
				},
				{
					heading: "Maßtyp",
					name: "maßtyp",
					type: "text",
					default_value: "HxBxT"
				},
				{
					heading: "Inventarnummer",
					name: "inventarnummer",
					type: "text",
					comment: 'Hier die Inventarnummer des Objekts eintragen: zuerst “INV.” und dann eine Nummer (BEISPIELE: Inv.5032; Inv. 10983; …)'
				},
				{
					heading: "Besitzende Institution",
					name: "besitzende_institution",
					type: "text",
					default_value: "Theaterwissenschaftliche Sammlung, UNiversität zu Köln"
				},
				{
					heading: "Standort in der TWS",
					name: "standort_tws",
					type: "open_vocabulary",
					vocabulary: [
						"Autografensammlung", "Bibliothek", "Büsten und Statuetten", "Druckgrafik", "Filmarchiv", "Fotoabteilung", "obere Grafik", "untere Grafik",
						"Hänneschen-Sammlung", "Kriegstheaterarchiv", "Kritikenabteilung", "Programmheftabteilung", "Puppensammlung", "Rara",
						"Schattenspielsammlung", "Zeitschriften"
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
					vocabulary: ["Bild", "Figur", "Maske", "Modell", "Schrift"]
				},
				{
					heading: "Objektart",
					name: "objektart",
					type: "open_vocabulary",
					vocabulary: [
						"Bühnenmodell", "Brief", "Buch", "Büste", "Dia", "Film", "Filmfotografie", "Filmplakat", "Fotoalbum", "Fotonegativ",
						"Gemälde", "Handpuppe", "Handschrift", "Inszenierungsfotografie", "Libretti", "Marionette", "Noten", "Papiertheater",
						"Personenfotografie", "Postkarte", "Porträtgrafik", "Porzellanfigur", "Programmheft", "Rezension", "Schattenspielfigur",
						"Statue", "Stockpuppe", "Szenische Grafik", "Tanzfotografie", "Theaterbaufotografie", "Theaterbaugrafik", "Theatermaske",
						"Theaterplakat", "Theaterzettel", "Totenmaske", "Typoskript", "Zeitschrift", "Zeitungsausschnitt", "Sonstige Fotografie"
					]
				},
				{
					type: "subarea",
					heading: "Thematik / Bildinhalt / Abgebildete Person",
					name: "thematik",
					fields: [
						{
							heading: "Thematik",
							name: "thematik",
							type: "textarea",
							comment: 'FREITEXTFELD; inhaltliche Bildbeschreibung; worum geht es inhaltlich? Was ist zu sehen? Schlagworte vergeben ( z.B. Thingspiel, Tanztheater, Stummfilm, ...); dargestellte Szene? Inszenierung? dargestellte Charaktere? Namen der abgebildeten Personen? BEISPIELE: Uraufführung von Wagners Parsifal, zu sehen ist das Bühnenbild zum 1. Akt, 3. Szene; Spielfigur Wayang Golek; Portrait von Hansgünther Heyme'
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
		{
			heading: "Herstellungsbeschreibung",
			name: "herstellungsbeschreibung",
			type: "textarea",
			comment: 'FREITEXTFELD: Beschreibung der Herstellung (BEISPIEL: Bühnenbildentwurf ausgeführt im Auftrag von Richard Wagner; Fotografie aufgenommen  im Fotostudio (nicht auf der Bühne); …)'
		},
		{
			heading: "Ort",
			name: "ort",
			type: "text",
			comment: 'Ort der Herstellung; idealerweise hier den Städtenamen in dt. Sprache eintragen (ansonsten das Land); wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann leer lassen'
		},
		{
			heading: "Jahr (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'frühestes/ spätestes sollte einen Zeitraum angeben, in welchem das Objekt entstanden ist; bei bekannter Jahreszahl, diese in beide Felder (frühestes und spätestes) eintragen; das Jahr der Herstellung kann auch geschätzt werden (BEISPIEL: wenn keinerlei Indizien vorliegen, kann den Zeitraum auch wiefolgt eingegrenzt werden: Lebenszeit des Künstlers/der Künstlerin; bei Fotografie aus dem Kriegstheater des 1. Weltkriegs liegt das Jahr zwischen 1914 und 1918; usw.)'
		},
		{
			heading: "Jahr (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'frühestes/ spätestes sollte einen Zeitraum angeben, in welchem das Objekt entstanden ist; bei bekannter Jahreszahl, diese in beide Felder (frühestes und spätestes) eintragen; das Jahr der Herstellung kann auch geschätzt werden (BEISPIEL: wenn keinerlei Indizien vorliegen, kann den Zeitraum auch wiefolgt eingegrenzt werden: Lebenszeit des Künstlers/der Künstlerin; bei Fotografie aus dem Kriegstheater des 1. Weltkriegs liegt das Jahr zwischen 1914 und 1918; usw.)'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'Kultureller Kontext der UrheberIn (BEISPIELE: China; Europa; Ost-Asien; Ost-Europa; Arabischer Raum; Süddeutschland; Rheinland; …)'
		}
	]
};


lido_environment.forms.actor_herstellung = {
	name: "actor",
	type: "form",
	fields: [
		{
			name: "name",
			heading: "Name (Name, Vorname)",
			type: "text",
			comment: 'erst Nachname, dann Vorname; bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von)'
		},
		{
			name: "function",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: ["BildhauerIn", "BühnenbildnerIn", "FotografIn", "KomponistIn", "KünstlerIn", "MalerIn", "ErstellerIn des Konvoluts", "VerfasserIn"],
		},
		{
			name: "pnd_id",
			heading: "AkteurIn ID (PNG)",
			type: "text",
			comment: 'muss nicht ausgefüllt werden (Recherche der ID kann unter https://portal.dnb.de/opac.htm?method=showSearchForm#top durchgeführt werden); BEISPIELE: 115810757, 1052161499)'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsjahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1984; 1843)'
		},
		{
			name: "sterbejahr",
			heading: "Sterbejahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1991; 1873)'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["male", "female", "other"]
		}
	]
};



lido_environment.forms.inszenierung = {
	name: "inszenierung",
	title: "Inszenierung / Performance",
	type: "form",
	fields: [
		{
			name: "titel",
			heading: "Titel",
			type: "text",
			comment: 'Titel der Inszenierung / Performance; wenn Inszenierungsbezug, dann hier den vollständigen deutschen Titel eintragen (auch bei Opern den deutschen Titel nehmen, nicht den italienischen); keine Kurztitel verwenden; ggf. sollte man den Titel online nochmal recherchieren; die Artikel am Ende platzieren: Der, Die, Das / Ein, Einer (BEISPIELE: „Vetter aus Dingsda, Der“; „Wintermärchen, Ein“; „Räuber, Die“); hier darf u.U. auch die Spieltradition eingetragen werden (BEISPIELE: Karagöz; Wayang; Fasching; Karnevalsumzug; Passionsspiele; …)'
		},
		{
			heading: "Performance-Beschreibung",
			name: "performancebeschreibung",
			type: "textarea",
			comment: 'FREITEXT; wenn möglich, Angaben zu Premiere/ Erstaufführung/ Theaterfestival/ Rahmen der Inszenierung etc., hier das konkrete Theater/die Spielstätte angeben; Beschreibung der Art der Performance (BEISPIELE: indischer Kathakali-Tanz; Performance des Kollektivs SheShePop; Operninszenierung; Freilichttheaterinszenierung, …)'
		},
		{
			heading: "Ort",
			name: "ort",
			type: "text",
			comment: 'Ort der Performance; idealerweise hier den Städtenamen in dt. Sprache eintragen (ansonsten das Land); wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann leer lassen'
		},
		{
			heading: "Jahr (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'frühestes/ spätestes sollte einen Zeitraum angeben, in welchem die Inszenierung/die Performance stattgefunden hat; bei bekannter Jahreszahl, diese in beide Felder (frühestes und spätestes) eintragen; das Jahr der Inszenierung kann auch geschätzt werden (BEISPIEL: wenn keinerlei Indizien vorliegen, kann den Zeitraum auch wiefolgt eingegrenzt werden: Lebenszeit der Regisseurin/des Regisseurs; Bezugnahme auf ein historisches Ereignis, z.B. Mauerfall = nach 1989)'
		},
		{
			heading: "Jahr (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'frühestes/ spätestes sollte einen Zeitraum angeben, in welchem die Inszenierung/die Performance stattgefunden hat; bei bekannter Jahreszahl, diese in beide Felder (frühestes und spätestes) eintragen; das Jahr der Inszenierung kann auch geschätzt werden (BEISPIEL: wenn keinerlei Indizien vorliegen, kann den Zeitraum auch wiefolgt eingegrenzt werden: Lebenszeit der Regisseurin/des Regisseurs; Bezugnahme auf ein historisches Ereignis, z.B. Mauerfall = nach 1989)'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'Kultureller Kontext der Performance / Inszenierung: wenn die Performance in Köln stattfand, dann “Rheinland” – egal ob die Performance türkisches Karagöz oder ähnliches beinhaltet; hier ausschließlich den kulturellen Kontext der Performance eintragen (BEISPIELE: China; Europa; Ost-Asien; Ost-Europa; Arabischer Raum; Süddeutschland; Rheinland; …)'
		}
	]
};


lido_environment.forms.actor_inszenierung = {
	name: "actor",
	type: "form",
	fields: [
		{
			name: "name",
			heading: "Name (Name, Vorname)",
			type: "text",
			comment: 'erst Nachname, dann Vorname; bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von)'
		},
		{
			name: "function",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"AutorIn des inszenierten Werks", "BühnenbildnerIn der Inszenierung", "ChoreographIn des inszenierten Werks",
				"DarstellerIn der Inszenierung", "DrehbuchautorIn des Films", "KomponistIn des inszenierten Werks",
				"Konzeptionierung", "RegisseurIn des inszenierten Werks"
			]
		},
		{
			name: "pnd_id",
			heading: "AkteurIn ID (PNG)",
			type: "text",
			comment: 'muss nicht ausgefüllt werden (Recherche der ID kann unter https://portal.dnb.de/opac.htm?method=showSearchForm#top durchgeführt werden); BEISPIELE: 115810757, 1052161499)'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsjahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1984; 1843)'
		},
		{
			name: "sterbejahr",
			heading: "Sterbejahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1991; 1873)'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["male", "female", "other"]
		}
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
			comment: 'FREITEXT; Beschreibung, wie das Objekt in den Bestand der TWS gelangt ist; wie viel wurde beim Erwerb bezahlt? Was sind die Quellen für die hier angegebenen Fakten? BEISPIELE: Niessen kaufte das Gemälde 1925 in Berlin vom Antiquariat Müller für 60 Mk. (vgl. Rechnung im NL Niessen im Korrespondenzordner „M“); Max Martersteig stiftete diese Figurine 1925 dem Kölner Institut (vgl. Brief von Martersteig an Niessen, Signatur: AU4962; die vorliegende Kritik ist Teil der Sammlung Hagen, die in den 1920er Jahren geschlossen in den Bestand der TWS überging)'
		},
		{
			heading: "Ort",
			name: "ort",
			type: "text",
			comment: 'Ort des Erwerbs durch die TWS; idealerweise hier den Städtenamen in dt. Sprache eintragen (ansonsten das Land); wenn nur die Region bekannt ist, dann diese in das Feld ‚kultureller Kontext‘ eintragen; wenn Ort unbekannt, dann leer lassen'
		},
		{
			heading: "Jahr (frühestes)",
			name: "earliest_date",
			type: "text",
			comment: 'Datum des Erwerbs des Objekts durch die TWS; wenn das Jahr bekannt ist, dann in “frühestes Datum” und “spätestes Datum” die gleiche Jahreszahl eintragen; wenn das Datum unbekannt ist, dann leer lassen'
		},
		{
			heading: "Jahr (spätestes)",
			name: "latest_date",
			type: "text",
			comment: 'Datum des Erwerbs des Objekts durch die TWS; wenn das Jahr bekannt ist, dann in “frühestes Datum” und “spätestes Datum” die gleiche Jahreszahl eintragen; wenn das Datum unbekannt ist, dann leer lassen'
		},
		{
			heading: "Kultureller Kontext",
			name: "culture",
			type: "text",
			comment: 'Kultureller Kontext des Erwerbs:  (BEISPIELE: China; Europa; Ost-Asien; Ost-Europa; Arabischer Raum; Süddeutschland; Rheinland; …)'
		}
	]
};


lido_environment.forms.actor_erwerb = {
	name: "actor",
	type: "form",
	fields: [
		{
			name: "name",
			heading: "Name (Name, Vorname)",
			type: "text",
			comment: 'erst Nachname, dann Vorname; bei mittelalterlichen Personen oder dem Hochadel den Vornamen (BEISPIELE: Georg II.; Walter von der Vogelweide; Wolfram von Eschenbach); Namen mit “von” oder “zu” oder “van der” erst nach dem Vornamen (BEISPIELE: Goethe, Johann Wolfgang von; Velde, Henry van der; Kleist, Heinrich von)'
		},
		{
			name: "function",
			heading: "Funktion",
			type: "open_vocabulary",
			vocabulary: [
				"KäuferIn", "NachlasserIn", "StifterIn", "VerkäuferIn", "VermittlerIn", "VorbesitzerIn", "VerlegerIn", "DruckerIn"
			]
		},
		{
			name: "pnd_id",
			heading: "AkteurIn ID (PNG)",
			type: "text",
			comment: 'muss nicht ausgefüllt werden (Recherche der ID kann unter https://portal.dnb.de/opac.htm?method=showSearchForm#top durchgeführt werden); BEISPIELE: 115810757, 1052161499)'
		},
		{
			name: "geburtsjahr",
			heading: "Geburtsjahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1984; 1843)'
		},
		{
			name: "sterbejahr",
			heading: "Sterbejahr",
			type: "text",
			comment: 'JJJJ (BEISPIELE: 1991; 1873)'
		},
		{
			name: "geschlecht",
			heading: "Geschlecht",
			type: "select",
			vocabulary: ["male", "female", "other"]
		}
	]
};