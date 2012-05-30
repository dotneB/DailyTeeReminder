Tilteed.prototype = new BaseSite;
Tilteed.prototype.constructor = Tilteed;

function Tilteed()
{
    BaseSite.call(this);
    this.siteName = "Tilteed";
    this.siteDisplayName = "Tilteed";
    this.siteURL = "http://www.tilteed.com";
	this.imgWidth		 = 370;
	this.imgHeight		 = 480;
}

Tilteed.prototype.updateInfo = function(callback)
{
    var feed = new google.feeds.Feed("http://www.tilteed.com/home/rss");
    feed.setNumEntries(1);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        // The info is embedded within the title, so we have to manually parse it
                        var teeTitleText   = result.feed.entries[0].title;

                        // The tee's image is embedded within the content, so again, we have to parse it manually
                        var tempDiv = document.createElement("div");
                        tempDiv.innerHTML = result.feed.entries[0].content;
                        var teeImagesRaw = tempDiv.getElementsByTagName("img");

                        var teeImageSrc = "http://www.tilteed.com" + teeImagesRaw[0].getAttribute("src");
                        if (teeImageSrc != localStorage["Tilteed_teeImgSrc"])
                        {
                            localStorage["Tilteed_read"] = "false";
                            localStorage["Tilteed_teeTitle"] = teeTitleText;
                            localStorage["Tilteed_teeImgSrc"] = teeImageSrc;
                        }
                    }
                    callback(localStorage["Tilteed_read"]);
                });
}