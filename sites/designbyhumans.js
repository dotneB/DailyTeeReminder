DesignByHumans.prototype = new BaseSite;
DesignByHumans.prototype.constructor = DesignByHumans;

function DesignByHumans()
{
    BaseSite.call(this);
    this.siteName        = "DesignByHumans";
    this.siteDisplayName = "Design By H&uuml;mans";
    this.siteURL         = "http://www.designbyhumans.com";
    this.siteFeedURL     = "http://www.designbyhumans.com/feeds/shirt-of-the-day.xml";
}

DesignByHumans.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(3);

    // Process the feed, building the display
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        for (var i = 0; i < result.feed.entries.length; i++)
                        {
                            // The info is embedded within the title, so we have to manually parse it
                            var teeTitleRaw   = result.feed.entries[i].title;
                            var shirtName  = teeTitleRaw.split(" by ")[0];

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var teeImagesRaw = tempDiv.getElementsByTagName("img");
                            var imageSrc = teeImagesRaw[0].getAttribute("src");
                            var publishedDate = result.feed.entries[i].publishedDate;

                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    callback(self.isRead());
                });
}