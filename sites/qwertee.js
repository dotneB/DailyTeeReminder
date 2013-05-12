Qwertee.prototype = new BaseSite;
Qwertee.prototype.constructor = Qwertee;

function Qwertee()
{
    BaseSite.call(this);
    this.siteName        = "Qwertee";
    this.siteDisplayName = "Qwertee";
    this.siteURL         = "http://www.qwertee.com";
    this.siteFeedURL     = "http://www.qwertee.com/rss/";
    this.supportMultiShirt = true;
}

Qwertee.prototype.updateInfo = function(callback)
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
                            var publishedDate = result.feed.entries[i].publishedDate;

                            self.addTshirt(shirtName, imageSrc, publishedDate);
                        }
                    }
                    callback(self.isRead());
                });
}