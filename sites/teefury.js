TeeFury.prototype = new BaseSite;
TeeFury.prototype.constructor = TeeFury;

function TeeFury()
{
    BaseSite.call(this);
    this.siteName        = "TeeFury";
    this.siteDisplayName = "Tee Fury";
    this.siteURL         = "http://www.teefury.com";
    this.siteFeedURL     = "http://feeds.feedburner.com/TeefuryDailyTee";
}

TeeFury.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
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
						//Use larger image if it exist
						if(teeImagesRaw.length >= 2)
						{
							teeImageSrc = teeImagesRaw[1].getAttribute("src");
						}

                        self.setContent(teeTitleText, teeImageSrc);
                    }
                    callback(self.isRead());
                });
}