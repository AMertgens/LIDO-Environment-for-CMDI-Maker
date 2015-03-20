var lido_environment = (function(){

	var my = {};

	my.name = "lido";
	my.id = "lido";
	my.title = "LIDO";
	my.version = "0.0.1";
	
	
	my.workflow = [];
	
	my.init = function(){
	
		return;
	
	};
	
	
	var xmlQueryText = function(xml, array){
	
		var node = xml;
	
		for (var n=0; n< array.length; n++){
			
			node = node.getElementsByTagName(array[n])[0];
			
		}
		
		return node.textContent.trim();
		
	};
	
	
	var xmlQuery = function(xml, array){
	
		var node = xml;
	
		for (var n=0; n < array.length; n++){
			
			node = node.getElementsByTagName(array[n])[0];
			
		}
		
		return node;
		
	}
	
	
	my.importLIDOXML = function(string){
		
		var xml = ( new window.DOMParser() ).parseFromString(string, "text/xml");

		log("successfully parsed xml string: ");
		log(xml);
		
		var start = {};

		//bei attributes mit prefix, bei tags ohne
		start = {
			"source": xmlQuery(xml, ["lido", "lidoRecID"]).getAttribute("lido:source"),
			"object_id": xmlQueryText(xml, ["lido", "lidoRecID"]),
			"concept_id": xmlQueryText(xml, ["lido", "category", "conceptID"]),
			"legal_body": "",
			"type": xmlQueryText(xml, ["lido", "category", "term"]),
			"classification": "",
			"rights": {
				"type": xmlQueryText(xml, ["lido", "administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsType", "term"]),
				"earliest_date": xmlQueryText(xml, ["lido", "administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "earliestDate"]),
				"latest_date": xmlQueryText(xml, ["lido", "administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "latestDate"]),
				"legal_body": xmlQueryText(xml, ["lido", "administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsHolder", "legalBodyName", "appellationValue"])
			},
			"record": {
				"id": xmlQueryText(xml, ["lido", "administrativeMetadata", "recordWrap", "recordID"]),
				"type": xmlQueryText(xml, ["lido", "administrativeMetadata", "recordWrap", "recordType", "term"]),
				"source": xmlQueryText(xml, ["lido", "administrativeMetadata", "recordWrap", "recordSource", "legalBodyName", "appellationValue"]),
				"rights": {
					"type": "",
					"date": "",
					"holder": "",
					"credit_line": ""
				}
			},
			"resource": {
				"id": xmlQueryText(xml, ["lido", "administrativeMetadata", "resourceWrap", "resourceSet", "resourceID"]),
				"link": xmlQueryText(xml, ["lido", "administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation", "linkResource"]),
				"representation_type": xmlQuery(xml, ["lido", "administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation"]).getAttribute("lido:type"),
				"type": xmlQueryText(xml, ["lido", "administrativeMetadata", "resourceWrap", "resourceSet", "resourceType", "term"]),
				"source": "res so",
				"rights": {
					"type": "erijr",
					"date": "rij",
					"holder": "wrgji",
					"credit_line": "rojjrgji"
				}
			}
		}
		
		return start;
		
	};
	
	
	my.settings = function(){
		return [];
	};
	
	my.recall = function (settings){
		
		return;
	
	};
	
	my.getSaveData = function(){
	
		return;
	
	};
	
	
	my.getProjectName = function(){
		
		return my.workflow[1].getSaveData().title;
		
	};
	
	
	my.reset = function(){
	
		return;
	
	};
	
	APP.environments.add(my);
	
	return my;
	
})();