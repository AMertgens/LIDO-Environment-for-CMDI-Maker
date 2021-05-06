lido_environment.workflow.push((function (){
	'use strict';

	var my = {};
	
	var lido1;
	var lido2;
	var lido3;
	var lido4;
	var lido5;
	var lido6;
	
	my.parent = lido_environment;
	
	my.view_element;
	
	my.identity = {
		id: "xml_output",
		title: "XML Output",
		icon: "submit"
	};
	
	
	my.init = function(view_element){
	
		lido1 = my.parent.workflow[0];
		lido2 = my.parent.workflow[1];
		lido3 = my.parent.workflow[2];
		lido4 = my.parent.workflow[3];
		lido5 = my.parent.workflow[4];
		lido6 = my.parent.workflow[5];
	
		my.view_element = view_element;
		
	};
	
	
	my.view = function(){
	
		APP.save();
		
		if (!lido1.IsSignatureOk()){
			APP.view(lido1);
			APP.alert("Digitalisierungssignatur oder Eintragsart leer!");
			return;		
		}

		if (!lido2.IsDescriptionOk()){
			APP.view(lido2);
			APP.alert("Objekttitel, Objektgattung oder Objektart leer!");
			return;		
		}

		/*if (!lido3.doesHerstellungHaveValidYear()){
			APP.view(lido3);
			APP.alert("Das Datum bei Herstellung ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}
		if (!lido3.doesEveryPersonHaveValidBirthYear()){
			APP.view(lido3);
			APP.alert("Das Datum bei einem Herstellungs Akteur ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}

		if (!lido4.doesInszenierungHaveValidYear()){
			APP.view(lido4);
			APP.alert("Das Datum bei Inszenierung ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}
		if (!lido4.doesEveryPersonHaveValidBirthYear()){
			APP.view(lido4);
			APP.alert("Das Datum bei einem Inszenierungs Akteur ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}

		if (!lido6.doesErwerbHaveValidYear()){
			APP.view(lido5);
			APP.alert("Das Datum bei Erwerb ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}
		if (!lido6.doesEveryPersonHaveValidBirthYear()){
			APP.view(lido5);
			APP.alert("Das Datum bei einem Erwerbs Akteur ist nicht korrekt! (Es sind nur maximal 4 Zahlen erlaubt)");
			return;
		}*/
	
		my.generate();
		
	};
	

	my.functions = function() {
		return [];
	};
	

	my.generate = function (){
		
		my.view_element.innerHTML = "";
		
		var data = {
			lido1: lido1.getSaveData(),
			lido2: lido2.getSaveData(),
			lido3: lido3.getSaveData(),
			lido4: lido4.getSaveData(),
			lido5: lido5.getSaveData(),
			lido6: lido6.getSaveData()
		};
		
		var xml_string = lido_environment.lido_generator(data);

		var filename = lido_environment.getProjectName() + ".xml";

        var post_information = {
            url: "http://localhost:8080/exist/rest/apps/theater-history/data/cmditest/" + filename,
            xml_string_key: "",
            additional_data: "name=" + filename,
            additional_headers: [
                {
                    key: "Content-Type",
                    value: "application/xml"

                },
				{
					key: "Content-Length",
					value: xml_string.length
				}
            ]
        };

        APP.GUI.createXMLOutputDIV(my.view_element, filename, "ta_0", xml_string, filename, false, post_information);

    };



    return my;
	
})());