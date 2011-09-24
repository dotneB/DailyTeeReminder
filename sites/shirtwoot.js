ShirtWoot.prototype = new BaseSite;
ShirtWoot.prototype.constructor = ShirtWoot;

function ShirtWoot()
{
    BaseSite.call(this);
    this.siteName = "ShirtWoot";
	this.siteDisplayName = "Shirt Woot";
	this.siteURL = "http://shirt.woot.com";
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
							localStorage["ShirtWoot_read"] = "false";
							localStorage["ShirtWoot_teeTitle"] = teeTitleText;
							localStorage["ShirtWoot_teeImgSrc"] = teeImageSrc;
						}
					}
					callback(localStorage["ShirtWoot_read"]);
				});
}