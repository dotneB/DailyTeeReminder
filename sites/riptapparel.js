RiptApparel.prototype = new BaseSite;
RiptApparel.prototype.constructor = RiptApparel;

function RiptApparel()
{
    BaseSite.call(this);
    this.siteName        = "RiptApparel";
    this.siteDisplayName = "Ript Apparel";
    this.siteURL         = "http://www.riptapparel.com";
    this.siteFeedURL     = "http://feeds.feedburner.com/riptapparel";
    this.supportMultiShirt = false;
}

RiptApparel.prototype.updateInfo = function(callback)
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
                            var shirtName = result.feed.entries[i].title;

                            // The tee's image is embedded within the content, so again, we have to parse it manually
                            var tempDiv = document.createElement("div");
                            tempDiv.innerHTML = result.feed.entries[i].content;
                            var rawImage = tempDiv.getElementsByTagName("img");
                            var imageSrc = rawImage[0].getAttribute("src");
                            var publishedDate = new Date();//publishedDate not available in the feed.

                            self.addTshirt(shirtName, imageSrc, publishedDate.toString());
                        }
                    }
                    callback(self.isRead());
                });
}