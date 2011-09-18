function ShirtWoot() { }

function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				if(item != 'content')
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function xml_to_string(xml_node)
    {
        if (xml_node.xml)
            return xml_node.xml;
        else if (XMLSerializer)
        {
            var xml_serializer = new XMLSerializer();
            return xml_serializer.serializeToString(xml_node);
        }
        else
        {
            alert("ERROR: Extremely old browser");
            return "";
        }
    }

ShirtWoot.prototype.updateInfo = function(callback) 
{
	var feed = new google.feeds.Feed("http://api.woot.com/1/sales/current.rss/shirt.woot.com");
	feed.setNumEntries(1);
	feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);

	// Process the feed, building the display
	feed.load(function(result) 
				{
					if (!result.error) 
					{
						var item = $(result.xmlDocument).find('item');
						localStorage["ShirtWoot_teeTitle"] = item.find('title').text();
						
						var jSections = item.children();
						
						jSections.each(
							function( intSectionIndex )
							{
								if($( this )[ 0 ].nodeName == "woot:detailimage")
								{
									// Set the term text.
									localStorage["ShirtWoot_teeImgSrc"] = $( this ).text();
								}
							}
						);
					}
					callback();
				});
}

ShirtWoot.prototype.getLatestTeeTitle = function() 
{
	return localStorage["ShirtWoot_teeTitle"];
}

ShirtWoot.prototype.getLatestTeeImgSrc = function() 
{
	return localStorage["ShirtWoot_teeImgSrc"];
}