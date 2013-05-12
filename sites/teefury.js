TeeFury.prototype = new BaseSite;
TeeFury.prototype.constructor = TeeFury;

function TeeFury()
{
    BaseSite.call(this);
    this.siteName        = "TeeFury";
    this.siteDisplayName = "Tee Fury";
    this.siteURL         = "http://www.teefury.com";
    this.siteFeedURL     = "http://feeds.feedburner.com/TeefuryDailyTee";
    this.supportMultiShirt = true;
}

TeeFury.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(self.supportMultiShirt ? 3 : 1);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        for (var i = 0; i < result.feed.entries.length; i++)
                        {
                            // The info is embedded within the title, so we have to manually parse it
                            var teeTitleRaw   = result.feed.entries[i].title;
                            var teeTitleWords = teeTitleRaw.split(" - ");
                            var shirtName  = teeTitleWords[0].split(" by ")[0];
                            var teeAuthorText = teeTitleWords[0].split(" by ")[1];
                            var teePriceText  = teeTitleWords[1];

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var teeImagesRaw = tempDiv.getElementsByTagName("img");
                            var imageSrc = teeImagesRaw[0].getAttribute("src");
                            //Use larger image if it exist
                            if(teeImagesRaw.length >= 2)
                            {
                                imageSrc = teeImagesRaw[1].getAttribute("src");
                            }
                            var publishedDate = result.feed.entries[i].publishedDate;

                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    callback(self.isRead());
                });
}