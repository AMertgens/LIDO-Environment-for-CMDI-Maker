var lido_environment = (function(){

	var my = {};

	my.name = "lido";
	my.id = "lido";
	my.title = "LIDO";
	my.version = "0.1";
	
	
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
	
	
	my.getIdentifiersFromDB = function(callback){
	
		getWithAJAX(
			"http://dd-dariah.uni-koeln.de/exist/apps/wahn/oai-pmh.xql?verb=ListIdentifiers&metadataPrefix=lido",		
			function(http){
				
				var xml = http.responseXML;
				log(xml);
				
				var list = xmlQuery(xml, ["OAI-PMH", "ListIdentifiers"]);
				
				var identifiers = map(list.children, function(header){
				
					return xmlQueryText(header, ["identifier"]);
				
				});
				
				callback(identifiers);
			
			}
		);
	
	};
	
	my.showIdentifierSelect = function(){
	
		my.getIdentifiersFromDB(function(identifiers){
	
			log(identifiers);
			
			APP.GUI.showSelectFrame(identifiers, identifiers, my.loadDocumentFromDB, "LIDO Documents in Database", undefined);
		
		});
	
	
	};
	
	
	my.loadDocumentFromDB = function(identifier){
	
		var url = "http://dd-dariah.uni-koeln.de/exist/apps/wahn/oai-pmh.xql?verb=GetRecord&identifier=" + identifier + "&metadataPrefix=lido"
	
		getWithAJAX(
			url,		
			function(http){
				
				var xml = http.responseXML;
				log(xml);

				var lido = xmlQuery(xml, ["OAI-PMH", "GetRecord", "record", "metadata", "lido"]);
				
				log(lido);
				
				my.importLIDOXML(lido);
			
			}
		);	
	
	};
	
	
	my.importLIDOXML = function(xml){
		
		var start = {};

		//bei attributes mit prefix, bei tags ohne
		start = {
			"source": xmlQuery(xml, ["lidoRecID"]).getAttribute("lido:source"),
			"object_id": xmlQueryText(xml, ["lidoRecID"]),
			"concept_id": xmlQueryText(xml, ["category", "conceptID"]),
			"legal_body": "",
			"type": xmlQueryText(xml, ["category", "term"]),
			"classification": "",
			"rights": {
				"type": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsType", "term"]),
				"earliest_date": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "earliestDate"]),
				"latest_date": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsDate", "latestDate"]),
				"legal_body": xmlQueryText(xml, ["administrativeMetadata", "rightsWorkWrap", "rightsWorkSet", "rightsHolder", "legalBodyName", "appellationValue"])
			},
			"record": {
				"id": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordID"]),
				"type": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordType", "term"]),
				"source": xmlQueryText(xml, ["administrativeMetadata", "recordWrap", "recordSource", "legalBodyName", "appellationValue"]),
				"rights": {
					"type": "",
					"date": "",
					"holder": "",
					"credit_line": ""
				}
			},
			"resource": {
				"id": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceID"]),
				"link": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation", "linkResource"]),
				"representation_type": xmlQuery(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceRepresentation"]).getAttribute("lido:type"),
				"type": xmlQueryText(xml, ["administrativeMetadata", "resourceWrap", "resourceSet", "resourceType", "term"]),
				"source": "",
				"rights": {
					"type": "",
					"date": "",
					"holder": "",
					"credit_line": ""
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