function RiptApparel() { }

RiptApparel.prototype.updateInfo = function(callback) 
{
	var feed = new google.feeds.Feed("http://feeds.feedburner.com/riptapparel");
	feed.setNumEntries(1);

	// Process the feed, building the display
	feed.load(function(result) 
				{
					if (!result.error) 
					{
						// The info is embedded within the title, so we have to manually parse it
						var teeTitleRaw   = result.feed.entries[0].title;
						var teeTitleWords = teeTitleRaw.split(" - ");
						var teeTitleText  = teeTitleWords[0].split(" by ")[0];
						var teeAuthorText = teeTitleWords[0].split(" by ")[1];
						var teePriceText  = teeTitleWords[1];
						 
						// The tee's image is embedded within the content, so again, we have to parse it manually
						var tempDiv = document.createElement("div");
						tempDiv.innerHTML = result.feed.entries[0].content;
						var teeImagesRaw = tempDiv.getElementsByTagName("img");

						var teeImageSrc = teeImagesRaw[0].getAttribute("src");
						if (teeImageSrc != localStorage["RiptApparel_teeImgSrc"]) 
						{
							localStorage["RiptApparel_unread"] = "true";
							localStorage["RiptApparel_teeTitle"] = teeTitleText;
							localStorage["RiptApparel_teeImgSrc"] = teeImageSrc;
						}
					}
					callback(localStorage["RiptApparel_unread"]);
				});
}

RiptApparel.prototype.getLatestTeeTitle = function() 
{
	return localStorage["RiptApparel_teeTitle"];
}

RiptApparel.prototype.getLatestTeeImgSrc = function() 
{
	return localStorage["RiptApparel_teeImgSrc"];
}

RiptApparel.prototype.writeSlide = function(container) 
{
	$(container).append(
	"<div class=\"slide\">" +
			( localStorage["RiptApparel_unread"] == "false" ? "" : "<img src=\"img/new-ribbon.png\" width=\"112\" height=\"112\" alt=\"New Ribbon\" id=\"ribbon\">") + 
			"<a href=\"#\" onclick=\"chrome.tabs.create({url: 'http://riptapparel.com/'})\"><img src=\"" + localStorage["RiptApparel_teeImgSrc"] + "\" width=\"722\" height=\"480\"></a>" +
			"<div class=\"caption\" style=\"bottom:0\">" +
				"<p>Ript Apparel: " + localStorage["RiptApparel_teeTitle"] +"</p>" +
			"</div>" +
		"</div>"
	);
	
	localStorage["RiptApparel_unread"] = "false";
}