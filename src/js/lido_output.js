lido_environment.workflow.push((function (){
	'use strict';

	var my = {};
	
	var lido1;
	var lido2;
	var lido3;
	var lido4;
	var lido5;
	
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
	
		my.view_element = view_element;
		
	};
	
	
	my.view = function(){
	
		APP.save();
		
		if (lido1.getSaveData().object_id == ""){
			APP.view("VIEW_lido_lido1");
			APP.alert("You must provide a valid Record ID!");
			return;		
		}
	
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
			lido5: lido5.getSaveData()
		};
		
		var xml_string = lido_environment.lido_generator(data);

		var filename = lido_environment.getProjectName() + ".xml";
		
		var post_information = {
			url: "http://dd-dariah.uni-koeln.de/exist/apps/wahn/importpage.html",
			xml_string_key: "content",
			additional_data: "name=" + filename,	
			additional_headers: [
				{
					key: "Content-Type",
					value: "application/x-www-form-urlencoded; charset=UTF-8"
				}
			]
		};
		
		APP.GUI.createXMLOutputDIV(my.view_element, filename, "ta_0", xml_string, filename, false, post_information);

	};
	
	
	return my;
	
})());