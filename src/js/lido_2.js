lido_environment.workflow.push((function(){
	'use strict';
	

	var my = {};
	my.parent = lido_environment;
	var bundle;

	my.element_id_prefix = "actor_";
	
	my.identity = {
		id: "object_identification",
		title: "Objektbeschreibung",
		icon: "blocks"
	};
	
	my.module_view;
	
	my.init = function(view){
	
		APP.forms.make(view, my.parent.forms.objektbeschreibung, "objektbeschreibung_", "objektbeschreibung_", undefined);
		
	};
	
	
	my.getSaveData = function(){
	
		return APP.forms.makeObjectWithFormData(my.parent.object_form, "objektbeschreibung__");
	
	};
	
	
	my.recall = function(data){
	
		APP.forms.fill(my.parent.object_form, "objektbeschreibung_", data, undefined);
		
	};
	
	
	my.functions = function(){
		return [];
	};


	return my;
	
})());