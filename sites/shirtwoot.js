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
						var teeTitleText = item.find('title').text();
						var jSections = item.children();
						
						var teeImageSrc = localStorage["ShirtWoot_teeImgSrc"];
						jSections.each(
							function( intSectionIndex )
							{
								if($( this )[ 0 ].nodeName == "woot:detailimage")
								{
									// Set the term text.
									teeImageSrc = $( this ).text();
								}
							}
						);
						
						if (teeImageSrc != localStorage["ShirtWoot_teeImgSrc"]) 
						{
							localStorage["ShirtWoot_unread"] = "true";
							localStorage["ShirtWoot_teeTitle"] = teeTitleText;
							localStorage["ShirtWoot_teeImgSrc"] = teeImageSrc;
						}
					}
					callback(localStorage["ShirtWoot_unread"]);
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

ShirtWoot.prototype.writeSlide = function(container) 
{
	$(container).append(
	"<div class=\"slide\">" +
			( localStorage["ShirtWoot_unread"] == "false" ? "" : "<img src=\"img/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") + 
			"<a href=\"#\" onclick=\"chrome.tabs.create({url: 'http://shirt.woot.com/'})\"><img src=\"" + localStorage["ShirtWoot_teeImgSrc"] + "\" width=\"722\" height=\"480\"></a>" +
			"<div class=\"caption\" style=\"bottom:0\">" +
				"<p>shirt.woot: " + localStorage["ShirtWoot_teeTitle"] +"</p>" +
			"</div>" +
		"</div>"
	);
	localStorage["ShirtWoot_unread"] = "false";
}