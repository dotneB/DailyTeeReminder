function ShirtWoot() { }

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