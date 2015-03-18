lido_environment.workflow.push((function(){
	'use strict';

	var my = {};
	var bundle;
	
	my.parent = lido_environment;
	my.l = my.parent.l;

	my.identity = {
		id: "lido_start",
		title: "Start",
		icon: "right",
	};

	my.view_id = "VIEW_start";
	
	my.init = function(view){
		
		dom.h3(view, "Hey there! You want to create a LIDO document of your object? That's great! Let's begin by giving information for basic record identification.");
		
		dom.br(view);
		APP.forms.make(view, my.parent.start_form, "start_", "start_", undefined);
		
	};
	
	
	my.view = function(){
	
		APP.GUI.scrollTop();
	
	};
	
	
	my.recall = function(data){
	
		APP.forms.fill(my.parent.start_form, "start_", data, undefined);
	
	};
	
	
	my.getSaveData = function(){
	
		return APP.forms.makeObjectWithFormData(my.parent.start_form, "start_");
	
	};
	
	
	
	my.importXML = function(xml){

		var actors_in_xml = xml.getElementsByTagName("Actor");
		
		var actors_in_json = map(actors_in_xml, function(xml_actor){
		
			console.log("Actor in IMDI found. Name: " + xml_actor.querySelector("Name").textContent.trim());
			
			var actor_object = {
				name: xml_actor.querySelector("Name").textContent.trim(),
				role: xml_actor.querySelector("Role").textContent.trim(),
				full_name: xml_actor.querySelector("FullName").textContent.trim(),
				code: xml_actor.querySelector("Code").textContent.trim(),		
				age: xml_actor.querySelector("Age").textContent.trim(),
				sex: xml_actor.querySelector("Sex").textContent.trim(),		
				education: xml_actor.querySelector("Education").textContent.trim(),
				birth_date: parse_birth_date(xml_actor.querySelector("BirthDate").textContent.trim()),
				ethnic_group: xml_actor.querySelector("EthnicGroup").textContent.trim(),
				family_social_role: xml_actor.querySelector("FamilySocialRole").textContent.trim(),
				
				description: xml_actor.querySelector("Description").textContent.trim(),
				
				contact: {
				
					name: xml_actor.querySelector("Contact").querySelector("Name").textContent.trim(),
					address: xml_actor.querySelector("Contact").querySelector("Address").textContent.trim(),
					email: xml_actor.querySelector("Contact").querySelector("Email").textContent.trim(),
					organisation: xml_actor.querySelector("Contact").querySelector("Organisation").textContent.trim(),
				
				
				},
				
				anonymized: (xml_actor.querySelector("Anonymized").textContent.trim() == "true") ? true : false,
				
				languages: []
			
			};
			
			var actor_languages = xml_actor.querySelector("Languages");
			
			forEach(actor_languages.children, function(xml_AL){
			
				if (xml_AL.nodeName != "Language"){
					return;
				}
			
				var Actor_Language = {
				
					LanguageObject: [
						xml_AL.querySelector("Id").textContent.trim().slice(9),
						"?",
						"?",
						xml_AL.querySelector("Name").textContent.trim()
					],
					
					MotherTongue: (xml_AL.querySelector("MotherTongue").textContent.trim() == "true") ? true : false,
					PrimaryLanguage: (xml_AL.querySelector("PrimaryLanguage").textContent.trim() == "true") ? true : false
				
				
				};
				
				
				actor_object.languages.push(Actor_Language);
			
			});
			
			return actor_object;

		});
		
		console.log(actors_in_xml);
		
		return actors_in_json;

	};
	
	
	my.functions = function(){
		return [];
	};


	my.reset = function(){

		my.refresh();

	};
	
	return my;

})());
  
