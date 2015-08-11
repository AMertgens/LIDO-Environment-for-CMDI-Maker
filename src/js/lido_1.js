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


lido_environment.workflow[0] = (function(){
	'use strict';

	var my = {};
	var bundle;
	
	my.parent = lido_environment;
	my.l = my.parent.l;
	
	my.fileSelection = undefined;
	
	my.resources = new ObjectList();
	// this array only contains file metadata retrieved by file upload form / drag and drop

	my.identity = {
		id: "lido1",
		title: "Start: Objektidentifikation",
		icon: "shapes",
	};

	my.view_id = "VIEW_lido1";
	
	my.substitute_for_bad_chars = "_";
	
	my.init = function(view){
	
		var div = dom.make("div","files","",view);
		
				
		APP.forms.make(div, lido_environment.forms.start, "start_form_", "", undefined, undefined);
		
		
		dom.h3(div, "Dateien importieren");
		var drop_zone = APP.GUI.FORMS.fileDropZone(div, "drop_zone", my.pushFileMetadata);

		var usage_table = dom.make(
			"div","","workspace-usageTable",div,
			'<h3>' + "Benutzung" + '</h3>' +
			'<h4>' + "Klick" + '</h4>'+
			'<p>' + "Datei wird ausgewählt. Ein weiterer Klick macht die Auswahl rückgängig." + '</p>'+
			'<h4>' + "Shift" + '</h4>'+
			'<p>' + "Halte Shift, um mehrere Dateien gleichzeitig auszuwählen" + '</p>'+
			'<h4>' + "Escape" + '</h4>'+
			'<p>' + "Alle Dateien werden deselektiert" + '</p>'
		);

		var file_list_div = dom.make("div","file_list_div","",view);
		var list = dom.make("div","list","",file_list_div);
		
		my.fileSelection = new APP.GUI.selectionMechanism(
			"file_entry_", 
			"selected_file",
			function(event){
				my.resources.get(event.index).selected = event.selected;
				
				my.fadeFilesThatStartWithSameNameAsSelectedOnes();
				
			}
		);
		
		my.refresh(true);
		
	};
	
	
	my.view = function(){
	
		APP.GUI.scrollTop();
	
	};
	
	
	my.getFileType = function(filename){
	
		var file_types = my.file_types;

		var index_of_dot = filename.lastIndexOf(".");

		var fileending = filename.slice(index_of_dot+1);
		
		var fileinfo = {
			type: "unknown",
			mimetype: "unknown"
		};
		
		var list = a(file_types.valid_lamus_written_resource_file_types,0);
		var pos = list.indexOf(fileending);
		
		if (list.indexOf(fileending) != -1){
		
			fileinfo.type = file_types.valid_lamus_written_resource_file_types[pos][2];
			fileinfo.mimetype = file_types.valid_lamus_written_resource_file_types[pos][1];
			return fileinfo;
		
		}

		return fileinfo;
	};
	
	
	my.file_types = {

		valid_file_types: [
			["eaf","text/x-eaf+xml","Annotation"],
			["mdf","Unknown","Unspecified"],
			["pdf","application/pdf","Primary Text"],
			["xml","text/xml","Annotation"],
			["txt","text/plain","Unspecified"],
			["htm","text/html","Unspecified"],
			["html","text/html","Unspecified"]
			["wav","audio/x-wav","audio"],
			["mpg","video/mpeg","video"],
			["mpeg","video/mpeg","video"],
			["mp4","video/mp4","video"],
			["aif","audio/x-aiff","audio"],
			["aiff","audio/x-aiff","audio"],
			["jpg","image/jpeg","image"],
			["jpeg","image/jpeg","image"],
			["png","image/png","image"],
			["tif","image/tiff","image"],
			["tiff","image/tiff","image"],
			["smil","application/smil+xml","video"]
			["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document","Unspecified"],
			["doc","application/msword","Unspecified"],
			["odf","application/vnd.oasis.opendocument.formula","Unspecified"],
			["odt","application/vnd.oasis.opendocument.text","Unspecified"],
			["xls","application/vnd.ms-excel","Unspecified"],
			["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","Unspecified"],
			["ppt","application/vnd.ms-powerpoint","Unspecified"],
			["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation","Unspecified"]
			["mkv","Unknown","video"],
			["mov","video/quicktime","video"],
			["mp3","Unknown","audio"],
			["avi","video/x-msvideo","video"],
			["au","audio/basic","audio"]
		]

	};
	
	
	my.recall = function(data){

		if (data){
			my.resources.setState(data.resources);
		}
		
		APP.forms.fill(lido_environment.forms.start, "start_form_", data.start_form);
	
		my.refresh();
	
	};
	
	
	my.getSaveData = function(){
	
		//currently not possible because too much data with uploaded images!
		//so we remove the dataURLs from the array and save it then
		my.resources.deleteKeyInAllItems("dataURL");
		
		var data = {
			resources: my.resources.getState(),
			start_form: APP.forms.makeObjectWithFormData(lido_environment.forms.start, "start_form_")
		};
		
		return data;
	
	};
	
	
	my.functions = function(){
		return [
			{
				id: "link_sort_alphabetically",
				icon: "az",
				label: "Alphabetisch sortieren",
				onclick: function() { my.sortAlphabetically(); }
			},
			{
				id: "link_remove_files",
				icon: "reset",
				label: "Entfernen",
				onclick: function() { my.removeSelectedFiles(); }
			},
			{
				id: "link_clear_file_list",
				icon: "reset",
				label: "Liste löschen",
				onclick: function() { my.reset(); }
			}
		];
	};
	
	
	my.refresh = function(not_in_bundles) {
		var file_entry_class;
		//var compatibility_warning;

		// files is a FileList of File objects. List some properties.
		var output = [];
		
		var list = g('list');
		
		list.innerHTML = "";

		my.resources.forEach(function(res, i) {
		
			my.renderResource({
				number: i,
				title: res.name,
				mime_type: res.mime_type,
				file_size: res.size,
				lastModified: res.lastModified,
				id: "file_entry_"+i,
				className: "file_entry media_file_entry",
				parent: list,
				status: res.status,
				path: res.path,
				dataURL: res.dataURL
			});

		});
		
		if (my.resources.length === 0){
			list.innerHTML = "<h2>" + "Keine Dateien importiert." + "</h2>";
		}

		if ((bundle) && (!not_in_bundles)){
			bundle.refresh();
		}
		
		my.fileSelection.selected_files = [];
		
	};
	
	
	my.renderResource = function(options){
		//possible options:
		//number, title, mimeType, file_size, lastModified, id, className, parent, compatibility_warning, status, path
	
		var div = dom.make("div", options.id, options.className, options.parent);
		var title = dom.make("h2", "", "file_entry_title", div, options.title);
		var p = dom.make("p", "", "", div, options.mimeType +
			'<br><span class="size_span">' + "Größe" + ': ' + options.file_size + '</span><br>'+
			'<span name="date_span" class="date_span">' + "Letzte Änderung" + ': ' + options.lastModified + '</span><br>'
		);
		
		if (options.dataURL){
		
			var img = dom.make("img", "res_img_"+options.id, "lidoresource_img", div);
			img.src = options.dataURL;
		
		}
		
		
		div.addEventListener("click", function(num){
			
			return function(){
				
				my.fileSelection.clickedOnFile(num);
			
			};
			
		}(options.number), false);
	
	
	};
  
  
	my.pushFileMetadata = function(FileList) {

		// files is a FileList of File objects. List some properties.
		var output = [];
		for (var i = 0, f; !!(f = FileList[i]); i++) {
		
			my.addFileToList(f);
			

		}
		
	};
	
	
	my.addFileToList = function(file){
	
		var reader = new FileReader();
		
		reader.onloadend = function () {
			
			my.resources.add({
				name: file.name,
				type: file.type || 'n/a',
				size: strings.bytesToSize(file.size, 1),
				lastModified: file.lastModifiedDate.toLocaleDateString(),
				status: "stable",
				dataURL: reader.result
			});
			
			my.refresh();
			
		};
		
		reader.readAsDataURL(file);
	
	
	};
  

	my.sortAlphabetically = function(){
	
		my.resources.sortByKey("name");
		my.refresh();
		
	};
	
	
	my.removeSelectedFiles = function(){
		
		var selected_files = my.fileSelection.selected_files;
		var IDs = my.resources.mapIndexesToIDs(selected_files);
		my.resources.removeByID(IDs);
		my.refresh();
		
	};

	
	my.getIDsOfResourcesThatStartWithTheSameNameAsThis = function (id){
	
		var this_resource = my.resources.getByID(id);
	
		var resources = my.resources.filter(function(res){
			
			//do not include the resource itself
			if (id == res.id){
				return false;
			}
		
			if (
				strings.isSubstringAStartOfAWordInString(
					strings.removeEndingFromFilename(res.name),
					strings.removeEndingFromFilename(this_resource.name)
				)
			){
			
				return true;
			
			}
			
			return false;
		
		});
		
		var IDs = getArrayWithIDs(resources);
	
		return IDs;
	
	};
	
	
	my.fadeFilesThatStartWithSameNameAsSelectedOnes = function(){
	
		var element_prefix = "file_entry_";
		
		var resources_to_fade = [];
		var resources_to_fade_for_file;
	
		//First, unfade all files
		for (var i = 0; i < my.resources.length; i++){
		
			g(element_prefix + i.toString()).style.opacity = "1";
			
		}

		//Then check for all resources that have to be faded
		for (var k = 0; k < my.fileSelection.selected_files.length; k++){
		
			var file_index = my.fileSelection.selected_files[k];
			var file_id = my.resources.idOf(file_index);
			
			
			resources_to_fade.push(file_id);   //fade the resource that is selected
			
			var id_of_res = my.resources.idOf(file_index);
			
			//get resource ids of resources that start with the same name as this
			resources_to_fade_for_file = my.getIDsOfResourcesThatStartWithTheSameNameAsThis(id_of_res);
			
			//fade them too
			for (var j = 0; j < resources_to_fade_for_file.length; j++){
				resources_to_fade.push(resources_to_fade_for_file[j]);
			}
			
			//console.log(resources_to_fade);
		
			
		};
		
		
		//Then fade them!
		for (i=0; i<resources_to_fade.length; i++){
		
			var index = my.resources.indexOf(resources_to_fade[i]);
		
			g(element_prefix+index.toString()).style.opacity = "0.5";
		}
	
	
	};


	my.handleFileListInputChange = function(evt){
	 
		var file = evt.target.files[0]; // File object
		
		var file_list;  //this is where the file strings will be stored
		
		if (strings.getFileTypeFromFilename(file.name) != "txt"){
		
			APP.log("File List must be of type TXT!", "error");
			return;			
			
		}
		
		readFileAsText(file, function(result){
		
			try {
			
				file_list = strings.linesToArray(result);
				
			}

			
			catch (e) {
			//if file list parsing is not possible
				console.info("No files found! Maybe this file list is not valid!");
				return;
			}
			
			
			forEach(file_list, function(file_string){
				
				if (file_string.length > 0 && file_string != " "){
				
					my.resources.add({
						name: strings.getFilenameFromFilePath(file_string),
						path: strings.getDirectoryFromFilePath(file_string),
						status: "stable"
					});
					
				}
				
			});
			
			
			my.refresh();
		
		});
		
	};

	my.IsSignatureOk = function(){

		var Digitalisierungssignatur = my.getSaveData().start_form.digitalisierungssignatur.digitalisierungssignatur;
		var Eintragsart = my.getSaveData().start_form.eintragsdokumentation.eintragsart;

		if (Digitalisierungssignatur == '' || Eintragsart == '') {
			return false;
		}
		
		return true;	
	
	};


	my.reset = function(){

		my.resources.reset();
		my.refresh();

	};
	
	return my;

})();
  
