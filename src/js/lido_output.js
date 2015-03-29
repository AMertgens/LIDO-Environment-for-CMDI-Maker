lido_environment.workflow.push((function (){
	'use strict';

	var my = {};
	
	var start;
	var object_identification;
	var event;
	var object_relation;
	
	my.parent = lido_environment;
	
	my.view_element;
	
	my.identity = {
		id: "xml_output",
		title: "XML Output",
		icon: "submit"
	};
	
	
	my.init = function(view_element){
	
		start = my.parent.workflow[0];
		object_identification = my.parent.workflow[1];
		event = my.parent.workflow[2];
		object_relation = my.parent.workflow[3];
	
		my.view_element = view_element;
		
	};
	
	
	my.view = function(){
	
		APP.save();
		
		if (start.getSaveData().object_id == ""){
			APP.view("VIEW_lido_start");
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
			start: start.getSaveData(),
			object_identification: object_identification.getSaveData(),
			event: event.getSaveData(),
			object_relation: object_relation.getSaveData()
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