OtherTees.prototype = new BaseSite;
OtherTees.prototype.constructor = OtherTees;

function OtherTees()
{
    BaseSite.call(this);
    this.siteName        = "OtherTees";
    this.siteDisplayName = "OtherTees";
    this.siteURL         = "http://www.othertees.com";
    this.siteFeedURL     = "http://www.othertees.com/feed/";
    this.supportMultiShirt = true;
}

OtherTees.prototype.updateInfo = function(callback)
{
    var self = this; // Keep a reference to this, to be used inside the feed callback
    var feed = new google.feeds.Feed(self.siteFeedURL);
    feed.setNumEntries(self.supportMultiShirt ? 3 : 1);

    // Process the feed, building the display
    console.log("WARNING: Since images path in OtherTees's rss are relative, loading their feed will produce 'Failed to load resource' errors in the logs. This is unavoidable");
    feed.load(function(result)
                {
                    if (!result.error)
                    {
                        for (var i = 0; i < result.feed.entries.length; i++)
                        {
                            // The info is embedded within the title, so we have to manually parse it
                            var shirtName   = result.feed.entries[i].title;

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var teeImagesRaw = tempDiv.getElementsByTagName("img");
                            var imageSrc = teeImagesRaw[0].getAttribute("src");
                            if(imageSrc.indexOf(self.siteURL) == -1)
                            {
                                imageSrc = self.siteURL + imageSrc;
                            }
                            var publishedDate = result.feed.entries[i].publishedDate;

                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    else
                    {
                        console.log("Error loading " + self.siteName);
                        console.log(result.error);
                    }
                    callback(self.isRead());
                });
}