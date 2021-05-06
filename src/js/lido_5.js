/*
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


lido_environment.workflow[4] = (function(){
	'use strict';
	
	
	//PRIVATE
	var makePersonObjectFromFormInput = function(){
		//console.log("inmakepersont");
		var object = APP.forms.makeObjectWithFormData(my.person_form, my.form_id_prefix);
		//console.log("makeperson",object);
		return object;
		
	 
	};
	//Neu
	var makeEventObjectFromFormInput = function(){
		//console.log("inmakeeevent");
		var evobject = APP.forms.makeObjectWithFormData(my.event_form, my.form_id_prefix);
		//console.log("makeevent",evobject);
		return evobject;


	 
	};
	
	
	
	var blankForm = function(){

		g(my.element_id_prefix + "form_title").innerHTML = "Neue Akteur_in";

		APP.forms.fill(my.person_form, my.form_id_prefix);

		my.languages.clearActivePersonLanguages();
		
	};

	//Neu
	var blankEventForm = function(){

		g(my.element_id_prefix + "form_title").innerHTML = "Neues Ereignis";

		APP.forms.fill(my.event_form, my.form_id_prefix);

		//my.languages.clearActivePersonLanguages();
		
	};
	
	
	var handleClickOnPersonList = function(index){

		my.saveActivePerson("without_refreshing");
		
		my.show(my.persons.idOf(index));
	
	};
	var handleClickOnEventList = function(index){

		my.saveActiveEvent("without_refreshing");
		
		my.eventshow(my.events.idOf(index));
		APP.save_and_recall.save()

	

		
		

	
	};
	
	
	var isEveryPersonNamed = function(){
	
		return !(my.persons.isThereAnyItemWhereKeyIsValue("name", ""));
	
	};
	
	
	//PUBLIC

	var my = {};
	my.parent = lido_environment;
	my.person_form = my.parent.forms.actor_events;
	// Neu
	my.event_form = my.parent.forms.events;
	
	my.persons = new ObjectList();
	//Neu
	my.events = new ObjectList();
	//my.personMetaList = new Array;
	my.element_id_prefix = "lido5_";
	my.form_id_prefix = my.element_id_prefix + "af_";
	
	my.identity = {
		id: "lido5",
		title: "Ereignisse",
		icon: "user"
	};
	
	my.module_view;
	my.actor_wrap;
	my.left_wrap;
	var eventnamelist  = [];
	
	my.init = function(view){
	
		my.persons.reset();
		
		my.module_view = view;
		
		my.left_wrap = dom.make("div", my.element_id_prefix + "left_wrap", "left_wrap", my.module_view);
		
		/*dom.h2(my.left_wrap, "Inszenierung / Performance");
		dom.br(my.left_wrap);*/

		my.gui_eventlist = new APP.GUI.FORMS.clickableListSmall(my.left_wrap, [], [], handleClickOnEventList, my.element_id_prefix + "eventlist", 0);
		
		
		//APP.forms.make(my.left_wrap, my.parent.forms.inszenierung, "inszenierung_", "inszenierung_", undefined);
		var ev_view = dom.make("div", my.element_id_prefix + "view","", my.left_wrap);
		//my.createNewEvent();
		
		my.actor_wrap = dom.make("div", my.element_id_prefix + "actor_wrap", "actor_wrap", my.module_view);
		
		my.gui_list = new APP.GUI.FORMS.clickableListSmall(my.actor_wrap, [], [], handleClickOnPersonList, my.element_id_prefix + "list", 0);
		//my.gui_eventlist = new APP.GUI.FORMS.clickableListSmall(my.left_wrap, [], [], handleClickOnEventList, my.element_id_prefix + "list", 0);
		
		var ac_view = dom.make("div", my.element_id_prefix + "view","", my.actor_wrap);
	
		/*my.refreshPersons(true);*/
		my.refreshEvents(true);
		
		
	};
	
	
	my.getSaveData = function(){
		console.log("insavedataLido5");
		console.log(my.events.getState());
		//my.personMetaList[my.events.getActive().id] = my.persons.getState();
		
		my.saveActivePerson("without_refreshing");
	
		my.saveActiveEvent("without_refreshing");

				
		
		var object = {	
			//persons: my.persons.getState(),
			events: my.events.getState(),
			//personMetaList: my.personMetaList,
			//inszenierung_form: APP.forms.makeObjectWithFormData(lido_environment.forms.inszenierung, "inszenierung_")
		};
		
		return object;
		
	};
