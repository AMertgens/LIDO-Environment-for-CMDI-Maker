﻿/*
Copyright 2014 Sebastian Zimmer

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


lido_environment.workflow[1] = (function(){
	'use strict';
	
	
	//PRIVATE
	var makePersonObjectFromFormInput = function(){

		var object = APP.forms.makeObjectWithFormData(my.person_form, my.form_id_prefix);

		return object;
	 
	};
	
	
	var blankForm = function(){

		g(my.element_id_prefix + "form_title").innerHTML = "Neue Akteur_in";

		APP.forms.fill(my.person_form, my.form_id_prefix);

		my.languages.clearActivePersonLanguages();
		
	};
	
	
	var handleClickOnPersonList = function(index){

		my.saveActivePerson("without_refreshing");
		
		my.show(my.persons.idOf(index));
	
	};
	
	
	var isEveryPersonNamed = function(){
	
		return !(my.persons.isThereAnyItemWhereKeyIsValue("name", ""));
	
	};
	
	
	//PUBLIC

	var my = {};
	my.parent = lido_environment;
	// replace herstellung durch objektbeschreibung actor
	my.person_form = my.parent.forms.actor_objektbeschreibung;
	
	my.persons = new ObjectList();
	
	my.element_id_prefix = "lido2_";
	my.form_id_prefix = my.element_id_prefix + "af_";
	
	my.identity = {
		id: "lido2",
		title: "Objektbeschreibung",
		icon: "user"
	};
	
	my.module_view;
	my.actor_wrap;
	
	my.init = function(view){
	
		my.persons.reset();
		
		my.module_view = view;
		
		my.left_wrap = dom.make("div", my.element_id_prefix + "left_wrap", "left_wrap", my.module_view);
		
		dom.h2(my.left_wrap, "Beschreibung des Objekts");
		dom.br(my.left_wrap);
		
		APP.forms.make(my.left_wrap, my.parent.forms.objektbeschreibung, "objektbeschreibung_", "objektbeschreibung_", undefined);
		
		
		my.actor_wrap = dom.make("div", my.element_id_prefix + "actor_wrap", "actor_wrap", my.module_view);
		dom.h2(my.actor_wrap, "Abgebildete/erwähnte Personen");
		dom.br(my.actor_wrap);
		my.gui_list = new APP.GUI.FORMS.clickableListSmall(my.actor_wrap, [], [], handleClickOnPersonList, my.element_id_prefix + "list", 0);
		
		var ac_view = dom.make("div", my.element_id_prefix + "view","", my.actor_wrap);
	
		my.refresh(true);
		
	};
	
	
	my.getSaveData = function(){
	
		my.saveActivePerson("without_refreshing");	
		
		var object = {	
			persons: my.persons.getState(),
			beschreibung_form: APP.forms.makeObjectWithFormData(lido_environment.forms.objektbeschreibung, "objektbeschreibung_")
		};
	
		return object;
		
	};
	
	
	my.showNoPersonsMessage = function(){
	
		var view = my.actor_wrap;
	
		view.innerHTML = "";
		
		var no_persons_message = dom.make("h2","no_persons_text","no_persons_text", view);
		no_persons_message.innerHTML = "Abgebildete / Erwähnte Person ";

		var new_person_link = dom.make("a", my.element_id_prefix + "new_person_link", my.element_id_prefix + "new_person_link", no_persons_message);

		new_person_link.innerHTML = "hinzufügen";

		

		g(my.element_id_prefix + "new_person_link").addEventListener('click', function() {my.createNewPerson(); });
		//we have to use g here instead of no_bundles_link, because latter isn't there anymore. it has been overwritten by ...innerHTML --> logically!
		
	
	};
	
	
	my.recall = function(data){
		
		APP.forms.fill(lido_environment.forms.objektbeschreibung, "objektbeschreibung_", data.beschreibung_form);
		if (data.persons.id_counter != 0) {
		console.log(data.persons.id_counter);
		my.persons.setState(data.persons);
		my.refresh();
		my.refreshFormTitle();
		my.show(my.persons.getPointer());
		}
		else {
		my.refresh();
		}
	
	};
	
	
	my.functions = function(){
		return [
			{
				id: my.element_id_prefix + "link_new_person",
				icon: "plus",
				label: "Neue Akteur_in",
				onclick: function() { my.createNewPerson(); }
			},
			{
				id: my.element_id_prefix + "link_delete_active_person",
				icon: "reset",
				label: "Diese Akteur_in löschen",
				onclick: function() { my.handleClickOnDeletePerson(); }
			},
			{
				id: my.element_id_prefix + "link_sort_persons_alphabetically",
				icon: "az",
				label: "Akteur_innen alphabetisch sortieren",
				onclick: function() {
				
					my.saveActivePerson();
					my.persons.sortByKey("name");
					my.refresh();
		
					APP.log("Personen sortiert");
					
				}
			},
			{
				id: my.element_id_prefix + "link_duplicateActivePerson",
				icon: "duplicate_user",
				label: "Akteur_in duplizieren",
				onclick: function() {
					my.saveActivePerson();
					my.persons.duplicateActive();
					my.refresh();
				
					APP.log("Person gespeichert und dupliziert","success");
			
				}
			},
			{
				id: my.element_id_prefix + "link_delete_all_persons",
				icon: "reset",
				label: "Alle Akteur_innen löschen",
				onclick: my.erase_database
			}
		];
	};
	

	my.erase_database = function(){

		APP.confirm("Möchtest du wirklich alle Akteur_innen löschen?", function (e) {

			if (e) {
				// user clicked "ok"
				
			}
		
			else {
				// user clicked "cancel" (as cancel is always the red button, the red button is chosen to be the executive button
				
				my.persons.reset();

				APP.log("Alle Akteur_innen gelöscht");
				
				my.refresh();

			}
			
		}, "Nein", "Ja, löschen!");
		
	};


	my.show = function(person_id){
	
		if (my.persons.length == 0){
			console.info("person.show: No persons to show!");
			return;
		}		

		var person_index = my.persons.getIndexByID(person_id);
		
		if (typeof person_index == "undefined"){
			console.warn("person.show: Undefined person_id! Showing person 0");
			person_index = 0;
		}

		console.log("Showing person " + person_index);
		
		my.createFormIfNotExistent();
		
		my.gui_list.changeHighlight(person_index);
		
		my.persons.setPointer(person_id);
		
		my.refreshFormTitle();
		
		var person_to_display = my.persons.getActive();
		
		APP.forms.fill(my.person_form, my.form_id_prefix, person_to_display);
		
	};
	
	
	my.refreshFormTitle = function(){
	
		var form_title = g(my.element_id_prefix + "form_title");
		
		var person_name = my.getDisplayName(my.persons.getActive());
		
		if (person_name == ""){
			form_title.innerHTML = "Unbenannte Akteur_in";
		}
		
		else {
			form_title.innerHTML = person_name;
		}
	
	};

	
	my.createFormIfNotExistent = function(){
	
		var ac_view = g(my.element_id_prefix + "lidoperson_view");
		
		if (ac_view){
			return;
		};
	
		ac_view = dom.make("div", my.element_id_prefix + "lidoperson_view", "lidoperson_view", my.actor_wrap);
		
		ac_view.innerHTML = "";
		
		var title_div = dom.make("div", my.element_id_prefix + "title_div", "lidoperson_title_div", ac_view);
		dom.make("h1", my.element_id_prefix + "form_title", "lidoperson_form_title", title_div, "Neue AkteurIn");
		var content_div = dom.make("div", my.element_id_prefix + "content_div","lidoperson_content_div", ac_view);
		my.a(content_div,"gndlink","link","https://portal.dnb.de/opac.htm?method=showSearchForm#top", "GND");
		dom.br(content_div);

		APP.forms.make(g(my.element_id_prefix + "content_div"), my.parent.forms.actor_objektbeschreibung, my.form_id_prefix, my.form_id_prefix, undefined, undefined);
		
		//To refresh name and role in person list as soon as they are changed by the user
		g(my.form_id_prefix + "name").addEventListener("blur", my.saveActivePerson);

	};


	my.saveActivePerson = function(flag){
	
		if (my.persons.getPointer() == -1){
			return;
		}
	
		var person_to_put = makePersonObjectFromFormInput();
		
		person_to_put.display_name = my.getDisplayName(person_to_put);
		
		my.save(person_to_put);
	
		my.refresh();
		my.refreshFormTitle();
		

		return person_to_put;

		//how do we require person name?
	};


	my.save = function(person_to_put){
	//this will always overwrite an existing person

		my.persons.replaceActive(person_to_put);

		return person_to_put;

	};
	
	
	my.createNewPerson = function(person_to_put){
	
		my.saveActivePerson();
		
		//after the current person is saved, check, if all persons have a name
		if (!isEveryPersonNamed()){
			APP.alert("Bitte gib all deinen Akteur_innen zuerst einen Namen!");
			return;
		}
		
		
		//if no person object is given, get the form input
		if (!person_to_put){
			person_to_put = APP.forms.createEmptyObjectFromTemplate(my.person_form);
		}
		
		person_to_put.display_name = my.getDisplayName(person_to_put);
		
		var person_id = my.persons.add(person_to_put);
		
		my.createFormIfNotExistent();

		my.refresh();
		
		//show this created person
		my.show(person_id);
		
	};


	my.handleClickOnDeletePerson = function(){
	
		if (typeof my.persons.pointer == -1){
			console.warn("Active Person is undefined. Don't know what to delete!");
			return;
		}
	
		var name_of_person = my.persons.getActive().name;
		var confirm_message;
		
		if (name_of_person == ""){
		
			confirm_message = "Möchtest du diese Akteur_in wirklich löschen?";
		
		}
		
		else {
		
			confirm_message = "Möchtest du " + name_of_person + "wirklich löschen?";
		
		}

		APP.confirm(confirm_message, function (e) {

			if (e) {
				// user clicked "ok"
			}
		
			else {
				// user clicked "cancel"
				
				my.deleteActivePerson();
				
				APP.log("" + name_of_person + " gelöscht!");

			}
		}, "Nein", "Ja, löschen");
	
	};
	

	my.deleteActivePerson = function(){

		my.persons.removeActive();
		my.refresh();

	};
	
	
	my.refresh = function(){
		
		my.actor_wrap.innerHTML = "";
		
		var display_names = my.persons.map(function(pers){
			return my.getDisplayName(pers.id);
		});
		var display_role = my.persons.map(function(pers){
			return my.getDisplayRole(pers.id);
		});
		
		my.gui_list.refresh(display_names,display_role);
		
		if (my.persons.length == 0){
			my.showNoPersonsMessage();
			
			APP.environments.disableFunction(my.element_id_prefix + "link_delete_active_person");
			APP.environments.disableFunction(my.element_id_prefix + "sa_div");
			APP.environments.disableFunction(my.element_id_prefix + "link_duplicateActivePerson");
			
		}
		
		else {
		
			my.createFormIfNotExistent();
			my.show(my.persons.getPointer());
		
			my.gui_list.changeHighlight(my.persons.getActiveIndex());
			
			APP.environments.enableFunction(my.element_id_prefix + "link_delete_active_person");
			APP.environments.enableFunction(my.element_id_prefix + "sa_div");
			APP.environments.enableFunction(my.element_id_prefix + "link_duplicateActivePerson");
		}

	};
	
	
	my.getDisplayName = function(person_or_person_id){
	
		var person;
	
		if (typeof person_or_person_id == "object"){
			person = person_or_person_id;
		}
		
		else if (my.persons.existsByID(person_or_person_id)){		
			person = my.persons.getByID(person_or_person_id);
		}
		
		if (!person){
			return console.warn("Person undefined!");
		}
		
		if (person.name && person.name != ""){
			return person.name;
		}


		return "Unbenannte Akteur_in";
	
	};

	my.getDisplayRole = function(person_or_person_id){
	
		var person;
	
		if (typeof person_or_person_id == "object"){
			person = person_or_person_id;
		}
		
		else if (my.persons.existsByID(person_or_person_id)){		
			person = my.persons.getByID(person_or_person_id);
		}
		
		if (!person){
			return console.warn("Person undefined!");
		}
		
		if (person.function && person.function != ""){
			return person.function;
		}


		return "";
	
	};
	
	
	
	my.doesobjektbeschreibungHaveValidYear = function(){

		var earliestyear = my.getSaveData().objektbeschreibung_form.earliest_date;
		var lastyear = my.getSaveData().objektbeschreibung_form.latest_date;
		
		if (earliestyear != '' || lastyear != '') {
			if (earliestyear.length > 4 || lastyear.length > 4 || (/\D/.test(earliestyear)) || (/\D/.test(lastyear)) || Number(earliestyear)>Number(lastyear)) {
				return false;
			}
		}
		return true;	

	};


	my.doesEveryPersonHaveValidBirthYear = function(){
	

		for (var i = 0; i < my.persons.length; i++){
		
			var geburtsjahr = my.persons.get(i).geburtsjahr;
			var sterbejahr = my.persons.get(i).sterbejahr;
		
			if (geburtsjahr != '' || sterbejahr != '') {
				if (geburtsjahr.length > 4 || sterbejahr.length > 4 || (/\D/.test(geburtsjahr)) || (/\D/.test(sterbejahr)) || Number(geburtsjahr)>Number(sterbejahr)) {
					return false;
				}
			}
			
		}
		
		return true;	
	
	};
	
	my.a = function(parent, id, className, href, innerHTML, onclick){
	
		var a = dom.newElement("a",id,className,parent,innerHTML);
		
		if (href){
			a.href = href;
			a.setAttribute('target', '_blank');
		}
		
		if (typeof onclick != "undefined"){
			a.addEventListener("click", onclick);
		}
		
		return a;
	
	};

	my.areAllPersonsNamed = function(){
	
		for (var i = 0; i < my.persons.length; i++){
		
			var person = my.persons.get(i);
		
			if (person.name == "" || person.name == "Unbenannte Akteur_in"){
				
				return false;
			
			}
			
		}		
		
		return true;
	
	};
	my.IsDescriptionOk = function(){

		var Titel 			= my.getSaveData().beschreibung_form.objekt_identifikation.titel;
		var Objektart 		= my.getSaveData().beschreibung_form.objektzuordnung.objektart;
		var Objektgattung 	= my.getSaveData().beschreibung_form.objektzuordnung.objektgattung;

		if (Titel == '' || Objektart == '' || Objektgattung == '') {
			return false;
		}
		
		return true;	
	
	};
	
	my.reset = function(){
	
		APP.forms.fill(lido_environment.forms.objektbeschreibung, "objektbeschreibung_");
	
		my.persons.reset();
		my.refresh();
	
	
	};

	return my;
	
})();
/*lido_environment.workflow.push((function(){
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

	my.IsDescriptionOk = function(){

		var Titel 			= my.getSaveData().beschreibung_form.objekt_identifikation.titel;
		var Objektart 		= my.getSaveData().beschreibung_form.objektzuordnung.objektart;
		var Objektgattung 	= my.getSaveData().beschreibung_form.objektzuordnung.objektgattung;

		if (Titel == '' || Objektart == '' || Objektgattung == '') {
			return false;
		}
		
		return true;	
	
	};
	
	
	my.functions = function(){
		return [];
	};


	return my;
	
})());*/