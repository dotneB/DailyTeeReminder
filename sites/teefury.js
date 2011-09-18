function TeeFury() { }

TeeFury.prototype.updateInfo = function(callback) 
{
	var feed = new google.feeds.Feed("http://feeds.feedburner.com/TeefuryDailyTee");
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
						
						localStorage["TeeFury_teeTitle"] = teeTitleText;
						localStorage["TeeFury_teeImgSrc"] = teeImageSrc;
						
						console.log(teeTitleText);
						console.log(teeImageSrc);
					}
					callback();
				});
}

TeeFury.prototype.getLatestTeeTitle = function() 
{
	return localStorage["TeeFury_teeTitle"];
}

TeeFury.prototype.getLatestTeeImgSrc = function() 
{
	return localStorage["TeeFury_teeImgSrc"];
}

TeeFury.prototype.writeSlide = function(container) 
{
	$(container).append(
	"<div class=\"slide\">" +
			"<a href=\"\" title=\"\" target=\"_blank\"><img src=\"" + localStorage["TeeFury_teeImgSrc"] + "\" width=\"722\" height=\"480\"></a>" +
			"<div class=\"caption\" style=\"bottom:0\">" +
				"<p>Tee Fury: " + localStorage["TeeFury_teeTitle"] +"</p>" +
			"</div>" +
		"</div>"
	);
}