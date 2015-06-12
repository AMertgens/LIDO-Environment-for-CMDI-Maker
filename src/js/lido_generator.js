lido_environment.lido_generator = function(data){
	"use strict";

	var xml = new XMLString();

	xml.reset();
	xml.setElementPrefix("lido");
	
	var parent = lido_environment;

	var digitalisat = lido_environment.workflow[0];	

	var create_lido_term = function (term,entity,etype) {
		if (etype=="search") {
			xml.element("term", term , [["lido:addedSearchTerm",entity]]);
		}
		else if (etype=="lang") {
			xml.element("term", term , [["xml:lang",entity]]);
		}
		else if (etype=="encoding") {
			xml.element("term", term , [["lido:encodinganalog",entity]]);
		}
		else if (etype=="encoding_search") {
			xml.element("term", term , [["lido:addedSearchTerm",entity[0]],["lido:encodinganalog",entity[1]]]);
		}
		else {
			xml.element("term", term);
		};
	}

	var create_lido_entry = function (data) {
    
		xml.header();	
		xml.open("lido",[
			["xmlns:lido", "http://www.lido-schema.org"],
			["xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance"],
			["xsi:schemaLocation","http://www.lido-schema.org http://www.lido-schema.org/schema/v1.0/lido-v1.0.xsd"]
		]);
		//xml.element("lidoRecID", lido_environment.forms.start.digitalisierungssignatur, [["lido:source","Theaterwissenschaftliche Sammlung, Universität zu Köln"], ["lido:type","local"]]);
		xml.element("lidoRecID", data.lido1.start_form.digitalisierungssignatur.digitalisierungssignatur, [["lido:source","Theaterwissenschaftliche Sammlung, Universität zu Köln"], ["lido:type","local"]]);
	
	};

	console.log(data);
	create_lido_entry(data);
	
	
	return xml.getString();

};