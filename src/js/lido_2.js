lido_environment.workflow.push((function(){
	'use strict';
	

	var my = {};
	my.parent = lido_environment;
	var bundle;

	my.element_id_prefix = "actor_";
	
	my.identity = {
		id: "lido2",
		title: "Objektbeschreibung",
		icon: "edit"
	};
	
	my.module_view;
	
	my.init = function(view){
	
		my.module_view = view;
		
		APP.forms.make(my.module_view, my.parent.forms.objektbeschreibung, "objektbeschreibung_", "objektbeschreibung_", undefined);
		
	};
	
	
	my.getSaveData = function(){

		var data = {
			beschreibung_form: APP.forms.makeObjectWithFormData(my.parent.forms.objektbeschreibung, "objektbeschreibung_")
		};
		
		return data;	
	};
	
	
	my.reset = function(){
	
		my.module_view.innerHTML = "";
		APP.forms.make(my.module_view, my.parent.forms.objektbeschreibung, "objektbeschreibung_", "objektbeschreibung_", undefined);
	
	};
	
	
	my.recall = function(data){

		APP.forms.fill(lido_environment.forms.objektbeschreibung, "objektbeschreibung_", data.beschreibung_form);
	
		//my.refresh();
		
	};
	
	
	my.functions = function(){
		return [];
	};


	return my;
	
})());