/*	my.associateEvent = function(){
		// fills the "event" form on the active actor with the title of the currently active event
		console.log("in_asevent");
		var activeEvent = my.getEventDisplayName(my.events.getActive())
		console.log(my.persons.getActive().name);
		//my.persons.getActive().event = activeEvent;
	};*/
	/*my.filleventlist = function(){
		
		var activeEvent = my.getEventDisplayName(my.events.getActive());
		eventnamelist.push(activeEvent);
		//console.log("Eventlist",eventnamelist);
		
	}*/
	my.showNoPersonsMessage = function(){
	
		var view = my.actor_wrap;
	
		view.innerHTML = "";
		
		var no_persons_message = dom.make("h2","no_persons_text","no_persons_text", view);
		/*no_persons_message.innerHTML = "Es gibt noch keine AkteurInnen." + " " + 
		"Warum ";
*/
		var new_person_link = dom.make("a", my.element_id_prefix + "new_person_link", my.element_id_prefix + "new_person_link", no_persons_message);

		new_person_link.innerHTML = "Erstelle ";

		no_persons_message.innerHTML += "neue Akteur_innen";

		g(my.element_id_prefix + "new_person_link").addEventListener('click', function() {my.createNewPerson(); });
		//we have to use g here instead of no_bundles_link, because latter isn't there anymore. it has been overwritten by ...innerHTML --> logically!
		
	
	};
	my.showNoEventsMessage = function(){
	
		var view = my.actor_wrap;
	
		view.innerHTML = "";
		
		var no_persons_message = dom.make("h2","no_persons_text","no_persons_text", my.left_wrap);
		/*no_persons_message.innerHTML = "Es gibt noch keine AkteurInnen." + " " + 
		"Warum ";
*/
		var new_person_link = dom.make("a", my.element_id_prefix + "new_person_link", my.element_id_prefix + "new_person_link", no_persons_message);

		new_person_link.innerHTML = "Erstelle ";

		no_persons_message.innerHTML += "neues Ereignis";

		g(my.element_id_prefix + "new_person_link").addEventListener('click', function() {my.createNewEvent(); });
		//we have to use g here instead of no_bundles_link, because latter isn't there anymore. it has been overwritten by ...innerHTML --> logically!
		
	
	};
	/*my.showNoEventMessage = function(){
	
		var view = my.left_wrap;
	
		view.innerHTML = "";
		
		var no_event_message = dom.make("h2","no_event_text","no_event_text", view);
		no_persons_message.innerHTML = "Es gibt noch keine AkteurInnen." + " " + 
		"Warum ";

		var new_person_link = dom.make("a", my.element_id_prefix + "new_person_link", my.element_id_prefix + "new_person_link", no_persons_message);

		new_person_link.innerHTML = "erstellst";

		no_persons_message.innerHTML += " du nicht welche?";

		g(my.element_id_prefix + "new_person_link").addEventListener('click', function() {my.createNewPerson(); });
		//we have to use g here instead of no_bundles_link, because latter isn't there anymore. it has been overwritten by ...innerHTML --> logically!
		
	
	};*/
	
	

	my.recall = function(data){
		console.log("eventrecall");
		console.log("data");
		/*for (var i = 0; i < data.personMetaList.length; ++i) {
			my.personMetaList[i] = data.personMetaList[i];
		}*/
	/*	my.personMetaList = data.personMetaList;
		console.log("META RECALL");
		console.log(my.personMetaList);*/
		
		/*if (my.personMetaList[0]){
			if (my.personMetaList[0].id_counter != 0){
				my.persons.setState(data.personMetaList[0]);
				my.refreshPersons();
				my.refreshFormTitle();
				my.show(my.persons.getPointer());
		}}*/
		if (data.events) {
			if (data.events.id_counter != 0){
				my.events.setState(data.events);
				my.refreshEvents();
				my.refreshEventFormTitle();
				my.show(my.events.getPointer());
		}}
	
	};
	
	
	my.functions = function(){
		return [
		{
				id: my.element_id_prefix + "link_new_event",
				icon: "plus",
				label: "Neues Ereignis hinzufügen",
				onclick: function() { my.createNewEvent();
									my.persons.reset();
									my.refreshPersons(); }
			},
			{
				id: my.element_id_prefix + "link_delete_active_events",
				icon: "reset",
				label: "Ausgewähltes Ereignis löschen",
				onclick: function() { my.handleClickOnDeleteEvent(); }
			},
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
				label: "AkteurInnen alphabetisch sortieren",
				onclick: function() {
				
					my.saveActivePerson();
					my.persons.sortByKey("name");
					my.refreshPersons();
		
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
					my.refreshPersons();
				
					APP.log("Person gespeichert und dupliziert","success");
			
				}
			},
			{
				id: my.element_id_prefix + "link_delete_all_persons",
				icon: "reset",
				label: "Alle AkteurInnen löschen",
				onclick: my.erase_database
			}
		];
	};
	

	my.erase_database = function(){

		APP.confirm("Möchtest du wirklich alle AkteurInnen löschen?", function (e) {

			if (e) {
				// user clicked "ok"
				
			}
		
			else {
				// user clicked "cancel" (as cancel is always the red button, the red button is chosen to be the executive button
				
				my.persons.reset();

				APP.log("Alle AkteurInnen gelöscht");
				
				my.refreshPersons();

			}
			
		}, "Nein", "Ja, löschen!");
		
	};


	my.show = function(person_id){
		
		console.log("PersID:", person_id);
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
		console.log("persontodisplay: ", person_to_display);
		APP.forms.fill(my.person_form, my.form_id_prefix, person_to_display);
		
	};

	//NEU
	my.eventshow = function(event_id){
		
		console.log("EventID:", event_id);
		if (my.events.length == 0){
			console.info("events.show: No Events to show!");
			return;
		}		

		var event_index = my.events.getIndexByID(event_id);
		
		if (typeof event_index == "undefined"){
			console.warn("event.show: Undefined event_id! Showing event 0");
			event_index = 0;
		}

		console.log("Showing event " + event_index);
		
		my.createEventFormIfNotExistent();
		
		my.gui_eventlist.changeHighlight(event_index);
		
		my.events.setPointer(event_id);
		
		my.refreshEventFormTitle();
		
		var event_to_display = my.events.getActive();

		console.log("eventtodisplay: ", event_to_display);
		APP.forms.fill(my.event_form, my.form_id_prefix, event_to_display);

		my.persons.reset();	
		console.log("test");
		console.log(my.persons);
		console.log(event_to_display.personlist);
		if (event_to_display.personlist) {
			my.persons.setState(event_to_display.personlist);
		};
		
		my.refreshPersons();


		
	};
	
	
	my.refreshFormTitle = function(){
	
		var form_title = g(my.element_id_prefix + "form_title");
		
		var person_name = my.getPersDisplayName(my.persons.getActive());
		
		if (person_name == ""){
			form_title.innerHTML = "Unbenannte AkteurIn";
		}
		
		else {
			form_title.innerHTML = person_name;
		}
	
	};
	my.refreshEventFormTitle = function(){
	
		var form_title = g(my.element_id_prefix + "evform_title");
		
		var event_name = my.getEventDisplayName(my.events.getActive());
		
		if (event_name == ""){
			form_title.innerHTML = "Unbenanntes Ereignis";
		}
		
		else {
			form_title.innerHTML = event_name;
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
		APP.forms.make(g(my.element_id_prefix + "content_div"), my.parent.forms.actor_events, my.form_id_prefix, my.form_id_prefix, undefined, undefined);
		
		//To refresh name and role in person list as soon as they are changed by the user
		g(my.form_id_prefix + "name").addEventListener("blur", my.saveActivePerson);


	};

	//Neu
		my.createEventFormIfNotExistent = function(){
	
		var ev_view = g(my.element_id_prefix + "lidoevent_view");
		
		if (ev_view){
			return;
		};
	
		ev_view = dom.make("div", my.element_id_prefix + "lidoevent_view", "lidoevent_view", my.left_wrap);
		
		ev_view.innerHTML = "";
		
		var title_div = dom.make("div", my.element_id_prefix + "title_div", "lidoevent_title_div", ev_view);
		dom.make("h1", my.element_id_prefix + "evform_title", "lidoevent_form_title", title_div, "Neues Event");
		dom.make("div", my.element_id_prefix + "eventcontent_div","lidoevent_content_div", ev_view);

		APP.forms.make(g(my.element_id_prefix + "eventcontent_div"), my.parent.forms.events, my.form_id_prefix, my.form_id_prefix, undefined, undefined);
		
		//To refresh name and role in person list as soon as they are changed by the user
		//g(my.form_id_prefix + "titel").addEventListener("blur", my.saveActiveEvent);

	};



	my.saveActivePerson = function(flag){
	
		if (my.persons.getPointer() == -1){
			return;
		}
	
		var person_to_put = makePersonObjectFromFormInput();
		console.log("insaveactiveperson",my.events.getPointer());
		person_to_put.display_name = my.getPersDisplayName(person_to_put);
		console.log("insaveactiveperson",person_to_put);
		my.save(person_to_put);
		//my.personMetaList[my.events.getActive().id] = my.persons.getState();
		//my.events.getActive().personlist = my.persons.getState();
		my.refreshPersons();
		my.refreshFormTitle();

		return person_to_put;

		//how do we require person name?
	};
	my.saveActiveEvent = function(flag){
	
		if (my.events.getPointer() == -1){
			return;
		}
		console.log("insaveactiveevent",my.events.getPointer());
		var event_to_put = makeEventObjectFromFormInput();
		console.log("insaveactiveevent",event_to_put);
		event_to_put.display_name = my.getEventDisplayName(event_to_put);
		event_to_put.personlist = my.persons.getState();
		console.log("saveEvent"),
		console.log(event_to_put);
		my.eventsave(event_to_put);

		//my.personMetaList[my.events.getActive().id] = my.persons.getState();
		
		
		my.persons.reset();
		my.refreshPersons();

		my.refreshEvents();
		my.refreshEventFormTitle();


		return event_to_put;

		//how do we require person name?
	};


	my.save = function(person_to_put){
	//this will always overwrite an existing person

		my.persons.replaceActive(person_to_put);

		return person_to_put;

	};

	my.eventsave = function(event_to_put){
	//this will always overwrite an existing person

		my.events.replaceActive(event_to_put);

		return event_to_put;

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
		
		person_to_put.display_name = my.getPersDisplayName(person_to_put);
		
		var person_id = my.persons.add(person_to_put);
		
		my.createFormIfNotExistent();

		my.refreshPersons();
		/*my.associateEvent();*/
		//show this created person
		my.show(person_id);
		//my.associateEvent();
		
	};
	// Neu
	my.createNewEvent = function(event_to_put){
	
		my.saveActiveEvent();
		my.persons = new ObjectList();
		my.persons.reset();

		
		
		//after the current event is saved, check, if all events have a name
		/*if (!isEveryEventNamed()){
			APP.alert("Bitte gib allen Events zuerst einen Namen!");
			return;
		}*/
		
		
		//if no person object is given, get the form input
		if (!event_to_put){
			event_to_put = APP.forms.createEmptyObjectFromTemplate(my.event_form);
		}
		
		event_to_put.display_name = my.getEventDisplayName(event_to_put);
		
		var event_id = my.events.add(event_to_put);
		console.log("inside createNewEvent");
		
		my.createEventFormIfNotExistent();

		my.refreshEvents();
		//my.refreshPersons(true);
		
		//show this created person
		my.eventshow(event_id);
		my.show()
		/*APP.save_and_recall.save();
		my.refreshFormTitle();
*/
		
		
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
	//Neu
	my.handleClickOnDeleteEvent = function(){
	
		if (typeof my.events.pointer == -1){
			console.warn("Active Event is undefined. Don't know what to delete!");
			return;
		}
	
		var name_of_event = my.events.getActive().name;
		var confirm_message;
		
		if (name_of_event == ""){
		
			confirm_message = "Möchtest du dieses Event wirklich löschen?";
		
		}
		
		else {
		
			confirm_message = "Möchtest du " + name_of_event + "wirklich löschen?";
		
		}

		APP.confirm(confirm_message, function (e) {

			if (e) {
				// user clicked "ok"
			}
		
			else {
				// user clicked "cancel"
				
				my.deleteActiveEvent();
				
				APP.log("" + name_of_event + " gelöscht!");

			}
		}, "Nein", "Ja, löschen");
	
	};
	

	my.deleteActivePerson = function(){

		my.persons.removeActive();
		my.refreshPersons();

	};
	//Neu
	my.deleteActiveEvent = function(){

		my.events.removeActive();
		my.refreshEvents();

	};
	
	my.refreshPersons = function(){
		
		my.actor_wrap.innerHTML = "";
		
		var display_names = my.persons.map(function(pers){
			return my.getPersDisplayName(pers.id);
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
	//Neu
	my.refreshEvents = function(){
		
		my.left_wrap.innerHTML = "";
		
		var display_names = my.events.map(function(event){
			return my.getEventDisplayName(event.id);
		});
		
		
		my.gui_eventlist.refresh(display_names);

		
		if (my.events.length == 0){
			my.showNoEventsMessage();
			
			APP.environments.disableFunction(my.element_id_prefix + "link_delete_active_events");
			APP.environments.disableFunction(my.element_id_prefix + "sa_div");
			APP.environments.disableFunction(my.element_id_prefix + "link_duplicateActiveEvent");
			
		}
		
		else {
		
			my.createEventFormIfNotExistent();
			my.eventshow(my.events.getPointer());
		
			my.gui_eventlist.changeHighlight(my.events.getActiveIndex());
			
			APP.environments.enableFunction(my.element_id_prefix + "link_delete_active_events");
			APP.environments.enableFunction(my.element_id_prefix + "sa_div");
			APP.environments.enableFunction(my.element_id_prefix + "link_duplicateActiveEvent");
		}
		console.log(my.events.getActive())
		if (my.events.getActive()) {
			my.persons.getState(my.events.getActive().personlist);
		}
		//my.filleventlist();
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
	my.getPersDisplayName = function(person_or_person_id){
	
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
	//Neu
	my.getEventDisplayName = function(event_or_event_id){
	
		var event;
	
		if (typeof event_or_event_id == "object"){
			event = event_or_event_id;
		}
		
		else if (my.events.existsByID(event_or_event_id)){		
			event = my.events.getByID(event_or_event_id);
		}
		
		if (!event){
			return console.warn("Event undefined!");
		}
		
		if (event.titel && event.titel != ""){
			return event.titel;
		}


		return "Unbenanntes Ereignis";
	
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
		if (person.function1 && person.function1 != ""){
			return person.function1;
		}


		return "";
	
	};

	
	my.doesInszenierungHaveValidYear = function(){

		var earliestyear = my.getSaveData().inszenierung_form.earliest_date;
		var lastyear = my.getSaveData().inszenierung_form.latest_date;
		
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

	my.areAllPersonsNamed = function(){
	
		for (var i = 0; i < my.persons.length; i++){
		
			var person = my.persons.get(i);
		
			if (person.name == "" || person.name == "Unbenannte Akteur_in"){
				
				return false;
			
			}
			
		}		
		
		return true;
	
	};
	

	my.reset = function(){
	
		//APP.forms.fill(lido_environment.forms.events, "events_");
		//my.personMetaList = [];
		my.persons.reset();
		my.refreshPersons();
		my.events.reset();
		my.refreshEvents();
	
	
	};
	

	return my;
	
})();